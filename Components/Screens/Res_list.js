
import { StackNavigator } from 'react-navigation';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import React, { Component } from 'react';
import { DotIndicator,} from 'react-native-indicators';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import { API } from '../Server/Server';
import {RestList} from '../StyleSheet/Styles1';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet,Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, YellowBox,TouchableOpacity } from 'react-native';

class ListItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity  onPress={this.props.onAdd}>
      <View style={RestList.res1}>
        <Image source={{ uri: item.imagePath }} style={RestList.imageView} />
        <View styles={RestList.res2}>
          <Text style={RestList.textView}  >{item.restaurantName}</Text>
          <Text  style={RestList.textView1}>Timings:9AM to 12PM</Text>
          </View>
      </View>
</TouchableOpacity>
    )
  }
}

export default class Res_list extends Component {
  static navigationOptions =
    {
      header:null
    };

      //to set state variable and declare state variables 
  constructor(props) {
    super(props)
    this.state = {
      IdHolder: this.props.navigation.state.params.area_select,
      id_rest: this.props.navigation.state.params.area_id,

    }


    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);

  }

  //to navigate to next screen with clear he asyncstorage 
  async onAdd(item, index) {
   await  AsyncStorage.removeItem('cart_items');
   await  AsyncStorage.removeItem('cart_items1');
   await AsyncStorage.setItem('rest_id',item.hotelId);
  this.props.navigation.navigate('Hotellist', { callHome:this.loaddata.bind(this),hotel_select: item.restaurantName, area_name: this.state.IdHolder,res_pic: item.imagePath, hotel_id: item.hotelId });
  }reactrest


  //this method is used to get the restaurant list data from database with slected city 
loaddata(){

  console.log("load data in res list");

  console.log(this.state.IdHolder);

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log(state);
    console.log("Is connected?", state.isConnected);

  // NetInfo.getConnectionInfo().then((connectionInfo) => {

//console.log(connectionInfo);

    if (state.type=="none") {

      console.log(state.type);

      Snackbar.show({
        title: 'No Internet Connection',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    else{
  fetch(API+"RestaurantList.php",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: this.state.IdHolder,
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson
      }, function () {
      });
    }).catch((error) => {
      console.log(error);
    });
  }
});
}

//lifecycle method
  componentDidMount() {
    this.loaddata();
  }

//render all the ui components
render() {
  const { goBack } = this.props.navigation;
  if (this.state.isLoading) {
    return (
   <View style={RestList.res3}>
        <DotIndicator color='#ed7070' />
           </View>

    );

  }
  return (
    <View style={RestList.container} >
<View style={RestList.res4}>
  <View style={RestList.res5}>
  {/* <TouchableOpacity onPress={() => goBack(null)}>
    <Text style={{fontSize:70,color:'white',fontFamily: 'serif',paddingBottom:23}}>﹤ </Text>
  </TouchableOpacity> */}
  <TouchableOpacity onPress={() => goBack(null)}>
    <Text style={RestList.res6}>﹤ </Text>
  </TouchableOpacity>
<Text style={RestList.res7}>Restaurants</Text>
</View>
</View>
    <View style={RestList.MainContainer}>

      <FlatList

        data={this.state.dataSource}

        

        renderItem={({ item, index }) =>

          <ListItem
            item={item}
            onAdd={() => this.onAdd(item, index)}

          />
        }

        keyExtractor={(item, index) => index.toString()}
      />
</View>
    </View>
  );
}
}