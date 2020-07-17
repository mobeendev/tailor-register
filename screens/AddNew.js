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
const db = SQLite.openDatabase("db.testDb1"); // returns Database object
const statusBarHeight = Constants.statusBarHeight;

class AddNew extends React.Component {
  static navigationOptions = {
    title: "Add New Customer",
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      contact: null,

      chest: null,
      waist: null,
      shoulder: null,

      arm: null,
      trouser_length: null,
      hips: null,

      collar_size: null,
      collar_type: 0,
      shirt_style: null,
      arm_hole: null,
    };
    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS itemsa (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT,lastname TEXT, contact INT,chest INT, waist INT,shoulder INT, arm INT, trouser_length INT, hips INT, collar_size INT,collar_type INT,shirt_style INT,arm_hole INT)"
      );
    });
  }
  componentDidUpdate() {
    console.log(this.state.collar_type);
  }
  // event handler for new item creation
  newItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO itemsa
       (firstname,lastname,contact,
        chest,waist,shoulder,
        arm, trouser_length , hips,
        collar_size,collar_type ,shirt_style, arm_hole
        ) values (?,?,?,    ?,?,?,    ?,?,?,   ?,?,?,?     )`,
        [
          this.state.firstname,
          this.state.lastname,
          this.state.contact,

          this.state.chest,
          this.state.waist,
          this.state.shoulder,

          this.state.arm,
          this.state.trouser_length,
          this.state.hips,

          this.state.collar_size,
          this.state.collar_type,
          this.state.shirt_style,
          this.state.arm_hole,
        ],
        (txObj, resultSet) => console.log("inserted"),

        (txObj, error) => console.log("Error", error)
      );
    });
    this.props.navigation.navigate("Tabs");
  };
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      collar_type: index,
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
              onChangeText={(waist) => this.setState({ waist })}
            />
            <TextInput
              style={styles.formLabel}
              label="شرٹ لمبائي"
              mode="outlined"
              value={this.state.chest}
              onChangeText={(chest) => this.setState({ chest })}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="تیرہ"
              value={this.state.shoulder}
              onChangeText={(shoulder) => this.setState({ shoulder })}
            />
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="بازو"
              value={this.state.arm}
              onChangeText={(arm) => this.setState({ arm })}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabeli}
              label="کالر"
              mode="outlined"
              value={this.state.collar_size}
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
              value={this.state.collar_size}
              onChangeText={(collar_size) => this.setState({ collar_size })}
            />
            <SegmentedControlTab
              values={["ڈبل سائیڈ", "سنگل سائیڈ"]}
              selectedIndex={this.state.collar_type}
              onTabPress={this.handleIndexChange}
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
              value={this.state.collar_size}
              onChangeText={(collar_size) => this.setState({ collar_size })}
            />
          </View>
          <View style={styles.formRow}>
            <SegmentedControlTab
              values={["سادہ", "گول", "نارمل"]}
              selectedIndex={this.state.collar_type}
              onTabPress={this.handleIndexChange}
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
              label="لمبائي"
              mode="outlined"
              value={this.state.shirt_style}
              onChangeText={(shirt_style) => this.setState({ shirt_style })}
            />
            <TextInput
              style={styles.formLabel}
              mode="outlined"
              label="پا نچا"
              value={this.state.arm_hole}
              onChangeText={(arm_hole) => this.setState({ arm_hole })}
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
              value={this.state.shirt_style}
              onChangeText={(shirt_style) => this.setState({ shirt_style })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              icon="person"
              mode="contained"
              style={{ width: "100%", height: 50, justifyContent: "center" }}
              onPress={() => this.newItem()}
            >
              Save
            </Button>
          </View>
          <View style={styles.formRow}>
            <Button
              icon="arrow-back"
              mode="contained"
              raised
              theme={{ roundness: 3 }}
              style={{ width: "100%", height: 50, justifyContent: "center" }}
              onPress={() => this.props.navigation.navigate("Tabs")}
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
export default withTheme(AddNew);

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
