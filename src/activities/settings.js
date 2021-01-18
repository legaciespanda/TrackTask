import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppStyles } from "../config/styles";

import { Container, Header, Content, Footer, FooterTab, 
  Icon, Text, Badge, Fab, Body, Title, Subtitle, Button,
   ListItem, Left, Right, Switch   } from 'native-base';

import { useNavigation } from '@react-navigation/native';

const SettingsActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,}}
      >
 

            <Container>
                <Header>
                   <Body>
                    <Title>Settings - TrackTask</Title>
                   </Body>
                 </Header>


                <Content>


                <ListItem icon style={{ marginTop: 20 }}> 
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main}}>
                      <Icon active name="newspaper" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>About</Text>
                  </Body>
                </ListItem>

                <ListItem icon style={{ marginTop: 20 }}>
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main }}>
                      <Icon active name="star" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Rate</Text>
                  </Body>

                </ListItem>

                <ListItem icon style={{ marginTop: 20 }}>
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main }}>
                      <Icon active name="person" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Invite Friends</Text>
                  </Body>
                </ListItem>

                <ListItem icon style={{ marginTop: 20 }}> 
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main }}>
                      <Icon active name="mail" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Contact</Text>
                  </Body>
                </ListItem>

                <ListItem icon style={{ marginTop: 20 }}>
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main }}>
                      <Icon active name="ios-arrow-down"/>
                    </Button>
                  </Left>
                  <Body>
                    <Text>Download Update</Text>
                  </Body>
                </ListItem>

                <ListItem icon style={{ marginTop: 20 }}>
                  <Left>
                    <Button style={{ backgroundColor: AppStyles.color.main }}>
                      <Icon active name="book" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Privacy Policy</Text>
                  </Body>
                </ListItem>

                </Content>

                <Footer>
                <FooterTab>
                    <Button onPress={() => navigation.navigate("HomeActivity") } active vertical>
                    <Icon name="ios-add-circle" />
                    <Text>Active Tasks</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate("CompletedTaskActivity") } vertical>
                    <Icon name="ios-checkbox" />
                    <Text>Completed</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate("SettingsActivity") } vertical>
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
  }
});

export default SettingsActivity;