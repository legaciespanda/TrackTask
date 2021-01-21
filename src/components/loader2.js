import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from "react-native";

const CustomLoaderMiddle = ()=>{

    return(
        <Image source={require('../../assets/loading.gif')}
          style={{ width: "100%", resizeMode: "contain", marginTop:200}}
           />
    );

}
export default CustomLoaderMiddle;