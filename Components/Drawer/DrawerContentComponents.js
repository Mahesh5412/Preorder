/*Version :1.0.0.
 *FileName:AboutUs.js.
 *Purpose: information about the organization.
 *Developers Involved:Mahesh,Naveen
 */
import React, { Component } from 'react';
import { NavigationActions, DrawerLayoutAndroid, DrawerActions } from 'react-navigation';
import { Text, Alert, View, StyleSheet, ActivityIndicator,ImageBackground, Dimensions, Image, PixelRatio, ListView, TouchableOpacity } from 'react-native'

import { DotIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import { API } from '../Server/Server';
import {Drawer} from '../StyleSheet/Styles';

export default class drawerContentComponents extends Component {

  //to set the state variables
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource:'',
    }
  }

  //
  Send_Data(imageLocation, name, email) {
    onPress = this.props.navigation.navigate('Update_profile',
      {
        callHome: this.proFun.bind(this),
        email: email,
        name: name,
        image: imageLocation,
      })
  }

  Send_Data1(imageLocation, name, email) {
    onPress = this.props.navigation.navigate('Viewprofile',
      {
        callHome: this.proFun.bind(this),
        image: imageLocation,
      })
  }

  //this methos is used to ask the user about confirm about 
  logOutOption() {
    Alert.alert(
      'Alert',
      'Do you want to Logout',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.logOut() },
      ],
      { cancelable: false },
    );
  }

  //this method is used for logout the application and also clear the asyncstorage .
  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

   //this method is lifecycle method.
  componentDidMount() {
    this.proFun();
  }

//this method is used to get the user profile information from database.
  async proFun() {

    await AsyncStorage.getItem('number', (err, result) => {
      this.setState({
        user_id: result
      });
    });
    const { user_id } = this.state;
    fetch(API + "ProfileInfo.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          
        }, function () {

        });
      }).catch((error) => {
        console.log(error);
      });
  }

  //separete the list item design 
  ListViewItemSeparator = () => {
    return (
      <View
        style={Drawer.draw}
      />
    );
  }

  //
  navigateToScreen = (route) => (
    () => {
      console.log("navigation " + route);
      const navigateAction = NavigationActions.navigate({
        routeName: route,
        params: { reload: "reload" }
      });
      console.log(navigateAction);
      this.props.navigation.dispatch(navigateAction);
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
    })

  render() {
    if (this.state.isLoading) {
      return (
        <View style={Drawer.draw1}>
          <DotIndicator color='#ed7070' />
        </View>
      );
    }
    return (

      <View style={Drawer.MainContainer}>

        <View style={Drawer.draw2}>
          <View>
            <TouchableOpacity
              onPress={this.Send_Data1.bind(
                this, this.state.dataSource.imageLocation,
              )} >
              <View style={Drawer.draw3}>
                {this.state.dataSource.imageLocation ?
                  <Image source={{ uri: this.state.dataSource.imageLocation }} style={Drawer.imageViewContainer} />
                  : <Image source={require('../Images/profile.png')} style={Drawer.imageViewContainer} />}
          
              </View>
            </TouchableOpacity>
          </View>
          <View style={Drawer.draw4}>
            <View>
              <Text style={Drawer.textViewContainer} >{this.state.dataSource.mobileNumber}</Text>
            </View>
            <TouchableOpacity
              onPress={this.Send_Data.bind(
                this, this.state.dataSource.imageLocation, this.state.dataSource.name, this.state.dataSource.email
              )} >
              <Icon style={Drawer.edit}
                name='account-edit'
                color='black'
                type='MaterialCommunityIcons'
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>






        {/* <ScrollView> */}
        <View style={Drawer.screenContainer}>
          <TouchableOpacity onPress={this.navigateToScreen('Home')}>
            <View style={{ flexDirection: 'column' }}>
              <View style={Drawer.screenStyle}>
                <Icon
                  name='home'
                  color='#ed7070'
                  type='MaterialCommunityIcons'
                  size={30}
                />
                <Text style={Drawer.textView}>Home</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('YourRides')}>
            <View style={Drawer.screenStyle}>
              <Icon
                name='coffee'
                color='#ed7070'
                type='MaterialCommunityIcons'
                size={30}
              />
              <Text style={Drawer.draw5}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Howtouse')}>
            <View style={Drawer.screenStyle}>
              <Icon
                name='cellphone-iphone'
                color='#ed7070'
                type='MaterialCommunityIcons'
                size={30}
              />
              <Text style={Drawer.draw5}>How To Use App</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('AboutUs')}>
            <View style={Drawer.screenStyle}>
              <Icon
                name='alert-circle-outline'
                color='#ed7070'
                type='MaterialCommunityIcons'
                size={30}
              />
              <Text style={Drawer.draw5}>About Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('ContactUs')}>
            <View style={Drawer.screenStyle}>
              <Icon
                name='phone'
                color='#ed7070'
                type='MaterialCommunityIcons'
                size={30}
              />
              <Text style={Drawer.draw5}>Contact Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logOutOption.bind(this)}>
            <View style={Drawer.screenStyle1}>
              <Text style={Drawer.draw6}>Logout</Text>
            </View>
          </TouchableOpacity>


        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}