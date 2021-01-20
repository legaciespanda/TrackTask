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
import { useNavigation } from '@react-navigation/native';

import { TrackTaskConnected } from "../../src/config/Internet";

import firebase from '../config/fb';

const HomeActivity = ({ navigation }) => {

  const [active, setActive] = useState(true);
   const [activeTask, setActiveTask] = useState(true);
   const [loadSpinner, setLoadSpinner] = useState(false);

   const [Task, setTask] = useState([]);


   //get task data from firebase after 6  seconds
       useEffect(()=>{
        setLoadSpinner(true);
          setTimeout(() => {
                  //show spinner
        setLoadSpinner(false);
            getTask();
            console.log(Task);
        }, 8000);
    }, [])

  //retreieves task from the remote server (Firebase)
   const getTask = ()=>{
     const dbRef = firebase.collection('Task');
     //check for internet connection
        if(TrackTaskConnected){ 
      dbRef.onSnapshot(data => getCollection(data))
      }else{
        Alert.alert(
              "Error in Internet Connection",
              "To create task, you must be connected to a Wi-Fi or turn on data",
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

   //a callback function to get returned data from getTask method
   const getCollection = (querySnapshot) => {
    const taskArr = [];
    querySnapshot.forEach((res) => {
      const { taskname, startdate, completetionstatus, priority, taskdescription} = res.data();
      taskArr.push({
        key: res.id,
        taskname,
        startdate,
        completetionstatus,
        priority,
        taskdescription
      });
      //save the data to setTask state hook as an array
      setTask(filterCompletedTrackTask(taskArr));
   });
  }


    //filter uncompleted task
  const filterCompletedTrackTask = (val)=>{
    const filteredResult = val.filter((tt) => tt.completetionstatus === false);
    return filteredResult; 
  }

  //for testing purpose
//   const ff = [{
//       taskname:"Ernest",
//       taskdescription: "Ernest 345",
//       taskdescription:false
//   },
// {
//       taskname:"Ernest",
//       taskdescription: "Ernest 345",
//       taskdescription:false
//   },
// {
//       taskname:"Ernest",
//       taskdescription: "Ernest 345",
//       taskdescription:false
//   },
// {
//       taskname:"Ernest",
//       taskdescription: "Ernest 345",
//       taskdescription:false
//   }];

//fuunctional component to delete task from database
 const deleteTask = (taskID)=> {
   //check for internet before making request for deleting task
   if(TrackTaskConnected){
    const dbRef = firebase.collection('Task').doc(taskID)
      dbRef.delete().then((res) => {
        //show toast
              Toast.show({
                text: "Task Deleted Successfully!",
                buttonText: "Okay",
                duration: 3000
              })
          console.log('Item removed from database')
      }) } else{
                Alert.alert(
              "Error in Internet Connection",
              "To delete task, you must be connected to a Wi-Fi or turn on data",
              [
                {
                  text: "Ok",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
      }
  }

  const deleteTaskYes = (taskID)=>{
        Alert.alert(
              "Delete Task!",
              "Are you really sure you want to delete task?",
              [
                {
                  text: "No",
                  onPress: () => null,
                  style: "cancel",
                },
                { text: "Yes", onPress: () => deleteTask(taskID) },
              ],
              { cancelable: false }
            );
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
                    <Title>Track Task</Title>
                   </Body>
                 </Header>

                  {/** show loading spinner when fetching task data from firebase */}
                  {loadSpinner ? <CustomLoaderMiddle />: null}


            {/** if an array of Task is empty (i.e if nothing is fetched from firebase), display a message */}
           {!Task.length || Task == undefined ?      <Button style={{ backgroundColor: '#5067FF',  marginTop:300, marginStart:30}} rounded success>
            <Text>{`${loadSpinner?"Retrieving Task...":"Sorry There is no Active Task Now"}`}</Text>
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
                              <Text note>{`${item.taskname}`}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem cardBody>
                              <Text style={{marginStart: 80,flex: 1}} >{`${item.taskdescription}`}</Text>
                          {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/> */}
                        </CardItem>
                        <CardItem  footer bordered>
                          <Left>
                            <Button success>
                              <Icon active name="ios-document" />
                            </Button>
                          </Left>
                          <Body>
                            <Button 
                            onPress={  () => deleteTaskYes(item.key)}
                             danger>
                              <Icon active  name="ios-close" />
                            </Button>
                          </Body>
                          <Right>
                          {/** change completion status text color based on  */}
                          {item.completetionstatus == false ? <Text style={{color: "#FF0000",flex: 1}} danger>UnCompleted</Text>: <Text style={{color: "#00FF00",flex: 1}}>Completed</Text>}
                            
                          </Right>
                        </CardItem>
                      </Card>)}
                        />
  
                </Content>



                          <Fab
                            active={active}
                            direction="up"
                            containerStyle={{ }}
                            style={{ backgroundColor: '#5067FF'}}
                            position="topRight"
                            onPress={() => navigation.navigate("CreateTaskActivity") }>
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