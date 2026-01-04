import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="welcome"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="payments"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="events"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="terms-conditions"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
