import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const NAVY = "#192B68";
const MUTED = "#7890B5";

const navigationItems = [
  {
    label: "Inicio",
    route: "/home",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    label: "Viajes",
    route: "/trips",
    icon: "car-outline",
    activeIcon: "car",
  },
  {
    label: "Publicar",
    route: "/publish",
    icon: "add-circle-outline",
    activeIcon: "add-circle",
  },
  {
    label: "Mensajes",
    route: "/messages",
    icon: "chatbubble-outline",
    activeIcon: "chatbubble",
  },
  {
    label: "Perfil",
    route: "/profile",
    icon: "person-outline",
    activeIcon: "person",
  },
] as const;

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {navigationItems.map((item) => {
        const active = pathname === item.route;

        return (
          <Pressable
            key={item.route}
            style={styles.navItem}
            onPress={() => router.navigate(item.route as any)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={24}
              color={active ? NAVY : MUTED}
            />

            <Text style={[styles.navLabel, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 67,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EDF0F7",
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  navLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "600",
  },

  activeLabel: {
    color: NAVY,
    fontWeight: "800",
  },
});
