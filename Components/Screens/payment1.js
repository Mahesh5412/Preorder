import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '../Server/Server';


export default class RazorPay extends Component {


    constructor(props)
  {
    super(props);
    this.state = { 
        price: this.props.navigation.state.params.price,
        totalAmount: this.props.navigation.state.params.totalAmount,
        personsCount:this.props.navigation.state.params.personsCount,
        orderid: this.props.navigation.state.params.orderid,
    }
}
//method for storing paymentId and order details
paymentMethod(){

   fetch(API + "Payment.php", {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       razorpayId:this.state.data1,
       totalAmount:this.state.price,
        personsCount:this.state.personsCount,
        orderid:this.state.orderid,
         
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
   // Showing response message coming from server after inserting records.
           Alert.alert(responseJson);
          this.props.navigation.navigate('Home');
         }).catch((error) => {
           console.error(error);
         });
    
    
     }

    //  logOutOption() {
    //     Alert.alert(
    //       'Alert',
    //       'Pay or cancel Payment',
    //       [
    //         {
    //           text: 'Cancel',
    //           onPress: () => console.log('Cancel Pressed'),
    //           style: 'cancel',
    //         },
    //         { text: 'OK', onPress: () => this.InsertDataToServer() },
    //       ],
    //       { cancelable: false },
    //     );
    //   }


  render() {
    return (
          
        <View style={styles.container}>
{/* intigration of razorpay code  */}
        <TouchableHighlight onPress={() => {
     
     AsyncStorage.getItem('number', (err, result) => {
      this.setState({
        user_id: result
      });
    });        
          var options = {
            
            description: 'Credits towards consultation',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
          
           key:'rzp_test_niGQbHfgV0P9yG',//test key for razorpay 
           //key:'rzp_live_t8n7Clyba4i9Ov',//live key for razorpay
            amount: '100',
            // amount:this.state.price*100,//total amount
            external: {
              wallets: ['paytm']
            },
            
            name: 'Cadrac',
            prefill: {
              // email: 'raju@razorpay.com',
              email: '',
              // contact: '9951591981',
              contact: this.state.user_id,
              name: ''
            },
            theme: {color: '#F37254'}
          }
          RazorpayCheckout.open(options).then((data) => {
            data1=data.razorpay_payment_id,
              this.setState({data1});
            // handle success payment 
            console.log(data);
            // alert(`Success: ${data.razorpay_payment_id}`);
            this.paymentMethod();
          }).catch((error) => {
            // handle failure payment
            console.log(error);
            alert(`Error: ${error.code} | ${error.description}`);
          });
          RazorpayCheckout.onExternalWalletSelection(data => {
            console.log(data);
            alert(`External Wallet Selected: ${data.external_wallet} `);
          });
        }}>
        <Text style = {styles.text}>PAY</Text>
        </TouchableHighlight>
        </View>
        
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
//pay_CmmtdjMztcq0oy
//pay_CmmvgSmAyFN2GD