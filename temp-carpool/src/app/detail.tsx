import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#17265F';
const BLUE = '#7897BD';
const GREEN = '#00A58A';
const BACKGROUND = '#F2F9FD';

export default function DetailScreen() {
  const router = useRouter();
  const [favorito, setFavorito] = useState(false);
  const [reservado, setReservado] = useState(false);

  const reservarAsiento = () => {
    Alert.alert(
      'Confirmar reserva',
      '¿Quieres solicitar un asiento para este viaje?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reservar',
          onPress: () => {
            setReservado(true);
            Alert.alert(
              '¡Solicitud realizada!',
              'Tu solicitud de reserva es una demostración. Todavía no se guarda en una base de datos.',
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <ImageBackground
            source={require('../../assets/images/car-pool-bg.png')}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
            resizeMode="cover"
          >
            <View style={styles.heroActions}>
              <Pressable
                style={styles.roundButton}
                onPress={() => router.back()}
                accessibilityLabel="Regresar"
              >
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color={NAVY}
                />
              </Pressable>

              <Pressable
                style={styles.roundButton}
                onPress={() => setFavorito(!favorito)}
                accessibilityLabel="Agregar a favoritos"
              >
                <Ionicons
                  name={favorito ? 'heart' : 'heart-outline'}
                  size={23}
                  color={favorito ? '#E74C72' : NAVY}
                />
              </Pressable>
            </View>

            <View style={styles.carOverlay}>
              <Ionicons
                name="car-sport"
                size={100}
                color="#17265F"
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.card}>
          <Pressable
            style={styles.driverSection}
            onPress={() =>
              Alert.alert(
                'Conductor',
                'Carlos R. es el conductor de este viaje de demostración.',
              )
            }
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={31} color={NAVY} />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Carlos R.</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#F9B638" />
                <Text style={styles.smallText}>
                  4.8 (24) · Conductor verificado
                </Text>
              </View>

              <Text style={styles.carDescription}>
                Toyota Corolla · Gris · Placa ABC123
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={BLUE}
            />
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.routeSection}>
            <View style={styles.routeIconColumn}>
              <Ionicons name="location" size={22} color={NAVY} />
              <View style={styles.routeLine} />
              <Ionicons name="location" size={22} color={NAVY} />
            </View>

            <View style={styles.routeTextColumn}>
              <Text style={styles.routeCity}>
                Aguascalientes, Ags.
              </Text>

              <View style={styles.routeSpace} />

              <Text style={styles.routeCity}>
                Querétaro, Qro.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.dateRow}>
            <Ionicons name="time-outline" size={22} color={NAVY} />

            <Text style={styles.dateText}>
              Sáb, 25 Oct 2026 · 8:00 a. m. – 11:30 a. m.
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.seatsPriceRow}>
            <View style={styles.seatsInfo}>
              <Ionicons name="person-outline" size={22} color={NAVY} />
              <Text style={styles.seatsText}>3 asientos</Text>
            </View>

            <View style={styles.priceInfo}>
              <Text style={styles.price}>$180</Text>
              <Text style={styles.priceLabel}>por persona</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Sobre el conductor</Text>

          <View style={styles.benefitRow}>
            <View style={styles.benefitIcon}>
              <Ionicons
                name="shield-checkmark"
                size={17}
                color={GREEN}
              />
            </View>
            <Text style={styles.benefitText}>
              Conductor verificado
            </Text>
          </View>

          <View style={styles.benefitRow}>
            <View style={styles.benefitIcon}>
              <Ionicons
                name="thumbs-up"
                size={17}
                color={GREEN}
              />
            </View>
            <Text style={styles.benefitText}>
              Buenas calificaciones
            </Text>
          </View>

          <View style={styles.benefitRow}>
            <View style={styles.benefitIcon}>
              <Ionicons
                name="flash"
                size={17}
                color={GREEN}
              />
            </View>
            <Text style={styles.benefitText}>
              Respuesta rápida
            </Text>
          </View>

          <Pressable
            style={[
              styles.reserveButton,
              reservado && styles.reservedButton,
            ]}
            onPress={reservarAsiento}
          >
            <Text style={styles.reserveButtonText}>
              {reservado ? 'Solicitud realizada' : 'Reservar asiento'}
            </Text>
          </Pressable>

          <Text style={styles.demoNote}>
            Viaje de demostración · Reserva no confirmada
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  hero: {
    height: 190,
    overflow: 'hidden',
    backgroundColor: '#B9E8F8',
  },
  heroImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroImageStyle: {
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingTop: 10,
  },
  roundButton: {
    width: 39,
    height: 39,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    marginTop: 0,
    paddingHorizontal: 13,
    paddingBottom: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: '#E7EEF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  smallText: {
    color: BLUE,
    fontSize: 10,
  },
  carDescription: {
    color: BLUE,
    fontSize: 10,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF1F5',
  },
  routeSection: {
    flexDirection: 'row',
    paddingVertical: 13,
    minHeight: 77,
  },
  routeIconColumn: {
    alignItems: 'center',
    width: 26,
    marginRight: 8,
  },
  routeLine: {
    height: 15,
    width: 2,
    backgroundColor: '#C9D6E7',
  },
  routeTextColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  routeCity: {
    color: '#263E64',
    fontSize: 13,
    fontWeight: '800',
  },
  routeSpace: {
    height: 13,
  },
  dateRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: BLUE,
    fontSize: 10,
    flex: 1,
  },
  seatsPriceRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seatsText: {
    color: '#263E64',
    fontSize: 13,
    fontWeight: '800',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    color: NAVY,
    fontSize: 19,
    fontWeight: '900',
  },
  priceLabel: {
    color: NAVY,
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#263E64',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 9,
  },
  benefitIcon: {
    width: 24,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#E5F8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: '#263E64',
    fontSize: 11,
    fontWeight: '600',
  },
  reserveButton: {
    height: 43,
    borderRadius: 25,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  reservedButton: {
    backgroundColor: '#438E80',
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  demoNote: {
    color: BLUE,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 8,
  },
});