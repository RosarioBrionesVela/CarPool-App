import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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

const NAVY = '#17265F';
const BLUE = '#7897BD';
const PURPLE = '#8B55F7';
const BACKGROUND = '#FFF9FF';

export default function PublishScreen() {
  const router = useRouter();

  const [tipoUsuario, setTipoUsuario] = useState<'conductor' | 'pasajero'>(
    'conductor',
  );
  const [origen, setOrigen] = useState('Aguascalientes, Ags.');
  const [destino, setDestino] = useState('Querétaro, Qro.');
  const [fecha, setFecha] = useState('Sáb, 25 Oct 2026');
  const [hora, setHora] = useState('8:00 a.m.');
  const [asientos, setAsientos] = useState(3);
  const [costo, setCosto] = useState('180');
  const [vehiculo, setVehiculo] = useState('Toyota Corolla · Gris');

  const seleccionarVehiculo = () => {
    Alert.alert('Seleccionar vehículo', 'Elige tu vehículo', [
      {
        text: 'Toyota Corolla · Gris',
        onPress: () => setVehiculo('Toyota Corolla · Gris'),
      },
      {
        text: 'Honda Civic · Azul',
        onPress: () => setVehiculo('Honda Civic · Azul'),
      },
      {
        text: 'Nissan Versa · Blanco',
        onPress: () => setVehiculo('Nissan Versa · Blanco'),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const publicarViaje = () => {
    if (
      !origen.trim() ||
      !destino.trim() ||
      !fecha.trim() ||
      !hora.trim() ||
      !costo.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa todos los campos antes de publicar.',
      );
      return;
    }

    if (
      origen.trim().toLowerCase() === destino.trim().toLowerCase()
    ) {
      Alert.alert(
        'Ruta incorrecta',
        'El origen y el destino deben ser diferentes.',
      );
      return;
    }

    const precio = Number(costo);

    if (!Number.isFinite(precio) || precio <= 0) {
      Alert.alert(
        'Costo incorrecto',
        'Ingresa un costo por persona mayor que cero.',
      );
      return;
    }

    if (tipoUsuario === 'conductor' && !vehiculo.trim()) {
      Alert.alert(
        'Selecciona un vehículo',
        'Debes elegir el vehículo para tu viaje.',
      );
      return;
    }

    Alert.alert(
      '¡Listo!',
      `Tu viaje de demostración está preparado.\n\nOrigen: ${origen}\nDestino: ${destino}\nFecha: ${fecha}\nHora: ${hora}\nAsientos: ${asientos}\nCosto por persona: $${precio}\nVehículo: ${
        tipoUsuario === 'conductor' ? vehiculo : 'No aplica'
      }\n\nTodavía no se ha guardado en una base de datos.`,
      [
        {
          text: 'Aceptar',
          onPress: () => router.replace('/home'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Publicar viaje</Text>
          </View>

          <View style={styles.headerIllustration}>
            <Ionicons
              name="car-sport"
              size={35}
              color={PURPLE}
            />
            <Ionicons
              name="sparkles"
              size={15}
              color="#E7B5F8"
              style={styles.sparkle}
            />
          </View>
        </View>

        <View style={styles.roleSelector}>
          <Pressable
            style={[
              styles.roleButton,
              tipoUsuario === 'conductor' && styles.activeRoleButton,
            ]}
            onPress={() => setTipoUsuario('conductor')}
          >
            <Text
              style={[
                styles.roleText,
                tipoUsuario === 'conductor' && styles.activeRoleText,
              ]}
            >
              Como conductor
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.roleButton,
              tipoUsuario === 'pasajero' && styles.activeRoleButton,
            ]}
            onPress={() => setTipoUsuario('pasajero')}
          >
            <Text
              style={[
                styles.roleText,
                tipoUsuario === 'pasajero' && styles.activeRoleText,
              ]}
            >
              Como pasajero
            </Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <View style={styles.inputCard}>
            <Ionicons
              name="location-outline"
              size={18}
              color={NAVY}
            />

            <View style={styles.inputContent}>
              <Text style={styles.fieldLabel}>Origen</Text>
              <TextInput
                style={styles.input}
                value={origen}
                onChangeText={setOrigen}
                placeholder="¿De dónde sales?"
                placeholderTextColor={BLUE}
              />
            </View>
          </View>

          <View style={styles.inputCard}>
            <Ionicons
              name="location-outline"
              size={18}
              color={NAVY}
            />

            <View style={styles.inputContent}>
              <Text style={styles.fieldLabel}>Destino</Text>
              <TextInput
                style={styles.input}
                value={destino}
                onChangeText={setDestino}
                placeholder="¿A dónde vas?"
                placeholderTextColor={BLUE}
              />
            </View>
          </View>

          <View style={styles.dateTimeRow}>
            <View style={[styles.inputCard, styles.dateCard]}>
              <Ionicons
                name="calendar-outline"
                size={17}
                color={NAVY}
              />

              <View style={styles.inputContent}>
                <Text style={styles.fieldLabel}>Fecha</Text>
                <TextInput
                  style={styles.input}
                  value={fecha}
                  onChangeText={setFecha}
                  placeholder="Fecha del viaje"
                  placeholderTextColor={BLUE}
                />
              </View>
            </View>

            <View style={[styles.inputCard, styles.timeCard]}>
              <Ionicons
                name="time-outline"
                size={18}
                color={NAVY}
              />

              <View style={styles.inputContent}>
                <Text style={styles.fieldLabel}>Hora</Text>
                <TextInput
                  style={styles.input}
                  value={hora}
                  onChangeText={setHora}
                  placeholder="Hora"
                  placeholderTextColor={BLUE}
                />
              </View>
            </View>
          </View>

          <Text style={styles.sectionLabel}>
            Asientos disponibles
          </Text>

          <View style={styles.seatControls}>
            <Pressable
              style={styles.seatButton}
              onPress={() => setAsientos(Math.max(1, asientos - 1))}
              accessibilityLabel="Disminuir asientos"
            >
              <Ionicons
                name="remove"
                size={20}
                color={NAVY}
              />
            </Pressable>

            <View style={styles.seatCountBox}>
              <Text style={styles.seatCount}>{asientos}</Text>
            </View>

            <Pressable
              style={styles.seatButton}
              onPress={() => setAsientos(Math.min(8, asientos + 1))}
              accessibilityLabel="Aumentar asientos"
            >
              <Ionicons
                name="add"
                size={20}
                color={NAVY}
              />
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>
            Costo por persona
          </Text>

          <View style={styles.simpleInputCard}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.costInput}
              value={costo}
              onChangeText={setCosto}
              placeholder="180"
              placeholderTextColor={BLUE}
              keyboardType="decimal-pad"
            />
          </View>

          {tipoUsuario === 'conductor' && (
            <>
              <Text style={styles.sectionLabel}>Vehículo</Text>

              <Pressable
                style={styles.vehicleSelector}
                onPress={seleccionarVehiculo}
              >
                <Text
                  style={styles.vehicleText}
                  numberOfLines={1}
                >
                  {vehiculo}
                </Text>

                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={BLUE}
                />
              </Pressable>
            </>
          )}

          {tipoUsuario === 'pasajero' && (
            <View style={styles.passengerInfo}>
              <Ionicons
                name="information-circle-outline"
                size={19}
                color={PURPLE}
              />
              <Text style={styles.passengerInfoText}>
                Como pasajero, podrás buscar viajes y solicitar un
                asiento. Esta pantalla es una demostración.
              </Text>
            </View>
          )}

          <Pressable
            style={styles.publishButton}
            onPress={publicarViaje}
          >
            <Text style={styles.publishButtonText}>
              {tipoUsuario === 'conductor'
                ? 'Publicar viaje'
                : 'Continuar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 43,
    marginBottom: 9,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    color: NAVY,
    fontSize: 17,
    fontWeight: '800',
  },
  headerIllustration: {
    width: 54,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    right: 3,
    top: 2,
  },
  roleSelector: {
    height: 32,
    borderRadius: 20,
    backgroundColor: '#E8DDFB',
    flexDirection: 'row',
    padding: 2,
    marginBottom: 13,
  },
  roleButton: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRoleButton: {
    backgroundColor: '#00A58A',
  },
  roleText: {
    color: BLUE,
    fontSize: 10,
    fontWeight: '700',
  },
  activeRoleText: {
    color: '#FFFFFF',
  },
  form: {
    gap: 7,
  },
  inputCard: {
    minHeight: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAE8F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  fieldLabel: {
    color: BLUE,
    fontSize: 9,
    marginBottom: 1,
  },
  input: {
    color: BLUE,
    fontSize: 11,
    fontWeight: '600',
    padding: 0,
    minHeight: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dateCard: {
    flex: 1.15,
    minWidth: 0,
  },
  timeCard: {
    flex: 0.85,
    minWidth: 0,
  },
  sectionLabel: {
    color: NAVY,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 1,
  },
  seatControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seatButton: {
    width: 27,
    height: 27,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAE8F3',
  },
  seatCountBox: {
    width: 36,
    height: 27,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAE8F3',
  },
  seatCount: {
    color: NAVY,
    fontSize: 12,
    fontWeight: '800',
  },
  simpleInputCard: {
    minHeight: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#EAE8F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
  },
  currency: {
    color: BLUE,
    fontSize: 11,
    fontWeight: '700',
    marginRight: 5,
  },
  costInput: {
    flex: 1,
    color: BLUE,
    fontSize: 11,
    fontWeight: '700',
    paddingVertical: 6,
  },
  vehicleSelector: {
    minHeight: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#EAE8F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    gap: 8,
  },
  vehicleText: {
    flex: 1,
    color: BLUE,
    fontSize: 11,
    fontWeight: '700',
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    padding: 10,
    backgroundColor: '#F0E9FF',
    borderRadius: 10,
    marginTop: 5,
  },
  passengerInfoText: {
    flex: 1,
    color: NAVY,
    fontSize: 11,
    lineHeight: 16,
  },
  publishButton: {
    minHeight: 40,
    backgroundColor: PURPLE,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: PURPLE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
