import React, { Component } from 'react';
import { Platform, StyleSheet, Text,FlatList, Image,Alert, ListView, ActivityIndicator, View, ScrollView, TouchableOpacity,TouchableHighlight } from 'react-native';
import { createStackNavigator, createAppNavigator, createAppContainer } from 'react-navigation';                                                       
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { DotIndicator } from 'react-native-indicators';
import { YourridesStyles } from '../StyleSheet/Styles';
import { API } from '../Server/Server';
import Snackbar from 'react-native-snackbar';
class ListItem extends React.Component {
  //render all the ui components

  deleteItem (item) {
    
    Alert.alert(
      'Alert',
      'Do you want to remove this item from Cart',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK',  onPress: () => this.cancelOrder(item)},
      ],
      {cancelable: false},
    );
  }

//cancle the order
  cancelOrder(item){
//     const {orderid} = this.state;
// Alert.alert(orderid);
   
    return fetch( API+"Cancel.php",
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({   
        orderid:item.orderId
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // this.props.navigation.navigate('Home');
      alert("You order is canceled ")
     console.log(responseJson);
     this.setState({
       isLoading: false,
        dataSource: responseJson
     }, function() {
       // In this block you can do something with new state.
     });
     this.props.myOrders()
    })
    .catch((error) => {
      console.error(error);
    });
}
    render() {
      const { item} = this.props;
      let button;
      let button2;
      if(item.status=='1'){
        button=  <TouchableHighlight style={{height:30,width:50,backgroundColor:'green',borderRadius:10,alignItems:'center',justifyContent:'space-evenly'}}
        onPress={()=> this.props.navigation.navigate('RazorPay',
       {
         orderid:item.orderId,
         price:item.totalSum,
         personsCount:item.personsCount
        }
        )}
     
   
   >
        <Text style={{color:'white',textAlign:'center',alignItems:'center'}}>Pay</Text>
      </TouchableHighlight>

button2=  <TouchableHighlight style={{height:30,width:50,backgroundColor:'#ed7070',borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'space-evenly'}}
// onPress={()=> this.props.navigation.navigate('RazorPay',
// {
//  orderid:item.orderId,
//  price:item.totalSum,
//  personsCount:item.personsCount
// }
// )}
onPress={()=>this.deleteItem(item)}

>
<Text style={{color:'white'}}>Cancel</Text>
</TouchableHighlight>

      }else{
       button=null;
       button2=null;
      }
      return (
  
        <View style={YourridesStyles.container}>
          <View style={YourridesStyles.signup}>
            <View style={[YourridesStyles.buttonContainer, YourridesStyles.signupButton]} >
              <View style={YourridesStyles.box}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={YourridesStyles.signUpText0} >Date:</Text>
                  <Text style={YourridesStyles.signUpText1} >{item.date}</Text>
                </View>
                <Text style={YourridesStyles.signUpText2} > Rs.{item.totalSum}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingRight: 25, }}>
                <Text style={YourridesStyles.signUpText4} >Items:</Text>
                <Text style={YourridesStyles.signUpText3} >{item.recipeNames}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingRight: 25,width:wp('60%') }}>
                <Text style={YourridesStyles.signUpText4} >Status:</Text>
                <Text style={YourridesStyles.signUpText3} >
                  {item.status === '0' ? "Your Order is Pending" : item.status === '1' ? "Your order is accepted" : item.status === '2' ? "completed" : "Your Order Is Cancelled"}
                </Text>
                {/* <TouchableOpacity style={{height:20,width:50,backgroundColor:'green',borderRadius:10,alignContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white'}}>Pay</Text>
                </TouchableOpacity> */}
                <View style={{ flexDirection:'row', paddingRight: 25, }}>
                  <View style={{paddingLeft:10}}>
                {button}
                </View>
                <View style={{paddingLeft:10}}>
                {button2}
                </View>
                </View>
              </View>
            </View>
          </View>
  
        </View>
  
  
      )
    }
  }


export default class YourRides extends Component {

  static navigationOptions =
    {
      title: 'My Orders',
    };
    //set state variables and declare all the state values 
  constructor(props) {

    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      isFetching: false,
      orderid:'sgr',

    }
  }
//lifecycle method
  componentDidMount()
    {
        this.myOrders()
    }

    //swipe refresh the data from database about all the history order
  onRefresh() {
    this.setState({ isFetching: true }, function() { this.myOrders() });
 }

 //lifecycle methods to recall the method
componentWillReceiveProps(nextProps) {
  console.log(nextProps);
  console.log("re loading...........")
  this.myOrders();
}
//this method is used to fetch the data from database to get all the order history 
  myOrders() {
    console.log("loading in history");
    AsyncStorage.getItem('userId', (err, result) => {
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
      return fetch( API + "OrderHistory.php",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            result: result,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          // console.log("responseJson"+responseJson.totalSum+"count"+responseJson.personsCount);
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            //  orderid:item.orderId,
            isFetching: false
          }, function () {
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
    });
  }

  //flatlist item separator 
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  //dispaly all image when no item in flat list 
  _listEmptyComponent = () => {
    return (
      <View>
        <Text></Text>
        <Image
          style={YourridesStyles.imageurl}
          source={{ uri: 'https://cdn.dribbble.com/users/2370289/screenshots/6150406/no_items_found.jpg' }} />

      </View>
    )
  }
//   deleteItem () {
    
//     Alert.alert(
//       'Alert',
//       'Do you want to remove this item from Cart',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK',  onPress: () => this.cancelOrder()},
//       ],
//       {cancelable: false},
//     );
//   }

// //cancle the order
//   cancelOrder(item){
//     const {orderid} = this.state;
// Alert.alert(orderid);
   
//     return fetch( API+"Cancel.php",
//     {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({   
//         orderid:item.orderId
//       })
//     })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       this.props.navigation.navigate('Home');
//       alert("You order is canceled ")
//      console.log(responseJson);
//      this.setState({
//        isLoading: false,
//         dataSource: responseJson
//      }, function() {
//        // In this block you can do something with new state.
//      });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
  //render all the ui components
  render() {

console.log(dataSource)

    if (this.state.isLoading) {
      return (
        <View style={YourridesStyles.load}>
          <DotIndicator color='#ed7070' />
        </View>
      );
    }

    const { dataSource } = this.state;
    const { goBack } = this.props.navigation;
    return (

      <View style={YourridesStyles.Container}>

        <View style={YourridesStyles.end1}>
          <View >
            <TouchableOpacity onPress={() => goBack(null)} >

              <Text style={YourridesStyles.back}> ﹤</Text>
            </TouchableOpacity>
          </View>

          <View style={YourridesStyles.end}>
            <View style={[YourridesStyles.button, YourridesStyles.s]}>
              <Text style={YourridesStyles.signUpText}>My Orders</Text>
            </View>
          </View>
        </View>
        <ScrollView style={YourridesStyles.scroll}>
          <View>

            <FlatList

              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}

              data={this.state.dataSource}

              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}

              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) =>
                <View style={YourridesStyles.FlatList} >
                  <ListItem navigation={this.props.navigation}
                    item={item}
                    myOrders={() =>  this.myOrders()}
                  />
                </View>
              }
              keyExtractor={item => item.id}
              ListEmptyComponent={this._listEmptyComponent}
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}