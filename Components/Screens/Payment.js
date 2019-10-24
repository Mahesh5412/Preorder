import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { DotIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';
import { AppRegistry, StyleSheet,FlatList,KeyboardAvoidingView,TouchableHighlight, Text,Image, View, Alert, ActivityIndicator,ScrollView, TouchableOpacity,Platform,Button,TextInput} from 'react-native';
import { API } from '../Server/Server';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import RazorpayCheckout from 'react-native-razorpay';
// import ResponsiveImage from 'react-native-responsive-image';
// import AsyncStorage from '@react-native-community/async-storage';
export default class payment extends Component {
   //to set state variable and declare state variables 
  constructor(props)
  {
    super(props);
    this.state = { 
           isLoading: false,
          product:[],
          button:"",
            ff:[],
            totalQuantity:'',
            price:'',
            Status:"",
           txnId:"",
           rest_id:"",
           curTime: null,
           price: this.props.navigation.state.params.price,
           orderid: this.props.navigation.state.params.order_id,
           totalAmount: this.props.navigation.state.params.totalAmount,
           personsCount:this.props.navigation.state.params.personsCount,
        }
  }
  //lifecycle method
  componentDidMount() {
    //  AsyncStorage.getItem('number', (err, result) => {
    //   this.setState({
    //     user_id: result
    //   });
    // });
    this.setState({isLoading:true});
      this._interval = setInterval(() => {
        if(this.state.button===""){
          console.log("empty");
          this.loadmessage();
        }
        else{
         // console.log()
          console.log("data")
           clearInterval(this._interval);
           this.setState({isLoading:false});
        }
      }, 2000);
    // alert(this.props.navigation.state.params.price);
  }
  //this method is used to get the data order confirmation date from database
  loadmessage(){
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
    const {orderid} = this.state;
   // const orderid = '555';
   console.log("loading starts");
 
    fetch(API+"Request.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: 
       //JSON.stringify(this.state.cart)
      JSON.stringify({
        orderid
      })      
    }).then((response) => response.json())
    .then((responseData) => {
        console.log("responseData : " +JSON.stringify(responseData));
        this.setState({
        button:responseData.data.adminMessage,
        });
        console.log(responseData.data.adminMessage);
    }).catch((error) => {
        console.log("error : " +error);
    });
  }
});
  }

  //asking the user to deleted the order
  deleteItem () {
    
    Alert.alert(
      'Alert',
      'Do you want to remove this item from Cart',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK',  onPress: () => this.cancelOrder()},
      ],
      {cancelable: false},
    );
  }

//cancle the order
  cancelOrder(){
    const {orderid} = this.state;

   
    return fetch( API+"Cancel.php",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        //orderid:orderid,
        orderid
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.navigation.navigate('Home');
      alert("You order is canceled ")
     console.log(responseJson);
     this.setState({
       isLoading: false,
       dataSource: responseJson
     }, function() {
       // In this block you can do something with new state.
     });
    })
    .catch((error) => {
      console.error(error);
    });
}

//render all ui components
  render() {
console.log("render");
console.log(this.state.price*100);

const {price} = this.state;
console.log(price);


if (this.state.isLoading) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DotIndicator color='#ed7070' />
      <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>Please wait for the Response</Text>
    </View>
  );
}
   
    return (

/* <View style={{ flex: 1, justifyContent: 'center' }}>
    
 <Text >Date: {this.state.personsCount}</Text>
<View style={{ justifyContent: 'center' }}>
<Text style={{color:'black',paddingBottom:20,justifyContent:'center',textAlign:'center',fontSize:25 }}>{this.state.button}</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'space-evenly',}}>


 <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('RazorPay',{price:price,orderid:this.state.orderid,
totalAmount:this.state.totalAmount,personsCount:this.state.personsCount})}>
 <Text style={{color:'white',alignItems: 'center', }}>Confirm</Text>
 </TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={this.deleteItem.bind(this)}>
<Text style={{color:'white',alignItems: 'center',marginRight:20 }}>Cancel</Text>
</TouchableOpacity>
</View>
</View> */
<View style={styles.container}>
<View    style={{alignItems:'center',alignSelf:'center',width:wp('85%')}}  ><Text  style={{fontSize:25,color:'#000'}} >Your order is {this.state.button}</Text>
</View>
<View style={{alignItems:'center',alignSelf:'center'}}>
  <Image style={{marginTop:30}} source={require('../Images/29.png')}/>      
  </View>
  <View    style={{alignItems:'center',alignSelf:'center',marginTop:30}}  ><Text  style={{fontSize:15,color:'#000'}} > Please Confirm For Continue</Text>

<View style={{ alignItems: "center", paddingBottom: 40 }}>
<View style={{ flexDirection: 'row', marginTop: 30 }}>
<TouchableOpacity style={{
margin: 5, backgroundColor: '#ed7070',  height: 50,width:150, borderRadius:20,alignItems: "center",
justifyContent: 'center',fontSize:20
}} onPress={()=> this.props.navigation.navigate('RazorPay',{price:price,orderid:this.state.orderid,
  totalAmount:this.state.totalAmount,personsCount:this.state.personsCount})} >
<Text style={{ color: '#fff',fontSize:20      }}>CONFIRM</Text>
</TouchableOpacity>
<TouchableOpacity style={{
margin: 5, backgroundColor: '#ed7070', height: 50,width:150,   borderRadius:20, alignItems: "center",
justifyContent: 'center'
}}onPress={this.deleteItem.bind(this)}>
<Text style={{ color: '#fff'    ,fontSize:20        }}>CANCEL</Text>
</TouchableOpacity>
</View>

</View>
<View style={styles.up}>

<View style={styles.signup}>
                              

</View>      

</View>  
</View>  
</View>  




    );
  }
}

const styles = StyleSheet.create({
 
  button: {
    alignSelf: 'center',
   
    bottom: 0,
        alignItems: 'center',
      justifyContent: 'center',
    backgroundColor: '#ed7070',
   height:hp('6%'), 
 borderRadius:5,
      width:wp('40%'),

  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});