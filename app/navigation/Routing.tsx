import React, { PureComponent, Ref } from 'react';
import { NavigationAction, NavigationState } from 'react-navigation';
import AppNavigator from './AppNavigator';

interface Props {
    setNavigatorRef: Ref<any>;
    onNavigationStateChange: (
        prevNavigationState: NavigationState,
        nextNavigationState: NavigationState,
        action: NavigationAction
    ) => void | null | undefined;
}

class Routing extends PureComponent<Props> {
    render() {
        return (
            <AppNavigator
                ref={this.props.setNavigatorRef}
                onNavigationStateChange={this.props.onNavigationStateChange}
            />
        );
    }
}

export default Routing;
