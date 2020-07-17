import React from "react";
import { enableScreens } from "react-native-screens";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomerDataProvider from "./context/CustomerData";

enableScreens();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};
export default function App() {
  return (
    <CustomerDataProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </CustomerDataProvider>
  );
}
