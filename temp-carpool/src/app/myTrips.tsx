import BottomNavigation from '@/components/BottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext'; 
// Agregamos Alert y ActivityIndicator a los imports de react-native
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#192B68';
const MUTED = '#7890B5';
const PURPLE = '#7C4DFF';
const PURPLE_SOFT = '#E5DDFB';
const GREEN = '#10B65C';
const BACKGROUND = '#FDFBFA';
const BORDER = '#ECECF1';

type Pestana = 'Pasados' | 'Reservados';
// Agregamos 'Confirmado' porque es el estado que manda tu backend
type Estado = 'Reservado' | 'Pendiente' | 'Completado' | 'Confirmado';

type MiViaje = {
  _id: string;        
  origen: string;
  destino: string;
  fecha: string;
  asientos: number;
  precio: number;
  estado: string; // Lo dejamos string para que acepte cualquier estado de la BD
  conductor?: string; 
};

// ESTOS SON TUS DATOS DE RESPALDO (Si la BD falla o no hay sesión)
const viajesReservados: MiViaje[] = [
  {
    _id: '1',
    origen: 'Aguascalientes',
    destino: 'Querétaro',
    fecha: 'Sáb, 25 Oct 2026 · 8:00 a. m.',
    asientos: 3,
    precio: 180,
    estado: 'Reservado',
  },
  {
    _id: '2',
    origen: 'Querétaro',
    destino: 'CDMX',
    fecha: 'Lun, 27 Oct 2026 · 5:00 p. m.',
    asientos: 2,
    precio: 150,
    estado: 'Pendiente',
  },
];

const viajesPasados: MiViaje[] = [
  {
    _id: '3',
    origen: 'CDMX',
    destino: 'Aguascalientes',
    fecha: 'Vie, 10 Oct 2026 · 7:00 a. m.',
    asientos: 1,
    precio: 220,
    estado: 'Completado',
  },
];

const ESTADO_STYLES: Record<string, { bg: string; text: string }> = {
  Confirmado: { bg: '#B8F0B0', text: '#1E5A2B' },
  Reservado: { bg: '#B8F0B0', text: '#1E5A2B' },
  Pendiente: { bg: '#F9E4A8', text: '#6B4E00' },
  Completado: { bg: '#E3E8F2', text: '#4A5A7A' },
};

export default function MyTripsScreen() {
  const router = useRouter();
  const [pestana, setPestana] = useState<Pestana>('Reservados');
  
  const { usuario } = useAuth(); 
  const [viajes, setViajes] = useState<MiViaje[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función para traer las reservas de la base de datos
    // Función para traer las reservas de la base de datos
  const cargarReservas = async () => {
    if (!usuario || !usuario.id) {
      setViajes(pestana === 'Reservados' ? viajesReservados : viajesPasados);
      setCargando(false);
      return;
    }

    try {
      setCargando(true);
      
      // 1. Traemos las reservas que hiciste
      const resReservas = await fetch(`${API_URL}/api/reservas/${usuario.id}`);
      const dataReservas = await resReservas.json();

      // 2. Traemos todos los viajes para ver si publicaste alguno
      const resViajes = await fetch(`${API_URL}/api/viajes`);
      const dataViajes = await resViajes.json();
      
      // 3. Filtramos los viajes donde tú eres el conductor
      const misViajesPublicados = dataViajes.filter((v: any) => v.conductor === usuario.nombre);

      // 4. Juntamos las reservas y tus viajes publicados en una sola lista
      setViajes([...dataReservas, ...misViajesPublicados]);
      
    } catch (error) {
      console.error("Error cargando reservas", error);
      setViajes(pestana === 'Reservados' ? viajesReservados : viajesPasados);
    } finally {
      setCargando(false);
    }
  };

  // Cargar al entrar a la pantalla
  useEffect(() => {
    cargarReservas();
  }, [usuario]); 

  // Función para cancelar reserva (eliminar de la BD)
  const cancelarReserva = (id: string) => {
    Alert.alert("Cancelar Reserva", "¿Estás seguro que deseas cancelar este viaje?", [
      { text: "No", style: "cancel" },
      { 
        text: "Sí, cancelar", 
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_URL}/api/reservas/${id}`, { method: 'DELETE' });
            if (response.ok) {
              setViajes(viajes.filter(v => v._id !== id)); 
            } else {
              Alert.alert("Error", "No se pudo cancelar la reserva en el servidor.");
            }
          } catch (error) {
            console.error("Error cancelando", error);
            Alert.alert("Error", "No se pudo conectar con el servidor.");
          }
        }
      }
    ]);
  }; 

  // Función para marcar como terminado (Si es viaje publicado, se completa; si es reserva, se elimina)
  const terminarViaje = async (id: string) => {
    Alert.alert("Terminar Viaje", "¿Marcar este viaje como completado? Se moverá a la pestaña 'Pasados'.", [
      { text: "No", style: "cancel" },
      { 
        text: "Sí, terminado", 
        onPress: async () => {
          try {
            // 1. Intentamos completarlo como viaje publicado
            const response = await fetch(`${API_URL}/api/viajes/${id}/completar`, { method: 'PUT' });
            
            if (response.ok) {
              Alert.alert('Viaje terminado', 'El viaje se ha movido a Pasados.');
              cargarReservas();
            } else {
              // 2. Si falla, es porque era una reserva, así que la cancelamos
              const resDelete = await fetch(`${API_URL}/api/reservas/${id}`, { method: 'DELETE' });
              if (resDelete.ok) {
                Alert.alert('Cancelada', 'Tu reserva ha sido eliminada.');
                cargarReservas();
              } else {
                Alert.alert('Error', 'No se pudo completar ni cancelar.');
              }
            }
          } catch (error) {
            Alert.alert('Error de red', 'No se pudo conectar.');
          }
        }
      }
    ]);
  }; 

  // Filtramos la lista según la pestaña seleccionada
  const viajesFiltrados = pestana === 'Reservados' 
    ? viajes.filter(v => v.estado !== 'Completado') 
    : viajes.filter(v => v.estado === 'Completado'); 
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mis viajes</Text>

        <View style={styles.segmented}>
          {(['Pasados', 'Reservados'] as const).map((item) => {
            const active = pestana === item;
            return (
              <Pressable
                key={item}
                style={[styles.segment, active && styles.segmentActive]}
                onPress={() => setPestana(item)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text
                  style={[styles.segmentText, active && styles.segmentTextActive]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {cargando ? (
          <ActivityIndicator size="large" color={PURPLE} style={{ marginTop: 40 }} />
        ) : viajesFiltrados.length > 0 ? (
          viajesFiltrados.map((viaje) => {
            const badge = ESTADO_STYLES[viaje.estado] || ESTADO_STYLES['Pendiente']; 
            return (
              <View key={viaje._id} style={styles.card}> 
                <View style={styles.statusIcon}>
                  <Ionicons
                    name={viaje.estado === 'Completado' ? 'checkmark' : 'hourglass-outline'}
                    size={22}
                    color="#FFFFFF"
                  />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.route}>
                    {viaje.origen} → {viaje.destino}
                  </Text>
                  <Text style={styles.meta}>{viaje.fecha}</Text>
                  <Text style={styles.meta}>
                    ${viaje.precio}
                  </Text>
                  {viaje.conductor && (
                    <Text style={styles.meta}>Con: {viaje.conductor}</Text>
                  )}

                  <View style={styles.cardFooter}>
                    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {viaje.estado}
                      </Text>
                    </View>

                    {/* Lógica condicional para el botón: Terminado o Cancelar */}
                    <Pressable
                      onPress={() => {
                        if (pestana === 'Reservados') {
                          terminarViaje(viaje._id);
                        } else {
                          cancelarReserva(viaje._id);
                        }
                      }}
                      accessibilityRole="button"
                    >
                      <Text style={styles.linkCancel}>
                        {pestana === 'Reservados' ? 'Terminado' : 'Cancelar'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={45} color={MUTED} />
            <Text style={styles.emptyTitle}>Aún no tienes viajes</Text>
            <Text style={styles.emptyText}>
              {pestana === 'Reservados' 
                ? 'Busca un viaje y reserva tu primer asiento.' 
                : 'Tus viajes completados aparecerán aquí.'}
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
} 
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    color: NAVY,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
  },
  segmented: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: PURPLE_SOFT,
    marginBottom: 20,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  segmentActive: {
    backgroundColor: PURPLE,
  },
  segmentText: {
    color: NAVY,
    fontSize: 15,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    marginBottom: 16,
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  route: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },
  meta: {
    color: MUTED,
    fontSize: 13.5,
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 6,
  },
  badge: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  link: {
    color: PURPLE,
    fontSize: 13.5,
    fontWeight: '800',
  },
    linkCancel: {
    color: '#E74C3C', // Rojo
    fontSize: 13.5,
    fontWeight: '800',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    color: MUTED,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
