import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="home" />
      <Stack.Screen name="trips" />
      <Stack.Screen name="publish" />
      <Stack.Screen name="messages" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}