import React, { useEffect, Component, useState } from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  Image,
  Platform,
  Linking,
  Share,
} from "react-native";
import { AppStyles } from "../config/styles";

import {
  Container, Header, Content, Footer, FooterTab,
  Icon, Text, Badge, Fab, Body, Title, Subtitle, Button,
  ListItem, Left, Right, Switch
} from 'native-base';
import Communications from "react-native-communications";
// import { useNavigation } from '@react-navigation/native';
// import VersionCheck from 'react-native-version-check';


const SettingsActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);


  const shareWithFriends = () => {
    const inputValue =
      "Hello friends! Download Track Trace and install to access to the latest features";
    const titleVal = "TrackTrace";
    const urlVal = ""

    //Here is the Share API
    Share.share({
      title: titleVal.toString(),
      message: inputValue.toString(),
      url:urlVal,
    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
        }}
      >


        <Container>
          <Header>
            <Body>
              <Title>Settings - TrackTask</Title>
            </Body>
          </Header>


          <Content>

            <ListItem 
            onPress={() =>
              Alert.alert(
                "About TrackTrace",
                "A NubiaVille Limited App, built to increase work productivity and a performance appraisal tool \n\n Current Version: Beta-1.0",

                [
                  {
                    text: "Ok",
                    onPress: () => {
                      return null;
                    },
                  },
                ],
                { cancelable: false }
              )
            }
            icon style={ styles.listItem }>
              <Left>
                <Button
                 
                 style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="newspaper" />
                </Button>
              </Left>
              <Body>
                <Text>About</Text>
                <Subtitle style={styles.subtitle}>Learn more about the Track-Task App </Subtitle>
              </Body>
            </ListItem>

            <ListItem
             onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.nubiaville.tracktask&hl=en"
                );
              } else if (Platform.OS === "ios") {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.nubiaville.tracktask&hl=en"
                );
              }
            }}

             icon style={ styles.listItem }>
              <Left>
                <Button style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="star" />
                </Button>
              </Left>
              <Body>
                <Text>Rate</Text>
                <Subtitle style={styles.subtitle}>To help us improve, Please Rate our app </Subtitle>

              </Body>

            </ListItem>

            <ListItem 
              onPress={() => shareWithFriends()}
            icon style={ styles.listItem }>
              <Left>
                <Button style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="person" />
                </Button>
              </Left>
              <Body>
                <Text>Invite Friends</Text>
                <Subtitle style={styles.subtitle}>Share the App with Friends and Family </Subtitle>

              </Body>
            </ListItem>

            <ListItem icon style={ styles.listItem }>
              <Left>
                <Button style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="mail" />
                </Button>
              </Left>
              <Body>
                <Text  
                 onPress={() =>
                  Alert.alert(
                    "W'll like to Hear From You",
                    "Please choose your preffered method to get in contact with TrackTrace.",
                    [
                      {
                        text: "Send Email",
                        onPress: () => {
                          //send email
                          Communications.email(
                            ["support@nubiaville.onmicrosoft.com", "tech@nubiaville.onmicrosoft.com"],
                            null,
                            null,
                            "Contact Nubiavill Limited",
                            "Please write to us and we will resond in a short while"
                          );
                        },
                      },
      
                      {
                        text: "Phone Call",
                      
                        onPress: () => {
                          Communications.phonecall("+2348052067585", true);
                        },
                      },
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      { cancelable: true },
                    ],
                  )
                }
                >Contact</Text>
                <Subtitle style={styles.subtitle}>contact us if any issues, complains, etc</Subtitle>

              </Body>
            </ListItem>

            <ListItem icon style={ styles.listItem }>
              <Left>
                <Button style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="ios-arrow-down" />
                </Button>
              </Left>
              <Body>
                <Text 
                onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.nubiaville.tracktask&hl=en"
                );
              } else if (Platform.OS === "ios") {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.nubiaville.tracktask&hl=en"
                );
              }
            }}
            >Download Update</Text>
                <Subtitle style={styles.subtitle}>Check for updates </Subtitle>

              </Body>
            </ListItem>

            <ListItem icon style={ styles.listItem }>
              <Left>
                <Button style={{ backgroundColor: AppStyles.color.main }}>
                  <Icon active name="book" />
                </Button>
              </Left>
              <Body>
                <Text 
                onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(
                  "http://www.nubiaville.com"
                );
              } else if (Platform.OS === "ios") {
                Linking.openURL(
                  "http://www.nubiaville.com/"
                );
              }
            }}>Privacy Policy</Text>
                <Subtitle style={styles.subtitle}>Please read our Privacy Policy </Subtitle>

              </Body>
            </ListItem>

         

          </Content>

          <Footer>
            <FooterTab>
              <Button onPress={() => navigation.navigate("HomeActivity")} active vertical>
                <Icon name="ios-add-circle" />
                <Text>Active Tasks</Text>
              </Button>
              <Button onPress={() => navigation.navigate("CompletedTaskActivity")} vertical>
                <Icon name="ios-checkbox" />
                <Text>Completed</Text>
              </Button>
              <Button onPress={() => navigation.navigate("SettingsActivity")} vertical>
                <Icon name="ios-settings" />
                <Text>Setings</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  subtitle: {
    color: AppStyles.color.subtitle,
  },
  listItem: {
    marginTop: 20,
  }
});

export default SettingsActivity;