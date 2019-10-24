import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,Platform,
  ImageBackground,
  Button, StyleSheet
} from 'react-native';
import { API } from '../Server/Server';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {MobileSyles} from '../StyleSheet/Styles';
export default class Mobile extends Component {
  //used to set state and declare state variable.
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      token: ''
    };
  }

  async componentDidMount() {
    console.log(API + "Auth.php");
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }


  async checkPermission() {
    console.log("check permidssion");
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }


  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
      // this.showAlert(title, body);
      // alert('message');

      const localNotification = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        // .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        // .setData(notification.data)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);


      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });


    const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name',
     firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });


  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     if (Platform.OS === 'android') {
  //         const localNotification = new firebase.notifications.Notification({
  //             sound: 'default',
  //             show_in_foreground: true,
  //         })
  //             .setNotificationId(notification.notificationId)
  //             .setTitle(notification.title)
  //             .setSubtitle(notification.subtitle)
  //             .setBody(notification.body)
  //             .setData(notification.data)
  //             .android.setChannelId('default-channel') // e.g. the id you chose above
  //             .android.setSmallIcon('ic_notification_uaufi') // create this icon in Android Studio
  //             .android.setColor('#1B7BCE') // you can set a color here
  //             .android.setPriority(firebase.notifications.Android.Priority.High);

  //         console.log(localNotification);

  //         firebase.notifications()
          
  //             .displayNotification(localNotification)
  //             .catch(err => console.error(err));
  //     } else {
  //         const localNotification = new firebase.notifications.Notification()
  //             .setNotificationId(notification.notificationId)
  //             .setTitle(notification.title)
  //             .setSubtitle(notification.subtitle)
  //             .setBody(notification.body)
  //             .setData(notification.data)
  //             .ios.setBadge(1);

  //         firebase.notifications()
  //             .displayNotification(localNotification)
  //             .catch(err => console.error(err));
  //     }
  //     console.log('Notification received!');
  // });
  }


  async getToken() {
    console.log("gettttig token");
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log()
    console.log('fcmToken:', fcmToken);
  }



  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  //validation of user information 
  isValid() {
    const { number } = this.state;
    let valid = false;
    if (number.length === 0) {
      alert("Enter phonenumber");
    }
    else if (number.length > 10) {
      alert("Invalid phonenumber");
    }
    else if (number.length < 10) {
      alert("Invalid phonenumber");
    }
    else if (!this.mobilevalidate(number)) {
      alert('Invalid Phonenumber');

    }
    else {
      valid = true;
    }
    return valid;
  }

  mobilevalidate(number) {
    const reg = /^[0]?[6789]\d{9}$/;
    return reg.test(number);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    //this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(info);
    //logErrorToMyService(error, info);
  }



  //this method is used to inset the new user and update the user number number and genarate the otp 
  getOtp() {

    if (this.isValid()) {

      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log(state);
        console.log("Is connected?", state.isConnected);
        if (state.type == "none") {
          console.log(state.type);
          Snackbar.show({
            title: 'No Internet Connection',
            backgroundColor: 'red',
            duration: Snackbar.LENGTH_LONG,
          });
        }
        else {
          const deviceId = DeviceInfo.getDeviceId();
          console.log(deviceId);
          const deviceType = DeviceInfo.getDeviceType();
          console.log(deviceType);
          let fcmToken = AsyncStorage.getItem('fcmToken');
          console.log(fcmToken);
          const { number, token } = this.state;
try{

          fetch(API + "Auth.php", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: number,
            })
          }).then((response) => response.json())
            .then((responseJson) => {
              // alert(responseJson.opt)
              // alert(responseJson.number)
              if (responseJson.status === 'success') {
                this.props.navigation.navigate('valid', { userId: responseJson.userId, 
                  userstatus: responseJson.status, code: responseJson.otp, option: responseJson.option,
                   number: responseJson.mobileNumber });
                // AsyncStorage.setItem('userToken', responseJson.status);
              }
              else {
                Alert.alert(responseJson);
              }
            }).catch((error) => {
              console.log(error);
            });
          }
          catch{
              console.log("errorrrrrrrrrrrrr");
          }
        }
      });
    }
  }


  //render the ui components 
  render() {
    return (
      <SafeAreaView style={MobileSyles.container}>
        <ImageBackground
          style={MobileSyles.imagestyles}
          source={require('../Images/hotel.jpeg')}
        >
          <View style={MobileSyles.container1}>
            <KeyboardAvoidingView behavior="padding">
              <TextInput style={MobileSyles.text} keyboardType='numeric' placeholder='Mobile Number' 
              maxLength={10} onChangeText={(number => this.setState({ number }))} value={this.state.myNumber} />
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this.getOtp.bind(this)} >
              <View style={[MobileSyles.buttonContainer, MobileSyles.signinButton]}>
                <Text style={MobileSyles.signinText} >GET OTP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}