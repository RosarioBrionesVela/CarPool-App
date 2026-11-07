import DateTimePicker from '@react-native-community/datetimepicker'; 
import { API_URL } from '../config';  
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '../context/AuthContext';

const NAVY = '#17265F';
const BLUE = '#7897BD';
const GREEN = '#009F7A';
const BACKGROUND = '#F2F9FD';

// --- AGREGADO: Lista de estados ---
const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'CDMX', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

type Viaje = {
  _id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  llegada?: string;
  conductor: string;
  calificacion?: string;
  auto: string;
  precio: number;
  asientos: number;
  verificado?: boolean;
  color?: string;
};

const viajesIniciales: Viaje[] = [
  {
    _id: '1',
    origen: 'Aguascalientes, Ags.',
    destino: 'Querétaro, Qro.',
    fecha: '25 oct. 2026',
    hora: '8:00 a. m.',
    llegada: '11:30 a. m.',
    conductor: 'Carlos R.',
    calificacion: '4.8 (24)',
    auto: 'Toyota Corolla · Gris',
    precio: 60,
    asientos: 3,
    verificado: true,
    color: '#A8B4C0',
  },
];

export default function TripsScreen() {
  const router = useRouter();
  const { usuario } = useAuth(); 

  // --- MODIFICADO: Estados para selectores ---
  const [origen, setOrigen] = useState('Aguascalientes');
  const [destino, setDestino] = useState('Querétaro');
  const [mostrarOrigen, setMostrarOrigen] = useState(false);
  const [mostrarDestino, setMostrarDestino] = useState(false);

  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const fechaString = fecha.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const horaString = hora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });

  const [filtro, setFiltro] = useState('Todos');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const [viajesBackend, setViajesBackend] = useState<Viaje[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/viajes`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Viajes desde MongoDB:', data);
        setViajesBackend(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al conectar con el backend:', err);
        setCargando(false);
        setViajesBackend(viajesIniciales);
      });
  }, []); 

  const normalizar = (texto: string) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  let viajesFiltrados = viajesBackend.filter((viaje) => {
    const coincideOrigen =
      !busquedaRealizada ||
      normalizar(viaje.origen).includes(normalizar(origen));

    const coincideDestino =
      !busquedaRealizada ||
      normalizar(viaje.destino).includes(normalizar(destino));

    const coincideFecha =
      !busquedaRealizada ||
      !fechaString.trim() ||
      normalizar(viaje.fecha).includes(normalizar(fechaString));

    return coincideOrigen && coincideDestino && coincideFecha;
  });

  if (filtro === 'Conductor verificado') {
    viajesFiltrados = viajesFiltrados.filter(
      (viaje) => viaje.verificado === true,
    );
  }

  if (filtro === 'Precio') {
    viajesFiltrados = [...viajesFiltrados].sort(
      (a, b) => a.precio - b.precio,
    );
  }

  const buscarViajes = () => {
    if (!origen.trim() || !destino.trim()) {
      Alert.alert('Campos obligatorios', 'Escribe el origen y el destino.');
      return;
    }
    if (normalizar(origen) === normalizar(destino)) {
      Alert.alert('Revisa tu búsqueda', 'El origen y el destino deben ser diferentes.');
      return;
    }
    setBusquedaRealizada(true);
  };

  const reservarViaje = async (viaje: Viaje) => {
    if (!usuario) {
      Alert.alert('Inicia sesión', 'Debes iniciar sesión para reservar.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: usuario.id,
          viajeId: viaje._id,
          conductor: viaje.conductor,
          origen: viaje.origen,
          destino: viaje.destino,
          fecha: viaje.fecha,
          precio: viaje.precio,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('¡Reserva confirmada!', `Has reservado con ${viaje.conductor}`, [
          { text: 'Ver mis viajes', onPress: () => router.push('/myTrips') }
        ]);
      } else {
        Alert.alert('Aviso', data.error || 'No se pudo reservar');
      }
    } catch (error: any) {
      Alert.alert('Error de red', `No se pudo conectar: ${error.message}`);
    }
  }; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Regresar"
          >
            <Ionicons name="arrow-back" size={25} color={NAVY} />
          </Pressable>
          <Text style={styles.title}>Buscar viajes</Text>
        </View>

        {/* --- MODIFICADO: Formulario con Selectores --- */}
        <View style={styles.searchForm}>
          <Pressable style={styles.inputContainer} onPress={() => setMostrarOrigen(!mostrarOrigen)}>
            <Ionicons name="location-outline" size={24} color={NAVY} />
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={{ fontSize: 10, color: BLUE }}>Origen</Text>
              <Text style={styles.input}>{origen}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={BLUE} />
          </Pressable>
          {mostrarOrigen && (
            <ScrollView style={styles.dropdown} nestedScrollEnabled>
              {ESTADOS_MEXICO.map((edo) => (
                <Pressable key={edo} style={styles.dropdownItem} onPress={() => { setOrigen(edo); setMostrarOrigen(false); }}>
                  <Text>{edo}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <Pressable style={styles.inputContainer} onPress={() => setMostrarDestino(!mostrarDestino)}>
            <Ionicons name="location-outline" size={24} color={NAVY} />
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={{ fontSize: 10, color: BLUE }}>Destino</Text>
              <Text style={styles.input}>{destino}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={BLUE} />
          </Pressable>
          {mostrarDestino && (
            <ScrollView style={styles.dropdown} nestedScrollEnabled>
              {ESTADOS_MEXICO.map((edo) => (
                <Pressable key={edo} style={styles.dropdownItem} onPress={() => { setDestino(edo); setMostrarDestino(false); }}>
                  <Text>{edo}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          <View style={styles.dateTimeRow}>
            <Pressable style={[styles.inputContainer, styles.dateInput]} onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar-outline" size={21} color={NAVY} />
              <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text style={{ fontSize: 10, color: BLUE }}>Fecha</Text>
                <Text style={styles.input}>{fechaString}</Text>
              </View>
            </Pressable>

            <Pressable style={[styles.inputContainer, styles.timeInput]} onPress={() => setShowTimePicker(true)}>
              <Ionicons name="time-outline" size={22} color={NAVY} />
              <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text style={{ fontSize: 10, color: BLUE }}>Hora</Text>
                <Text style={styles.input}>{horaString}</Text>
              </View>
            </Pressable>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setFecha(date);
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              display="default"
              onChange={(event, time) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (time) setHora(time);
              }}
            />
          )}

          <Pressable style={styles.searchButton} onPress={buscarViajes}>
            <Ionicons name="search-outline" size={19} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Buscar</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {['Todos', 'Conductor verificado', 'Precio'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.filterButton,
                filtro === item && styles.activeFilter,
              ]}
              onPress={() => setFiltro(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filtro === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {cargando ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Cargando viajes desde la base de datos...</Text>
          </View>
        ) : viajesFiltrados.length > 0 ? (
          viajesFiltrados.map((viaje) => (
            <View key={viaje._id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={25} color={NAVY} />
                </View>

                <View style={styles.driverInfo}>
                  <View style={styles.driverNameRow}>
                    <Text style={styles.driverName}>{viaje.conductor}</Text>
                    {viaje.verificado && (
                      <Ionicons name="checkmark-circle" size={15} color={GREEN} />
                    )}
                  </View>

                  {viaje.calificacion && (
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={16} color="#F9B638" />
                      <Text style={styles.rating}>{viaje.calificacion}</Text>
                    </View>
                  )}

                  <Text style={styles.carName}>{viaje.auto}</Text>
                </View>

                <View style={styles.carImage}>
                  <Ionicons
                    name="car-sport"
                    size={57}
                    color={viaje.color || '#A8B4C0'}
                  />
                </View>
              </View>

              <View style={styles.tripBottomRow}>
                <View style={styles.tripTime}>
                  <Text style={styles.timeText}>
                    {viaje.hora} {viaje.llegada ? `→ ${viaje.llegada}` : ''}
                  </Text>

                  <View style={styles.seatsRow}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={16}
                      color={GREEN}
                    />
                    <Text style={styles.seatsText}>
                      {viaje.asientos} asientos disponibles
                    </Text>
                  </View>
                </View>

                <View style={styles.priceInfo}>
                  <Text style={styles.price}>${viaje.precio}</Text>
                  <Text style={styles.priceLabel}>por persona</Text>
                </View>
              </View>

              <Pressable
                style={styles.reserveButton}
                onPress={() => reservarViaje(viaje)}
              >
                <Text style={styles.reserveText}>Ver viaje y reservar</Text>
                <Ionicons name="arrow-forward" size={17} color={GREEN} />
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="car-outline" size={45} color={BLUE} />
            <Text style={styles.emptyTitle}>No encontramos viajes</Text>
            <Text style={styles.emptyText}>
              Intenta cambiar el origen, el destino o la fecha.
            </Text>
            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setOrigen('Aguascalientes');
                setDestino('Querétaro');
                setFecha(new Date());
                setBusquedaRealizada(false);
                setFiltro('Todos');
              }}
            >
              <Text style={styles.clearText}>Limpiar búsqueda</Text>
            </Pressable>
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
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 42,
    fontSize: 21,
    fontWeight: '800',
    color: NAVY,
  },
  searchForm: {
    gap: 9,
    marginBottom: 12,
  },
  inputContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5EDF5',
    paddingHorizontal: 11,
  },
  input: {
    flex: 1,
    color: BLUE,
    fontSize: 14,
    paddingLeft: 8,
    paddingVertical: 7,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 1.2,
  },
  timeInput: {
    flex: 0.8,
  },
  searchButton: {
    height: 43,
    backgroundColor: GREEN,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  filters: {
    gap: 7,
    paddingBottom: 12,
  },
  filterButton: {
    backgroundColor: '#E9EDF2',
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  activeFilter: {
    backgroundColor: GREEN,
  },
  filterText: {
    color: '#5F6F89',
    fontSize: 12,
    fontWeight: '700',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8EFF5',
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: '#E5EDF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    color: NAVY,
    fontSize: 17,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  rating: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '700',
  },
  carName: {
    color: BLUE,
    fontSize: 12,
    marginTop: 5,
  },
  carImage: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTime: {
    flex: 1,
  },
  timeText: {
    color: BLUE,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  seatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatsText: {
    color: BLUE,
    fontSize: 10,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginLeft: 5,
  },
  price: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
  },
  priceLabel: {
    color: BLUE,
    fontSize: 9,
  },
  reserveButton: {
    marginTop: 11,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: '#EDF1F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  reserveText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    color: BLUE,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
}); 