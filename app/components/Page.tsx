import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewProps, StatusBar } from 'react-native';
import { NavigationInjectedProps, withNavigationFocus } from 'react-navigation';

import appStyle from 'app/appStyle';

interface Props extends ViewProps, NavigationInjectedProps {
    canUpdateWhenNotFocused?: boolean;
    noMargin?: boolean;
    backgroundColor?: string;
    isFocused: boolean;
    isLoading?: boolean;
}

class Page extends Component<Props> {
    static defaultProps: Partial<Props> = {
        isLoading: false,
        noMargin: false,
        backgroundColor: appStyle.colors.background,
    };

    shouldComponentUpdate(nextProps: Props) {
        return this.props.isFocused || nextProps.isFocused;
    }

    render() {
        return (
            <View
                style={[
                    styles.page,
                    {
                        paddingTop: this.props.noMargin ? 0 : appStyle.margin,
                        paddingHorizontal: this.props.noMargin ? 0 : appStyle.margin,
                        backgroundColor: this.props.backgroundColor || appStyle.colors.background,
                    },
                    this.props.style,
                ]}
            >
                <StatusBar
					barStyle={'light-content'}
					backgroundColor={appStyle.colors.accentColor}
				/>
                {this.props.isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator />
                </View>
                )}
                {!this.props.isLoading && this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor:appStyle.colors.background
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default withNavigationFocus(Page);
