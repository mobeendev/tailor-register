import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { List, Colors } from "react-native-paper";
import { CustomerDataContext } from "../context/CustomerData";
import { withNavigation } from "react-navigation";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CustomerListItem = ({ item, navigation }) => {
  const Customercontext = useContext(CustomerDataContext);

  const onPress = (e) => {
    console.log("log", Customercontext);
  };

  return (
    <TouchableOpacity
      style={{ marginBottom: 15 }}
      onPress={() => {
        navigation.navigate("Customer", {
          itemId: 86,
          otherParam: "anything you want here",
        });
      }}
    >
      <Card>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            borderWidth: 0,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <View style={{width:70,height:70 , backgroundColor:'orange',margi÷nLeft:5}}> */}
          <View
            style={{
              flexDirection: "row",
              borderColor: "black",
              borderWidth: 0,
            }}
          >
            <Avatar.Image
              size={60}
              style={{ borderColor: "red", borderWidth: 0 }}
            />
            {/* </View> */}

            <View style={{ borderColor: "red", borderWidth: 0 }}>
              <Card.Content>
                <Title>
                  {item.firstname} {item.lastname}
                </Title>
                <Paragraph>{item.contact}</Paragraph>
              </Card.Content>
            </View>
          </View>
          <View
            style={{
              borderColor: "green",
              borderWidth: 0,
            }}
          >
            <List.Icon color={Colors.grey500} icon="chevron-right" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default withNavigation(CustomerListItem);

const styles = StyleSheet.create({});
