import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Button } from 'react-native';
import moment from "moment";
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';


//Build out the invitation card component. 
//It will be passed 3 props: 
// prop.pic : last part of the url associated with the picture
//prop.name : the Name of person
//prop.date: The Date of the event
export default function InvationCard(props) {
  let imageBase =
    'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

  //Implement the format Date function
  function formatDate(date) {
    var monthNames = ["",
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    var res = date.split(",");
    let ret=""
    ret+=res[0]
    var dateS=res[1].split("/")
    ret+=dateS[0]+" "
    ret+=monthNames[dateS[1]]+" - "
    var time=res[2].split(":")
    var amPm="am"
    if(time[0]>12){
      time[0]=time[0]-12;
      amPm="pm"
    }
    ret+=time[0]+":"+time[1]+amPm
    return ret
  }
  
  return (
    <View style={styles.container}>
        <Image source={{uri:"https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/"+props.event.pic}} style={{width: 50, height: 50,margin:10}}/>
        <View> 
        <Text>{props.event.name}</Text>
        <Text style={{color:"grey"}}>{formatDate(props.event.date)}</Text>
      </View>
      <View
        style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignSelf:'stretch',
        width:'100%'
      }}
      />  
    <Button title="Decline" onPress={props.clickDec}/>
    <Button title="Accept"  onPress={props.clickAcc}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFFFFF',
    width: 315,
    height: 133,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  }
});
