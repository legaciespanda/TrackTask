import React,{useState, useEffect} from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {AppRegistry} from 'react-native';
import { name as appName } from './app.json';

import { AppStyles } from "./src/config/styles";


//import spashscrren
import SplashScreen from './src/activities/splashactivity';
import HomeActivity from './src/activities/mainactivity';
import SettingsActivity from './src/activities/settings';
import LoginActivity from './src/activities/Login';
import CompletedTaskActivity from './src/activities/completed';
import EditTaskActivity from './src/activities/edittask';




import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();




const App  = () => {
  const [isReady, setIsReady] = useState(false);

  // the fonts when the app loads
   useEffect(() => {
     Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }, []);

  //render the view
return(
  //check if the fonts and assets has been loaded
  //if nit loaded properly, continue showing App loading screen
  //else shoe splash screen

      <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeActivity"
          component={HomeActivity}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SettingsActivity"
          component={SettingsActivity}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />

          <Stack.Screen
          name="LoginActivity"
          component={LoginActivity}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />

      <Stack.Screen
          name="EditTaskActivity"
          component={EditTaskActivity}
          // Hiding header for Splash Screen
      options={{
          title: 'Edit Task', //Set Header Title
          headerStyle: {
            backgroundColor: AppStyles.color.main, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
        />

        

        <Stack.Screen
          name="CompletedTaskActivity"
          component={CompletedTaskActivity}
          options={{headerShown: false}}
          // Hiding header for Splash Screen
      // options={{
      //     title: 'Completed Task', //Set Header Title
      //     headerStyle: {
      //       backgroundColor: AppStyles.color.main, //Set Header color
      //     },
      //     headerTintColor: '#fff', //Set Header text color
      //     headerTitleStyle: {
      //       fontWeight: 'bold', //Set Header text style
      //     },
      //   }}

        />

        

      </Stack.Navigator>
      </NavigationContainer>
)

    // isReady? <AppLoading />: <SplashScreen />)
}

export default App;
AppRegistry.registerComponent(appName, () => App);
