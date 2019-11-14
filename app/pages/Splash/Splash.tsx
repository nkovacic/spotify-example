import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { MainNavigator } from 'app/services/Navigation';

interface Props {

}

class Splash extends Component<Props> {
    private redirectToMain() {
        MainNavigator.redirectAfterLogin();

        SplashScreen.hide();
    }

    componentDidMount() {
        if (__DEV__) {
            this.redirectToMain();
        }
        else {
            setTimeout(() => {
                this.redirectToMain();
            },         2000);
        }
    }

    render() {
        return null;
    }
}

export default Splash;
