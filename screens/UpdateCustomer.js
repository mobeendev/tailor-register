import React from "react";
import {
  TextInput,
  Button,
  Switch,
  Divider,
  Checkbox,
  Text,
  Subheading,
  RadioButton,
  FAB,
} from "react-native-paper";
import { withTheme } from "react-native-paper";

import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { CustomerDataContext } from "../context/CustomerData";
const db = SQLite.openDatabase("db.testDb1"); // returns Database object
const statusBarHeight = Constants.statusBarHeight;

class UpdateCustomer extends React.Component {
  // const { customers, initCustomersList } = CustomerDataContext;
  static contextType = CustomerDataContext;

  static navigationOptions = {
    title: "Update Customer",
  };
  constructor(props) {
    super(props);
    this.state = {
      customerID: null,
      firstname: null,
      lastname: null,
      contact: null,

      shoulder: null,
      shirt_length: null,
      teerah: null,

      arm: null,
      collar_size: null,
      collar_type: 0,

      pocket_type: 0,

      shirt_bottom_length: null,
      shirt_bottom_type: 0,

      trouser_length: null,
      trouser_opening: null,

      extra_info: null,
    };
    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS customers
         (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT,lastname TEXT, 
          contact INT,
          shoulder INT, shirt_length INT,teerah INT,
           arm INT, collar_size INT, collar_type INT,
           pocket_type INT,
           shirt_bottom_length INT,shirt_bottom_type INT,
           trouser_length INT,trouser_opening INT,           
           extra_info INT)`
      );
    });
  }
  componentDidMount() {
    let customer = this.props.navigation.getParam("customerInfo");
    console.log("cdm", customer.firstname);
    this.setState({
      customerID: customer.id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      contact: customer.contact,

      shoulder: customer.shoulder,
      shirt_length: customer.shirt_length,
      teerah: customer.teerah,

      arm: customer.arm,
      collar_size: customer.collar_size,
      collar_type: 0,

      pocket_type: 0,

      shirt_bottom_length: customer.shirt_bottom_length,
      shirt_bottom_type: 0,

      trouser_length: customer.trouser_length,
      trouser_opening: customer.trouser_opening,

      extra_info: "abc",
    });
  }
  // event handler for new item creation
  newItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        DELETE FROM customers where id = ?`,
        [this.state.customerID],
        (txObj, resultSet) => console.log("delete", this.state.customerID),

        (txObj, error) => console.log("Error", error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO customers
       (firstname,lastname,contact,
        shoulder, shirt_length,teerah,
        arm, collar_size , collar_type,pocket_type,
        shirt_bottom_length,shirt_bottom_type ,trouser_length, trouser_opening,extra_info
        ) values (?,?,?,   ?,?,?,    ?,?,?,?,   ?,?,?,?,? )`,
        [
          this.state.firstname,
          this.state.lastname,
          this.state.contact,

          this.state.shoulder,
          this.state.shirt_length,
          this.state.teerah,

          this.state.arm,
          this.state.collar_size,
          this.state.collar_type,

          this.state.pocket_type,

          this.state.shirt_bottom_length,
          this.state.shirt_bottom_type,

          this.state.trouser_length,
          this.state.trouser_opening,

          this.state.extra_info,
        ],
        (txObj, resultSet) => console.log("inserted"),

        (txObj, error) => console.log("Error", error)
      );
    });

    this.fetchData();
    this.props.navigation.navigate("Customer");
    return;
  };

  fetchData = () => {
    let { initCustomersList } = this.context;

    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "SELECT * FROM customers",
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          initCustomersList(_array);
        }
        // failure callback which sends two things Transaction object and Error
        // (txObj, error) => console.log('Error ', error)
      ); // end executeSQL
    }); // end transaction
  };
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      collar_type: index,
    });
  };
  handlePocketIndexChange = (index) => {
    this.setState({
      ...this.state,
      pocket_type: index,
    });
  };
  handleBottomIndexChange = (index) => {
    this.setState({
      ...this.state,
      shirt_bottom_type: index,
    });
  };
  // _onToggleSwitch = () =>
  //   this.setState((state) => ({ isSwitchOn: !state.isSwitchOn }));

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Subheading>Basic Information</Subheading>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="First Name"
              mode="outlined"
              value={this.state.firstname}
              onChangeText={(firstname) => this.setState({ firstname })}
            />
            <TextInput
              style={styles.formLabel}
              label="Last Name"
              mode="outlined"
              value={this.state.lastname}
              onChangeText={(lastname) => this.setState({ lastname })}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Phone No."
              mode="outlined"
              value={`${this.state.contact}`} //here
              onChangeText={(contact) => this.setState({ contact })}
            />
          </View>

          <Subheading>Measurement</Subheading>

          <Divider />
          <Subheading
            style={{ alignSelf: "center", color: "#3498db", fontWeight: "800" }}
          >
            Shirt Style
          </Subheading>
          <Divider />

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="شولڈر"
              value={`${this.state.shoulder}`} //here
              onChangeText={(shoulder) => this.setState({ shoulder })}
            />
            <TextInput
              style={styles.formLabel}
              label="شرٹ لمبائي"
              mode="outlined"
              value={`${this.state.shirt_length}`}
              onChangeText={(shirt_length) => this.setState({ shirt_length })}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="تیرہ"
              value={`${this.state.teerah}`}
              onChangeText={(teerah) => this.setState({ teerah })}
            />
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="بازو"
              value={`${this.state.arm}`}
              onChangeText={(arm) => this.setState({ arm })}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabeli}
              label="کالر"
              mode="outlined"
              value={`${this.state.collar_size}`}
              onChangeText={(collar_size) => this.setState({ collar_size })}
            />
            <SegmentedControlTab
              values={["سادہ", "بین", "گول"]}
              selectedIndex={this.state.collar_type}
              onTabPress={this.handleIndexChange}
              borderRadius={0}
              tabsContainerStyle={{
                height: 50,
                width: "70%",
                backgroundColor: "#3498db",
              }}
              tabStyle={{
                backgroundColor: "#f1c40f",
                borderWidth: 1,
                borderColor: "#9c9c9c",
              }}
              activeTabStyle={{ backgroundColor: "white", marginTop: 2 }}
              tabTextStyle={{ color: "black", fontWeight: "bold" }}
              activeTabTextStyle={{ color: "black" }}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabeli}
              label="پاکٹ"
              mode="outlined"
              disabled
            />
            <SegmentedControlTab
              values={["ڈبل سائیڈ", "سنگل سائیڈ"]}
              selectedIndex={this.state.pocket_type}
              onTabPress={this.handlePocketIndexChange}
              borderRadius={0}
              tabsContainerStyle={{
                height: 49,
                width: "70%",
                backgroundColor: "#3498db",
              }}
              tabStyle={{
                backgroundColor: "#f1c40f",
                borderWidth: 1,
                borderColor: "#9c9c9c",
              }}
              activeTabStyle={{ backgroundColor: "white", marginTop: 2 }}
              tabTextStyle={{ color: "black", fontWeight: "bold" }}
              activeTabTextStyle={{ color: "black" }}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="گھیرا لمبائي"
              mode="outlined"
              value={`${this.state.shirt_bottom_length}`}
              onChangeText={(shirt_bottom_length) =>
                this.setState({ shirt_bottom_length })
              }
            />
          </View>
          <View style={styles.formRow}>
            <SegmentedControlTab
              values={["سادہ", "گول", "نارمل"]}
              selectedIndex={this.state.shirt_bottom_type}
              onTabPress={this.handleBottomIndexChange}
              borderRadius={0}
              tabsContainerStyle={{
                height: 50,
                width: "100%",
                backgroundColor: "#3498db",
              }}
              tabStyle={{
                backgroundColor: "#f1c40f",
                borderWidth: 1,
                borderColor: "#9c9c9c",
              }}
              activeTabStyle={{ backgroundColor: "white", marginTop: 2 }}
              tabTextStyle={{ color: "black", fontWeight: "bold" }}
              activeTabTextStyle={{ color: "black" }}
            />
          </View>
          <Divider />
          <Subheading
            style={{ alignSelf: "center", color: "#3498db", fontWeight: "800" }}
          >
            Trouser Style
          </Subheading>
          <Divider />

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="شلوار لمبائي"
              mode="outlined"
              value={`${this.state.trouser_length}`}
              onChangeText={(trouser_length) =>
                this.setState({ trouser_length })
              }
            />
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="پا نچا"
              value={`${this.state.trouser_opening}`}
              onChangeText={(trouser_opening) =>
                this.setState({ trouser_opening })
              }
            />
          </View>

          <Divider />
          <Subheading
            style={{ alignSelf: "center", color: "#3498db", fontWeight: "800" }}
          >
            مزید معلومات
          </Subheading>
          <Divider />

          <View style={styles.formRow}>
            <TextInput
              style={{ height: 100, flex: 1 }}
              label="مزید معلومات یہاں درج کریں۔۔۔"
              mode="outlined"
              multiline={true}
              value={this.state.extra_info}
              onChangeText={(extra_info) => this.setState({ extra_info })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              icon="person"
              mode="contained"
              style={{ width: "100%", height: 50, justifyContent: "center" }}
              onPress={() => this.newItem()}
            >
              Update
            </Button>
          </View>
          <View style={styles.formRow}>
            <Button
              icon="arrow-back"
              mode="contained"
              raised
              theme={{ roundness: 3 }}
              style={{
                backgroundColor: "#f1c40f",
                width: "100%",
                height: 50,
                justifyContent: "center",
              }}
              onPress={() => this.props.navigation.navigate("Detail")}
            >
              Back
            </Button>
            {/* <Button raised theme={{ roundness: 3 }}>
              Press me
            </Button> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default withTheme(UpdateCustomer);

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
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 5,
  },
  formLabel: {
    flex: 2,
    margin: 2,
  },
  formLabeli: {
    flex: 1,
    alignSelf: "flex-start",
    height: 55,
    marginBottom: 4,
    marginHorizontal: 2,
    paddingBottom: 4,
  },
  formItem: {
    flex: 1,
  },
});
