import { Stack } from "expo-router";
export default function TabsLayout() {
  return (

          <Stack>
            <Stack.Screen name="Home" options={{ headerShown: true, title: 'Biblioteca' }} />
            <Stack.Screen name="Inicio" options={{ headerShown: false }} />
          </Stack>
  );
}