import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#192B68';
const PURPLE = '#8B4CF6';
const MUTED = '#7184A5';

type Conversation = {
  id: string;
  name: string;
  message: string;
  time: string;
  icon: string;
  color: string;
  unread: number;
};

const initialConversations: Conversation[] = [
  {
    id: '1',
    name: 'Carlos R.',
    message: '¡Perfecto! Nos vemos en el punto de salida.',
    time: '10:42',
    icon: 'person',
    color: '#E8DEFF',
    unread: 2,
  },
  {
    id: '2',
    name: 'Mariana L.',
    message: '¿A qué hora salimos?',
    time: 'Ayer',
    icon: 'person',
    color: '#DDF7EE',
    unread: 1,
  },
  {
    id: '3',
    name: 'Daniel M.',
    message: 'Gracias por confirmar.',
    time: 'Lun',
    icon: 'person',
    color: '#FFE9D7',
    unread: 0,
  },
];

type ChatMessage = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

export default function MessagesScreen() {
  const router = useRouter();

  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [draft, setDraft] = useState('');
  const [chatMessages, setChatMessages] = useState<
    Record<string, ChatMessage[]>
  >({
    '1': [
      {
        id: '1',
        text: 'Hola, ¿todo bien? ¿Nos vemos en el punto de salida?',
        mine: false,
        time: '10:38',
      },
      {
        id: '2',
        text: '¡Sí, perfecto! Nos vemos ahí.',
        mine: true,
        time: '10:40',
      },
      {
        id: '3',
        text: '¡Perfecto! Nos vemos en el punto de salida.',
        mine: false,
        time: '10:42',
      },
    ],
    '2': [
      {
        id: '1',
        text: 'Hola, ¿a qué hora salimos?',
        mine: false,
        time: 'Ayer',
      },
    ],
    '3': [
      {
        id: '1',
        text: 'Gracias por confirmar.',
        mine: false,
        time: 'Lun',
      },
    ],
  });

  const enviarMensaje = () => {
    if (!selected || !draft.trim()) return;

    const texto = draft.trim();
    const nuevoMensaje: ChatMessage = {
      id: `${Date.now()}`,
      text: texto,
      mine: true,
      time: new Date().toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChatMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] ?? []), nuevoMensaje],
    }));

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selected.id
          ? { ...conversation, message: texto, time: 'Ahora', unread: 0 }
          : conversation,
      ),
    );

    setDraft('');
  };

  if (selected) {
    const messages = chatMessages[selected.id] ?? [];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
        >
          <View style={styles.chatHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                setSelected(null);
                setDraft('');
              }}
            >
              <Ionicons name="arrow-back" size={24} color={NAVY} />
            </Pressable>

            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={PURPLE} />
            </View>

            <View style={styles.chatHeaderText}>
              <Text style={styles.chatName}>{selected.name}</Text>
              <Text style={styles.onlineText}>Conversación de CarPool</Text>
            </View>

            <Pressable
              style={styles.headerAction}
              onPress={() => {
                setSelected(null);
              }}
            >
              <Ionicons name="ellipsis-vertical" size={21} color={NAVY} />
            </Pressable>
          </View>

          <View style={styles.tripNotice}>
            <Ionicons name="car-outline" size={20} color={PURPLE} />
            <Text style={styles.tripNoticeText}>
              Conversación relacionada con tu viaje
            </Text>
          </View>

          <FlatList
            style={styles.messageList}
            contentContainerStyle={styles.messageContent}
            data={messages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageRow,
                  item.mine ? styles.myMessageRow : styles.otherMessageRow,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    item.mine ? styles.myBubble : styles.otherBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.mine && styles.myMessageText,
                    ]}
                  >
                    {item.text}
                  </Text>

                  <Text
                    style={[
                      styles.messageTime,
                      item.mine && styles.myMessageTime,
                    ]}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyChat}>
                Envía un mensaje para iniciar la conversación.
              </Text>
            }
          />

          <View style={styles.composer}>
            <TextInput
              style={styles.messageInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#9AA6BC"
              multiline
              maxLength={1000}
            />

            <Pressable
              style={[
                styles.sendButton,
                !draft.trim() && styles.sendButtonDisabled,
              ]}
              onPress={enviarMensaje}
              disabled={!draft.trim()}
              accessibilityRole="button"
              accessibilityLabel="Enviar mensaje"
            >
              <Ionicons name="send" size={19} color="#FFFFFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.listHeader}>
        <View>
          <Text style={styles.title}>Mensajes</Text>
          <Text style={styles.subtitle}>
            Habla con tus compañeros de viaje.
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="chatbubbles-outline" size={24} color={PURPLE} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={21} color={MUTED} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar conversaciones"
          placeholderTextColor="#9AA6BC"
          onChangeText={(value) => {
            const search = value.toLowerCase();

            setConversations(
              initialConversations.filter(
                (conversation) =>
                  conversation.name.toLowerCase().includes(search) ||
                  conversation.message.toLowerCase().includes(search),
              ),
            );
          }}
        />
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.conversationCard,
              pressed && styles.pressed,
            ]}
            onPress={() => {
              setSelected(item);
              setConversations((prev) =>
                prev.map((conversation) =>
                  conversation.id === item.id
                    ? { ...conversation, unread: 0 }
                    : conversation,
                ),
              );
            }}
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: item.color },
              ]}
            >
              <Ionicons
                name={item.icon as 'person'}
                size={27}
                color={PURPLE}
              />
            </View>

            <View style={styles.conversationInfo}>
              <Text style={styles.conversationName}>{item.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.message}
              </Text>
            </View>

            <View style={styles.conversationMeta}>
              <Text style={styles.conversationTime}>{item.time}</Text>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={42}
              color={PURPLE}
            />
            <Text style={styles.emptyTitle}>No hay conversaciones</Text>
            <Text style={styles.emptyText}>
              Prueba con otro nombre o mensaje.
            </Text>
          </View>
        }
      />

      <View style={styles.bottomArea}>
        <Pressable
          style={styles.backHomeButton}
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home-outline" size={19} color="#FFFFFF" />
          <Text style={styles.backHomeText}>Volver al inicio</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FF',
  },
  flex: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 20,
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
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EFE7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E8F2',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    minHeight: 50,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: NAVY,
    fontSize: 14,
    paddingVertical: 12,
  },
  conversationList: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    flexGrow: 1,
  },
  conversationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },
  pressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#E8DEFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    color: NAVY,
    fontSize: 15,
    fontWeight: '800',
  },
  lastMessage: {
    color: MUTED,
    fontSize: 12,
    marginTop: 6,
  },
  conversationMeta: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  conversationTime: {
    color: MUTED,
    fontSize: 10,
  },
  unreadBadge: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 25,
  },
  emptyTitle: {
    color: NAVY,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 15,
  },
  emptyText: {
    color: MUTED,
    textAlign: 'center',
    fontSize: 13,
    marginTop: 7,
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backHomeButton: {
    backgroundColor: PURPLE,
    minHeight: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  backHomeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF6',
  },
  backButton: {
    width: 38,
    height: 42,
    justifyContent: 'center',
  },
  chatHeaderText: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '800',
  },
  onlineText: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },
  headerAction: {
    width: 35,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE7FF',
    paddingVertical: 11,
    gap: 8,
  },
  tripNoticeText: {
    color: NAVY,
    fontSize: 12,
    fontWeight: '600',
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    padding: 16,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '84%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  myBubble: {
    backgroundColor: PURPLE,
    borderBottomRightRadius: 5,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#ECEEF6',
  },
  messageText: {
    color: NAVY,
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    color: MUTED,
    fontSize: 10,
    textAlign: 'right',
    marginTop: 5,
  },
  myMessageTime: {
    color: '#E9DFFF',
  },
  emptyChat: {
    color: MUTED,
    textAlign: 'center',
    marginTop: 35,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF6',
    gap: 10,
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    minHeight: 45,
    borderRadius: 23,
    backgroundColor: '#F4F5FB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: NAVY,
    fontSize: 14,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
});