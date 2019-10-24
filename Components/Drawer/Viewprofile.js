import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    PixelRatio,
    View,
    Dimensions,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {ViewprofileStyles} from '../StyleSheet/Styles1';
export default class Viewprofile extends Component {
    //to set state variable and declare state variables 
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            mobilenumber: '',
            usertype: '',
            showPass: true,
            press: false,
            ImageSource: this.props.navigation.state.params.image,
        }
    }
    //render all ui components
    render() {

        return (

            <View style={ViewprofileStyles.container}>


                <View

                    style={[
                        ViewprofileStyles.avatar,
                        ViewprofileStyles.avatarContainer,
                        { borderWidth: 0.7 },
                    ]}
                >

                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={300}
                        imageHeight={300}
                    >
                        <Image style={ViewprofileStyles.imagestyles} source={{ uri: this.state.ImageSource }}

                        />
                    </ImageZoom>

                </View>





            </View>

        );
    }
}
