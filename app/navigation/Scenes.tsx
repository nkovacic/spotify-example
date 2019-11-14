import React, { PureComponent } from 'react';
import { MappedStateAndActions } from 'redux-render-prop';
import { MainNavigator } from 'app/services';
import { NavigationState, NavigationAction } from 'react-navigation';
import Routing from './Routing';
import { createAppConnect } from 'app/modules/connect';

class Scenes extends PureComponent<MappedStateAndActions<typeof ScenesConnect>> {
    setNavigatorRef = (navigatorRef: any) => {
        MainNavigator.setTopLevelNavigator(navigatorRef);
    }

    onNavigationStateChange = (prevState: NavigationState, currentState: NavigationState, action: NavigationAction) => {
        const currentRoute = MainNavigator.routeFromNavigationStateSelector(currentState);
        const currentRouteName = currentRoute && currentRoute.routeName;
        const prevRoute = MainNavigator.routeFromNavigationStateSelector(prevState);
        const prevRouteName = prevRoute && prevRoute.routeName;

        if (currentRouteName && prevRouteName !== currentRouteName) {
            this.props.changeRoute(currentRouteName);
        }
    }

    render() {
        return (
            <Routing setNavigatorRef={this.setNavigatorRef} onNavigationStateChange={this.onNavigationStateChange} />
        );
    }
}

const ScenesConnect = createAppConnect({
    mapActions: (actions) => {
        return ({
            changeRoute: actions.routingActions.changeRoute
        });
    }
});

export default () => <ScenesConnect>{(data, actions) => <Scenes {...data} {...actions} />}</ScenesConnect>;
