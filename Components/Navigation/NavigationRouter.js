import React, { Component } from 'react';
import {
	ActivityIndicator,
	Button,
	StatusBar,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import { Nav } from '../StyleSheet/Styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { DotIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Update_profile from '../Drawer/Update_profile';
import Res_list from '../Screens/Res_list';
import AboutUs from '../Drawer/AboutUs';
import Hotellist from '../Screens/Hotellist';
import Home from '../Screens/Home';
import YourRides from '../Drawer/YourRides';
import HowtoUse from '../Drawer/Howtouse';
import ContactUs from '../Drawer/ContactUs';
import drawerContentComponents from '../Drawer/DrawerContentComponents';
import Item from '../Screens/Item';
import ItemView from '../Screens/ItemView';
import Mobile from '../Authentication/Mobile';
import Valid from '../Authentication/Valid';
import Cart1 from '../Screens/Cart';
import payment from '../Screens/Payment';
import Viewprofile from '../Drawer/Viewprofile';
import Maintance from '../Screens/Maintance';
import RazorPay from '../Screens/RazorPay';
import { API } from '../Server/Server';


class NavigationRouter extends Component {
	//used to set state and declare state variable.
	constructor() {
		super();
		//	this._bootstrapAsync();
		this.Maintance();
	}

	Maintance = () => {
		console.log("afafasfaf")
		//	this.setState({isLoading:true});
		fetch(API + "healthCheck.php")
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.status === 'false') {
					this.props.navigation.navigate('Maintance');
				}
				else {
					this._bootstrapAsync();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		//	this.props.navigation.navigate('Maintance');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};

	// Render any loading content that you like here
	render() {
		return (
			<View style={Nav.container}>
				<DotIndicator color='#ed7070' />
			</View>
		);
	}
}

const Drawer = createDrawerNavigator(
	{
		Home: { screen: Home },
		YourRides: { screen: YourRides },
		AboutUs: { screen: AboutUs },
		Howtouse: { screen: HowtoUse },
		ContactUs: { screen: ContactUs },
		Update_profile: { screen: Update_profile },
		RazorPay: { screen: RazorPay },

	},
	{
		drawerWidth: widthPercentageToDP('65%'),
		contentComponent: drawerContentComponents
	}
);

const AppStack = createStackNavigator({
	Home: {
		screen: Drawer,
		navigationOptions: {
			header: null,
		},
	},
	Res_list: {
		screen: Res_list,
		navigationOptions: {
			header: null,
		},
	},
	Hotellist: {
		screen: Hotellist,
		navigationOptions: {
			header: null,
		},
	},
	AboutUs: {
		screen: AboutUs,
		navigationOptions: {
			header: null,
		},
	},
	Update_profile: {
		screen: Update_profile,
		navigationOptions: {
			header: null,
		},
	},
	Maintance: {
		screen: Maintance,
		navigationOptions: {
			header: null,
		},
	},
	Viewprofile: {
		screen: Viewprofile,
		navigationOptions: ({ navigation }) => {

			return {
				headerTitle: 'Profile',

				// headerLeft: <HamburgerIcon navigation={navigation}  />,
				headerRight: <Text></Text>,
				headerTitleStyle: {

					textAlign: 'center',
					//	marginLeft:-30,
					flex: 1
				},
				headerStyle: {
					backgroundColor: '#fff',
					elevation: 0, // remove shadow on Android
					shadowOpacity: 0, // remove shadow on iOS 
				},
				headerTintColor: '#ed7070',
			}
		},
		headerLayoutPreset: 'center'
	},
	Item: {
		screen: Item,
		navigationOptions: {
			header: null,
		},
	},
	Cart1: {
		screen: Cart1,
		navigationOptions: ({ navigation }) => {

			return {
				headerTitle: 'CART',

				// headerLeft: <HamburgerIcon navigation={navigation}  />,
				headerRight: <Text></Text>,
				headerTitleStyle: {

					textAlign: 'center',
					//	marginLeft:-30,
					flex: 1
				},
				headerStyle: {
					backgroundColor: '#fff',
					elevation: 0, // remove shadow on Android
					shadowOpacity: 0, // remove shadow on iOS 
				},
				headerTintColor: '#ed7070',
			}
		},
		headerLayoutPreset: 'center'
	},
	ItemView: {
		screen: ItemView,
		navigationOptions: {
			header: null,
		},
	},
	payment: {
		screen: payment,
		navigationOptions: {
			header: null,
		},
	},
	RazorPay: {
		screen: RazorPay,
		navigationOptions: {
			header: null,
		},
	},


});

const AuthStack = createStackNavigator({
	mobile: {
		screen: Mobile,
		navigationOptions: {
			header: null,
		},
	},
	valid: {
		screen: Valid,
		navigationOptions: {
			header: null,
		},
	}
});
export default createAppContainer(createSwitchNavigator(
	{
		AuthLoading: NavigationRouter,
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	home: {
		paddingLeft: 20,
	}
});