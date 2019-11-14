import { combineReducers, AnyAction, Reducer } from 'redux';
import { routingReducerFunction as routing } from './routing/reducer';
import { IRoutingState } from 'app/modules/routing';
import { IAppState, appReducerFunction } from './app/reducer';
import { ISpotifyState, spotifyReducerFunction } from './spotify/reducer';

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => {
    const appReducer = combineReducers({
        routing: routing as Reducer<any>,
        app: appReducerFunction as Reducer<any>,
        spotify: spotifyReducerFunction as Reducer<any>
    });

    return appReducer(state, action);
};

export interface IActionWithPayload<T = any> extends AnyAction {
    payload: T;
}

export interface IMainState {
    app: IAppState;
    routing: IRoutingState;
    spotify: ISpotifyState;
}

export default rootReducer;
