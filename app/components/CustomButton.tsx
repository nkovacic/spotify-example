import React, { Component } from 'react';
import { TextProps, StyleSheet, StyleProp, TextStyle, View } from 'react-native';

import CustomIcon, { CustomIconProps } from './CustomIcon';
import CustomText from './CustomText';
import CustomTouchable from './CustomTouchable';

import { scale } from 'app/utilities/scaling';

import appStyle from '../appStyle';

export enum ButtonColor {
    blue
}

export enum ButtonSize {
    medium,
    large
}

interface CustomButtonProps extends TextProps {
    color?: ButtonColor;
    rightIcon?: CustomIconProps;
    textStyle?: StyleProp<TextStyle>;
    size?: ButtonSize;
}

class CustomButton extends Component<CustomButtonProps> {
    private getButtonStyle() {
        const buttonStyle = [styles.button] as any[];
        const textStyle = [styles.text];

        switch (this.props.color) {
            case ButtonColor.blue:
                buttonStyle.push(styles.buttonBlue);
                textStyle.push(styles.buttonBlueText);

                break;
            default:
                buttonStyle.push(styles.buttonDefault);
                textStyle.push(styles.buttonDefaultText);

                break;
        }

        switch (this.props.size) {
            case ButtonSize.large:
                buttonStyle.push(styles.buttonLarge);
                textStyle.push(styles.buttonLargeText);

                break;
            default:
                buttonStyle.push(styles.buttonMedium);
                textStyle.push(styles.buttonMediumText);

                break;
        }

        if (!this.props.rightIcon) {
            textStyle.push(styles.textFullWidth);
        }

        return {
            buttonStyle,
            textStyle
        };
    }

    render() {
        const { onPress } = this.props;
        const { buttonStyle, textStyle } = this.getButtonStyle();

        return (
            <CustomTouchable {...this.props} style={[buttonStyle, this.props.style]}
                onPress={onPress}>
                <View style={styles.buttonContainer}>
                    <CustomText numberOfLines={1} style={[textStyle, this.props.textStyle]}>
                        {this.props.children}
                    </CustomText>
                    {
                        this.props.rightIcon
                        ?
                            <CustomIcon {...this.props.rightIcon}
                                style={[this.props.rightIcon.style, styles.rightIcon]} />
                        :
                            null
                    }
                </View>
            </CustomTouchable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: scale(10),
        borderWidth: scale(1),
        overflow: 'hidden'
    },
    text: {
        textAlign: 'center'
    },
    textFullWidth: {
        flexGrow: 1
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonDefault: {
        backgroundColor: appStyle.colors.lightGrey
    },
    buttonDefaultText: {
        color: '#000'
    },
    buttonBlue: {
        backgroundColor: appStyle.colors.blue,
        borderColor: appStyle.colors.lightGrey
    },
    buttonBlueText: {
        color: '#fff'
    },
    buttonMedium: {
        paddingBottom: scale(5),
        paddingLeft: scale(15),
        paddingRight: scale(15),
        paddingTop: scale(5)
    },
    buttonMediumText: {
        fontSize: scale(18),
        fontFamily: appStyle.font.weight.regular
    },
    buttonLarge: {
        fontSize: scale(26),
        fontFamily: appStyle.font.weight.medium,
        paddingBottom: scale(10),
        paddingLeft: scale(35),
        paddingRight: scale(35),
        paddingTop: scale(10)
    },
    buttonLargeText: {
        fontSize: scale(26),
        fontFamily: appStyle.font.weight.medium
    },
    rightIcon: {
        marginLeft: scale(30)
    }
});

export default CustomButton;
