import { Stack } from "expo-router";
import React from "react";
// eslint-disable-next-line import/no-named-as-default
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