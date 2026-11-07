import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#192B68';
const MUTED = '#7890B5';
const PURPLE = '#8B4CF6';
const BUBBLE_RECEIVED = '#EFECF8';
const BACKGROUND = '#FCFBFF';

type Mensaje = {
  id: string;
  texto: string;
  hora: string;
  mio: boolean;
};

const mensajesIniciales: Mensaje[] = [
  {
    id: '1',
    texto: '¡Hola! ¿Todo bien?\n¿Nos vemos en el punto de salida?',
    hora: '7:52 a. m.',
    mio: false,
  },
  {
    id: '2',
    texto: '¡Sí, perfecto! ¡Nos vemos a las 8:00?',
    hora: '7:53 a. m.',
    mio: true,
  },
  {
    id: '3',
    texto: '¡Nos vemos!',
    hora: '7:53 a. m.',
    mio: false,
  },
];

const horaActual = () =>
  new Date()
    .toLocaleTimeString('es-MX', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/\s?a\.?\s?m\.?/i, ' a. m.')
    .replace(/\s?p\.?\s?m\.?/i, ' p. m.');

export default function ChatScreen() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams<{ nombre?: string }>();
  const listRef = useRef<FlatList<Mensaje>>(null);

  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesIniciales);
  const [texto, setTexto] = useState('');

  const puedeEnviar = texto.trim().length > 0;

  const enviarMensaje = () => {
    if (!puedeEnviar) return;

    setMensajes((actuales) => [
      ...actuales,
      {
        id: String(Date.now()),
        texto: texto.trim(),
        hora: horaActual(),
        mio: true,
      },
    ]);
    setTexto('');
  };

  const renderMensaje = ({ item }: { item: Mensaje }) => (
    <View style={[styles.messageRow, item.mio && styles.messageRowMine]}>
      <View
        style={[
          styles.bubble,
          item.mio ? styles.bubbleMine : styles.bubbleReceived,
        ]}
      >
        <Text style={[styles.bubbleText, item.mio && styles.bubbleTextMine]}>
          {item.texto}
        </Text>
      </View>

      <Text style={styles.time}>{item.hora}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityLabel="Regresar"
          >
            <Ionicons name="arrow-back" size={30} color={NAVY} />
          </Pressable>

          {/* Para usar foto: reemplaza este View por un <Image> de expo-image
              con style={styles.avatar} */}
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={NAVY} />
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.name}>{nombre ?? 'Carlos R.'}</Text>
            <Text style={styles.status}>En línea</Text>
          </View>

          <Pressable
            onPress={() =>
              Alert.alert(
                'Notificaciones',
                'Aquí podrás silenciar o activar los avisos de este chat.',
              )
            }
            hitSlop={10}
            accessibilityLabel="Notificaciones del chat"
          >
            <Ionicons name="notifications-outline" size={28} color={NAVY} />
          </Pressable>
        </View>

        {/* Mensajes */}
        <FlatList
          ref={listRef}
          data={mensajes}
          keyExtractor={(item) => item.id}
          renderItem={renderMensaje}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Caja de mensaje */}
        <View style={styles.inputBar}>
          <View style={styles.inputContainer}>
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Adjuntar',
                  'Después agregaremos el envío de fotos y ubicación.',
                )
              }
              accessibilityLabel="Adjuntar"
            >
              <Ionicons name="add-circle-outline" size={30} color={MUTED} />
            </Pressable>

            <TextInput
              style={styles.input}
              value={texto}
              onChangeText={setTexto}
              placeholder="Escribe un mensaje..."
              placeholderTextColor={MUTED}
              returnKeyType="send"
              onSubmitEditing={enviarMensaje}
            />
          </View>

          <Pressable
            style={[styles.sendButton, !puedeEnviar && styles.sendDisabled]}
            onPress={enviarMensaje}
            disabled={!puedeEnviar}
            accessibilityLabel="Enviar mensaje"
          >
            <Ionicons name="paper-plane-outline" size={26} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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

  /* Encabezado */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F6',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E7EEF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    color: NAVY,
    fontSize: 20,
    fontWeight: '800',
  },
  status: {
    color: MUTED,
    fontSize: 14,
    marginTop: 2,
  },

  /* Mensajes */
  messagesContent: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 16,
    gap: 18,
  },
  messageRow: {
    alignItems: 'flex-start',
  },
  messageRowMine: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  bubbleReceived: {
    backgroundColor: BUBBLE_RECEIVED,
    borderBottomLeftRadius: 22,
  },
  bubbleMine: {
    backgroundColor: PURPLE,
    borderBottomRightRadius: 22,
  },
  bubbleText: {
    color: NAVY,
    fontSize: 16,
    lineHeight: 25,
  },
  bubbleTextMine: {
    color: '#FFFFFF',
  },
  time: {
    color: MUTED,
    fontSize: 12,
    marginTop: 6,
  },

  /* Caja de texto */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  inputContainer: {
    flex: 1,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#E7E2F5',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: NAVY,
    fontSize: 15,
    paddingVertical: 8,
  },
  sendButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    opacity: 0.55,
  },
});