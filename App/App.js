import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './Components/Login/LoginScreen';
import HomeScreen from './Components/Home/Home';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="LoginScreen"
	          component={LoginScreen}
	        	animation='fade'
	          hideNavBar={true}
	          initsial={true}
	        />
	        <Scene key="HomeScreen"
	          component={HomeScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
	}
}