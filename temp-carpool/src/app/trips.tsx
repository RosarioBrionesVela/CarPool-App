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
const GREEN = '#009F7A';
const BACKGROUND = '#F2F9FD';

type Viaje = {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  llegada: string;
  conductor: string;
  calificacion: string;
  auto: string;
  precio: number;
  asientos: number;
  verificado: boolean;
  color: string;
};

const viajesIniciales: Viaje[] = [
  {
    id: '1',
    origen: 'Aguascalientes, Ags.',
    destino: 'Querétaro, Qro.',
    fecha: '25 oct. 2026',
    hora: '8:00 a. m.',
    llegada: '11:30 a. m.',
    conductor: 'Carlos R.',
    calificacion: '4.8 (24)',
    auto: 'Toyota Corolla · Gris',
    precio: 60,
    asientos: 3,
    verificado: true,
    color: '#A8B4C0',
  },
  {
    id: '2',
    origen: 'Aguascalientes, Ags.',
    destino: 'Querétaro, Qro.',
    fecha: '25 oct. 2026',
    hora: '8:00 a. m.',
    llegada: '11:20 a. m.',
    conductor: 'Lucía M.',
    calificacion: '4.9 (18)',
    auto: 'Honda Civic · Azul',
    precio: 50,
    asientos: 2,
    verificado: true,
    color: '#2565C5',
  },
  {
    id: '3',
    origen: 'Aguascalientes, Ags.',
    destino: 'Guadalajara, Jal.',
    fecha: '26 oct. 2026',
    hora: '9:30 a. m.',
    llegada: '12:00 p. m.',
    conductor: 'Mariana L.',
    calificacion: '4.9 (32)',
    auto: 'Nissan Versa · Blanco',
    precio: 80,
    asientos: 2,
    verificado: false,
    color: '#D8E0E7',
  },
];

export default function TripsScreen() {
  const router = useRouter();

  const [origen, setOrigen] = useState('Aguascalientes, Ags.');
  const [destino, setDestino] = useState('Querétaro, Qro.');
  const [fecha, setFecha] = useState('25 oct. 2026');
  const [hora, setHora] = useState('8:00 a. m.');
  const [filtro, setFiltro] = useState('Todos');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const normalizar = (texto: string) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  let viajesFiltrados = viajesIniciales.filter((viaje) => {
    const coincideOrigen =
      !busquedaRealizada ||
      normalizar(viaje.origen).includes(normalizar(origen));

    const coincideDestino =
      !busquedaRealizada ||
      normalizar(viaje.destino).includes(normalizar(destino));

    const coincideFecha =
      !busquedaRealizada ||
      !fecha.trim() ||
      normalizar(viaje.fecha).includes(normalizar(fecha));

    return coincideOrigen && coincideDestino && coincideFecha;
  });

  if (filtro === 'Conductor verificado') {
    viajesFiltrados = viajesFiltrados.filter(
      (viaje) => viaje.verificado,
    );
  }

  if (filtro === 'Precio') {
    viajesFiltrados = [...viajesFiltrados].sort(
      (a, b) => a.precio - b.precio,
    );
  }

  const buscarViajes = () => {
    if (!origen.trim() || !destino.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Escribe el origen y el destino.',
      );
      return;
    }

    if (normalizar(origen) === normalizar(destino)) {
      Alert.alert(
        'Revisa tu búsqueda',
        'El origen y el destino deben ser diferentes.',
      );
      return;
    }

    setBusquedaRealizada(true);
  };

  const reservarViaje = (viaje: Viaje) => {
    Alert.alert(
      'Reservar viaje',
      `Conductor: ${viaje.conductor}\nDestino: ${viaje.destino}\nFecha: ${viaje.fecha}\nHora: ${viaje.hora}\nPrecio: $${viaje.precio} por persona`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reservar',
          onPress: () =>
            Alert.alert(
              'Reserva de demostración',
              'La reserva todavía no se guarda en una base de datos.',
            ),
        },
      ],
    );
  };

  const irAViajes = () => {
    setBusquedaRealizada(false);
    setFiltro('Todos');
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
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Regresar"
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={NAVY}
            />
          </Pressable>

          <Text style={styles.title}>Buscar viajes</Text>
        </View>

        <View style={styles.searchForm}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color={NAVY}
            />
            <TextInput
              style={styles.input}
              value={origen}
              onChangeText={setOrigen}
              placeholder="Ciudad de origen"
              placeholderTextColor={BLUE}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color={NAVY}
            />
            <TextInput
              style={styles.input}
              value={destino}
              onChangeText={setDestino}
              placeholder="Ciudad de destino"
              placeholderTextColor={BLUE}
            />
          </View>

          <View style={styles.dateTimeRow}>
            <View style={[styles.inputContainer, styles.dateInput]}>
              <Ionicons
                name="calendar-outline"
                size={21}
                color={NAVY}
              />
              <TextInput
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
                placeholder="Fecha"
                placeholderTextColor={BLUE}
              />
            </View>

            <View style={[styles.inputContainer, styles.timeInput]}>
              <Ionicons
                name="time-outline"
                size={22}
                color={NAVY}
              />
              <TextInput
                style={styles.input}
                value={hora}
                onChangeText={setHora}
                placeholder="Hora"
                placeholderTextColor={BLUE}
              />
            </View>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={buscarViajes}
          >
            <Ionicons
              name="search-outline"
              size={19}
              color="#FFFFFF"
            />
            <Text style={styles.searchButtonText}>Buscar</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {['Todos', 'Conductor verificado', 'Precio'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.filterButton,
                filtro === item && styles.activeFilter,
              ]}
              onPress={() => setFiltro(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filtro === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {viajesFiltrados.length > 0 ? (
          viajesFiltrados.map((viaje) => (
            <View key={viaje.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.avatar}>
                  <Ionicons
                    name="person"
                    size={25}
                    color={NAVY}
                  />
                </View>

                <View style={styles.driverInfo}>
                  <View style={styles.driverNameRow}>
                    <Text style={styles.driverName}>
                      {viaje.conductor}
                    </Text>

                    {viaje.verificado && (
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color={GREEN}
                      />
                    )}
                  </View>

                  <View style={styles.ratingRow}>
                    <Ionicons
                      name="star"
                      size={16}
                      color="#F9B638"
                    />
                    <Text style={styles.rating}>
                      {viaje.calificacion}
                    </Text>
                  </View>

                  <Text style={styles.carName}>
                    {viaje.auto}
                  </Text>
                </View>

                <View style={styles.carImage}>
                  <Ionicons
                    name="car-sport"
                    size={57}
                    color={viaje.color}
                  />
                </View>
              </View>

              <View style={styles.tripBottomRow}>
                <View style={styles.tripTime}>
                  <Text style={styles.timeText}>
                    {viaje.hora} → {viaje.llegada}
                  </Text>

                  <View style={styles.seatsRow}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={16}
                      color={GREEN}
                    />
                    <Text style={styles.seatsText}>
                      {viaje.asientos} asientos disponibles
                    </Text>
                  </View>
                </View>

                <View style={styles.priceInfo}>
                  <Text style={styles.price}>
                    ${viaje.precio}
                  </Text>
                  <Text style={styles.priceLabel}>
                    por persona
                  </Text>
                </View>
              </View>

              <Pressable
                style={styles.reserveButton}
                onPress={() => router.push('/detail')}
              >
                <Text style={styles.reserveText}>
                  Ver viaje y reservar
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={GREEN}
                />
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="car-outline"
              size={45}
              color={BLUE}
            />

            <Text style={styles.emptyTitle}>
              No encontramos viajes
            </Text>

            <Text style={styles.emptyText}>
              Intenta cambiar el origen, el destino o la fecha.
            </Text>

            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setOrigen('');
                setDestino('');
                setFecha('');
                setBusquedaRealizada(false);
                setFiltro('Todos');
              }}
            >
              <Text style={styles.clearText}>
                Limpiar búsqueda
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navItem}
          onPress={() => router.replace('/home')}
        >
          <Ionicons
            name="home"
            size={23}
            color={BLUE}
          />
          <Text style={styles.navLabel}>Inicio</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={irAViajes}
        >
          <Ionicons
            name="location-outline"
            size={23}
            color={NAVY}
          />
          <Text style={[styles.navLabel, styles.selectedNavLabel]}>
            Viajes
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/publish')}
        >
          <Ionicons
            name="clipboard-outline"
            size={23}
            color={BLUE}
          />
          <Text style={styles.navLabel}>Publicar</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/messages')}
        >
          <Ionicons
            name="chatbubble-outline"
            size={23}
            color={BLUE}
          />
          <Text style={styles.navLabel}>Mensajes</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons
            name="person-outline"
            size={23}
            color={BLUE}
          />
          <Text style={styles.navLabel}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 20,
  },
  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 42,
    fontSize: 21,
    fontWeight: '800',
    color: NAVY,
  },
  searchForm: {
    gap: 9,
    marginBottom: 12,
  },
  inputContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5EDF5',
    paddingHorizontal: 11,
  },
  input: {
    flex: 1,
    color: BLUE,
    fontSize: 14,
    paddingLeft: 8,
    paddingVertical: 7,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 1.2,
  },
  timeInput: {
    flex: 0.8,
  },
  searchButton: {
    height: 43,
    backgroundColor: GREEN,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  filters: {
    gap: 7,
    paddingBottom: 12,
  },
  filterButton: {
    backgroundColor: '#E9EDF2',
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  activeFilter: {
    backgroundColor: GREEN,
  },
  filterText: {
    color: '#5F6F89',
    fontSize: 12,
    fontWeight: '700',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8EFF5',
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: '#E5EDF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    color: NAVY,
    fontSize: 17,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  rating: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '700',
  },
  carName: {
    color: BLUE,
    fontSize: 12,
    marginTop: 5,
  },
  carImage: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTime: {
    flex: 1,
  },
  timeText: {
    color: BLUE,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  seatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatsText: {
    color: BLUE,
    fontSize: 10,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginLeft: 5,
  },
  price: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
  },
  priceLabel: {
    color: BLUE,
    fontSize: 9,
  },
  reserveButton: {
    marginTop: 11,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: '#EDF1F5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  reserveText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    color: BLUE,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomNav: {
    minHeight: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EEF4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navLabel: {
    color: BLUE,
    fontSize: 10,
    fontWeight: '600',
  },
  selectedNavLabel: {
    color: NAVY,
    fontWeight: '800',
  },
});
