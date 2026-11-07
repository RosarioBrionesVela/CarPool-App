import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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

export default function LoginScreen() {
  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = () => {
    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !password.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Ingresa tu correo electrónico y contraseña.',
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      Alert.alert(
        'Correo no válido',
        'Ingresa una dirección de correo electrónico válida.',
      );
      return;
    }

    // Acceso de demostración: todavía no verifica credenciales en un servidor.
    router.replace('/home');
  };

  const handleGoogle = () => {
    Alert.alert(
      'Acceso con Google',
      'El acceso con Google necesita configurar la autenticación de Google. Mientras tanto, puedes entrar con el formulario o explorar la aplicación.',
      [
        {
          text: 'Explorar aplicación',
          onPress: () => router.replace('/home'),
        },
        {
          text: 'Cerrar',
          style: 'cancel',
        },
      ],
    );
  };

  const handleApple = () => {
    Alert.alert(
      'Acceso con Apple',
      'El acceso con Apple necesita configurar la autenticación de Apple. Mientras tanto, puedes entrar con el formulario o explorar la aplicación.',
      [
        {
          text: 'Explorar aplicación',
          onPress: () => router.replace('/home'),
        },
        {
          text: 'Cerrar',
          style: 'cancel',
        },
      ],
    );
  };

  const handleForgotPassword = () => {
    if (!correo.trim()) {
      Alert.alert(
        'Recuperar contraseña',
        'Escribe tu correo electrónico en el campo de arriba para continuar.',
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      Alert.alert(
        'Correo no válido',
        'Escribe una dirección de correo electrónico válida.',
      );
      return;
    }

    Alert.alert(
      'Correo registrado',
      `El correo ${correo.trim()} es válido. Para enviar un enlace de recuperación real, será necesario conectar el servicio de autenticación.`,
      [{ text: 'Entendido' }],
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
              accessibilityLabel="Regresar"
            >
              <Ionicons
                name="chevron-back"
                size={27}
                color="#142B57"
              />
            </Pressable>

            <View style={styles.topDecoration}>
              <View style={styles.decorGreen} />
              <View style={styles.decorPink} />
              <View style={styles.decorOrange} />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.brand}>CarPool</Text>

            <Text style={styles.title}>¡Hola de nuevo!</Text>

            <Text style={styles.subtitle}>
              Inicia sesión para continuar tu camino.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Correo electrónico</Text>

            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor="#91A0B7"
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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#91A0B7"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                autoComplete="current-password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                accessibilityLabel="Contraseña"
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setMostrarPassword((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={
                  mostrarPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                <Ionicons
                  name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#526782"
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.forgotButton}
              onPress={handleForgotPassword}
              accessibilityRole="button"
            >
              <Text style={styles.forgotText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleLogin}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>
                Iniciar sesión
              </Text>
            </Pressable>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>o continúa con</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleGoogle}
                accessibilityRole="button"
                accessibilityLabel="Continuar con Google"
              >
                <AntDesign
                  name="google"
                  size={21}
                  color="#4285F4"
                />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleApple}
                accessibilityRole="button"
                accessibilityLabel="Continuar con Apple"
              >
                <Ionicons
                  name="logo-apple"
                  size={23}
                  color="#000000"
                />
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                ¿No tienes una cuenta?{' '}
              </Text>

              <Pressable
                onPress={() => router.push('/register')}
                accessibilityRole="link"
              >
                <Text style={styles.registerLink}>Regístrate</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.guestButton}
              onPress={() => router.replace('/home')}
              accessibilityRole="button"
            >
              <Text style={styles.guestText}>
                Explorar sin iniciar sesión
              </Text>
            </Pressable>
          </View>

          <View style={styles.bottomDecoration}>
            <View style={styles.waveGreen} />
            <View style={styles.waveBlue} />
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
    paddingTop: 8,
    paddingBottom: 16,
  },

  topBar: {
    minHeight: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  topDecoration: {
    width: 28,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
    transform: [{ rotate: '35deg' }],
    marginRight: 8,
  },

  decorGreen: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#00A884',
  },

  decorPink: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F5A4C7',
    marginTop: 10,
  },

  decorOrange: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F6C66B',
    marginTop: 17,
  },

  header: {
    marginTop: 28,
    marginBottom: 28,
  },

  brand: {
    color: '#00A884',
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 20,
  },

  title: {
    color: '#142B57',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 39,
  },

  subtitle: {
    color: '#667791',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },

  form: {
    gap: 9,
  },

  label: {
    color: '#263653',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 1,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E6F0',
    borderRadius: 13,
    minHeight: 48,
    paddingHorizontal: 14,
    color: '#142B57',
    fontSize: 14,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E6F0',
    borderRadius: 13,
    minHeight: 48,
  },

  passwordInput: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 14,
    color: '#142B57',
    fontSize: 14,
  },

  eyeButton: {
    width: 43,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgotButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
  },

  forgotText: {
    color: '#7856E8',
    fontWeight: '600',
    fontSize: 12,
  },

  primaryButton: {
    backgroundColor: '#009B7D',
    borderRadius: 26,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.78,
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 6,
    marginBottom: 2,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E6F0',
  },

  separatorText: {
    color: '#8A98AD',
    fontSize: 11,
  },

  socialContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  socialButton: {
    flex: 1,
    minHeight: 43,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E6F0',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  socialText: {
    color: '#263653',
    fontSize: 13,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 13,
  },

  footerText: {
    color: '#667791',
    fontSize: 12,
  },

  registerLink: {
    color: '#009B7D',
    fontWeight: '700',
    fontSize: 12,
  },

  guestButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  guestText: {
    color: '#526D86',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  bottomDecoration: {
    height: 42,
    marginTop: 24,
    marginHorizontal: -24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  waveGreen: {
    position: 'absolute',
    bottom: -24,
    left: -30,
    width: '115%',
    height: 55,
    backgroundColor: '#C5F0DD',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 65,
    transform: [{ rotate: '-3deg' }],
  },

  waveBlue: {
    position: 'absolute',
    bottom: -35,
    right: -30,
    width: '90%',
    height: 55,
    backgroundColor: '#C5EDFA',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 90,
    transform: [{ rotate: '5deg' }],
  },
});