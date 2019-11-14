import React from 'react';
import {
	createAppContainer,
	createStackNavigator,
	StackNavigatorConfig,
	NavigationRouteConfigMap
} from 'react-navigation';

import * as Pages from 'app/pages';
import { NavbarTitle } from '../components';

const appNavigatorPages = {
	splash: {
		screen: Pages.Splash,
		defaultNavigationOptions: {
			header: null
		}
	},
	main: {
        screen: Pages.Main,
        navigationOptions:{
            header:null
        }
	},
	trackPage: {
		screen: Pages.TracksPage
	},
	trackDetails: {
		screen: Pages.TrackDetailPage
	}
} as NavigationRouteConfigMap;

const appNavigatorConfig: StackNavigatorConfig = {
	initialRouteName: 'splash',
	defaultNavigationOptions: {
		headerBackground: <NavbarTitle />
	}
};

const AppNavigator = createStackNavigator(appNavigatorPages, appNavigatorConfig);
const AppNavigationContainer = createAppContainer(AppNavigator);

export default AppNavigationContainer;
