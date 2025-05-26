import { Stack } from "expo-router";
import React from "react";
import TextErrorBoundary from "../components/TextErrorBoundary";

export default function Layout() {
  return (
    <TextErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Index" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="home/tabs" />
      </Stack>
    </TextErrorBoundary>
  );
}