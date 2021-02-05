// Import React and Component
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text, Alert } from 'react-native';
import { AppStyles } from "../config/styles";

// import HomeActivity from './src/activities/mainactivity';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { checklogin } from "../api/endpoints";

import { TrackTaskConnected } from "../../src/config/Internet";


const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [userIdentity, setUserIdentity] = useState(0);

  //afetr loading the splash screen for 5 seconds, take the user to the main activity
    useEffect(()=>{
         // _checkLogin();
        
        setTimeout(() => {
          setAnimating(false);
           getUserID();
            //!loggedIn ? navigation.replace("LoginActivity"): navigation.replace("HomeActivity");
            userIdentity == null || isEmpty(userIdentity) || userIdentity == "" || userIdentity == undefined ? navigation.replace("LoginActivity"): navigation.replace("HomeActivity");
            //navigation.replace("HomeActivity");
        }, 6000);
    }, [])


    //function to check if a string is empty
    const isEmpty = (str) => {
        return (!str || 0 === str.length);
    }

    //get user ID from asyn storage library
    const getUserID = async () => {
        await AsyncStorage.getItem('@user_id')
        .then( (val)=>{
          setUserIdentity(val);
        console.log("user Id gooten now", val);
        } )
        .catch( ()=>{
        console.log("There was an error geting the ID");
        } )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Initializing TrackTask...</Text>
      <Image
        source={require("../../assets/loading.gif")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />

      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  header: {
    fontSize: 20,
    color:  AppStyles.color.deepblue,
    fontWeight: "bold",
    paddingVertical: 14,
  },
});

