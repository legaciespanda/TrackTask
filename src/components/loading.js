import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from "react-native";

const customLoader = ()=>{

    return(
        <Image source={require('../../assets/loading.gif')}
          style={{ width: "90%", resizeMode: "contain", margin: 5 }}
           />
    );

}
export default customLoader;