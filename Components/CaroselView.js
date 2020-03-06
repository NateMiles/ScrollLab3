import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import InvitationCard from './InvitationCard';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
var set=true

export default function CaroselView(props) {
  const [events, setEvents] = useState(0);
  let deviceWidth = Dimensions.get('window').width;


  this.carouselRef = {}; 
  useEffect(() => {
    let initData=()=>{
     // console.log(props.eventsData)
      //setEvents(props.eventsData)
      //console.log(events)
    }
    initData();
    //console.log(events)
  }, []);

  function renderItem({ item, index }) {
    //Render invitation

      return (
        <View style={styles.card}>
        <InvitationCard event={item} clickDec={()=>{
              console.log("ok")
             // console.log(events)
              const updatedItems = events.filter( (_item, itemIndex) => itemIndex !== index)
              setEvents(updatedItems)}}
              clickAcc={async ()=>{
                console.log("ok")
                //console.log(events)
                let mon = await SecureStore.getItemAsync('curMon')
                console.log(mon)
                let monDat = await SecureStore.getItemAsync(mon)
                props.setMon()
                }}/>
      </View>
     
  );  
  }
if(props.eventsData.length > 0){
  console.log(set)
  if(set===true){
    setEvents(props.eventsData)
    set=false
    console.log("set")
    console.log(events)

  }
  console.log(props.eventsData)
  return (
    <View style={styles.container}>
      <Carousel
        ref={ (c) => { this._carousel = c; } }
        data={events}
        renderItem={renderItem}
        sliderHeight={200}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth *0.8}
        />
    </View>
  );
}
return(<View/>)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 170,
    paddingTop: 15,
  },
  card:{
    borderColor: 'black'
  }
});
