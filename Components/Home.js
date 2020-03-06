import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, TouchableHighlight, FlatList, ListItem } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './CaroselView';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import Event from './Event'
import MonthCarousel from './MonthCarousel'
import * as SecureStore from 'expo-secure-store';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Keep the data at the highest level and then
//have it flow to lower sub components.
var info={}
//converted to functional component
export default function Home() {
  //Screen really only has two states
  //Month and events
  January=Array(30).fill(0)
  February=Array(30).fill(0)
  March=Array(30).fill(0)
  April=Array(30).fill(0)
  May=Array(30).fill(0)
  June=Array(30).fill(0)
  July=Array(30).fill(0)
  August=Array(30).fill(0)
  September=Array(30).fill(0)
  October=Array(30).fill(0)
  November=Array(30).fill(0)
  December=Array(30).fill(0)

  //AssignIDs and formats dates
  function assignIDs(events) {
    return events.map((event, index) => {
      event.id = index;
      event.date = moment(event.date, 'DD-MM-YYYY hh:mm:ss');
      return event;
    });
  }

  ////Method that filters Events Pending
  function eventsPending(events) {
    return events.filter(event => {
      return event.accepted === undefined ? true : false;
    });
  }

  
    //console.log(info)
    //Rember to pass your pending events to the Carosel View.
    //Using the correct Prop.
    return (
      <View style={styles.container}>
      <View style={styles.container}>
      <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>  
        </View>
      </View>
    );
  }

function Feed({ navigation }) {
  var monDat=[]

  var DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const [events, setEvents] = useState({});
  const [month, setMonth] = useState({});
  


  useEffect(() => {
    fetchData();
  }, []);
 const fetchData = async () => {
    console.log("ok2 ")
  
  let response = await fetch(
  'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json');
  let parseObject = await response.json();
  console.log("ok fine")
  //Setup call set State,zzzz
  setEvents( parseObject);
  }
  async  function setMon(){
    console.log("pee poo")
    let mon = await SecureStore.getItemAsync('curMon')
    
    console.log("ok ok ok ok")
    console.log(monDat)

 }
  function renderbo({item}){
      if(item!=0)
        return (<Text>{item.title}</Text>)
      else{
        return (    <Button title="Add Event"/>
        )
      }
  }
 DATA=January
  return (
    <View>
      <View style={{ flex: 0,  flexDirection:'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'white' }}>
        <TouchableHighlight onPress={() => navigation.openDrawer()}>
          <Image  style={{resizeMode: 'center',width:50, height: 50}} source={require('../assets/menu.png')} />
        </TouchableHighlight>
        <Text>Din Din</Text>
        <Image  style={{resizeMode: 'center',width:50, height: 50}} source={require('../assets/search.png')}/>
      </View>
      <LinearGradient colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
        <MonthCarousel setMon={setMon}></MonthCarousel>
      </LinearGradient>
      <LinearGradient colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
        <CaroselView eventsData={events} setMon={setMon}></CaroselView>
      </LinearGradient>
      <Event/>
      <FlatList  data={January}  renderItem={renderbo}> </FlatList>
  </View>
  
  );    
       

  
  
    
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  }
});
