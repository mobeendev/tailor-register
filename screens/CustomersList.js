import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Searchbar, Button } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";

const CustomersList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container} onPress={() => Keyboard.dismiss()}>
          <Searchbar></Searchbar>
          <Button
            icon="search"
            mode="contained"
            onPress={() => Keyboard.dismiss()}
          >
            Search
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CustomersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
