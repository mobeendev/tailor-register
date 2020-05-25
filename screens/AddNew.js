import React from "react";
import { StyleSheet, View, Text } from "react-native";

const AddNew = () => {
  return (
    <View style={styles.container}>
      <Text> AddNew </Text>
    </View>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
