import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (!nombreLimpio || !correoLimpio || !password.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Completa tu nombre, correo electrónico y contraseña.',
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      Alert.alert(
        'Correo no válido',
        'Escribe una dirección de correo electrónico válida.',
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Contraseña demasiado corta',
        'Tu contraseña debe tener al menos 8 caracteres.',
      );
      return;
    }

    // Registro de prueba: todavía no guarda la cuenta en un servidor.
    Alert.alert(
      '¡Bienvenida a CarPool!',
      `Hola, ${nombreLimpio}. Tu formulario está completo. Puedes comenzar a explorar la aplicación.`,
      [
        {
          text: 'Ir a Inicio',
          onPress: () => router.replace('/home'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Volver"
            >
              <Text style={styles.backText}>‹</Text>
            </Pressable>

            <View style={styles.settingsDecoration}>
              <Text style={styles.settingsText}>⚙</Text>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.logo}>CarPool</Text>

            <Text style={styles.title}>¡Únete a CarPool!</Text>

            <Text style={styles.subtitle}>
              Crea tu cuenta y comparte el camino.
            </Text>

            <View style={styles.decoration}>
              <Text style={styles.decorationGreen}>●</Text>
              <Text style={styles.decorationPink}>●</Text>
              <Text style={styles.decorationOrange}>●</Text>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nombre completo</Text>

            <TextInput
              style={styles.input}
              placeholder="Tu nombre completo"
              placeholderTextColor="#929FB5"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              accessibilityLabel="Nombre completo"
            />

            <Text style={styles.label}>Correo electrónico</Text>

            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#929FB5"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              accessibilityLabel="Correo electrónico"
            />

            <Text style={styles.label}>Contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#929FB5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              returnKeyType="done"
              accessibilityLabel="Contraseña"
            />

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleRegister}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Crear cuenta</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                ¿Ya tienes una cuenta?{' '}
              </Text>

              <Pressable
                onPress={() => router.push('/login')}
                accessibilityRole="link"
              >
                <Text style={styles.link}>Inicia sesión</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.exploreButton}
              onPress={() => router.replace('/home')}
              accessibilityRole="button"
            >
              <Text style={styles.exploreText}>
                Explorar sin registrarme
              </Text>
            </Pressable>
          </View>

          <View style={styles.bottomDecoration}>
            <View style={styles.bottomLine} />
            <View style={styles.bottomCircle} />
            <View style={styles.bottomLine} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 22,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 54,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backText: {
    color: '#142B57',
    fontSize: 40,
    lineHeight: 44,
  },

  settingsDecoration: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingsText: {
    color: '#7D8799',
    fontSize: 25,
  },

  header: {
    marginTop: 24,
    marginBottom: 28,
    position: 'relative',
  },

  logo: {
    color: '#00A884',
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 54,
  },

  title: {
    color: '#142B57',
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 40,
  },

  subtitle: {
    color: '#667791',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },

  decoration: {
    position: 'absolute',
    right: 2,
    top: 0,
    flexDirection: 'row',
    gap: 4,
    transform: [{ rotate: '-25deg' }],
  },

  decorationGreen: {
    color: '#00A884',
    fontSize: 13,
  },

  decorationPink: {
    color: '#F5A4C7',
    fontSize: 13,
  },

  decorationOrange: {
    color: '#F6C66B',
    fontSize: 13,
  },

  form: {
    gap: 10,
  },

  label: {
    color: '#263653',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 2,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DFE6F2',
    borderRadius: 18,
    minHeight: 62,
    paddingHorizontal: 18,
    color: '#142B57',
    fontSize: 16,
  },

  primaryButton: {
    backgroundColor: '#00A884',
    borderRadius: 32,
    minHeight: 62,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 2,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 24,
  },

  footerText: {
    color: '#667791',
    fontSize: 15,
  },

  link: {
    color: '#00A884',
    fontWeight: '700',
    fontSize: 15,
  },

  exploreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  exploreText: {
    color: '#526D86',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  bottomDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 24,
    paddingBottom: 8,
  },

  bottomLine: {
    height: 3,
    width: 20,
    borderRadius: 2,
    backgroundColor: '#DCE4F1',
  },

  bottomCircle: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#00A884',
  },
});