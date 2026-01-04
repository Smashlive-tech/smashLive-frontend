import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="create_event"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
