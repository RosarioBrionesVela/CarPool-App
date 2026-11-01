import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
        <Stack.Screen name="trips" />
        <Stack.Screen name="publish" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="myTrips" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="confirmation" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="menu" />
      </Stack>
    </SafeAreaProvider>
  );
} 