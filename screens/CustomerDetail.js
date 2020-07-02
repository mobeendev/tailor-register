import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CustomerDataContext } from "../context/CustomerData";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Avatar,
  DataTable,
  Button,
  Card,
  List,
  BottomNavigation,
  Text,
  Title,
  Paragraph,
} from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

const CustomerDetail = ({ navigation }) => {
  console.log(navigation);
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Paragraph>Measure Information</Paragraph>

        <DataTable
          style={{
            justifyContent: "space-around",
          }}
        >
          <DataTable.Header
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "gray",
            }}
          >
            <DataTable.Title size="33">Measurement</DataTable.Title>
            <DataTable.Title>Values</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Shoulder</DataTable.Cell>
            <DataTable.Cell>159</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Arm Length</DataTable.Cell>
            <DataTable.Cell>129</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Leg</DataTable.Cell>
            <DataTable.Cell>159</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Collar</DataTable.Cell>
            <DataTable.Cell>Ban</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Collar</DataTable.Cell>
            <DataTable.Cell>Ban</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Collar</DataTable.Cell>
            <DataTable.Cell>Ban</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <List.Accordion
          title="Extra Info / Comments"
          left={(props) => <List.Icon {...props} icon="question-answer" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Button
            color="orange"
            icon="delete"
            mode="outlined"
            onPress={() => console.log("Pressed")}
          >
            Remove
          </Button>
          <Button
            icon="work"
            color="green"
            mode="outlined"
            onPress={() => console.log("Pressed")}
          >
            Send to Orders
          </Button>
        </View>
      </Card.Actions>
    </Card>
  );
};

CustomerDetail.navigationOptions = ({ navigation }) => {
  return {
    title: "Customer Detail",
    headerRight: () => (
      <TouchableOpacity>
        <FontAwesome5
          name="edit"
          size={24}
          color="black"
          onPress={() => navigation.navigate("Tabs")}
        />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity>
        <Entypo
          name="home"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Tabs")}
        />
      </TouchableOpacity>
    ),
  };
};

export default CustomerDetail;

const styles = StyleSheet.create({});
