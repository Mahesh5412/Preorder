/*Version :1.0.0.
 *FileName:AboutUs.js.
 *Purpose: information about the organization.
 *Developers Involved:Mahesh,Naveen
 */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Text, View, StyleSheet, Image, ScrollView, Linking ,TouchableOpacity} from 'react-native';
import { Aboutus } from '../StyleSheet/Styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class ContactUs extends Component {
  static navigationOptions =
    {
      header:null
    };
    //This is lifecycle method used to get the data from navigation values
    componentDidMount() {
      let data = this.props.navigation.state.params;
      console.log(data);
    }
        //This is lifecycle method used to reload the page
    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
      let data = this.props.navigation.state.params;
      console.log(data);
  }
  //This method is used to render all the components
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={Aboutus.container}>
        <View style={Aboutus.subcontainer} >
          <View>
            <TouchableOpacity onPress={() => goBack(null)} >
              <Text style={Aboutus.back }> ﹤</Text>
            </TouchableOpacity>
          </View>
          <View style={Aboutus.content}>
            <Text style={Aboutus.title}>About Us</Text>
          </View>
        </View>
        <View style={Aboutus.textstyle}>
          <Text style={Aboutus.text}>Cadrac Labs is a Research and Development organization emperical in advanced technologies such as Cloud,IOT and AI.Our MISSION in Research and Development is to  </Text>
          <Text style={Aboutus.text}>acquire,develop and educate people in the field of Information Technology.Most of our research is generated towards under- developed and developing countries to solve their existing</Text>

        </View>
      </View>

    );
  }
}