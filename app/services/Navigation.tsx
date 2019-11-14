import {
    NavigationAction,
    NavigationActions,
    NavigationRoute,
    NavigationState,
    StackActions,
    NavigationContainerComponent,
    NavigationNavigateActionPayload
} from 'react-navigation';

import { UtilityHelper } from './UtilityHelper';

export enum NavigatorEvents {
    willFocus = 'willFocus',
    didFocus = 'didFocus',
    willBlur = 'willBlur',
    didBlur = 'didBlur'
}

export class MainNavigator {
    private static navigator: NavigationContainerComponent;
    private static navigatorPromise: Promise<NavigationContainerComponent>;
    private static navigationPromiseResolve: (value: NavigationContainerComponent) => void;

    private static getNavigator() {
        if (this.navigatorPromise) {
            return this.navigatorPromise;
        }

        if (this.navigator) {
            return Promise.resolve(this.navigator)
        }

        return this.navigatorPromise = new Promise<NavigationContainerComponent>((resolve) => {
            this.navigationPromiseResolve = resolve;
        });
    }

    static dispatch(routeName: string, params?: any): Promise<boolean>;
    static dispatch(action: NavigationAction): Promise<boolean>;
    static dispatch(actionOrRouteName: any, params?: any) {
        return this.getNavigator()
            .then((navigator) => {
                if (UtilityHelper.isString(actionOrRouteName)) {
                    return navigator.dispatch(NavigationActions.navigate({ params, routeName: actionOrRouteName }));
                }

                return navigator.dispatch(actionOrRouteName);
            });
    }

    static push(...routes: NavigationNavigateActionPayload[]): Promise<void>;
    static push(...routes: string[]): Promise<void>;
    static push(...routes: any[]): Promise<void> {
        return this.getNavigator()
            .then((navigator) => {
                if (routes && routes.length && navigator.state && (navigator.state as any).nav
                    && !UtilityHelper.isEmpty(((navigator.state as any).nav as NavigationState).routes)) {
                    const previousRoutes = ((navigator.state as any).nav as NavigationState).routes;
                    const navigationAction = StackActions.reset({
                        index: routes.length + previousRoutes.length - 1,
                        actions: [
                            ...previousRoutes.map(route => NavigationActions.navigate({ routeName: route.routeName, params: route.params })),
                            ...routes.map(route => UtilityHelper.isString(route)
                                ? NavigationActions.navigate({ routeName: route })
                                : NavigationActions.navigate(route)
                            )
                        ]
                    });

                    navigator.dispatch(navigationAction);
                }
            });
    }

    static redirectAfterLogin() {
        const actionToDispatch = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'main' })]
        });

        return this.dispatch(actionToDispatch);
    }

    static redirectToAuthentication() {
        const actionToDispatch = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'authMain' })]
        });

        return this.dispatch(actionToDispatch);
    }

    static routeFromNavigationStateSelector(state: NavigationState): NavigationRoute {
        if (!state) {
            return null as any;
        }

        let currentRootRoute: NavigationRoute;

        if (state.routes && state.routes.length) {
            currentRootRoute = state.routes[state.index];

            if (UtilityHelper.isArray((currentRootRoute as NavigationState).routes)) {
                return this.routeFromNavigationStateSelector(currentRootRoute as NavigationState);
            }
        }
        else {
            currentRootRoute = state as NavigationRoute;
        }

        return currentRootRoute;
    }

    static setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
        this.navigator = navigatorRef;

        if (this.navigationPromiseResolve) {
            this.navigationPromiseResolve(this.navigator);
        }

        delete this.navigatorPromise;
        delete this.navigationPromiseResolve
    }
}
