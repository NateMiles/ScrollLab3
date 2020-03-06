import * as React from 'react';
import { Text, View, StyleSheet,Button, Alert, Image, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './Components/CaroselView';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import Home from "./Components/Home"
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import Splash from './Components/Splash'

import { logInWithReadPermissionsAsync } from 'expo-facebook';
//Keep the data at the highest level and then
//have it flow to lower sub components.

//converted to functional component
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, token: null, splash:true };
  }

  componentWillMount(){
    this.checkForToken()
  }
  


  //Check Async Storage if token is available
  //If it is available set loading state to false 
  async checkForToken(){
     let token = await SecureStore.getItemAsync('token')
     console.log(token)
    this.setState({
      token: token,
      loading: false
    })
  }

  //Write token to secure storage. 
  async saveTokenToSecureStorage(token){
     SecureStore.setItemAsync("token", token)
     this.setState({
       token: token
     })
  }
  update(){
          setTimeout(function () {
  this.setState({splash: false});
}.bind(this), 2000)
  }


  render() {
    if(this.state.splash===true){
      this.update()
    }
    if(this.state.splash===true){
      return(<Splash/>)
    }
    if(this.state.loading === true){
      return(<Text>loading</Text>)
    }else if(this.state.token === null){
    return (
        <View style={styles.container}>
          <Image
          style={{width: '90%', height: '70%'}}
          source={require('./assets/DinDin.png')}
        />
         <TouchableHighlight onPress={() => this.logIn()} style={styles.fb}>
    <Text style={styles.text}>Login with Facebook</Text>
</TouchableHighlight>
        </View>
      );
    }
    else{
      return(<Home/>)
    }
  }

  async logIn() {
    try {
      //Seed documentation on course site at mobileappdev.teachable.com
      //For default user names and passwords.
      await Facebook.initializeAsync('194383948471474');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        this.saveTokenToSecureStorage(token)
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap:'wrap'
  },
  fb:{
    backgroundColor:'#15A4FF',
    width:'100%',
    height:'5%',
    alignSelf:'flex-end'
    
  },
  text:{
    textAlign: 'center',
    alignContent:'center',
    color:'white'
  }
});
