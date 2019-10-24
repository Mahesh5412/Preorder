import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,Dimensions, ImageBackground} from 'react-native';
import {Icon,Title,Button,Container,Content,Header,Right,Left,Body,Tab, Tabs, TabHeading,Footer,FooterTab} from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Geocoder from 'react-native-geocoder';
import { DotIndicator } from 'react-native-indicators';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import { API } from '../Server/Server';
import {HomeStyles} from '../StyleSheet/Styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Home extends Component {
  //to set the state variables 
  constructor() {
    super();
    // this.healthCheck();
    this.state = {
      location1:"",
      isLoading:false,
      serverData: [],
      image_tag:[],
      NY : {
        lat: '',
        lng: ''
      },
      NY1 : {
        lat: "17.3958",
        lng: "78.4312"
      },
      g:'',
      
      //Data Source for the SearchableDropdown
    };
  }
//calculate the delta values
  async calcDelta(lat, lon, acc){
    this.setState({
     NY : {
       lat: lat,
       lng: lon
     },
   })

console.log("enter");
   const res = await Geocoder.geocodePosition(this.state.NY);
   const g = res[0].locality;
   console.log(res[0]);
   console.log('postion', res[0].locality);
   this.setState({g});
}

//load the data based on user location info and get the area names from database
loadData(lat,lon){

console.log(lat);
console.log(lon);

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
  fetch( API + "Location.php", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lat,
      lon
    })
  }).then((response) => response.json())
    .then((responseJson) => {

if(responseJson.status){
  console.log(responseJson);
  this.setState({
    serverData: [...responseJson.data],
    isLoading:false
  });
}
else{
alert("No Results Found");
}
      console.log(responseJson);
    }).catch((error) => {
      console.log(error);
    });
  }
});
}


//used to get the user device location 
location = () =>{
   navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const  acc= position.coords.accuracy
      console.log("1");
      this.setState({
        NY : {
          location1:"get",
          lat: lat,
          lng: lon
        },
      })
      console.log(this.state.location1);
      console.log("2");
      this.loadData(lat,lon);
    },
    (error)=>{
      console.log(error);
    }
  );

}

// healthCheck = () => {
//   console.log("afafasfaf")
//       this.setState({isLoading:true});
//        fetch(API + "healthCheck.php")
//        .then((response) => response.json())
//        .then((responseJson) => {
//         if(responseJson.status==='false'){
//           this.props.navigation.navigate('Maintance');
//         }
//         else
//         {
//          // this.setState({isLoading:true});
//           const {location1} = this.state;
//           this.location();
//         }
//        })
//        .catch((error) => {
//          console.log(error);
//        });
// }

// componentWillMount(){
//   this.healthCheck();
// }


//lifecycle method 
   componentDidMount() {
    // this.healthCheck();
    console.log("start");
    this.setState({isLoading:true});
    const {location1} = this.state;
    this.location();
  }

  //life cycle method
  componentWillUnmount(){
    clearInterval(this._interval);
  }

  //this method is used to navigate to resaturant list page.
  fine(item)
  {
    AsyncStorage.setItem('area_name',item.name);
    AsyncStorage.setItem('area_id',item.id);
    this.props.navigation.navigate('Res_list', {area_select:item.name,area_id:item.id});
  }

  //this method is used to render ui design
  render() {

   

    return (

      <Container style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>

        <Header
          androidStatusBarColor="#ea9a9a"

          style={HomeStyles.headerstyles}>

          <Left style={{ flex: 1 }}>
            <Icon name="md-menu" style={HomeStyles.iconstyles} onPress={() =>
              this.props.navigation.toggleDrawer()} />
          </Left>
          <Body style={{ flex: 1.3 }}>
            <Title style={HomeStyles.texthome}>Home</Title>
          </Body>
       

        </Header>

        <Content>
          <View style={HomeStyles.container}>
            <View>
              <ImageBackground
                style={HomeStyles.imagestyles}
                source={require('../Images/background.jpeg')}>


                <View style={HomeStyles.contain}>
                  <View style={HomeStyles.contain1}>

                    <SearchableDropdown
                      onTextChange={text => console.log(text)}

                  
                      onItemSelect={item => this.fine(item)}

                      containerStyle={HomeStyles.home3}

                      textInputStyle={HomeStyles.home2}
                      itemStyle={HomeStyles.home1}
                      itemTextStyle={{
                        color: 'black',
                      }}
                      itemsContainerStyle={{
                  
                      }}
                      items={this.state.serverData}
                      defaultIndex={2}
                      placeholder="          SEARCH YOUR  AREA"
                      resetValue={true}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

        </Content>

      </Container>
    );
  }
}