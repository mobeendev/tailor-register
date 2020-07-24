import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Button, FAB } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import Icon from "react-native-vector-icons/Ionicons";
import CustomerListItem from "./CustomerListItem";
import Constants from "expo-constants";
import { CustomerDataContext } from "../context/CustomerData";
import { getData } from "../utils/lib";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb1"); // returns Database object

const statusBarHeight = Constants.statusBarHeight;
var radio_props = [
  { label: "Ban", value: 0 },
  { label: "Normal", value: 1 },
];

const CustomersList = ({ item, navigation }) => {
  const { customers, initCustomersList } = useContext(CustomerDataContext);

  const [customersList, setCustomersList] = React.useState([]);

  useEffect(() => {
    fetchData();
    console.log("calling get data", getData());
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [customers]);

  useEffect(() => {
    initCustomersList(customersList);
  }, [customersList]);

  const fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "SELECT * FROM customers",
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          setCustomersList(_array);
          // initCustomersList(customersList);
        }
        // failure callback which sends two things Transaction object and Error
        // (txObj, error) => console.log('Error ', error)
      ); // end executeSQL
    }); // end transaction
  };

  const renderMenuItem = ({ item, index }) => {
    //console.log("logging item", item);

    return <CustomerListItem item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Searchbar></Searchbar>
          <Button
            icon="search"
            mode="contained"
            onPress={async () => {
              fetchData();
            }}
          >
            Search
          </Button>
          {customers != null ? (
            <FlatList
              data={customers}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text>Loading....</Text>
          )}
          <FAB
            style={styles.fab}
            medium
            icon="add"
            onPress={() => navigation.navigate("AddNew")}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CustomersList;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 3,
    paddingTop: Platform.OS === "android" ? statusBarHeight : 0,
  },
});
