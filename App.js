import React from "react";
import { enableScreens } from "react-native-screens";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalProvider } from "./GlobalState";
import CustomerDataProvider from "./context/CustomerData";

enableScreens();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
  },
};
export default function App() {
  return (
    <GlobalProvider>
      <CustomerDataProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </CustomerDataProvider>
    </GlobalProvider>
  );
}
