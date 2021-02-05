import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import { AppStyles } from "../config/styles";

import { Container, Header, Content, Footer,
   FooterTab, Button, Icon, Text, Badge, Fab ,
    Body, Title, Subtitle,  Card, CardItem, Thumbnail, Left, Right, Toast, Textarea} from 'native-base';


import CustomLoaderMiddle from '../components/loader2';

import { TrackTaskConnected } from "../../src/config/Internet";

import { task, logout } from "../api/endpoints";

import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedTaskActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);
   const [activeTask, setActiveTask] = useState(true);
   const [loadSpinner, setLoadSpinner] = useState(false);
    const [userIdentity, setUserIdentity] = useState(0);
   const [Task, setTask] = useState([]);


   //get task data from firebase after 6  seconds
       useEffect(()=>{
        setLoadSpinner(true);
          setTimeout(() => {
            getTask();
            getUserID();
                  //show spinner
        setLoadSpinner(false);
            //getTask();
            console.log(Task);
        }, 8000);
    }, [])

  //retreieves task from the backend server (Track Task Admin)
   const getTask = ()=>{
     //check for internet connection
        if(TrackTaskConnected){ 
        const config = {
                method: "GET",
                //headers: {"Content-type": "application/json; charset=UTF-8"}
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            }
            fetch(task, config)
            .then((response) => response.json())
            .then((responseJson) => {
              //save destructured data in array
              const taskArr = [];
                //get each json obbject
                responseJson.data.forEach((res) => {
                  //destructure the data
                    const { id, status, title, description, due_date} = res;
                    taskArr.push({
                      key: id,
                      //val: responseJson.data
                      status,
                      title,
                      description,
                      due_date
                    });
                });
              //save to state
              setTask(filterCompletedTrackTask(taskArr));
              //setTask(responseJson.data);
                console.log("Data in State",Task);
            })
            .catch((error) => {
                console.error(error.message);
            });
      }else{
        Alert.alert(
              "Error in Internet Connection",
              "To see completeted task, you must be connected to a Wi-Fi or turn on data",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Yes", onPress: () => null },
              ],
              { cancelable: false }
            );
        }
   }

         const _logout = () => {
        
        const config = {
                method: "POST",
                //headers: {"Content-type": "application/json; charset=UTF-8"}
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            }

        //check for internet access
        if(TrackTaskConnected){
            setTimeout(() => {   
            fetch(logout, config)
            .then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                //clear user ID from async storage
                clearUserID()
                navigation.replace("LoginActivity");
            })
            .catch((error) => {
                console.error(error);
            });
            },3000);
        }
    }

       const _logoutPrompt = () =>{
              Alert.alert(
              "Log Out!",
              "Are you sure you really want to log out from Track Task?",
              [
                {
                  text: "No",
                  onPress: () => null,
                  style: "cancel",
                },
                { text: "Yes", onPress: () => _logout() },
              ],
              { cancelable: false }
            );
    }

    //clear user ID after log out
    //   const clearUserID = () => {
    //         AsyncStorage.setItem('@user_id', "")
    //         console.log("User data successfully cleard");
    // }

    const clearUserID = async () => {
        await AsyncStorage.clear().
        then( (val)=>{
        console.log("loged out successfully", val);
        } )
        .catch( ()=>{
        console.log("There was an error logging ou");
        } )
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

    //filter complete task based on the currently logged in user and 
    //task completion status
  const filterCompletedTrackTask = (val)=>{
    const filteredResult = val.filter((tt) => tt.key == userIdentity && tt.status == "done");
    return filteredResult; 
  }




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
                    <Title>Completed Task - Track-Task</Title>
                   </Body>
                 </Header>

                  {/** show loading spinner when fetching task data from firebase */}
                  {loadSpinner ? <CustomLoaderMiddle />: null}


            {/** if an array of Task is empty (i.e if nothing is fetched from firebase), display a message */}
           {!Task.length || Task == undefined ?      <Button style={{ backgroundColor: '#5067FF',  marginTop:300, marginStart:30}} rounded success>
            <Text>{`${loadSpinner?"Retrieving Task...":"You Have No Completed Task Yet"}`}</Text>
          </Button>: null}

            {/* <CustomLoader /> */}

            

                <Content>

                        <FlatList 
                          data={Task}
                          renderItem={({ item, index }) =>  (                           
                            <Card>
                        <CardItem>
                          <Left>
                            <Thumbnail source={require("../../assets/icon.png")} />
                            <Body>
                              <Text>Task Name</Text>
                              <Text note>{`${item.title}`}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem cardBody>
                              <Text style={{marginStart: 80,flex: 1}} >{`${item.description}`}</Text>
                          {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/> */}
                        </CardItem>
                        <CardItem  footer bordered>
                          <Left>
                          <Text note>Date Completed {`${item.due_date}`}</Text>
                          </Left>

                          <Body>
                          {/** change completion status text color based on  */}
                          {item.status === "todo" || item.status === "in review"  || item.status === "progress"  ? <Text style={{color: "#FF0000",flex: 1}} danger>UnCompleted</Text>: <Text style={{color: "#00FF00",flex: 1}}>Completed</Text>}
                            
                          </Body>
                        </CardItem>
                      </Card>)}
                        />
  
                </Content>


                <Footer>
                <FooterTab>
                    <Button onPress={() => navigation.replace("HomeActivity") } active vertical>
                    <Icon name="ios-add-circle" />
                    <Text>Tasks</Text>
                    </Button>
                    <Button onPress={() => navigation.replace("CompletedTaskActivity") } vertical>
                    <Icon name="ios-checkbox" />
                    <Text>Complete</Text>
                    </Button>
                    <Button onPress={() => _logoutPrompt() } vertical>
                    <Icon name="ios-power" />
                    <Text>Log Out</Text>
                    </Button>
                    <Button onPress={() => navigation.replace("SettingsActivity") } vertical>
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

export default CompletedTaskActivity;