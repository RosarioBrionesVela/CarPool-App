import BottomNavigation from '@/components/BottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#192B68';
const MUTED = '#7890B5';
const PURPLE = '#7C4DFF';
const PURPLE_SOFT = '#E5DDFB';
const GREEN = '#10B65C';
const BACKGROUND = '#FDFBFA';
const BORDER = '#ECECF1';

type Pestana = 'Pasados' | 'Reservados';
type Estado = 'Reservado' | 'Pendiente' | 'Completado';

type MiViaje = {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  asientos: number;
  precio: number;
  estado: Estado;
};

const viajesReservados: MiViaje[] = [
  {
    id: '1',
    origen: 'Aguascalientes',
    destino: 'Querétaro',
    fecha: 'Sáb, 25 Oct 2026 · 8:00 a. m.',
    asientos: 3,
    precio: 180,
    estado: 'Reservado',
  },
  {
    id: '2',
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
    id: '3',
    origen: 'CDMX',
    destino: 'Aguascalientes',
    fecha: 'Vie, 10 Oct 2026 · 7:00 a. m.',
    asientos: 1,
    precio: 220,
    estado: 'Completado',
  },
];

const ESTADO_STYLES: Record<Estado, { bg: string; text: string }> = {
  Reservado: { bg: '#B8F0B0', text: '#1E5A2B' },
  Pendiente: { bg: '#F9E4A8', text: '#6B4E00' },
  Completado: { bg: '#E3E8F2', text: '#4A5A7A' },
};

export default function MyTripsScreen() {
  const router = useRouter();
  const [pestana, setPestana] = useState<Pestana>('Reservados');

  const viajes = pestana === 'Reservados' ? viajesReservados : viajesPasados;

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

        {viajes.length > 0 ? (
          viajes.map((viaje) => {
            const badge = ESTADO_STYLES[viaje.estado];
            return (
              <View key={viaje.id} style={styles.card}>
                <View style={styles.statusIcon}>
                  <Ionicons
                    name={
                      viaje.estado === 'Completado'
                        ? 'checkmark'
                        : 'hourglass-outline'
                    }
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
                    {viaje.asientos}{' '}
                    {viaje.asientos === 1 ? 'asiento' : 'asientos'} · $
                    {viaje.precio}
                  </Text>

                  <View style={styles.cardFooter}>
                    <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {viaje.estado}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => router.push('/detail')}
                      accessibilityRole="link"
                      accessibilityLabel={`Ver detalles del viaje a ${viaje.destino}`}
                    >
                      <Text style={styles.link}>Ver detalles</Text>
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
              Busca un viaje y reserva tu primer asiento.
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
