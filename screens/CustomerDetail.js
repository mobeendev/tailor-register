import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Avatar, DataTable, Button, Card, List } from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

const CustomerDetail = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(true);

  const customer = navigation.getParam("customerInfo");

  console.log(customer);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Card>
      <Card.Title
        title={customer.firstname + " " + customer.lastname}
        subtitle={"cust@-" + customer.id}
        left={LeftContent}
      />
      <Card.Content>
        <DataTable
          style={{
            justifyContent: "space-around",
          }}
        >
          <DataTable.Header
            style={{
              justifyContent: "space-between",
              alignContent: "center",
              backgroundColor: "",
              size: 44,
            }}
          >
            <DataTable.Title size="33">Measurement</DataTable.Title>
            <DataTable.Title>Values</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Chest</DataTable.Cell>
            <DataTable.Cell>{customer.contact}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Shoulder</DataTable.Cell>
            <DataTable.Cell>{customer.arm}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Leg</DataTable.Cell>
            <DataTable.Cell>{customer.collar_size}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Collar Type</DataTable.Cell>
            <DataTable.Cell>
              {customer.collar_type ? "Normal" : "Ban"}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Trouser</DataTable.Cell>
            <DataTable.Cell>{customer.trouser_length}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Waist</DataTable.Cell>
            <DataTable.Cell>{customer.waist}</DataTable.Cell>
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
            color="red"
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
            Add to Orders
          </Button>
        </View>
      </Card.Actions>
    </Card>
  );
};

CustomerDetail.navigationOptions = ({ navigation }) => {
  const customer = navigation.getParam("customerInfo");

  return {
    title: "Customer Detail",
    headerRight: () => (
      <TouchableOpacity>
        <FontAwesome5
          name="edit"
          size={24}
          color="black"
          onPress={() => {
            navigation.navigate("Update", {
              customerInfo: customer,
            });
          }}
        />
      </TouchableOpacity>
    ),
    // headerLeft: () => (
    //   <TouchableOpacity>
    //     <Entypo
    //       name="home"
    //       size={30}
    //       color="black"
    //       onPress={() => navigation.navigate("Tabs")}
    //     />
    //   </TouchableOpacity>
    // ),
  };
};

export default CustomerDetail;

const styles = StyleSheet.create({});
