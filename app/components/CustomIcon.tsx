import React, { Component } from 'react';
import { TextProps } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import appStyle from 'app/appStyle';

export enum IconType {
    fontAwesome5,
    ionicons
}

export interface CustomIconProps extends TextProps {
    color?: string;
    name: string;
    iconType?: IconType; 
    size?: number;
}

class CustomIcon extends Component<CustomIconProps> {
    static defaultProps: CustomIconProps = {
        color: appStyle.colors.orange,
        iconType: IconType.fontAwesome5,
        size: appStyle.font.size.default
    } as any;

    private throwNotFoundIconName() {
        throw new Error(`Icon with name ${this.props.name} not found for type ${this.props.iconType}!`);
    }

    render() {
        let Icon: any;

        switch (this.props.iconType) {
            case IconType.fontAwesome5:
                Icon = FontAwesome5Icon;
                /*
                if (!FontAwesome5Icon.hasIcon(this.props.name)) {
                    this.throwNotFoundIconName();
                }*/

                break;
            case IconType.ionicons:
                Icon = Ionicons;

                if (!Ionicons.hasIcon(this.props.name)) {
                    this.throwNotFoundIconName();
                }

                break;
            default:
                throw new Error(`Icon type ${this.props.iconType} not found!`);
        }

        return (
            <Icon {...this.props} name={this.props.name} size={this.props.size} color={this.props.color} /> 
        );
    }
}

export default CustomIcon;