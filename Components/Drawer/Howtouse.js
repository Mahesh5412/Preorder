import React, { Component } from 'react';
import { AppRegistry, View ,Text, TouchableOpacity,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Howtouse1} from '../StyleSheet/Styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Row } from 'native-base';

export default class Howtouse extends Component {
  //used to render ui components
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={Howtouse1.container}>
          <ScrollView>
          <View style={Howtouse1.container3}>
            <TouchableOpacity onPress={() => goBack(null)} >
        
              <Text style={Howtouse1.back}> ﹤</Text>    
            </TouchableOpacity>
            <Text style={Howtouse1.how}>How to Use App</Text>
          </View>
          <Image style={Howtouse1.container1}
          source={require('../Images/use14.jpeg')}/>
          <Text style={Howtouse1.container2}>1.First enter your mobile number after getting otp. You should enter the otp and after it will verify your otp and it moves to Home page </Text>

          <Image  style={Howtouse1.container1}
          source={require('../Images/use11.jpeg')}/>
          <Text style={Howtouse1.container2}>2.Fetch Location Based Restaurant and search your  Favorite Restaurant </Text>

          <Image  style={Howtouse1.container1}
          source={require('../Images/use15.jpeg')}/>
          <Text style={Howtouse1.container2}>3.Select your dish as you like </Text>

          <Image  style={Howtouse1.container1}
          source={require('../Images/use12.jpeg')}/>
          <Text style={Howtouse1.container2}>4.This page showing to add to cart and open your cart </Text>
          
          <Image  style={Howtouse1.container1}
          source={require('../Images/use13.jpeg')}/>
          <Text style={Howtouse1.container2}>5.Showing total amount and enter your reach time and select no of persons Finally request your order </Text>
          
          </ScrollView>
          </View>
    );
  }
}