import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#192B68";
const MUTED = "#7890B5";
const GREEN = "#10B65C";
const PURPLE = "#8B4CF6";
const BACKGROUND = "#FDFBFA";
const BORDER = "#ECECF1";

type Notificacion = {
  id: string;
  titulo: string;
  detalle?: string;
  fecha: string;
  icono: keyof typeof Ionicons.glyphMap;
  colorIcono: string;
  colorGlifo: string;
  ruta: "/myTrips" | "/chat" | "/profile";
  params?: Record<string, string>;
};

const notificaciones: Notificacion[] = [
  {
    id: "1",
    titulo: "Tu reserva ha sido confirmada",
    fecha: "Sáb, 25 Oct 2026 · 7:35 a. m.",
    icono: "checkmark",
    colorIcono: GREEN,
    colorGlifo: "#FFFFFF",
    ruta: "/myTrips",
  },
  {
    id: "2",
    titulo: "Nuevo mensaje de Carlos R.",
    fecha: "Sáb, 25 Oct 2026 · 7:34 a. m.",
    icono: "chatbubble-outline",
    colorIcono: GREEN,
    colorGlifo: "#FFFFFF",
    ruta: "/chat",
    params: { nombre: "Carlos R." },
  },
  {
    id: "3",
    titulo: "Tu viaje ha iniciado",
    fecha: "Sáb, 25 Oct 2026 · 8:00 a. m.",
    icono: "paper-plane",
    colorIcono: PURPLE,
    colorGlifo: "#FFFFFF",
    ruta: "/myTrips",
  },
  {
    id: "4",
    titulo: "Calificación recibida",
    detalle: "Recibiste 5 estrellas",
    fecha: "Vie, 24 Oct 2026 · 6:12 p. m.",
    icono: "star-outline",
    colorIcono: GREEN,
    colorGlifo: "#F9D548",
    ruta: "/profile",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Regresar"
          >
            <Ionicons name="checkmark-circle" size={30} color={GREEN} />
          </Pressable>

          <Text style={styles.title}>Notificaciones</Text>
        </View>

        {notificaciones.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() =>
              router.push({
                pathname: item.ruta,
                params: item.params,
              } as any)
            }
            accessibilityRole="button"
            accessibilityLabel={item.titulo}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: item.colorIcono }]}
            >
              <Ionicons name={item.icono} size={22} color={item.colorGlifo} />
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>

              {item.detalle && (
                <Text style={styles.cardDetail}>{item.detalle}</Text>
              )}

              <Text style={styles.cardDate}>{item.fecha}</Text>
            </View>
          </Pressable>
        ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
  },
  title: {
    color: NAVY,
    fontSize: 26,
    fontWeight: "800",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 22,
    marginBottom: 16,
    gap: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },
  cardDetail: {
    color: MUTED,
    fontSize: 14,
    marginTop: 10,
  },
  cardDate: {
    color: MUTED,
    fontSize: 13.5,
    marginTop: 10,
  },
});
