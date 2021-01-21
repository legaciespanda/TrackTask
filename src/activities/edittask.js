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

import firebase from '../config/fb';

import CustomLoader from '../components/loading';
import { TrackTaskConnected } from "../../src/config/Internet";

import { Container, Header, Content, Footer,
   FooterTab, Button, Icon, Text, Badge, Item , 
   Card, CardItem, Body,Input,Textarea, Form, Picker,Toast  } from 'native-base';

   import DateTimePicker from '@react-native-community/datetimepicker';

   
  //import DropDownPicker from 'react-native-dropdown-picker';
   //import  { Picker as Select }  from '@react-native-picker/picker';

   import SelectInput from 'react-native-select-input-ios';



const EditTaskActivity = (props) => {

  const [active, setActive] = useState(true);

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [priority, setPriority] = useState("");
  const [description, setdescription] = useState("");
   const [taskname, setTaskName] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const [loadSpinner, setLoadSpinner] = useState(false);
  const [Task, setTask] = useState([]);

  const toggleSwitch = () => { 
    setIsEnabled(previousState => !previousState)
  
  };


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


  //when the value of date changes, it's been saved the state hook
    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  //saves the value of task priority to state hook
    const onPriorityValueChange = (value) =>{
        setPriority(value);
  }

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  //set the date mode to ''date'' - meaning it will show only date both IOS AND ANDROID
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    //priority configurations for task
     const options =  [
      {value: 'Low', label: 'Low'},
      {value: 'Medium', label: 'Medium'},
      {value: 'High', label: 'High'},
    ];


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
      //filter updat task daa based on the ID(trackkey) passed during navigation
      const filteredResult = taskArr.filter((tt) => tt.key === props.route.params.trackkey);
      //save the data to setTask state hook as an array
      setTask(filteredResult);
   });
  }


    //filter updat task daa based on the ID(trackkey) passed during navigation
//   const filterUpdateTaskData = (val)=>{
//     const filteredResult = val.filter((tt) => tt.key == (props.route.params.trackkey));
//     return filteredResult; 
//   }



//function for saving edited task
    const updateTask = ()=>{
      const dbRef = firebase.collection('Task').doc(props.route.params.trackkey);
    //   console.log(props.route.params.trackkey);
      //const fdb = firebase.firestore();
      //fdb.enablePersistence({ synchorizeTabs: true });
      //check for internet connectivity

      if(TrackTaskConnected){
        //show spinner
        setLoadSpinner(true);
          //save data to firebase
              dbRef.set({
                  taskname: taskname,
                  startdate: date,
                  completetionstatus: isEnabled,
                  priority: priority,
                  taskdescription: description

                }).then((res) => {
                  //when added successfully clear the state
                    setTaskName(""),
                    setDate(""),
                    setIsEnabled(false),
                    setPriority(""),
                    setdescription("")
                  //navigate to home activity
                  props.navigation.navigate('HomeActivity')
                })
                .catch((err) => {
                  console.error("Error found: ", err);
                  Alert.alert("Error found: ", err);
                });
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



  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,}}
      >

        {loadSpinner ? <CustomLoader />: null}
        {Task.map((item, i) => {          return  (<Container>
              <Content padder>
              
                <Card>
                  <CardItem header>
                    <Text>Please fill the form to create a news task</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                    <Text>Task Name: </Text>
                      <Item regular>
                        <Input 
                          onChangeText={text => setTaskName(text)}
                            autoCorrect={false}
                          value={item.taskname}
                        />
                      </Item>


                      {/* <Picker
                        selectedValue={priority}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                          setPriority(itemIndex)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker> */}




                       <Text style={{ flex: 1 }} >Start Date</Text>
                        <Text> {`${date}`}</Text>
                       <Button block style={{ flex: 1, padding:18,marginTop:20 }} 
                       onPress={showDatepicker}>
                         <Text>Select date </Text>
                         
                       </Button>

                      {/* <Button block style={{ flex: 1, padding:18,marginTop:20 }} onPress={showDatepicker}>
                         <Text>End Date</Text>
                       </Button> */}


                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                          />
                        )}

                        {/* {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onEndChange}
                          />
                        )} */}
                        <Text style={{ flex: 1, marginTop:18 }}>Completeion Status </Text>
                            <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={item.completetionstatus}/>
                    </Body>
                    
                  </CardItem>
                  
                  <Text style={{ flex: 1, padding:18 }}>Task Priority:</Text>
                      <SelectInput style={{ flex: 1, padding:18,marginTop:-40 }}
                      onCancelEditing={() => console.log('onCancel')}
                      onSubmitEditing={onPriorityValueChange}
                       value={item.priority} 
                       options={options} />


                     <Text style={{ flex: 1, padding:18 }}>Task Description:</Text>
                            <Form style={{ flex: 1, padding:18,marginTop:-40 }}>
                            <Textarea 
                            rowSpan={5} 
                            bordered 
                           onChangeText={text => setdescription(text)}
                           value={item.taskname}
                             />
                          </Form>


                  <CardItem footer button>
                             <Button onPress={()=> updateTask()} block rounded style={{ flex: 1 }}>
                              <Text>Update Task</Text>
                            </Button>
                  </CardItem>
                </Card>

              </Content>

            </Container>)})}



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

export default EditTaskActivity;