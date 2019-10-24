import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Splash from './Components/Screens/Splash';
import NavigationRouter from './Components/Navigation/NavigationRouter';
const RootStack = createStackNavigator(
  {
    Splash: { 
          screen: Splash,
          navigationOptions: {
              header: null,
          },
        },
        NavigationRouter: { 
              screen: NavigationRouter,
              navigationOptions: {
                  header: null,
              },
            },
          },
  {
    initialRouteName: 'Splash',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}