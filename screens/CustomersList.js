import React from "react";
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

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb1"); // returns Database object

const statusBarHeight = Constants.statusBarHeight;
var radio_props = [
  { label: "Ban", value: 0 },
  { label: "Normal", value: 1 },
];
class CustomersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      text: null,
      firstname: null,
      lastname: null,
      name: null,
      isloaded: false,
      collar_type: 0,
    };
    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        //        "DROP TABLE itemsa;CREATE TABLE IF NOT EXISTS itemsa (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT,name TEXT, firstname TEXT,lastname TEXT,collar_size  INT,is_ban INT,shirt_style INT)"
        "CREATE TABLE IF NOT EXISTS itemsa (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT,lastname TEXT, contact INT,chest INT, waist INT,shoulder INT, arm INT, trouser_length INT, hips INT, collar_size INT,collar_type INT,shirt_style INT,arm_hole INT)"
      );
    });
    this.fetchData(); // ignore it for now
  }

  componentDidMount() {
    this.fetchData(); // ignore it for now

    if (this.state.isloaded) {
      console.log(this.state.data);
    }
    console.log(this.state.data);
  }
  componentDidUpdate() {
    console.log(this.state.collar_type);
  }
  fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "SELECT * FROM itemsa",
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => this.setState({ data: _array })
        // failure callback which sends two things Transaction object and Error
        // (txObj, error) => console.log('Error ', error)
      ); // end executeSQL
    }); // end transaction
  };

  renderMenuItem = ({ item, index }) => {
    return <CustomerListItem item={item} />;
  };

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      collar_type: index,
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Searchbar></Searchbar>
            <Button
              icon="search"
              mode="contained"
              onPress={() => {
                this.fetchData();
                console.log(this.state.data);
              }}
            >
              Search
            </Button>

            {this.state.data !== null ? (
              <FlatList
                data={this.state.data}
                renderItem={this.renderMenuItem}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text>Loading....</Text>
            )}
            <FAB
              style={styles.fab}
              medium
              icon="add"
              onPress={() => this.props.navigation.navigate("AddNew")}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

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
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
