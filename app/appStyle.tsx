import { Platform } from 'react-native';
import { scale } from './utilities/scaling';
import { PlatformHelper } from './services/PlatformHelper';

const appStyle = {
    colors: {
        accentColor:'#FE95B4',
        transparent:'#00000000',
        whiteText:'#ffffff',
        background: '#fff',
        blackText: '#231f20',
        blue: '#1b75bb',
        darkGreen: '#00A69C',
        lightGreen: '#8bc53f',
        orange: '#faaf40',
        red: '#ee4036',
        grey: '#b2b2b3',
        lightGrey: '#dddddc',
        paleGrey: 'rgb(250, 251, 251)'
    },
    font: {
        size: {
            small: scale(12),
            default: scale(15),
            big: scale(20),
        },
        family: 'Gilroy',
        weight: {
            regular: 'Gilroy-Regular', 
            medium: 'Gilroy-Medium', 
            bold: 'Gilroy-Bold',
            heavy:'Gilroy-Heavy',
            light:'Gilroy-Light'
        } 
    },
    gradients: {
        blue: {
            start: '#488ecb',
            end: '#2e72b8'
        },
        darkGreen: {
            start: '#05bbd3',
            end: '#009688'
        },
        lightGreen: {
            start: '#cddc37',
            end: '#8bc248'
        },
        orange: {
            start: '#fff249',
            end: '#faac18'
        },
        red: {
            start: '#ed2b2f',
            end: '#c0285e'
        }
    },
    margin: 10
};

export default appStyle;

export interface IGradient {
    start: string;
    end: string;
}

export const GUTTER = scale(40);
export const STATUSBAR_HEIGHT = PlatformHelper.getStatusBarHeight();