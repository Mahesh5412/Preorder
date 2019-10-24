import React, { Component } from 'react';
import {ItemviewStyles} from '../StyleSheet/Styles';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Image,ActivityIndicator,ImageBackground,TouchableOpacity,Toast,ScrollView,Platform} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class ItemView extends Component {
  //used to set state and declare state variable.
  constructor(props)
  {
    super(props);
    this.state = { 
            isLoading: true,
            item_id: this.props.navigation.state.params.itemId,
            itemname: this.props.navigation.state.params.itemname,
           item_pic: this.props.navigation.state.params.item_pic,
           price: this.props.navigation.state.params.price,
           item:this.props.navigation.state.params.item,
           uri:this.props.navigation.state.params.uri,
  }
  }

  //this method is used to add the item detailes in asyncstorage both cart_item == item_id and  cart_items1 == item
  addToCart() {
    const {item_id,item} = this.state;
   console.log(item_id);
    AsyncStorage.getItem("cart_items", (err, res) => {
      if (!res){

        AsyncStorage.setItem("cart_items", JSON.stringify([item_id]));
        AsyncStorage.setItem("cart_items1", JSON.stringify([item]));

        AsyncStorage.getItem("cart_items", (err, res) => {
          var items = JSON.parse(res);
          console.log(items);
      });

      AsyncStorage.getItem("cart_items1", (err, res) => {  
        var items = JSON.parse(res);
        console.log(items);


        Snackbar.show({
          title: 'Item is Added into the cart',
          backgroundColor:"#00e64d",
          duration: Snackbar.LENGTH_SHORT,
        });

    });

      }
      else {
        var items = JSON.parse(res);
        var index1 = items.indexOf(item_id);
        console.log(index1);
        if(index1=="-1"){
          items.push(item_id);
          AsyncStorage.setItem("cart_items", JSON.stringify(items));

          AsyncStorage.getItem("cart_items1", (err, res) => {

            var items = JSON.parse(res);
            items.push(item);
            AsyncStorage.setItem("cart_items1", JSON.stringify(items));
            console.log(items);
        });
         
         // AsyncStorage.setItem("cart_items1", JSON.stringify(items));
          Snackbar.show({
            title: 'Item is Added into the cart',
            backgroundColor:"#00e64d",
            duration: Snackbar.LENGTH_SHORT,
          });
          console.log("inserted");
        }
        else
        {
          Snackbar.show({
            title: 'Item Already Selected',
            backgroundColor:'#ED0707',
            duration: Snackbar.LENGTH_SHORT,
          });
         console.log("all ready there");
        }
        AsyncStorage.getItem("cart_items", (err, res) => {
          var items = JSON.parse(res);
          console.log(items);
      });
      }
    });
      this.props.navigation.navigate('Item');
    }

//lifecycle method
  componentWillUnmount(){
    const{params} = this.props.navigation.state;
    const{goBack} = this.props.navigation;
    params.callHome();
    goBack();
}

//render ui components 
render() {

  const { dataSource } = this.state;
  const { goBack } = this.props.navigation;
  return (
<View style={ItemviewStyles.MainContainer}> 
<ImageBackground
        style={ItemviewStyles.imagestyles}
        source={require('../Images/listbg.jpeg')}>

<View >
<TouchableOpacity onPress={() => goBack(null)} >
            <Text style={ItemviewStyles.back}> ﹤</Text>
          </TouchableOpacity>
        </View>
               <Image 
  source={{ uri: this.state.uri}} 
  style={ItemviewStyles.stylesuri} 
/>
<View  style={{ flex:0.5,}}>

</View>
<View  style={ItemviewStyles.cartview}>
<Image source={{ uri: this.state.uri }} style={ItemviewStyles.cont} />
      <View style={ItemviewStyles.textview}>
         <Text style={ItemviewStyles.FlatListItemStyle}>{this.state.itemname}</Text>
         <Text style={ItemviewStyles.amountview}>₹{this.state.price}</Text>
         </View>
         <Text style={ItemviewStyles.FlatListItemStyle}></Text>

         <Text style={ItemviewStyles.ListItemStyle}>
         According to Pratibha Karan, the biryani is of South Indian origin,
          derived from pilaf varieties brought to the Indian subcontinent by
            methods of cooking, with the distinction between "pulao" and "biryani"
             being arbitrary.</Text>

          <Text style={ItemviewStyles.FlatListItemStyle}></Text>

         <View style={ItemviewStyles.addToCart} >
         <TouchableOpacity onPress={this.addToCart.bind(this)} style={ItemviewStyles.ItemStyle}>
      <Text style={ItemviewStyles.addToCartText}> Add to Cart </Text>
</TouchableOpacity>
</View>
</View>

<View  style={{ flex:1,}}>

</View> 
</ImageBackground>

</View>       
  );
}
}