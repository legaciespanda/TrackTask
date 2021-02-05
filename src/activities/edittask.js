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


import CustomLoader from '../components/loading';
import { TrackTaskConnected } from "../../src/config/Internet";

import { Container, Header, Content, Footer,
   FooterTab, Button, Icon, Text, Badge, Item , 
   Card, CardItem, Body,Input,Textarea, Form, Picker,Toast  } from 'native-base';

   import DateTimePicker from '@react-native-community/datetimepicker';

   
  //import DropDownPicker from 'react-native-dropdown-picker';
   //import  { Picker as Select }  from '@react-native-picker/picker';

   import SelectInput from 'react-native-select-input-ios';

   import { task, edittask } from "../api/endpoints";



const EditTaskActivity = (props) => {

  const [priority, setPriority] = useState("");


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

  //saves the value of task priority to state hook
    const onPriorityValueChange = (value) =>{
        setPriority(value);
  }


    //priority configurations for task
     const options =  [
      {value: 'todo', label: 'Todo'},
      {value: 'in progress', label: 'In Progress'},
      {value: 'review', label: 'Review'},
      {value: 'done', label: 'Done'},
    ];



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
                    const { id, status, title, description, due_date, start_date, date_created} = res;
                    taskArr.push({
                      key: id,
                      //val: responseJson.data
                      status,
                      title,
                      description,
                      due_date,
                      start_date,
                      date_created
                    });
                });
              //save to state
              setTask(filterTask(taskArr));
              //setTask(responseJson.data);
                console.log("Data in State",Task);
            })
            .catch((error) => {
                console.error(error.message);
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

     //filter task based on the currently logged in user
  const filterTask = (val)=>{
    const filteredResult = val.filter((tt) => tt.key == props.route.params.trackkey);
    return filteredResult; 
  }

   
//function for saving edited task
    const updateTask = ()=>{
        let _data = {
            status: priority,
        }
        
        const config = {
                method: "PUT",
                body: JSON.stringify(_data),
                //headers: {"Content-type": "application/json; charset=UTF-8"}
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            }

        //check for internet access
        if(TrackTaskConnected){
            setTimeout(() => {   
              //e.g http://tracktask.megtrix.com/api/v1/task/edittask/1/
            fetch(edittask+props.route.params.trackkey+"/", config)
            .then((response) => response.json())
            .then((responseJson) => {
                alert("Task Successfully Updated!")
                props.navigation.replace("HomeActivity");
                console.log(responseJson);
            })
            .catch((error) => {
              alert("Error!", error)
                console.error(error);
            });
            },3000);
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
                    <Text>If you've completed this task, set the Task Status to 'Done' and update</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                    <Text>Task Name: </Text>
                      <Item regular>
                        <Input 
                        disabled = {true}
                          value={item.title}
                        />
                      </Item>



                       <Text style={{ flex: 1 , marginTop:15}} >Start Date</Text>
                       <Item regular>
                        <Text> {`${item.start_date}`}</Text>
                       </Item>
                        

                       <Text style={{ flex: 1, marginTop:15 }} >Date Created</Text>
                       <Item regular>
                          <Text> {`${item.date_created}`}</Text>
                       </Item>
                        

                        <Text style={{ flex: 1 , marginTop:15}} >Due Date</Text>
                        <Item regular>
                          <Text> {`${item.due_date}`}</Text>
                        </Item>

                    </Body>
                    
                  </CardItem>
                  
                  <Text style={{ flex: 1, padding:18 }}>Task Status:</Text>
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
                            disabled = {true}
                           value={item.description}
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