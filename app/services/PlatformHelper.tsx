import { Platform, Dimensions, StatusBar } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');


export class PlatformHelper {
	static isIphoneX() {
        return (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) || (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
    }

	static isAndroid() {
		return Platform.OS === 'android';
	}

	static isIOS() {
		return Platform.OS === 'ios';
	}

	static getStatusBarHeight(skipAndroid: boolean = true) {
		if (this.isIOS()) {
			return this.isIphoneX() ? 44 : 20;
		}

		if (skipAndroid) {
			return 0;
		}

		return StatusBar.currentHeight;
	}
}
