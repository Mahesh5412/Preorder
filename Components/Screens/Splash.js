import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation'
import { AppRegistry,Platform, View,PermissionsAndroid, Text,StyleSheet, TouchableOpacity,BackgroundImage, Image } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

//to reset the statck action 
const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'NavigationRouter' })
    ]
})

export default class Splash extends Component {
  //this method is used to ask and accept fine location perimission to user  
     async request_location_runtime_permission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'ReactNativeCode Location Permission',
              'message': 'ReactNativeCode App needs access to your location '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       
            Alert.alert("Location Permission Granted.");
          }
          else {
       
            Alert.alert("Location Permission Not Granted");
       
          }
        } catch (err) {
            console.log(err);
          console.warn(err)
        }
      }

 //this method is used to ask and accept camera perimission to user  
      async request_location_runtime_permission1() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              'title': 'ReactNativeCode Location Permission',
              'message': 'ReactNativeCode App needs access to your location '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       
            Alert.alert("Location Permission Granted.");
          }
          else {
       
            Alert.alert("Location Permission Not Granted");
       
          }
        } catch (err) {
            console.log(err);
          console.warn(err)
        }
      }

 //this method is used to ask and accept GPS location perimission to user  
      onLocationPressed = () => {
        if (Platform.OS === 'android'||'ios') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 1000, fastInterval: 1000})
          .then(data => {
          }).catch(err => {
          });
        }
      }


//lifecycle method
    async componentDidMount() {

        await this.request_location_runtime_permission();
        await this.request_location_runtime_permission1();
         this.onLocationPressed();
        
        setTimeout(
            () => {
                this.props.navigation.dispatch(resetAction)
            },
            1000
        );
    }
    //render all ui components
    render() {
        return (
            <View >
                <Image style={{width:'100%',height:'94%'}}source={require('../Images/dp.jpeg')} />
                <Text style={styles.text}>Powered by Cadrac Labs</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
 
    text :{
      
        textAlign: 'center',
        fontSize: 20,
        color:'black',
        fontFamily:'bold',
     
    },
})
