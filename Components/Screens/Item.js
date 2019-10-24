import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import { DotIndicator, } from 'react-native-indicators';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ImageBackground, Image, ActivityIndicator, TouchableOpacity,Toast, ScrollView, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../Server/Server';
import {Item1} from '../StyleSheet/Styles';
class ListItem extends React.Component {

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.props.onseth}> 
        <View style={Item1.textview} >
            <Text style={Item1.FlatListItemStyle}>  {item.recipeName} </Text>
            <Text style={Item1.ListItemStyle}> ₹{item.price} </Text>
        </View>
          </TouchableOpacity>
    )
  }
}
export default class Item extends Component {
  //to set the state values and declare state variables
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: [],
      dataSource: [],
      itemId: this.props.navigation.state.params.item_id,
      uri: this.props.navigation.state.params.uri,
      itemName: this.props.navigation.state.params.itemName,
    }
  }

  //lifecycle method 
  componentDidMount() {
    this.loaddata();
  }

  //method used to get the data from database about all the items list of seleted item type .
  loaddata() {
    console.log("hello");
    const { itemId, itemName } = this.state;
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
        return fetch(API+"ItemList.php",
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              itemId: itemId,

            })
          })
          .then((response) => response.json())
          .then((responseJson) => {

            console.log(responseJson);
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

  //this method is used to load cart items from asyncstorage and forward to next screen 
  async cart() {
    const cart = [];

    console.log(cart.length);

    await AsyncStorage.getItem("cart_items1", (err, res) => {
      if (!res) {
      }
      else {
        const items = JSON.parse(res);
        console.log(items);

        if (cart.length === 0) {
          items.map((x) => cart.push(x));

        }
        console.log(cart.length);
        console.log(cart)
      }
    });

    console.log(cart.length);
    if (cart.length === 0) {
      Snackbar.show({
        title: 'Your Cart is Empty',
        backgroundColor: '#ea9a9a',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    else {
      this.props.navigation.navigate('Cart1', { item_now: cart });
    }
  }

  //lifecycle method 
  componentWillUnmount() {
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    params.callHome();
    goBack();
  }

//
  // addToCart() {
  //   var product = this.state.product;
  //   AsyncStorage.getItem("CART", (err, res) => {
  //     if (!res) AsyncStorage.setItem("CART", JSON.stringify([product]));
  //     else {
  //       var items = JSON.parse(res);
  //       items.push(product);
  //       AsyncStorage.setItem("CART", JSON.stringify(items));
  //     }
  //   });
  // }

  //this method is used to navigate the next screen with passing with recipe item detailes .
  onseth = (item, index) => {

    this.props.navigation.navigate('ItemView', { callHome: this.loaddata.bind(this), itemId: item.recipeId, itemname: item.recipeName, item_pic: item.item_pic, price: item.price, item: item, uri: this.state.uri });
  }

  //used to separate item design
  FlatListItemSeparator = () => {
    return (
      <View
        style={Item1.item11}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
     <View style={Item1.item12}>
          <DotIndicator color='#ed7070' />
             </View>

      );

    }
    const { dataSource } = this.state;
    const { goBack } = this.props.navigation;

    return (

<View style={Item1.MainContainer}>

<ImageBackground 
          style={Item1.item13}
          source={require('../Images/listbg.jpeg')}>
  <View style={Item1.item14} >
          <View >
<TouchableOpacity onPress={() => goBack(null)} >
             
              <Text style={Item1.item15}> ﹤</Text>
            </TouchableOpacity>
          </View>
        <Image 
    source={{ uri: this.state.uri}} 
    style={Item1.item16} 
/>

<View style={{ justifyContent: 'space-between'}} >
    <TouchableOpacity onPress={() => this.cart()}>
        <Text style={Item1.ItemStyle}>  Cart </Text>
</TouchableOpacity>

</View>
        </View>

      
<View style={Item1.item17}>
{/* <View>
 <Text style={{ fontWeight:'bold',textAlign:'center',fontSize:20,}} >{this.state.itemName}</Text>
 </View> */}

<View>
 <Text style={Item1.item18} >{this.state.itemName}</Text>
 </View>
       <FlatList
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item,index}) => 
           <View style={Item1.FlatList} >
               <ListItem
                item={item}
                onseth={() => this.onseth(item, index)}
              />
               </View>
                
}

 keyExtractor={(item, index) => index.toString()}
showsVerticalScrollIndicator={false} 

         />
        </View>
        </ImageBackground>
</View>
            
    );
  }
}