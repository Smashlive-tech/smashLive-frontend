import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  return (
    <Stack>
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
        name="schedule"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
