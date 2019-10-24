/*Version :1.0.0.
 *FileName:AboutUs.js.
 *Purpose: information about the organization.
 *Developers Involved:Mahesh,Naveen
 */
import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import { API } from '../Server/Server';
import { AppRegistry, StyleSheet,FlatList, KeyboardAvoidingView, Picker, Text, Image, View, Alert, ActivityIndicator, ScrollView, TouchableOpacity, Platform, Button, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
// import RNUpiPayment from 'react-native-upi-payment';
import {CartStyle} from '../StyleSheet/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

class ListItem extends React.Component {
  //This method is used to render all the components
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity >
        <View style={CartStyle.itemcontainer1}>
          <View style={CartStyle.cart1}>
            <View style={CartStyle.cart2}>
              <Text style={CartStyle.item}> {item.recipeName}</Text>
              <Text style={CartStyle.itemtotal}> ₹{item.price} </Text>
            </View>
            <View style={CartStyle.cart3}>
              <TouchableOpacity style={CartStyle.input} activeOpacity={0.9} onPress={this.props.onSubtract} >
                <Text style={CartStyle.cart4}>-</Text></TouchableOpacity>
              <Text style={CartStyle.textj}> {item.quantity} </Text>
              <TouchableOpacity style={CartStyle.input} activeOpacity={0.9} onPress={this.props.onAdd} >
                <Text style={CartStyle.cart5}>+</Text></TouchableOpacity>
              <View style={CartStyle.cart6}>
                <TouchableOpacity onPress={this.props.deleteItem} >
                  <Text style={CartStyle.cart7}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class Cart1 extends Component {
  //this method is used to declare state varibles
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      product: [],
      ff: [],
      totalQuantity: '',
      price: '',
      Status: "",
      txnId: "",
      rest_id: "",
      time: "select time here",
      // persons: '1',
      estimatedTime: '1',
      isVisible: false,
      chosenTime: '',
      selectedUserType:'1',
      userTypes: [{ userType: '1', userName: '1' },
      { userType: '2', userName: '2' },
      { userType: '3', userName: '3' },
      { userType: '4', userName: '4' },
      { userType: '5', userName: '5' },
      { userType: '6', userName: '6' },
      { userType: '7', userName: '7' },
      { userType: '8', userName: '8' },
      { userType: '9', userName: '9' },
      { userType: '10', userName: '10' }],
      // selectedUserType: "1",
    }
  }

  //pick the time and store in state variables
  handlePicker = (time) => {
    this.setState({ time: 'select time here', });
    console.log(time);
    console.log(moment(time).format('HH:mm'));
    console.log(moment(time).format('HH'));
    console.log(moment(time).format('mm'));
  
    var timesss = moment(time).format('HH:mm')
    var hours = time.getHours();
    var min = time.getMinutes();
   // alert(hours);
    //alert(min);
    var timeeee = hours + ":" + min;
    if (timeeee == timesss)
      console.log("same");
    else
      console.log("different");

    // if(moment(time).format('HH')<=hours){
    //     console.log("superbbb  1");
    //     if(moment(time).format('mm')<=min)
    //     {
    //       console.log("superbbb  2");
    //     }
    //     else{
    //       console.log("waste  2");
    //     }
    // }
    // else{
    //     console.log("waste  1");
    // }
    
      if(hours >= new Date().getHours() ){
          console.log("timeanddate"+hours+"  "+new Date().getHours());
          if(hours == new Date().getHours() && min > new Date().getMinutes()){
            this.setState({
                    isVisible: false,
                    chosenTime: moment(time).format('YYYY-MM-DD HH:mm:ss a'),
                    time: moment(time).format('HH:mm a')
                  })
          }else if(hours > new Date().getHours()){
            this.setState({
              isVisible: false,
              chosenTime: moment(time).format('YYYY-MM-DD HH:mm:ss a'),
              time: moment(time).format('HH:mm a')
            })
          }else{
            this.setState({
              isVisible: false,
              //chosenTime:moment(time).format('YYYY-MM-DD HH:mm:ss a'),
              // time:moment(time).format('HH:mm a')
            })
          }
      }else{
        this.setState({
          isVisible: false,
          //chosenTime:moment(time).format('YYYY-MM-DD HH:mm:ss a'),
          // time:moment(time).format('HH:mm a')
        })
      }

    // if (hours <= moment(time).format('HH')) {
    //   console.log("superbbb  1");
    //   if (moment(time).format('mm') >= min ) {
    //     console.log("superbbb  2");
    //     this.setState({
    //       isVisible: false,
    //       chosenTime: moment(time).format('YYYY-MM-DD HH:mm:ss a'),
    //       time: moment(time).format('HH:mm a')
    //     })
    //   }
    //   else {
    //     console.log("waste  2");
    //     this.setState({
    //       isVisible: false,
    //       //chosenTime:moment(time).format('YYYY-MM-DD HH:mm:ss a'),
    //       // time:moment(time).format('HH:mm a')
    //     })
    //   }
    //   //    this.setState({
    //   //   isVisible:false,
    //   //   chosenTime:moment(time).format('HH:mm')
    //   // })
    // }
    // else {
    //   this.setState({
    //     isVisible: false,
    //     time: 'select time here'
    //   })
    //   console.log("waste  1");
    // }

    console.log(hours);
    console.log(min);
    console.log(hours + ":" + min);
    console.log(moment(time));

    // this.setState({
    //   isVisible:false,
    //   chosenTime:moment(time).format('HH:mm')
    // })
  }
  //enble the time picker visible
  showPicker = () => {
    this.setState({
      isVisible: true
    })
  }
  //didable the time picker.
  hidePicker = (time) => {
    this.setState({
      isVisible: false,
      // chosenTime:moment(time).format('HH:mm')
    })
  }

  //this method is used to set dynamic picker data
  loadUserTypes() {
    return this.state.userTypes.map(user => (
      <Picker.Item label={user.userName} value={user.userType} key={(user) => user.userType.toString()}/>
    ))
  }



  // componentWillMount(){

  //   this.setState({

  //     //  dataSource:this.props.navigation.state.params.view_cart,
  //   });
  // }
  

  //this method is used set the state of navigation values
  componentWillMount() {
    console.log("componentwillMount");
    console.log(this.props.navigation.state.params.item_now);
    this.setState({
      isLoading: false,
      product: this.props.navigation.state.params.item_now,
    });
    console.log(this.state.product);
  }

  //subtract the item count in cart list
  onSubtract = (item, index) => {
    const { ff } = this.state;
    const product = [...this.state.product];
    if (product[index].quantity == 1) {
      this.setState({ product });

      // alert(product);
    }
    else
      product[index].quantity -= 1;

    var index1 = ff.indexOf(product[index].id);
    // console.log(index1);
    //  ff.splice(index1);
    // console.log(ff[index1])
    delete ff[index1];
    //console.log(ff);
    this.setState({ product });

    AsyncStorage.setItem("cart_items1", JSON.stringify(product));
    // AsyncStorage.setItem("cart_items", JSON.stringify(product));

    AsyncStorage.getItem("cart_items", (err, res) => {
      console.log(res);
      var items = JSON.parse(res);

      var dataset = items;
      var search = item.recipeId;
      var count = dataset.reduce(function (n, val) {
        return n + (val === search);
      }, 0);

      console.log(count);

      if (count <= 1) {

      }
      else {
        var index1 = items.indexOf(item.recipeId);
        delete items[index1];
        console.log(index1);
        console.log(items);
        const arr = items.filter(Boolean);
        console.log(arr);
        AsyncStorage.setItem("cart_items", JSON.stringify(arr));

        AsyncStorage.getItem("cart_items", (err, res) => {
          var items = JSON.parse(res);
          const arr = items.filter(Boolean);
          console.log(arr);
          console.log(items);

        });

        console.log(items);
      }

    });

  }

  //add the single item from the cart list 
  onAdd = (item, index) => {
    const { ff } = this.state;
    const product = [...this.state.product];
    if (product[index].quantity == 0) {
      product[index].quantity = 1;
      
    }
    // else if(product[index].quantity <= 9) {
      else  {
      product[index].quantity++;
      
    }
   

    // ff.push(dataSource[index].id);
    // console.log(ff);
    this.setState({ product });

    AsyncStorage.setItem("cart_items1", JSON.stringify(product));

    // AsyncStorage.setItem("cart_items", JSON.stringify(product));

    AsyncStorage.getItem("cart_items", (err, res) => {
      var items = JSON.parse(res);
      items.push(item.recipeId);
      AsyncStorage.setItem("cart_items", JSON.stringify(items));
      console.log(items);
    });

  }

  //asking the user to delete the item form the list
  deleteItem = product => {

    Alert.alert(
      'Alert',
      'Do you want to remove this item from the Cart',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.delete(product) },
      ],
      { cancelable: false },
    );
  }

  //delete the item from the list
  delete(product) {

    let allItems = [...this.state.product];
    let filteredItems = allItems.filter(item => item.recipeId != product.recipeId);
    this.setState({ product: filteredItems })

    AsyncStorage.setItem("cart_items1", JSON.stringify(filteredItems));
    AsyncStorage.setItem("cart_items", JSON.stringify(filteredItems));

    AsyncStorage.getItem("cart_items", (err, res) => {
      var items = JSON.parse(res);
      console.log(items);
    });

    AsyncStorage.getItem("cart_items1", (err, res) => {
      var items = JSON.parse(res);
      console.log(items);
    });
  }

  //validate the information 
  isValid() {
    let valid = false;
    valid = true;
    return valid;
  }


  //this method is used to request the seleted item to server 
  async RequestOrder(totalPrice) {

    console.log("start");
    console.log(this.totalPrice);
    // console.log(this.state.totalPrice);

    // console.log(this.price);
    console.log(this.state.price);
    const cart = [];
    await AsyncStorage.getItem("cart_items", (err, res) => {
      const { time } = this.state;
      console.log(time);
      const items = JSON.parse(res);
      // alert(items);
      console.log(items)

      if (items === null) {
        alert(' no items in the cart');
      }
      else if (time === "select time here") {
        alert('please select estimated time');
      }
      else {
        items.map((x) => cart.push(x));
        this.setState({ cart1: items });
        //   this.state.cart.push(items)
        console.log(cart);

      }
    });

    await AsyncStorage.getItem("userId", (err, res) => {
      const items1 = res;

      this.setState({ id: items1 });
      console.log(items1)
      console.log(res);

    });

    await AsyncStorage.getItem("rest_id", (err, res) => {
      const items1 = res;
      // //rest_id = items1;
      // console.log(rest_id);
      this.setState({ rest_id: items1 });
      console.log(items1)
      console.log(res);

    });
    // this.props.navigation.navigate('Cart',{item_now:cart1});

    AsyncStorage.getItem('userId', (err, id) => {
      console.log(id);

      console.log(this.state.price);

      const price = this.state.price;
      const rest_id = this.state.rest_id;

      const { persons,itemValue,selectedUserType, chosenTime } = this.state;

      if (this.isValid()) {

        NetInfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log(state);
          console.log("Is connected?", state.isConnected);

          // NetInfo.getConnectionInfo().then((connectionInfo) => {

          //console.log(connectionInfo);

          if (state.type == "none") {

            console.log(state.type);

            Snackbar.show({
              title: 'No Internet Connection',
              backgroundColor: 'red',
              duration: Snackbar.LENGTH_LONG,
            });

          }
          else {
            fetch(API + "Order.php", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body:
                //JSON.stringify(this.state.cart)
                JSON.stringify({
                  cart,
                  id,
                  price,
                  rest_id,
                  // persons,
                  itemValue,
                  selectedUserType,
                  chosenTime
                })

            }).then((response) => response.json())
              .then((responseData) => {
                // alert(JSON.stringify(responseData));
                console.log("responseData : " + JSON.stringify(responseData));

                console.log(responseData.status);
                console.log(responseData.orderId);
                console.log(responseData.personsCount);
                console.log(responseData.totalAmount);

                if (responseData.status === true) {
                  console.log("success");
                  this.props.navigation.navigate('payment', { price:totalPrice, order_id: responseData.orderId,personsCount:responseData.personsCount
                  ,totalAmount:responseData.totalAmount });
                  console.log(price);
                }
                else {
                  console.log("error in php");
                }
               

              }).catch((error) => {
                console.log("error : " + error);
              });
            
          }
        });
      }
    });
  }

  //separate the item view
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          // height: 2,
          width: "100%",
          padding: 10,
          // backgroundColor: "#607D8B",
        }}
      />
    );
  }

  //view the ui when no items are avalible in the list 
  _listEmptyComponent = () => {
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    goBack();
    Snackbar.show({
      title: 'Your Cart is Empty',
      backgroundColor: '#ea9a9a',
      duration: Snackbar.LENGTH_LONG,
    });
    return (<Text></Text>)
  }

//this method is used to render all the ui components 
render() {

  console.log("render");

  if (this.state.isLoading) {
    return (
      <View style={CartStyle.cart8}>
        <DotIndicator color='#ed7070' />
      </View>
    );
  }

  const { product } = this.state;
  var totalQuantity = 0;
  var totalPrice = 0;
  //if(product>0){
  product.forEach((item) => {
    // alert(item.quantity);
    totalQuantity += parseInt(item.quantity);
    totalPrice += item.quantity * item.price;
    // this.setState({totalPrice})
    console.log(totalQuantity);
    console.log(totalPrice)

  })
  // if (this.state.price != totalPrice) {
  //   this.fun(totalPrice);
  // }


  return (
    //<ScrollView> 
    <View style={CartStyle.MainContainer}>

      <View style={CartStyle.cart9}>
        <ScrollView>

          <FlatList
            data={this.state.product}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item, index }) =>
              <View style={CartStyle.FlatList} >
                <ListItem
                  item={item}
                  onAdd={() => this.onAdd(item, index)}
                  onSubtract={() => this.onSubtract(item, index)}
                  deleteItem={() => this.deleteItem(item)}

                />
              </View>

            }
            // keyExtractor={item  => item.id}
            keyExtractor={(item, index) => index.toString()}

            ListEmptyComponent={this._listEmptyComponent}
          />
        </ScrollView>


      </View>

      <View style={CartStyle.cart10}>

      <View style={CartStyle.grand}>
        <View style={{width:wp('60%')}}>
          <Text style={CartStyle.text}>  Total Count</Text>
          </View>
          <Text style={CartStyle.text1}> :{totalQuantity}</Text>
          {/* <Text style={styles.text}> :{totalQuantity}</Text> */}
        </View>

        <View style={CartStyle.grand}>
        <View style={{width:wp('60%')}}>
          <Text style={CartStyle.text}> Grand Total </Text>
          </View>
          <Text style={CartStyle.text1}> : {totalPrice}</Text>
        </View>


      </View>


      <View style={CartStyle.cart11}>
        <KeyboardAvoidingView style={CartStyle.cart12} >
          <Text style={CartStyle.cart13}> Provide your estimation time to reach  </Text>

          <TouchableOpacity style={CartStyle.buttontime} onPress={this.showPicker}>
            <Text style={CartStyle.cart14}> {this.state.time} </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isVisible}
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}
            mode={'time'}
            timePickerModeAndroid={'spinner'}
            is24Hour={false}
          />

{/* <TouchableOpacity onPress={this._showTimePicker}>
        <View style ={styles.pickUpBorderView}>
        <Text>Pickup Time {this.state.currentTime}</Text>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode = {'time'}
        />
        </View>
        </TouchableOpacity> */}
        </KeyboardAvoidingView>

        <KeyboardAvoidingView style={CartStyle.cart15} >
          <Text style={{ alignItems: 'center', }}>No.of persons  </Text>

          <View style={CartStyle.cart16}>
            <Picker
              selectedValue={this.state.selectedUserType}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedUserType: itemValue })}>
              {this.loadUserTypes()}
            </Picker>
          </View>
        </KeyboardAvoidingView>
      </View>

      <Text style={CartStyle.text}> </Text><View style={CartStyle.cart17}>



        <TouchableOpacity style={CartStyle.button}
          //payment method call 
          onPress={() => this.RequestOrder(totalPrice)}
          
          >
          <Text style={CartStyle.cart18}>Request order</Text></TouchableOpacity>
      </View>

    </View>
    //  </ScrollView>
  );
}
}