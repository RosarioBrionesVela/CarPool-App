import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ComponentRef, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#8B4CF6";
const NAVY = "#192B68";
const MUTED = "#7890B5";
const BACKGROUND = "#FCFBFF";
const BORDER = "#E9E7F3";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Opcion = {
  id: string;
  icono: IconName;
  titulo: string;
};

type Perfil = {
  nombre: string;
  correo: string;
  telefono: string;
};

const opciones: Opcion[] = [
  { id: "editar", icono: "create-outline", titulo: "Editar perfil" },
  {
    id: "direcciones",
    icono: "lock-closed-outline",
    titulo: "Mis direcciones",
  },
  { id: "pagos", icono: "card-outline", titulo: "Métodos de pago" },
  { id: "seguridad", icono: "shield-checkmark-outline", titulo: "Seguridad" },
  { id: "ayuda", icono: "compass-outline", titulo: "Ayuda y soporte" },
];

const estadisticas = [
  { valor: "4.8", etiqueta: "Calificación" },
  { valor: "12", etiqueta: "Viajes" },
  { valor: "5", etiqueta: "Reseñas" },
];

const proximamente: Record<string, { titulo: string; mensaje: string }> = {
  direcciones: {
    titulo: "Mis direcciones",
    mensaje: "Aquí podrás guardar tus lugares frecuentes de salida y llegada.",
  },
  pagos: {
    titulo: "Métodos de pago",
    mensaje: "Pronto podrás agregar y administrar tus tarjetas.",
  },
  seguridad: {
    titulo: "Seguridad",
    mensaje: "Pronto podrás cambiar tu contraseña y revisar tus sesiones.",
  },
  ayuda: {
    titulo: "Ayuda y soporte",
    mensaje:
      "Próximamente encontrarás aquí respuestas a tus preguntas y opciones de soporte.",
  },
};

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileScreen() {
  const router = useRouter();
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  // Datos guardados (los que se muestran en el encabezado)
  const [perfil, setPerfil] = useState<Perfil>({
    nombre: "Manuela Briones",
    correo: "",
    telefono: "",
  });

  // Copia temporal que se modifica mientras se edita
  const [borrador, setBorrador] = useState<Perfil>(perfil);
  const [editando, setEditando] = useState(false);

  const regresar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/home" as any);
    }
  };

  const abrirEdicion = () => {
    setBorrador(perfil);
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setBorrador(perfil);
    setEditando(false);
  };

  const guardarPerfil = () => {
    const faltantes: string[] = [];

    if (!borrador.nombre.trim()) faltantes.push("nombre completo");
    if (!borrador.correo.trim()) faltantes.push("correo electrónico");
    if (!borrador.telefono.trim()) faltantes.push("teléfono");

    if (faltantes.length > 0) {
      Alert.alert(
        "Campos obligatorios",
        `Todos los campos son obligatorios. Completa: ${faltantes.join(", ")}.`,
      );
      return;
    }

    if (!CORREO_VALIDO.test(borrador.correo.trim())) {
      Alert.alert(
        "Correo no válido",
        "Escribe un correo electrónico válido, por ejemplo tu@correo.com.",
      );
      return;
    }

    setPerfil({
      nombre: borrador.nombre.trim(),
      correo: borrador.correo.trim(),
      telefono: borrador.telefono.trim(),
    });
    setEditando(false);

    Alert.alert(
      "Perfil actualizado",
      "Los cambios se actualizaron en esta pantalla. Más adelante conectaremos el perfil con la base de datos.",
    );
  };

  const abrirOpcion = (id: string) => {
    if (id === "editar") {
      abrirEdicion();
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

  // Mientras se edita, "Editar perfil" se oculta del menú para no duplicarlo
  const opcionesVisibles = opciones.filter(
    (opcion) => !(editando && opcion.id === "editar"),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Encabezado */}
          <View style={styles.topRow}>
            <Pressable
              onPress={regresar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Regresar"
            >
              <Ionicons name="arrow-back" size={30} color={NAVY} />
            </Pressable>

            <Pressable
              onPress={() => router.push("/menu" as any)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Menú adicional"
            >
              <Ionicons name="menu" size={30} color={NAVY} />
            </Pressable>
          </View>

          <View style={styles.identity}>
            {/* Para usar foto: reemplaza este View por un <Image> de expo-image
                con style={styles.avatar} */}
            <View style={styles.avatar}>
              <Ionicons name="person" size={54} color={PURPLE} />
            </View>

            <Text style={styles.name}>{perfil.nombre}</Text>
            <Text style={styles.email}>
              {perfil.correo || "Agrega tu correo electrónico"}
            </Text>
          </View>

          {/* Estadísticas */}
          <View style={styles.statsCard}>
            {estadisticas.map((item, index) => (
              <View key={item.etiqueta} style={styles.statWrapper}>
                {index > 0 && <View style={styles.statDivider} />}

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{item.valor}</Text>
                  <Text style={styles.statLabel}>{item.etiqueta}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Edición de datos (debajo de las estadísticas) */}
          {editando && (
            <View
              style={styles.editCard}
              onLayout={(event) =>
                scrollRef.current?.scrollTo({
                  y: Math.max(event.nativeEvent.layout.y - 12, 0),
                  animated: true,
                })
              }
            >
              <Text style={styles.sectionTitle}>Editar información</Text>

              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                value={borrador.nombre}
                onChangeText={(nombre) =>
                  setBorrador((actual) => ({ ...actual, nombre }))
                }
                placeholder="Tu nombre completo"
                placeholderTextColor="#9AA6BC"
                autoCapitalize="words"
              />

              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                value={borrador.correo}
                onChangeText={(correo) =>
                  setBorrador((actual) => ({ ...actual, correo }))
                }
                placeholder="tu@correo.com"
                placeholderTextColor="#9AA6BC"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                value={borrador.telefono}
                onChangeText={(telefono) =>
                  setBorrador((actual) => ({ ...actual, telefono }))
                }
                placeholder="Tu número de teléfono"
                placeholderTextColor="#9AA6BC"
                keyboardType="phone-pad"
              />

              <Pressable style={styles.saveButton} onPress={guardarPerfil}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={styles.saveButtonText}>Guardar cambios</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={cancelarEdicion}
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          )}

          {/* Opciones */}
          <View style={styles.menuCard}>
            {opcionesVisibles.map((opcion, index) => (
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

          {/* Cerrar sesión */}
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

          <Text style={styles.version}>CarPool · Versión 1.0.0</Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  /* Encabezado */
  topRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  identity: {
    alignItems: "center",
    marginTop: -28,
    marginBottom: 22,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EFE7FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  name: {
    color: NAVY,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  email: {
    color: MUTED,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },

  /* Estadísticas */
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 16,
    marginBottom: 18,
  },
  statWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 44,
    backgroundColor: BORDER,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: NAVY,
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: MUTED,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },

  /* Edición */
  editCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  label: {
    color: NAVY,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 13,
    marginBottom: 7,
  },
  input: {
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E0E6F2",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    color: NAVY,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: PURPLE,
    minHeight: 49,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 22,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  cancelButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  cancelButtonText: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: "800",
  },

  /* Menú */
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
    minHeight: 54,
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
  version: {
    color: "#9AA6BC",
    fontSize: 11,
    textAlign: "center",
    marginTop: 20,
  },
});
