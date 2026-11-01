import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NAVY = "#192B68";
const MUTED = "#7890B5";
const SKY = "#DDE7FB";
const BACKGROUND = "#FCFBFF";
const BORDER = "#E9E7F3";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Opcion = {
  id: string;
  icono: IconName;
  titulo: string;
};

const opciones: Opcion[] = [
  { id: "configuracion", icono: "settings-outline", titulo: "Configuración" },
  {
    id: "notificaciones",
    icono: "notifications-outline",
    titulo: "Notificaciones",
  },
  { id: "ayuda", icono: "help-circle-outline", titulo: "Ayuda y soporte" },
  {
    id: "terminos",
    icono: "clipboard-outline",
    titulo: "Términos y condiciones",
  },
  {
    id: "privacidad",
    icono: "shield-checkmark-outline",
    titulo: "Política de privacidad",
  },
];

const proximamente: Record<string, { titulo: string; mensaje: string }> = {
  configuracion: {
    titulo: "Configuración",
    mensaje: "Las opciones de configuración estarán disponibles próximamente.",
  },
  ayuda: {
    titulo: "Ayuda y soporte",
    mensaje:
      "Próximamente encontrarás aquí respuestas a tus preguntas y opciones de soporte.",
  },
  terminos: {
    titulo: "Términos y condiciones",
    mensaje: "Aquí podrás consultar los términos de uso de CarPool.",
  },
  privacidad: {
    titulo: "Política de privacidad",
    mensaje: "Aquí podrás consultar cómo cuidamos y usamos tus datos.",
  },
};

/* ---------- Piezas de la ilustración ---------- */

function Triangle({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: width / 2,
        borderRightWidth: width / 2,
        borderBottomWidth: height,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: color,
      }}
    />
  );
}

function Mountain({
  width,
  height,
  color,
  snow,
}: {
  width: number;
  height: number;
  color: string;
  snow?: boolean;
}) {
  const capWidth = width * 0.32;
  const capHeight = height * 0.32;

  return (
    <View style={{ width, height }}>
      <Triangle width={width} height={height} color={color} />

      {snow && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: (width - capWidth) / 2,
          }}
        >
          <Triangle width={capWidth} height={capHeight} color="#F4F2FF" />
        </View>
      )}
    </View>
  );
}

function Tree({
  style,
  height = 40,
  color = "#4FA88F",
}: {
  style?: object;
  height?: number;
  color?: string;
}) {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: height * 0.4,
          height,
          borderRadius: height,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

function HeaderScene() {
  return (
    <View style={styles.scene} pointerEvents="none">
      {/* Cielo en franjas suaves */}
      <View
        style={[
          styles.sky,
          { top: 60, height: 70, backgroundColor: "#EBE4F8" },
        ]}
      />
      <View
        style={[
          styles.sky,
          { top: 110, height: 100, backgroundColor: "#F8E6EF" },
        ]}
      />

      {/* Sol y nube */}
      <View style={styles.sunHalo} />
      <View style={styles.sun} />
      <View style={[styles.cloud, { left: 48, top: 112, width: 52 }]} />
      <View
        style={[styles.cloud, { left: 62, top: 104, width: 30, height: 14 }]}
      />

      {/* Montañas */}
      <View style={{ position: "absolute", bottom: 30, right: -30 }}>
        <Mountain width={120} height={64} color="#C2C4EE" />
      </View>
      <View style={{ position: "absolute", bottom: 30, left: "52%" }}>
        <Mountain width={150} height={88} color="#CFC9F0" />
      </View>
      <View style={{ position: "absolute", bottom: 30, left: "14%" }}>
        <Mountain width={210} height={104} color="#A9A8E6" snow />
      </View>

      {/* Colinas */}
      <View
        style={[
          styles.hill,
          {
            width: 440,
            height: 120,
            left: -90,
            bottom: -80,
            backgroundColor: "#8FD3B0",
          },
        ]}
      />
      <View
        style={[
          styles.hill,
          {
            width: 520,
            height: 120,
            right: -150,
            bottom: -78,
            backgroundColor: "#B9DF78",
          },
        ]}
      />
      <View
        style={[
          styles.hill,
          {
            width: 560,
            height: 90,
            left: -80,
            bottom: -62,
            backgroundColor: "#BFE07E",
          },
        ]}
      />

      {/* Árboles */}
      <Tree style={{ left: 18, bottom: 16 }} height={38} />
      <Tree style={{ left: 40, bottom: 12 }} height={30} color="#58B096" />
      <Tree style={{ right: 36, bottom: 18 }} height={40} />
      <Tree style={{ right: 16, bottom: 14 }} height={30} color="#58B096" />
    </View>
  );
}

function BottomScene() {
  return (
    <View style={styles.bottomScene} pointerEvents="none">
      <View
        style={[
          styles.hill,
          {
            width: 300,
            height: 190,
            left: 120,
            bottom: -70,
            backgroundColor: "#B8DECB",
          },
        ]}
      />
      <View
        style={[
          styles.hill,
          {
            width: 420,
            height: 130,
            left: -120,
            bottom: -60,
            backgroundColor: "#BFE07E",
          },
        ]}
      />
      <View
        style={[
          styles.hill,
          {
            width: 520,
            height: 120,
            right: -170,
            bottom: -70,
            backgroundColor: "#A8D86C",
          },
        ]}
      />
      <View
        style={[
          styles.hill,
          {
            width: 200,
            height: 90,
            left: 40,
            bottom: -50,
            backgroundColor: "#F0E3C6",
          },
        ]}
      />

      <Tree style={{ left: 38, bottom: 22 }} height={48} />
      <Tree style={{ left: 66, bottom: 14 }} height={36} color="#58B096" />
      <Tree style={{ left: 96, bottom: 28 }} height={50} />
      <Tree
        style={{ right: 52, bottom: 14, transform: [{ rotate: "14deg" }] }}
        height={60}
        color="#8CC85A"
      />
      <Tree
        style={{ right: 24, bottom: 10, transform: [{ rotate: "8deg" }] }}
        height={52}
        color="#98CF62"
      />
    </View>
  );
}

/* ---------- Pantalla ---------- */

export default function MenuScreen() {
  const router = useRouter();

  const regresar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile" as any);
    }
  };

  const abrirOpcion = (id: string) => {
    if (id === "notificaciones") {
      router.push("/notifications" as any);
      return;
    }

    const info = proximamente[id];
    if (info) Alert.alert(info.titulo, info.mensaje);
  };

  const cerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que quieres volver a la pantalla de bienvenida?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => router.replace("/"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="dark" />

      <View style={styles.screen}>
        {/* Ilustración inferior (detrás del contenido) */}
        <BottomScene />

        {/* Encabezado con paisaje */}
        <View style={styles.header}>
          <HeaderScene />

          <View style={styles.titleRow}>
            <Pressable
              onPress={regresar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Regresar"
            >
              <Ionicons name="arrow-back" size={30} color={NAVY} />
            </Pressable>

            <Text style={styles.title}>Menú adicional</Text>
          </View>
        </View>

        {/* Opciones */}
        <View style={styles.content}>
          <View style={styles.menuCard}>
            {opciones.map((opcion, index) => (
              <View key={opcion.id}>
                {index > 0 && <View style={styles.separator} />}

                <Pressable
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => abrirOpcion(opcion.id)}
                  accessibilityRole="button"
                  accessibilityLabel={opcion.titulo}
                >
                  <Ionicons name={opcion.icono} size={26} color={NAVY} />
                  <Text style={styles.menuTitle}>{opcion.titulo}</Text>
                  <Ionicons name="chevron-forward" size={20} color={MUTED} />
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.menuCard,
              styles.logoutCard,
              pressed && styles.pressed,
            ]}
            onPress={cerrarSesion}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <View style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={26} color={NAVY} />
              <Text style={styles.menuTitle}>Cerrar sesión</Text>
              <Ionicons name="chevron-forward" size={20} color={MUTED} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SKY,
  },
  screen: {
    flex: 1,
    backgroundColor: BACKGROUND,
    overflow: "hidden",
  },

  /* Encabezado */
  header: {
    height: 200,
    backgroundColor: SKY,
    overflow: "hidden",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  title: {
    color: NAVY,
    fontSize: 24,
    fontWeight: "800",
  },

  /* Ilustración */
  scene: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sky: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  sun: {
    position: "absolute",
    right: "20%",
    top: 62,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FCEBA8",
  },
  sunHalo: {
    position: "absolute",
    right: "20%",
    top: 54,
    width: 50,
    height: 50,
    marginRight: -8,
    borderRadius: 25,
    backgroundColor: "rgba(252,235,168,0.45)",
  },
  cloud: {
    position: "absolute",
    height: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  hill: {
    position: "absolute",
    borderRadius: 400,
  },
  bottomScene: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
    overflow: "hidden",
  },

  /* Contenido */
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 56,
  },
  menuTitle: {
    flex: 1,
    color: NAVY,
    fontSize: 16,
    fontWeight: "800",
  },
  separator: {
    height: 1,
    backgroundColor: "#EEEDF5",
  },
  logoutCard: {
    marginTop: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
