import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableHighlight,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '../Server/Server';


export default class RazorPay extends Component {


  constructor(props) {
    super(props);
    this.state = {
      price: this.props.navigation.state.params.price,
      totalAmount: this.props.navigation.state.params.totalAmount,
      personsCount: this.props.navigation.state.params.personsCount,
      orderid: this.props.navigation.state.params.orderid,
    }
  }

  paymentMethod() {
    alert('sucess');
    fetch(API + "Payment.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        razorpayId: this.state.data1,
        totalAmount: this.state.price,
        personsCount: this.state.personsCount,
        orderid: this.state.orderid,

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
        <View style={{ alignItems: 'center', alignSelf: 'center',width:wp('85%'), }}  ><Text style={{ fontSize: 20, color: '#000' }} >Your Order Is Confirmed</Text>
        </View>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Image style={{ marginTop: 30 }} source={require('../Images/51.png')} />
        </View>
        <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: 30 ,}}  ><Text style={{ fontSize: 15, color: '#000' }} >Enjoy Your Food With Pre Order</Text>
          <View style={styles.signup}>
            <View style={[styles.buttonContainer, styles.signupButton]} >
<View style={{flexDirection:'row',}}>
  <View style={{width:wp('50%')}}>
              <Text style={styles.signUpText1} >order Id </Text>
              </View>
              <Text style={styles.signUpText11} > {this.state.orderid}</Text>
              </View>
              <View style={{flexDirection:'row',}}>
  <View style={{width:wp('50%')}}>
              <Text style={styles.signUpText2} > no of persons </Text>
              </View>
              <Text style={styles.signUpText11} >  {this.state.personsCount}</Text>
</View>
              <View style={{flexDirection:'row',}}>
  <View style={{width:wp('50%')}}>
              <Text style={styles.signUpText3} >  Total Amount </Text>
              </View>
              <Text style={styles.signUpText11} >₹  {this.state.price} </Text>
</View>
            </View>
          </View>
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
             <View style={{ marginTop: 20 }}> 

              <TouchableOpacity style={{
                margin: 5, backgroundColor: '#ed7070',height:40, width: 300, borderRadius: 20, alignItems: "center",
                justifyContent: 'center'
              }} onPress={() => {

                AsyncStorage.getItem('number', (err, result) => {
                  this.setState({
                    user_id: result
                  });
                });        
                      var options = {
                        
                        description: 'Credits towards consultation',
                        // image: 'https://i.imgur.com/3g7nmJC.png',
                        currency: 'INR',
                      
                      // key:'rzp_test_niGQbHfgV0P9yG',//test key for razorpay 
                       key:'rzp_live_t8n7Clyba4i9Ov',//live key for razorpay
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

                <Text style={{ color: '#fff', fontSize: 20 }}>Pay</Text>
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
  container: {
    flex: 1,
    marginTop: 50
  },
  buttonContainer: {
    marginTop:40,
    width: wp('80%'),
    height: hp('15%'),
    justifyContent: 'center',
    backgroundColor: '#8A8D8C',

  },
  signupButton: {
    backgroundColor: '#8A8D8C',
    alignItems: 'center',
    borderRadius: 20,

  },
  signUpText: {
    fontSize: 28,
   // fontWeight: 'bold',
    color: '#FFF',
    alignItems: 'center',
  },
  signUpText1: {
    fontSize: 15,
    color: '#fff',
    paddingLeft: 20,
  },
  signUpText11: {
    fontSize: 15,
    color: '#fff',
   // paddingLeft: 20,
  },
  signUpText2: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#fff',

  },
  signUpText3: {
    fontSize: 15,
    paddingLeft: 20,
    color: '#fff',

  },

  Text: {
    fontSize: 22,
    color: '#000000',
    alignItems: 'center',
    marginRight: 270,
    alignSelf: 'center',



  },
  xt: {
    fontSize: 22,
    color: '#000000',
    alignItems: 'center',
    marginRight: 270,
    alignSelf: 'center',


  },
  Tex: {
    fontSize: 22,
    color: '#000000',
    alignItems: 'center',
    marginRight: 270,
    alignSelf: 'center',


  },
  signup: {
    alignItems: 'center',
    color: "#FFF",

  },
  boxone: {
    flex: 1,

  },
  boxtwo: {
    flex: 1,

  },
  boxthree: {
    flex: 1,

  },
  s: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  phonepe: {
    paddingTop: 10,
  },
  phone: {
    marginTop: 20,

  },

});
//pay_CmmtdjMztcq0oy
//pay_CmmvgSmAyFN2GD