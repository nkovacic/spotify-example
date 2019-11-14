import React, { Component } from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
    size: number;
}

class CircleView extends Component<Props> {
    render() {
        const circleStyle = {
            borderRadius: this.props.size / 2,
            height: this.props.size,
            width: this.props.size
        };

        return (
            <View {...this.props} style={[circleStyle, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}

export default CircleView;
