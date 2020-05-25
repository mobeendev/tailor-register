import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CustomersList from "../screens/CustomersList";
import AddNew from "../screens/AddNew";
import Colors from "../constants/Colors";

const tabScreenConfig = {
  Customers: {
    screen: CustomersList,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: "Customers",
    },
  },
  AddNew: {
    screen: AddNew,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-add-circle-outline"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: "Add New",
    },
  },
};

const AppNavigator = createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {},
    activeTintColor: Colors.accentColor,
  },
});

export default createAppContainer(AppNavigator);
