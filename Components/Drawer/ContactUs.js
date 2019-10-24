/*Version :1.0.0.
 *FileName:AboutUs.js.
 *Purpose: information about the organization.
 *Developers Involved:Mahesh,Naveen
 */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Text, View, StyleSheet, Image, ScrollView, Linking ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Contactus} from '../StyleSheet/Styles';
export default class ContactUs extends Component {
  static navigationOptions =
    {
      header:null
    };
     //This is lifecycle method used to get the data from navigation values
    componentDidMount() {
      let data = this.props.navigation.state.params;
      console.log(data);
      //if(data) console.log(data.name); // => Job here
    }

    //This is lifecycle method used to reload the page
    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
  }

   //This method is used to render all the components
   render() {
    const { goBack } = this.props.navigation;
    return (
<View style={Contactus.container}>
<View style={Contactus.subcontainer} > 
<View>
<TouchableOpacity  onPress={() => goBack(null)} >
 
  <Text style={Contactus.back}> ﹤</Text>
</TouchableOpacity>
</View>
<View style={Contactus.content}>
    <Text style={Contactus.cont}>Contact Us</Text>
    </View>
</View>
<View style={Contactus.content1}>
 
<Text style={Contactus.content2}>India Office Cadrac Labs India Pvt.Ltd 2-37/141,2nd flor,Gachibowli Central,Vinayaknagar,Gachibowli Hyderabad-500032 </Text>
</View>
</View>
    );
  }
}