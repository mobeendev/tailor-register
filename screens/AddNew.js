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
} from "react-native-paper";
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
      collar_type: false,
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
              value={this.state.firstname}
              onChangeText={(firstname) => this.setState({ firstname })}
            />
            <TextInput
              style={styles.formLabel}
              label="Last Name"
              value={this.state.lastname}
              onChangeText={(lastname) => this.setState({ lastname })}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Phone No."
              onChangeText={(contact) => this.setState({ contact })}
            />
          </View>

          <Subheading>Measurement</Subheading>
          <Divider />

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Chest"
              value={this.state.chest}
              onChangeText={(chest) => this.setState({ chest })}
            />
            <TextInput
              style={styles.formLabel}
              label="Waist"
              onChangeText={(waist) => this.setState({ waist })}
            />
            <TextInput
              style={styles.formLabel}
              label="Shoulder"
              value={this.state.shoulder}
              onChangeText={(shoulder) => this.setState({ shoulder })}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Arm"
              value={this.state.arm}
              onChangeText={(arm) => this.setState({ arm })}
            />
            <TextInput
              style={styles.formLabel}
              label="Trouser"
              onChangeText={(trouser_length) =>
                this.setState({ trouser_length })
              }
            />
            <TextInput
              style={styles.formLabel}
              label="Hips"
              value={this.state.hips}
              onChangeText={(hips) => this.setState({ hips })}
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Collar Size"
              value={this.state.collar_size}
              onChangeText={(collar_size) => this.setState({ collar_size })}
            />
            <Text>Style : </Text>
            <Text>Ban</Text>

            <RadioButton
              value="first"
              status={checked === "Ban" ? "checked" : "unchecked"}
              onPress={() => this.setState({ collar_type: "1" })}
            />
            <RadioButton
              value="second"
              status={checked === "Normal" ? "checked" : "unchecked"}
              onPress={() => this.setState({ collar_type: "0" })}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.formLabel}
              label="Shirt Style"
              value={this.state.shirt_style}
              onChangeText={(shirt_style) => this.setState({ shirt_style })}
            />
            <TextInput
              style={styles.formLabel}
              label="Arm Hole"
              value={this.state.arm_hole}
              onChangeText={(arm_hole) => this.setState({ arm_hole })}
            />
          </View>

          <View style={styles.formRow}>
            <Button
              icon="person"
              mode="contained"
              onPress={() => this.newItem()}
            >
              Save
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default AddNew;

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
  formItem: {
    flex: 1,
  },
});
