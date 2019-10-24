import React, { Component } from 'react';
import {
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  PixelRatio,
  TouchableOpacity,
  //TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
  Input,
  TouchableHighlight,
} from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import { API } from '../Server/Server';
import{UpdateprofileStyles} from '../StyleSheet/Styles';

export default class Update_profile extends Component {
 
 //to set state variable and declare state variables 
  constructor(props) {
    super(props);
    this.state = {
      profile_image: null,
      data: null,
      username: '',
      mobilenumber: '',
      usertype: '',
      email:this.props.navigation.state.params.email,
      showPass: true,
      press: false,
      status:'0',
      ImageSource: this.props.navigation.state.params.image,
      email1:'',
      name1:'',
      status1:0
    }
  }

  // to set the seleted image properties
  selectPhotoTapped() {
    console.log("selected");
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        
        let source = { uri: response.uri };
        
        this.setState({

          ImageSource: source.uri,
          data: response.data,
          status:'1'

        });
      }
    });
  }
  //validating the user entered values
  isValid() {
    const { username, email} = this.state;
    let valid = false;

    if (username.length === 0) {
      alert("Enter Username");
    }
    else if (email.length === 0) {
      alert("Enter email");
    }
    else if (!this.verifyEmail(email)) {
      alert("Invalid Email");
    }
    else {
      valid = true;
    }
    return valid;
  }
  verifyEmail(email) {
    // var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return reg.test(email);
  }

  // visable and disable the image picker
  showPass = () => {
    
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true, })
    }
    else {
      this.setState({ showPass: true, press: false, })
    }
  }

   // Received user detailes Sent From Previous Activity and Set Into State.
  componentDidMount() {
    this.setState({
      profile_image: this.props.navigation.state.params.image,
     username: this.props.navigation.state.params.name,
       email: this.props.navigation.state.params.email,
       name1: this.props.navigation.state.params.name,
       email1: this.props.navigation.state.params.email,

    })

  }

  //to recall the mehtod in lifecycle method
 componentWillReceiveProps(){
  if(this.state.status1===0){
    const {email1,name1} = this.state;
    console.log(email1);
    console.log(name1);
    this.setState({
      email:email1,
      username:name1
    });

  }
  else{
    this.setState({status1:0});
  }
}


//this method is used to store the user image and detailes in database
  uploadImageToServer = () => {
    this.setState({status1:1});
    AsyncStorage.getItem('number', (err, result) => {
      // alert(result);
        this.setState({
          user_id:result
          });
    
   console.log(this.state.user_id);
  
    this.setState({ loading: true, disabled: true }, () => {

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

          if(this.isValid()){
           
      RNFetchBlob.fetch('POST',API+'UpdateInfo.php', {
        Authorization: "Bearer access-token",       
        'Content-Type': 'multipart/form-data',
      }, [
          { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
          { name: 'username', data: this.state.username },
          { name: 'email', data: this.state.email },
          { name: 'mobileNumber', data: this.state.user_id },
          { name: 'status', data: this.state.status }
        ]).then((resp) => {
console.log(resp);
console.log(resp.data);
          var tempMSG = resp.data;
          alert("Updated Successfully");
          // alert((tempMSG));
          tempMSG = tempMSG.replace(/^"|"$/g, '');
          //this.props.navigation.navigate('Home')
          const{params} = this.props.navigation.state;
          const{goBack} = this.props.navigation;
          params.callHome();
          goBack();
        }).catch((err) => {
          console.log(err);
          // ...
        })
      }
      }
    });
    })
  });
  }


//render all ui components 
render() {
  const { dataSource } = this.state;
  const { goBack } = this.props.navigation;
  return (
<View>
    <View  > 
    <View>
    <TouchableOpacity  onPress={() => goBack(null)} >
      <Text style={UpdateprofileStyles.pro}> ﹤</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={UpdateprofileStyles.container}>
      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View
          style={[
            UpdateprofileStyles.avatar,
            UpdateprofileStyles.avatarContainer,
            { borderWidth:0.7 },
          ]}
        >
          {this.state.ImageSource === null ? (
            <Text style={UpdateprofileStyles.text}>Select a Photo</Text>
          ) : (
              <Image style={UpdateprofileStyles.avatar} source={{ uri: this.state.ImageSource}}
              />
            )}
            <View style={UpdateprofileStyles.editIcon}>
               
                  </View>
           </View>
           <Text style={UpdateprofileStyles.pro2}>Edit</Text>
           
      </TouchableOpacity>


      <Text style={UpdateprofileStyles.pro3}>Username:</Text>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TextInput  style={UpdateprofileStyles.edit1}
            placeholder="Enter Name"
         //   underlineColorAndroid="red"
            value={this.state.username}
            onChangeText={TextInputValue => this.setState({ username: TextInputValue })}
            underlineColorAndroid="transparent"
          />

        </View>
      </TouchableOpacity>
     
     
      <Text style={UpdateprofileStyles.pro4}>Email:</Text>
      <TouchableOpacity >
        <View style={UpdateprofileStyles.imagestyles}>
        <TextInput  style={UpdateprofileStyles.edit1}
            placeholder="Enter Email"
            value={this.state.email}
            onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
            underlineColorAndroid="transparent"
          />

        </View>
      </TouchableOpacity>
      

      <View style={[UpdateprofileStyles.buttonContainer, UpdateprofileStyles.signinButton]}>
        <TouchableOpacity onPress={this.uploadImageToServer.bind(this)} >
          <Text style={UpdateprofileStyles.signinText} >Update</Text>
        </TouchableOpacity>

        {/* {
          (this.state.loading)
            ?
            (<ActivityIndicator color='#283B53' />)
            :
            null
        } */}

      </View>
      </View>

    </View>

  );
}
}


const styles = StyleSheet.create({


  container: {
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: 'black',
    borderWidth: 30 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',

  },
  edit1:{
    "width": "95%",
    height:hp('6%'),
            paddingLeft:10 ,
            borderWidth:0.7,
            marginLeft:5,
            //marginTop:5
          

  },
  editse:{
    "width": "95%",
    height:hp('10%'),
            paddingLeft:10 ,
            borderWidth:0.7,
            marginLeft:5,
           // marginTop:5
          
  },
  avatar: {
     //borderRadius: 100,
    width: 120,
    borderColor:'white',
    borderWidth: 10,
    height: 120,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation:5
  },
  text: {
    color: 'white',
    fontSize: 20,

  },
  subcontainer: {
    flex: 2,
    flexDirection:'row',
    paddingTop:40
  },

  container1: {
    flex: 1,
    backgroundColor: '#F79D17',
    justifyContent: 'space-between',
  },
  content: {
    //alignItems:'center',
    justifyContent: 'space-around',
    flexDirection: 'row',

  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '900',
    fontSize: 30,

  },
  signinText: {
    color: 'white',
  },
  Text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  Textinput: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    //right:70,
    height: 35,
    color: 'white',
  },
  signinText: {
    color: 'white',
  },


  buttonContainer: {

    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:250,
    marginTop: 80,
    // marginLeft: 30,
    backgroundColor: "#ed7070",
    width: 250,
    borderRadius: 30,
  },



  signupButton: {
    backgroundColor: "white",


  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A2C1',
  },
  bottomview: {
    alignSelf: 'center',
    /*position: 'absolute',
    bottom: 0,*/
  },
  ccc: {

    //backgroundColor: '#F5FCFF',
    backgroundColor: '#F79D17',
  },
  editIcon: {
    // justifyContent: 'center',
    // alignItems: 'center',
     paddingLeft:120,
    // paddingTop:30,
  },

});