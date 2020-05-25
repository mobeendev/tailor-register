import React from "react";
import { enableScreens } from "react-native-screens";

import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
