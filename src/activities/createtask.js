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



const CreateTaskActivity = ({ navigation }) => {

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

  const toggleSwitch = () => { 
    setIsEnabled(previousState => !previousState)
  
  };


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


//function for saving task
    const saveTask = ()=>{
      const dbRef = firebase.collection('Task');
      //const fdb = firebase.firestore();
      //fdb.enablePersistence({ synchorizeTabs: true });
      //check for internet connectivity
      if(TrackTaskConnected){
        //show spinner
        setLoadSpinner(true);
          //save data to firebase
              dbRef.add({
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
                  navigation.navigate('HomeActivity')
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
 

            <Container>
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
                          value={taskname}
                        placeholder='Enter task name' />
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
                            value={isEnabled}/>
                    </Body>
                    
                  </CardItem>
                  
                  <Text style={{ flex: 1, padding:18 }}>Task Priority:</Text>
                      <SelectInput style={{ flex: 1, padding:18,marginTop:-40 }}
                      onCancelEditing={() => console.log('onCancel')}
                      onSubmitEditing={onPriorityValueChange}
                       value={0} 
                       options={options} />


                     <Text style={{ flex: 1, padding:18 }}>Task Description:</Text>
                            <Form style={{ flex: 1, padding:18,marginTop:-40 }}>
                            <Textarea 
                            rowSpan={5} 
                            bordered 
                           onChangeText={text => setdescription(text)}
                           value={description}
                            placeholder="Please ener your task description..." />
                          </Form>


                  <CardItem footer button>
                             <Button onPress={saveTask} block rounded style={{ flex: 1 }}>
                              <Text>Create New Task</Text>
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
  }
});

export default CreateTaskActivity;