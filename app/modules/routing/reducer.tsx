import { ImmerReducer, createActionCreators, createReducerFunction } from 'immer-reducer';

import { IMainState } from 'app/modules/reducers';
import { IRoutingState, RoutingDirection } from './state';

import { UtilityHelper } from 'app/services/UtilityHelper';

const initialState: IRoutingState = {
    currentRoute: '',
    currentRouteIndex: -1
};

class RoutingReducer extends ImmerReducer<IRoutingState> {
    changeRoute(newRoute: string) {
        let currentRouteIndex = this.draftState.currentRouteIndex || 0;
        let	previousRouteIndex = this.draftState.previousRouteIndex;

        if (UtilityHelper.isNumber(this.draftState.currentRouteIndex)) {
            previousRouteIndex = currentRouteIndex;

            if (this.draftState.previousRoute === newRoute) {
                currentRouteIndex -= 1;
            }
            else {
                currentRouteIndex += 1;
            }
        }

        this.draftState.previousRouteIndex = previousRouteIndex;
        this.draftState.previousRoute = this.draftState.currentRoute;
        this.draftState.currentRoute = newRoute;
        this.draftState.currentRouteIndex = currentRouteIndex;
    }
}

export const currentRouteSelector = (state: IMainState) => {
    return UtilityHelper.isEmpty(state.routing) ? '' : state.routing.currentRoute;
};

export const routeDirectionSelector = (state: IMainState) => {
    if (!UtilityHelper.isEmpty(state.routing) && UtilityHelper.isNumber(state.routing.previousRouteIndex)) {
        return state.routing.currentRouteIndex > (state.routing.previousRouteIndex as number)
        ? RoutingDirection.forward
        : RoutingDirection.backward;
    }

    return RoutingDirection.initial;
};

export const routingActionCreators = createActionCreators(RoutingReducer);
export const routingReducerFunction = createReducerFunction(RoutingReducer, initialState);
