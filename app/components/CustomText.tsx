import React, { Component } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

import appStyle from '../appStyle';

export enum FontWeight {
    medium,
    bold,
    regular
}

interface CustomTextProps extends TextProps {
    fontWeight?: FontWeight;
}

class CustomText extends Component<CustomTextProps> {
    private getFontFamily() {
        const baseFontFamily = appStyle.font.family;

        switch (this.props.fontWeight) {
            case FontWeight.bold:
                return `${baseFontFamily}-Bold`;
            case FontWeight.medium:
                return `${baseFontFamily}-Medium`;
            default:
                return `${baseFontFamily}-Regular`;
        }
    }

    render() {
        const fontFamily = this.getFontFamily();

        return (
            <Text {...this.props} style={[styles.text, this.props.style, { fontFamily }]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: appStyle.font.size.default,
    }
});

export default CustomText;
