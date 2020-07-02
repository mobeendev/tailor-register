import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CustomersList from "../screens/CustomersList";
import CustomerDetail from "../screens/CustomerDetail";
import AddNew from "../screens/AddNew";
import Orders from "../screens/Orders";
import Colors from "../constants/Colors";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";

const tabScreenConfig = {
  Customers: {
    screen: CustomersList,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        // return <Feather name="users" size={24} color="black" />
        return <Entypo name="users" size={24} color="black" />;
        // return <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: "Customers",
    },
  },
  Orders: {
    screen: Orders,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color="black"
          />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: "Orders",
    },
  },
};

const TabNavigator = createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {},
    activeTintColor: Colors.accentColor,
  },
});

const CustomerStack = createStackNavigator(
  {
    Detail: CustomerDetail,
  },
  {
    navigationOptions: {},
  }
);

const AppNavigator = createSwitchNavigator({
  Tabs: TabNavigator,
  Customer: CustomerStack,
  AddNew: createStackNavigator(
    {
      AddNew: {
        screen: AddNew,
      },
    },
    {}
  ),
});
export default createAppContainer(AppNavigator);
