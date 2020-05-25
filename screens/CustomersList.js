import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Searchbar, Button ,FAB} from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight

const CustomersList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
 
          <Searchbar></Searchbar>
          <Button
            icon="search"
            mode="contained"
            onPress={() => Keyboard.dismiss()}
          >
            Search
          </Button>
          <FAB
            style={styles.fab}
            medium
            icon="add"
            onPress={() => console.log("Pressed" + statusBarHeight)}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CustomersList;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 3 ,
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 0
        // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
