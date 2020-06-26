import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Orders = () => {
  return (
    <View style={styles.container}>
      <Text> Orders </Text>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
