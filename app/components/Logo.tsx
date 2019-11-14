import React, { Component } from 'react';
import { Image, StyleSheet, ViewProps } from 'react-native';

import images from '../../assets/images';

import { scale } from 'app/utilities/scaling';

export enum LogoSize {
    big,
    medium,
    small
}

interface Props extends ViewProps {
    type?: LogoSize;
    height?: number;
    width?: number;
}

class Logo extends Component<Props> {
    render() {
        let logoStyles = styles.mediumLogo;

        if (this.props.height || this.props.width) {
            logoStyles = {
                height: this.props.height,
                width: this.props.width
            } as any;
        }
        else {
            switch (this.props.type) {
                case LogoSize.big:
                    logoStyles = styles.bigLogo;

                    break;
                case LogoSize.small:
                    logoStyles = styles.smallLogo;

                    break;
                default:
                    logoStyles = styles.mediumLogo;
                    break;
            }
        }

        return (
            <Image {...this.props} style={[logoStyles as any, this.props.style]}
                source={images.logo}
                resizeMode="contain"
            />
        );
    }
}

const styles = StyleSheet.create({
    smallLogo: {
        height: scale(20)
    },
    mediumLogo: {
        height: scale(40)
    },
    bigLogo: {
        height: scale(60)
    }
});

export default Logo;
