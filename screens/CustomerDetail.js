import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Avatar, DataTable, Button, Card, List } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LeftContent = (props) => <Avatar.Icon {...props} icon="person" />;

const CustomerDetail = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(true);

  const customer = navigation.getParam("customerInfo");

  console.log(customer);

  const handlePress = () => setExpanded(!expanded);

  return (
    <KeyboardAwareScrollView>
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
              <DataTable.Cell>شرٹ لمبائي</DataTable.Cell>
              <DataTable.Cell>{customer.shirt_length}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>تیرہ</DataTable.Cell>
              <DataTable.Cell>{customer.teerah}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>بازو</DataTable.Cell>
              <DataTable.Cell>{customer.arm}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>کالر</DataTable.Cell>
              <DataTable.Cell>{customer.collar_size}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>کالر ڈیزائن</DataTable.Cell>
              <DataTable.Cell>
                {customer.collar_type ? "Normal" : "Ban"}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>پاکٹ</DataTable.Cell>
              <DataTable.Cell>
                {customer.pocket_type ? "single" : "double"}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>گھیرا لمبائي</DataTable.Cell>
              <DataTable.Cell>{customer.shirt_bottom_length}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell> گھیرا ڈیزائن</DataTable.Cell>
              <DataTable.Cell>{customer.shirt_bottom_type}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell> شلوار لمبائي</DataTable.Cell>
              <DataTable.Cell>{customer.trouser_length}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell> پا نچا </DataTable.Cell>
              <DataTable.Cell>{customer.trouser_opening}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <List.Accordion
            title="  مزید معلومات "
            left={(props) => <List.Icon {...props} icon="question-answer" />}
          >
            <List.Item title="...." />
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
    </KeyboardAwareScrollView>
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
