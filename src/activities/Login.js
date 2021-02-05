import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
  Alert
} from "react-native";
import { AppStyles } from "../config/styles";

import axios from "axios";
import { login, task, logout } from "../api/endpoints";

import CustomLoader from '../components/loading';
import { TrackTaskConnected } from "../../src/config/Internet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Header, Content, Footer,
   FooterTab, Button, Icon, Text, Badge, Item , 
   Card, CardItem, Body,Input,Textarea, Form, Picker,Toast  } from 'native-base';




const LoginActivity = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [loadSpinner, setLoadSpinner] = useState(false);
    

    const _login = () => {
        let _data = {
            email: email,
            password: password,
            remember:"false"
        }
        
        const config = {
                method: "POST",
                body: JSON.stringify(_data),
                //headers: {"Content-type": "application/json; charset=UTF-8"}
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            }

        //check for internet access
        if(TrackTaskConnected){
            setLoadSpinner(true);
            setTimeout(() => {   
            fetch(login, config)
            .then((response) => response.json())
            .then((responseJson) => {
                // save the user ID to the state
                setUserID(responseJson.data.id);
                setName(responseJson.data.first_name + " " + responseJson.data.last_name)
                storeName(responseJson.data.first_name + " " + responseJson.data.last_name);
                storeUserID(responseJson.data.id);
                 setLoadSpinner(false);
                //getUserIdentity(responseJson.data.id);
                alert("Login Successful!");
                navigation.replace("HomeActivity");
                console.log(userID);
                console.log(name)
            })
            .catch((error) => {
                setLoadSpinner(false);
                alert("Error Logging in. Try Again!");
                console.log(error);
            });
            },5000);
        }
    }

    const storeUserID = async (value) => {
        await AsyncStorage.setItem('@user_id', value )
        .then( ()=>{
        console.log("It was saved successfully");
        } )
        .catch( ()=>{
        console.log("There was an error saving user Identity");
        } )
    }

     //save user name to storage
    const storeName = async (value) => {
        await AsyncStorage.setItem('@user_name', value)
        .then( ()=>{
        console.log("user name saved successfully");
        } )
        .catch( ()=>{
        console.log("There was an error saving user name");
        } ) 
    }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,}}
      >

        {loadSpinner ? <CustomLoader />: null}
 

            <Container>
                        <Image
                            source={require("../../assets/icon.png")}
                            style={{ width: "40%", resizeMode: "contain",height:"40%",  alignSelf:"center"}}
                        />
                        <Text style={styles.header}>Track-Task Login</Text>
              <Content padder>
                <Card>
                  <CardItem header>
                  
                    <Text style={{ textAlign:"center"}} >Please login to manage your task</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                    <Text>Email: </Text>
                      <Item regular>
                        <Input 
                          onChangeText={text => setEmail(text)}
                          value={email}
                          placeholder='Enter your email' />
                      </Item>

                    <Text style={{ marginTop:20}}>Password: </Text>
                      <Item regular>
                        <Input 
                          onChangeText={text => setPassword(text)}
                          value={password}
                          placeholder='Enter your password' />
                      </Item>

                    </Body>
                    
                  </CardItem>


                  <CardItem footer button>
                             <Button onPress={()=> _login()} block rounded style={{ flex: 1 }}>
                              <Text>Login to Track Task</Text>
                            </Button>

                  </CardItem>
                </Card>

              </Content>

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
    header: {
    fontSize: 35,
    color:  AppStyles.color.deepblue,
    fontWeight: "bold",
    textAlign:"center",
    marginTop:-50
  },
});

export default LoginActivity;