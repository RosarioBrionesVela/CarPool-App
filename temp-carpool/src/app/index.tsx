import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  return (
    <ImageBackground
      source={require('../../assets/images/car-pool-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topSpace} />

          <View
            style={[
              styles.bottomContainer,
              { marginBottom: Math.max(12, height * 0.015) },
            ]}
          >
            <Text style={styles.welcomeTitle}>
              ¡Tu próximo viaje comienza aquí!
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/register')}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                Crear cuenta
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/login')}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>
                Iniciar sesión
              </Text>
            </Pressable>

            {/* Acceso temporal para probar la aplicación */}
            <Pressable
              style={({ pressed }) => [
                styles.guestButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.replace('/home')}
              accessibilityRole="button"
            >
              <Text style={styles.guestButtonText}>
                Explorar la aplicación
              </Text>
            </Pressable>

            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#B9E4FF',
  },

  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 4,
  },

  topSpace: {
    flex: 1,
  },

  bottomContainer: {
    width: '100%',
    gap: 12,
  },

  welcomeTitle: {
    color: '#183957',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 2,
  },

  welcomeDescription: {
    color: '#526D86',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 8,
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: 28,
    backgroundColor: '#00977F',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  secondaryButton: {
    minHeight: 54,
    borderRadius: 28,
    backgroundColor: '#FFFAFF',
    borderWidth: 1.5,
    borderColor: '#B99AE8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#183957',
    fontSize: 16,
    fontWeight: '700',
  },

  guestButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  guestButtonText: {
    color: '#183957',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    paddingVertical: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#B5C6D5',
  },

  activeDot: {
    width: 22,
    backgroundColor: '#00977F',
  },
});