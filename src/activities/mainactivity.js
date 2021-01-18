import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppStyles } from "../config/styles";

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, Fab , Body, Title, Subtitle} from 'native-base';


import CustomLoader from '../components/loading';
import { useNavigation } from '@react-navigation/native';

const HomeActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);
   const [activeTask, setActiveTask] = useState(true);


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
                    <Title>Track Task</Title>
                   </Body>
                 </Header>
            
           {activeTask?           <Button style={{ backgroundColor: '#5067FF',  marginTop:300, marginStart:30}} rounded success>
            <Text>Sorry There is no Active Task Now</Text>
          </Button>: null}

            {/* <CustomLoader /> */}

                <Content />

                          <Fab
                            active={active}
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#5067FF'}}
                            position="topRight"
                            onPress={() => setActive(true) }>
                            <Icon name="ios-add-circle" />
                        </Fab>

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

export default HomeActivity;