import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {HotelStyle} from '../StyleSheet/Styles';
import { DotIndicator,} from 'react-native-indicators';
import { AppRegistry, StyleSheet, FlatList, Image, ImageBackground, Text, View, Alert, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { API } from '../Server/Server';
class ListItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View>
      <View style={HotelStyle.item1}>
        <TouchableOpacity style={HotelStyle.item} onPress={this.props.onAdd}>
            <Text style={HotelStyle.signUpText} > {item.itemName} </Text>
        </TouchableOpacity>
   </View>
   </View>
    )
  }
}

export default class Hotellist extends Component {

  //to set the state values 
  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      hotel_name: this.props.navigation.state.params.hotel_select,
      area_name: this.props.navigation.state.params.area_name,
      res_pic: this.props.navigation.state.params.res_pic,
      hotel_id: this.props.navigation.state.params.hotel_id,
    }
  }

  //
componentDidMount(){
  this.loaddata();
}

//this method is used to get data from database about allthe menu type list 
  loaddata() {

    const { area_name, hotel_name, hotel_id, res_pic,itemName } = this.state;

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log(state);
      console.log("Is connected?", state.isConnected);

      if (state.type=="none") {

        console.log(state.type);

        Snackbar.show({
          title: 'No Internet Connection',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_LONG,
        });

      }
      else{
    return fetch(API+"MenuType.php",
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area_name: area_name,
          hotel_name: hotel_name,
          hotel_id: hotel_id,
          res_pic: res_pic,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  });
  }

  //this method is used to navigate the next screen 
  onAdd = (item, index) => {
    console.log(item);
    this.props.navigation.navigate('Item', { callHome:this.loaddata.bind(this),item_id: item.itemId, uri: this.state.res_pic ,itemName:item.itemName});
  }

  //lifecycle method
  componentWillUnmount(){
       const{params} = this.props.navigation.state;
       const{goBack} = this.props.navigation;
       params.callHome();
       goBack();
 }

 //to render ui components
 render() {

  if (this.state.isLoading) {
    return (
   <View style={HotelStyle.H1}>
        <DotIndicator color='#ed7070' />
           </View>

    );

  }
  const { dataSource } = this.state;
  const { goBack } = this.props.navigation;

  return (


    <View style={HotelStyle.MainContainer}>
   
      <ImageBackground
        style={HotelStyle.H5}
        source={require('../Images/listbg.jpeg')}>

      
<View >
<TouchableOpacity onPress={() => goBack(null)} >
  
            <Text style={HotelStyle.H2}> ﹤</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: this.state.res_pic }}
          style={HotelStyle.H3}
        />
        <View style={HotelStyle.H4}></View>
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) => {
           
            return (
              <ListItem
                item={item}
                onAdd={() => this.onAdd(item, index)}
              />
            );
            //}
          }
          }
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />

      </ImageBackground>

    </View>

  );
}
}
