import React, { Component } from 'react'
import { View ,Text,ScrollView,StyleSheet,Button, Alert,  ImageBackground,TouchableOpacity} from 'react-native'
import CodeInput from 'react-native-confirmation-code-input';
import {ValidStyles} from '../StyleSheet/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Valid extends Component {
  static navigationOptions =
  {
     title: 'Valid',
   
  };
   //to set state variable and declare state variables 
  constructor(props){
      super(props);
this.state={
option :this.props.navigation.state.params.option,
number:this.props.navigation.state.params.number,
userstatus:this.props.navigation.state.params.userstatus,
userId:this.props.navigation.state.params.userId,
};

  }
  //to check the user entered otp validating 
  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == this.props.navigation.state.params.code) {
      AsyncStorage.setItem('userToken', this.state.userstatus);
      AsyncStorage.setItem('userId', this.state.userId);
      AsyncStorage.setItem('number', this.state.number);
      
      if(this.state.option=="update"){
        this.props.navigation.navigate('Home');
      }else{
        this.props.navigation.navigate('Home',{number:this.state.number});
      }
      
    } else {
      Alert.alert(
        'Confirmation Code',
        'Please enter valid Otp',
        [{text: 'OK'}],
        { cancelable: false }
      );
      this.refs.codeInputRef2.clear();
    }
  }
  render() {
    return (
      <View style={ValidStyles.container}>
        <ImageBackground
          style={ValidStyles.imagestyles}
          source={require('../Images/hotel.jpeg')}
        >

          <View style={ValidStyles.container1}>
            <Text>{this.props.navigation.state.params.code}</Text>
            <CodeInput
              ref="codeInputRef2"
              keyboardType="numeric"
              inputPosition='center'
              activeColor='rgba(49, 180, 4, 1)'
              inactiveColor='rgba(49, 180, 4, 1.3)'
              codeLength={4}
              className='border-circle'
              autoFocus={true}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(code) => this._onFulfill(code)}
            />

          </View>

        </ImageBackground>
      </View>
    )
  }
}
