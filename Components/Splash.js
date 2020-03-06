import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Button } from 'react-native';
import moment from "moment";
import { NavigationContainer } from '@react-navigation/native';

export default class Splash extends React.Component{
  render(){
    return(<Image
          style={{width: '100%', height: '100%'}}
          source={require('../assets/SplashNavigation.png')}
        />
    );
}
}