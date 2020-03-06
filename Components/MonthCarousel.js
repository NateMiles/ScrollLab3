import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import InvitationCard from './InvitationCard';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';

var set=true

export default function MonthCarousel(props) {
  const [events, setEvents] = useState(0);
  let deviceWidth = Dimensions.get('window').width;

  var months=["January","February","March","April","May","June","July","August",'September',"October","November","December"]
 
  changeIndex =async (currentIndex) => {
   console.log({ currentIndex });
    SecureStore.setItemAsync("curMon", months[currentIndex])
    console.log("ok ok ok 2")

    props.setMon()
    console.log("ok ok ok")
  }
  function renderItem({ item, index }) {
    //Render invitation

      return (
        <View style={styles.card}>
       <Text clickDec={()=>{
              console.log("ok")              
                }}>{item} </Text>
      </View>
     
  );  
  }


  return (
    <View style={styles.container}>
      <Carousel
        ref={ (c) => { this._carousel = c; } }
        data={months}
        renderItem={renderItem}
        sliderHeight={50}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth *0.23}
        onSnapToItem={this.changeIndex}
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingTop: 15,
  },
  card:{
    borderColor: 'black'
  }
});
