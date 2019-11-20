import { IMainState } from '../state';

import { UtilityHelper } from 'app/services/UtilityHelper';

export enum RoutingDirection {
    initial = 'initial',
    backward = 'backward',
    forward = 'forward'
}

export interface IRoutingState {
    previousRouteIndex?: number;
    previousRoute?: string;
    currentRoute: string;
    currentRouteIndex: number;
}

export class RoutingSelectors{
    private state:IMainState;

    constructor(state: IMainState) {
        this.state = state;
    }

    currentRouteSelector () {
        return UtilityHelper.isEmpty(this.state.routing) ? '' : this.state.routing.currentRoute;
    }

    routeDirectionSelector () {
        if (!UtilityHelper.isEmpty(this.state.routing) && UtilityHelper.isNumber(this.state.routing.previousRouteIndex)) {
            return this.state.routing.currentRouteIndex > (this.state.routing.previousRouteIndex as number)
            ? RoutingDirection.forward
            : RoutingDirection.backward;
        }

        return RoutingDirection.initial;
    }
}
