import React, { Component } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import { makeReactNativeFieldProps } from 'react-native-formik';

import CustomText from 'app/components/CustomText';

import appStyle from 'app/appStyle';
import { scale } from 'app/utilities/scaling';

export enum InputSizingType {
    fixedWidth,
    fullWidth
}

export enum InputType {
    email,
    name,
    number,
    password,
    text
}

interface InputProps extends TextInputProps, makeReactNativeFieldProps {
    error?: string;
    label?: string;
    sizingType?: InputSizingType;
    touched?: boolean;
    inputType?: InputType
}

class CustomInput extends Component<InputProps> {
    private input: TextInput | null;

    static defaultProps: InputProps = {
        name: '',
        sizingType: InputSizingType.fullWidth,
        inputType: InputType.text
    };

    focus() {
        this.input!.focus();
    }

    render() {
        let combinedStyles = [styles.inputContainer, this.props.style] as Array<any>;
        
        const { error, touched, ...props } = this.props;
        const displayError = !!error && touched;

        switch (this.props.sizingType) {
            case InputSizingType.fullWidth:
                combinedStyles.unshift(styles.fullWidthSizingContainer);

                break;
            default:
                break;
        }

        return (
            <View style={combinedStyles}>
                <TextInput {...props} style={styles.input}
                    ref={input => (this.input = input)}
                    placeholder={this.props.placeholder} placeholderTextColor={appStyle.colors.grey} />
                <View style={[styles.inputLine, displayError ? styles.inputLineError: styles.inputLineValid]} />
                { displayError && <CustomText style={styles.error}>{error}</CustomText> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        height: scale(36),
        width: '100%'
    },
    fullWidthSizingContainer: {
        paddingLeft: scale(40),
        paddingRight: scale(40),
        width: '100%'
    },
    input: {
        fontSize: scale(20),
        marginLeft: scale(-2),       
        paddingBottom: 0
    },
    inputLine: {
        borderTopWidth: 1,
        marginTop: scale(-2)
    },
    inputLineValid: {
        borderTopColor: appStyle.colors.lightGrey
    },
    inputLineError: {
        borderTopColor: appStyle.colors.red
    },
    error: {
        color: appStyle.colors.red,
        fontSize: appStyle.font.size.default, 
        marginTop: scale(5)
    }  
});

export default CustomInput;