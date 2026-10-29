import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#8B4CF6';
const NAVY = '#192B68';
const MUTED = '#7890B5';
const GREEN = '#00A884';
const BACKGROUND = '#F7F8FF';

export default function HomeScreen() {
  const router = useRouter();

  const [origen] = useState('Aguascalientes, Ags.');
  const [destino] = useState('Querétaro, Qro.');
  const [fecha] = useState('Sáb, 31 Oct 2026');
  const [hora] = useState('8:00 a.m.');

  const buscarViajes = () => {
    router.push('/trips' as any);
  };

  const publicarViaje = () => {
    router.push('/publish' as any);
  };

  const abrirMisViajes = () => {
    router.push('/trips' as any);
  };

  const abrirMensajes = () => {
    router.push('/messages' as any);
  };

  const abrirPerfil = () => {
    router.push('/profile' as any);
  };

  const abrirNotificaciones = () => {
    Alert.alert(
      'Notificaciones',
      'Aquí aparecerán tus avisos de viajes y reservaciones.',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={27} color="#FFFFFF" />
            </View>

            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Hola, Mariana</Text>
              <Text style={styles.welcomeSubtitle}>
                ¿Lista para tu próximo viaje?
              </Text>
            </View>
          </View>

          <Pressable
            onPress={abrirNotificaciones}
            style={({ pressed }) => [
              styles.notificationButton,
              pressed && styles.pressed,
            ]}
            accessibilityLabel="Abrir notificaciones"
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              color={NAVY}
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Tarjeta de búsqueda */}
        <View style={styles.searchCard}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>¿A dónde vas?</Text>

            <Ionicons
              name="arrow-forward-outline"
              size={23}
              color={NAVY}
            />
          </View>

          {/* Origen */}
          <Pressable
            style={styles.locationField}
            onPress={() =>
              Alert.alert(
                'Origen',
                'Después agregaremos la selección de ubicación.',
              )
            }
          >
            <Ionicons
              name="location-outline"
              size={23}
              color={PURPLE}
            />

            <View style={styles.locationTextContainer}>
              <Text style={styles.fieldCaption}>Origen</Text>
              <Text style={styles.fieldValue}>{origen}</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={MUTED}
            />
          </Pressable>

          {/* Destino */}
          <Pressable
            style={styles.locationField}
            onPress={() =>
              Alert.alert(
                'Destino',
                'Después agregaremos la selección de destino.',
              )
            }
          >
            <Ionicons
              name="location-outline"
              size={23}
              color={PURPLE}
            />

            <View style={styles.locationTextContainer}>
              <Text style={styles.fieldCaption}>Destino</Text>
              <Text style={styles.fieldValue}>{destino}</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={MUTED}
            />
          </Pressable>

          {/* Fecha y hora */}
          <View style={styles.dateTimeRow}>
            <Pressable
              style={styles.dateField}
              onPress={() =>
                Alert.alert(
                  'Fecha del viaje',
                  'Después agregaremos el calendario para seleccionar la fecha.',
                )
              }
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color={PURPLE}
              />

              <View style={styles.dateTimeText}>
                <Text style={styles.fieldCaption}>Fecha</Text>
                <Text style={styles.fieldValue}>{fecha}</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.timeField}
              onPress={() =>
                Alert.alert(
                  'Hora del viaje',
                  'Después agregaremos el selector de hora.',
                )
              }
            >
              <Ionicons
                name="time-outline"
                size={22}
                color={PURPLE}
              />

              <View style={styles.dateTimeText}>
                <Text style={styles.fieldCaption}>Hora</Text>
                <Text style={styles.fieldValue}>{hora}</Text>
              </View>
            </Pressable>
          </View>

          {/* Buscar viajes */}
          <Pressable
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.pressed,
            ]}
            onPress={buscarViajes}
          >
            <Ionicons name="car-outline" size={23} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Buscar viajes</Text>
          </Pressable>
        </View>

        {/* Accesos rápidos */}
        <View style={styles.quickActions}>
          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              styles.publishCard,
              pressed && styles.pressed,
            ]}
            onPress={publicarViaje}
          >
            <Ionicons
              name="car-sport-outline"
              size={36}
              color="#FFFFFF"
            />

            <Text style={styles.publishTitle}>Publicar viaje</Text>
            <Text style={styles.publishSubtitle}>
              ¿Llevas a alguien?
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              styles.myTripsCard,
              pressed && styles.pressed,
            ]}
            onPress={abrirMisViajes}
          >
            <Ionicons
              name="clipboard-outline"
              size={36}
              color={PURPLE}
            />

            <Text style={styles.myTripsTitle}>Mis viajes</Text>
            <Text style={styles.myTripsSubtitle}>
              Tus viajes y reservas
            </Text>
          </Pressable>
        </View>

        {/* Información inferior */}
        <View style={styles.infoCard}>
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color={GREEN}
          />

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>
              Viaja acompañado
            </Text>
            <Text style={styles.infoDescription}>
              Comparte el camino y ahorra juntos.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Navegación inferior */}
      <View style={styles.bottomNavigation}>
        <Pressable style={styles.navItem} onPress={() => {}}>
          <Ionicons name="home" size={24} color={NAVY} />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>
            Inicio
          </Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={buscarViajes}>
          <Ionicons
            name="location-outline"
            size={24}
            color={MUTED}
          />
          <Text style={styles.navLabel}>Viajes</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={publicarViaje}>
          <Ionicons
            name="add-circle-outline"
            size={25}
            color={MUTED}
          />
          <Text style={styles.navLabel}>Publicar</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={abrirMensajes}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={MUTED}
          />
          <Text style={styles.navLabel}>Mensajes</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={abrirPerfil}>
          <Ionicons
            name="person-outline"
            size={24}
            color={MUTED}
          />
          <Text style={styles.navLabel}>Perfil</Text>
        </Pressable>
      </View>
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
    paddingTop: 12,
    paddingBottom: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  greetingContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: 21,
    fontWeight: '800',
    color: NAVY,
  },

  welcomeSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 3,
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
  },

  searchCard: {
    backgroundColor: '#F9EAFB',
    borderRadius: 23,
    padding: 13,
    marginBottom: 14,
  },

  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 12,
  },

  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
  },

  locationField: {
    minHeight: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },

  fieldCaption: {
    color: MUTED,
    fontSize: 12,
    marginBottom: 3,
  },

  fieldValue: {
    color: '#718CB5',
    fontSize: 13,
    fontWeight: '700',
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 1,
    marginBottom: 10,
  },

  dateField: {
    flex: 1.2,
    minHeight: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeField: {
    flex: 0.9,
    minHeight: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateTimeText: {
    flex: 1,
    marginLeft: 7,
  },

  searchButton: {
    minHeight: 48,
    backgroundColor: PURPLE,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 1,
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  actionCard: {
    flex: 1,
    minHeight: 135,
    borderRadius: 23,
    paddingHorizontal: 9,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  publishCard: {
    backgroundColor: PURPLE,
  },

  myTripsCard: {
    backgroundColor: '#F0DDFB',
  },

  publishTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },

  publishSubtitle: {
    color: '#F4EAFE',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },

  myTripsTitle: {
    color: '#5630B9',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },

  myTripsSubtitle: {
    color: '#866BB6',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  infoTitle: {
    color: NAVY,
    fontSize: 14,
    fontWeight: '800',
  },

  infoDescription: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },

  bottomNavigation: {
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDF0F7',
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  navLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '600',
  },

  activeNavLabel: {
    color: NAVY,
    fontWeight: '800',
  },

  pressed: {
    opacity: 0.8,
  },
});
