import React, { Component } from 'react';
import {
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    TouchableHighlightProps,
    TouchableOpacityProps,
    TouchableNativeFeedbackProps,
    BackgroundPropType
} from 'react-native';

import Logger from 'app/services/Logger';

// tslint:disable-next-line: variable-name
let TouchableComponent: any;

if (Platform.OS === 'android') {
    TouchableComponent = Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback;
}
else {
    TouchableComponent = TouchableOpacity;
}

if (TouchableComponent !== TouchableNativeFeedback) {
    TouchableComponent.SelectableBackground = () => ({});
    TouchableComponent.SelectableBackgroundBorderless = () => ({});
    TouchableComponent.Ripple = () => ({});
    TouchableComponent.canUseNativeForeground = () => false;
}

interface CustomTouchableProps extends TouchableHighlightProps, TouchableOpacityProps, TouchableNativeFeedbackProps {
    fallback?: any;
    foreground?: BackgroundPropType;
    forceNoFeedback?: boolean;
}

class CustomTouchable extends Component<CustomTouchableProps> {
    render() {
        const {
            style,
            foreground,
            background,
            forceNoFeedback,
            ...props
        } = this.props;
        let {
            children,
            useForeground
        } = this.props;

        // Even though it works for TouchableWithoutFeedback and
        // TouchableNativeFeedback with this component, we want
        // the API to be the same for all components so we require
        // exactly one direct child for every touchable type.
        children = React.Children.only(children);

        if (forceNoFeedback || TouchableComponent === TouchableWithoutFeedback) {
            return (
                <TouchableWithoutFeedback {...props}>
                    <View style={style}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        if (TouchableComponent === TouchableNativeFeedback) {
            useForeground = foreground && TouchableNativeFeedback.canUseNativeForeground();

            if (foreground && background) {
                Logger.warn('Specified foreground and background for Touchable, only one can be used at a time. Defaulted to foreground.');
            }

            return (
                <TouchableComponent {...props} useForeground={useForeground}
                    background={(useForeground && foreground) || background}>
                    <View style={style}>
                        {children}
                    </View>
                </TouchableComponent>
            );
        }

// tslint:disable-next-line: variable-name
        const TouchableFallback = this.props.fallback || TouchableComponent;

        return (
            <TouchableFallback {...props} style={style}>
                {children}
            </TouchableFallback>
        );
    }
}

export default CustomTouchable;
