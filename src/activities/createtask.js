import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppStyles } from "../config/styles";

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, Fab  } from 'native-base';



const CreateTaskActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,}}
      >
 

            <Container>
                <Header />


                <Content />

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

export default CreateTaskActivity;