import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "../context/AuthContext";

const PURPLE = "#8B4CF6";
const NAVY = "#192B68";
const MUTED = "#7890B5";
const GREEN = "#00A884";
const BACKGROUND = "#F7F8FF";

const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'CDMX', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export default function HomeScreen() {
  const router = useRouter();
  const { usuario } = useAuth();

  // Estados para Origen y Destino
  const [origen, setOrigen] = useState("Aguascalientes");
  const [destino, setDestino] = useState("Querétaro");
  const [mostrarOrigen, setMostrarOrigen] = useState(false);
  const [mostrarDestino, setMostrarDestino] = useState(false);

  // Estados para Fecha y Hora (Calendario y Reloj)
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Formateadores de texto
  const fechaString = fecha.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const horaString = hora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });

  const buscarViajes = () => {
    router.push({
      pathname: "/trips",
      params: { origen, destino, fecha: fechaString, hora: horaString }
    } as any);
  };

  const publicarViaje = () => {
    router.push("/publish" as any);
  };

  const abrirMisViajes = () => {
    router.push("/myTrips" as any);
  };

  const abrirMensajes = () => {
    router.push("/messages" as any);
  };

  const abrirPerfil = () => {
    router.push("/profile" as any);
  };

  const abrirNotificaciones = () => {
    router.push("/notifications" as any);
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
              <Text style={styles.greeting}>
                Hola, {usuario?.nombre || 'Invitado'}
              </Text>
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
            <Ionicons name="notifications-outline" size={25} color={NAVY} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Tarjeta de búsqueda */}
        <View style={styles.searchCard}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>¿A dónde vas?</Text>

            <Ionicons name="arrow-forward-outline" size={23} color={NAVY} />
          </View>

          {/* Origen */}
          <Pressable
            style={styles.locationField}
            onPress={() => setMostrarOrigen(!mostrarOrigen)}
          >
            <Ionicons name="location-outline" size={23} color={PURPLE} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.fieldCaption}>Origen</Text>
              <Text style={styles.fieldValue}>{origen}</Text>
            </View>

            <Ionicons name="chevron-down" size={18} color={MUTED} />
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

          {/* Destino */}
          <Pressable
            style={styles.locationField}
            onPress={() => setMostrarDestino(!mostrarDestino)}
          >
            <Ionicons name="location-outline" size={23} color={PURPLE} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.fieldCaption}>Destino</Text>
              <Text style={styles.fieldValue}>{destino}</Text>
            </View>

            <Ionicons name="chevron-down" size={18} color={MUTED} />
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

          {/* Fecha y hora con Calendario Nativo */}
          <View style={styles.dateTimeRow}>
            <Pressable
              style={styles.dateField}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={22} color={PURPLE} />

              <View style={styles.dateTimeText}>
                <Text style={styles.fieldCaption}>Fecha</Text>
                <Text style={styles.fieldValue}>{fechaString}</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.timeField}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={22} color={PURPLE} />

              <View style={styles.dateTimeText}>
                <Text style={styles.fieldCaption}>Hora</Text>
                <Text style={styles.fieldValue}>{horaString}</Text>
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
            <Ionicons name="car-sport-outline" size={36} color="#FFFFFF" />

            <Text style={styles.publishTitle}>Publicar viaje</Text>
            <Text style={styles.publishSubtitle}>¿Llevas a alguien?</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionCard,
              styles.myTripsCard,
              pressed && styles.pressed,
            ]}
            onPress={abrirMisViajes}
          >
            <Ionicons name="clipboard-outline" size={36} color={PURPLE} />

            <Text style={styles.myTripsTitle}>Mis viajes</Text>
            <Text style={styles.myTripsSubtitle}>Tus viajes y reservas</Text>
          </Pressable>
        </View>

        {/* Información inferior */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={24} color={GREEN} />

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Viaja acompañado</Text>
            <Text style={styles.infoDescription}>
              Comparte el camino y ahorra juntos.
            </Text>
          </View>
        </View>
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
    paddingTop: 12,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  greetingContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: 21,
    fontWeight: "800",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
  },

  searchCard: {
    backgroundColor: "#F9EAFB",
    borderRadius: 23,
    padding: 13,
    marginBottom: 14,
  },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 12,
  },

  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: "800",
  },

  locationField: {
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
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
    color: "#718CB5",
    fontSize: 13,
    fontWeight: "700",
  },

  dateTimeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 1,
    marginBottom: 10,
  },

  dateField: {
    flex: 1.2,
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  timeField: {
    flex: 0.9,
    minHeight: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  dateTimeText: {
    flex: 1,
    marginLeft: 7,
  },

  searchButton: {
    minHeight: 48,
    backgroundColor: PURPLE,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 1,
  },

  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  quickActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  actionCard: {
    flex: 1,
    minHeight: 135,
    borderRadius: 23,
    paddingHorizontal: 9,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  publishCard: {
    backgroundColor: PURPLE,
  },

  myTripsCard: {
    backgroundColor: "#F0DDFB",
  },

  publishTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
  },

  publishSubtitle: {
    color: "#F4EAFE",
    fontSize: 11,
    marginTop: 5,
    textAlign: "center",
  },

  myTripsTitle: {
    color: "#5630B9",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
  },

  myTripsSubtitle: {
    color: "#866BB6",
    fontSize: 11,
    marginTop: 5,
    textAlign: "center",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  infoTitle: {
    color: NAVY,
    fontSize: 14,
    fontWeight: "800",
  },

  infoDescription: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },

  pressed: {
    opacity: 0.8,
  },
}); 