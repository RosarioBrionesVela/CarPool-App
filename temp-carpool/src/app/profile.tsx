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
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#8B4CF6';
const NAVY = '#192B68';
const MUTED = '#7184A5';

export default function ProfileScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('Manuela Briones');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editando, setEditando] = useState(false);

  const guardarPerfil = () => {
    if (!nombre.trim()) {
      Alert.alert('Nombre obligatorio', 'Escribe tu nombre completo.');
      return;
    }

    setEditando(false);

    Alert.alert(
      'Perfil actualizado',
      'Los cambios se actualizaron en esta pantalla. Más adelante conectaremos el perfil con la base de datos.',
    );
  };

  const abrirOpcion = (opcion: string) => {
    switch (opcion) {
      case 'viajes':
        router.push('/trips');
        break;

      case 'publicar':
        router.push('/publish');
        break;

      case 'mensajes':
        router.push('/messages');
        break;

      case 'configuracion':
        Alert.alert(
          'Configuración',
          'Las opciones de configuración estarán disponibles próximamente.',
        );
        break;

      case 'ayuda':
        Alert.alert(
          'Centro de ayuda',
          'Próximamente encontrarás aquí respuestas a tus preguntas y opciones de soporte.',
        );
        break;
    }
  };

  const cerrarSesion = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres volver a la pantalla de bienvenida?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mi perfil</Text>
            <Text style={styles.subtitle}>
              Administra tu información personal.
            </Text>
          </View>

          <Pressable
            style={styles.settingsButton}
            onPress={() => abrirOpcion('configuracion')}
            accessibilityRole="button"
            accessibilityLabel="Configuración"
          >
            <Ionicons name="settings-outline" size={23} color={NAVY} />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={PURPLE} />
            </View>

            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={15} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.profileName}>{nombre}</Text>
          <Text style={styles.profileEmail}>
            {correo || 'Agrega tu correo electrónico'}
          </Text>

          <View style={styles.memberBadge}>
            <Ionicons name="car-outline" size={16} color={PURPLE} />
            <Text style={styles.memberBadgeText}>Miembro de CarPool</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setEditando((actual) => !actual)}
          >
            <Ionicons
              name={editando ? 'close-outline' : 'create-outline'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.editButtonText}>
              {editando ? 'Cancelar edición' : 'Editar perfil'}
            </Text>
          </Pressable>
        </View>

        {editando && (
          <View style={styles.editCard}>
            <Text style={styles.sectionTitle}>Editar información</Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Tu nombre completo"
              placeholderTextColor="#9AA6BC"
              autoCapitalize="words"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="tu@correo.com"
              placeholderTextColor="#9AA6BC"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Tu número de teléfono"
              placeholderTextColor="#9AA6BC"
              keyboardType="phone-pad"
            />

            <Pressable
              style={styles.saveButton}
              onPress={guardarPerfil}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name="car-outline" size={23} color={PURPLE} />
            </View>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Viajes</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name="star-outline" size={23} color={PURPLE} />
            </View>
            <Text style={styles.statNumber}>—</Text>
            <Text style={styles.statLabel}>Calificación</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name="people-outline" size={23} color={PURPLE} />
            </View>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reservas</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Mi actividad</Text>

        <View style={styles.menuCard}>
          <MenuItem
            icon="car-outline"
            title="Buscar viajes"
            subtitle="Encuentra un viaje para tu destino"
            onPress={() => abrirOpcion('viajes')}
          />

          <View style={styles.separator} />

          <MenuItem
            icon="add-circle-outline"
            title="Publicar un viaje"
            subtitle="Comparte tus asientos disponibles"
            onPress={() => abrirOpcion('publicar')}
          />

          <View style={styles.separator} />

          <MenuItem
            icon="chatbubble-ellipses-outline"
            title="Mis mensajes"
            subtitle="Habla con otros viajeros"
            onPress={() => abrirOpcion('mensajes')}
          />
        </View>

        <Text style={styles.sectionHeading}>Cuenta y soporte</Text>

        <View style={styles.menuCard}>
          <MenuItem
            icon="settings-outline"
            title="Configuración"
            subtitle="Preferencias de tu cuenta"
            onPress={() => abrirOpcion('configuracion')}
          />

          <View style={styles.separator} />

          <MenuItem
            icon="help-circle-outline"
            title="Ayuda y soporte"
            subtitle="Resuelve tus dudas"
            onPress={() => abrirOpcion('ayuda')}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
          onPress={cerrarSesion}
        >
          <Ionicons name="log-out-outline" size={21} color="#E65365" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.version}>CarPool · Versión 1.0.0</Text>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

type MenuItemProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
  onPress: () => void;
};

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={23} color={PURPLE} />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={19} color={MUTED} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FF',
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  title: {
    color: NAVY,
    fontSize: 27,
    fontWeight: '800',
  },

  subtitle: {
    color: MUTED,
    fontSize: 13,
    marginTop: 5,
  },

  settingsButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEEF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    padding: 24,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#EFE7FF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifiedBadge: {
    position: 'absolute',
    right: 1,
    bottom: 2,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#00A884',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileName: {
    color: NAVY,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },

  profileEmail: {
    color: MUTED,
    fontSize: 13,
    marginTop: 6,
  },

  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE7FF',
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 8,
    gap: 7,
    marginTop: 15,
  },

  memberBadgeText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '700',
  },

  editButton: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 45,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 20,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  editCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },

  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  label: {
    color: NAVY,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 13,
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E0E6F2',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    color: NAVY,
    fontSize: 14,
  },

  saveButton: {
    backgroundColor: PURPLE,
    minHeight: 49,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 20,
    marginTop: 17,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#EFE7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  statNumber: {
    color: NAVY,
    fontSize: 19,
    fontWeight: '800',
  },

  statLabel: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 70,
    backgroundColor: '#ECEEF6',
  },

  sectionHeading: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 12,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  menuIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#EFE7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    color: NAVY,
    fontSize: 14,
    fontWeight: '800',
  },

  menuSubtitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 5,
  },

  separator: {
    height: 1,
    backgroundColor: '#F0F1F7',
    marginLeft: 56,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    minHeight: 52,
    borderRadius: 17,
    backgroundColor: '#FFF0F1',
    marginTop: 25,
  },

  logoutText: {
    color: '#E65365',
    fontSize: 14,
    fontWeight: '800',
  },

  pressed: {
    opacity: 0.75,
  },

  version: {
    color: '#9AA6BC',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },

  bottomSpace: {
    height: 15,
  },
});