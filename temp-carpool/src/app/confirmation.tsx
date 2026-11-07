import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#17265F';
const PURPLE = '#8056C2';
const GREEN = '#00B96B';
const BLUE = '#7897BD';
const BACKGROUND = '#FFF9FC';

const CONFETTI_WIDTH = 300;

type Rayita = {
  color: string;
  x: number; // posición desde la izquierda (lado izquierdo)
  y: number;
  w: number;
  h: number;
  rotate: number; // grados
};

// Rayitas del lado izquierdo; el derecho es el reflejo.
const rayitasIzquierda: Rayita[] = [
  { color: '#3C9C7B', x: 50, y: 2, w: 6, h: 24, rotate: -35 },
  { color: '#E95E91', x: 88, y: 14, w: 5, h: 14, rotate: -30 },
  { color: '#5785D8', x: 6, y: 44, w: 6, h: 30, rotate: -72 },
  { color: '#F2A08A', x: 62, y: 60, w: 6, h: 14, rotate: -80 },
  { color: '#3C9C7B', x: 24, y: 94, w: 6, h: 26, rotate: 60 },
  { color: '#EEF56E', x: 84, y: 98, w: 5, h: 15, rotate: 40 },
];

const rayitasDerecha: Rayita[] = rayitasIzquierda.map((r) => ({
  ...r,
  x: CONFETTI_WIDTH - r.x - r.w,
  rotate: -r.rotate,
}));

const rayitas = [...rayitasIzquierda, ...rayitasDerecha];

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Colinas decorativas del fondo */}
      <View style={styles.hills} pointerEvents="none">
        <View style={[styles.hill, styles.hillSky]} />
        <View style={[styles.hill, styles.hillYellow]} />
        <View style={[styles.hill, styles.hillMint]} />
        <View style={[styles.hill, styles.hillGreen]} />
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Icono de confirmación */}
          <View style={styles.successContainer}>
            {rayitas.map((r, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: r.x,
                  top: r.y,
                  width: r.w,
                  height: r.h,
                  borderRadius: r.w,
                  backgroundColor: r.color,
                  transform: [{ rotate: `${r.rotate}deg` }],
                }}
              />
            ))}

            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={62} color="#FFFFFF" />
            </View>
          </View>

          {/* Mensaje */}
          <Text style={styles.title}>¡Reserva confirmada!</Text>

          <Text style={styles.description}>
            Tu asiento ha sido reservado
            {'\n'}con éxito.
          </Text>

          {/* Tarjeta del conductor */}
          <Pressable
            style={styles.driverCard}
            onPress={() => router.push('/detail')}
            accessibilityRole="button"
            accessibilityLabel="Ver detalles del viaje con Carlos R."
          >
            {/* Para usar foto: importa Image de 'expo-image' y reemplaza este
                View por <Image source={require('../../assets/images/carlos.png')}
                style={styles.avatar} /> */}
            <View style={styles.avatar}>
              <Ionicons name="person" size={30} color={NAVY} />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Carlos R.</Text>
              <Text style={styles.vehicle}>Toyota Corolla · Gris</Text>
              <Text style={styles.date}>Sáb, 25 Oct 2026 · 8:00 a. m.</Text>
            </View>

            <Ionicons name="chevron-forward" size={23} color="#D4DFE8" />
          </Pressable>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push('/detail')}
            >
              <Text style={styles.primaryButtonText}>
                Ver detalles del viaje
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.replace('/myTrips')}
            >
              <Text style={styles.secondaryButtonText}>Ir a mis viajes</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 22,
  },

  /* Colinas */
  hills: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
    overflow: 'hidden',
  },
  hill: {
    position: 'absolute',
    borderRadius: 400,
  },
  hillSky: {
    width: 520,
    height: 300,
    right: -150,
    bottom: -170,
    backgroundColor: '#D6EEFA',
  },
  hillYellow: {
    width: 380,
    height: 240,
    left: -140,
    bottom: -150,
    backgroundColor: '#E6F0A6',
  },
  hillMint: {
    width: 460,
    height: 220,
    left: -60,
    bottom: -150,
    backgroundColor: '#A9DEC4',
  },
  hillGreen: {
    width: 520,
    height: 200,
    left: 90,
    bottom: -140,
    backgroundColor: '#7CCBAA',
  },

  /* Icono y confeti */
  successContainer: {
    width: CONFETTI_WIDTH,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  successCircle: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Texto */
  title: {
    color: '#078D70',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: BLUE,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },

  /* Tarjeta */
  driverCard: {
    width: '100%',
    minHeight: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#F2E7F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 55,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#E7EEF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
    gap: 4,
  },
  driverName: {
    color: '#365C80',
    fontSize: 17,
    fontWeight: '800',
  },
  vehicle: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '600',
  },
  date: {
    color: BLUE,
    fontSize: 12,
    fontWeight: '600',
  },

  /* Botones */
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  primaryButton: {
    width: '100%',
    minHeight: 55,
    borderRadius: 30,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '800',
  },
});