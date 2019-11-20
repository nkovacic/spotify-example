import { combineReducers, AnyAction, Reducer } from 'redux';
import { routingReducerFunction } from './routing/reducer';
import { appReducerFunction } from './app/reducer';
import { spotifyReducerFunction } from './spotify/reducer';

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => {
    const appReducer = combineReducers({
        routing: routingReducerFunction as Reducer<any>,
        app: appReducerFunction as Reducer<any>,
        spotify: spotifyReducerFunction as Reducer<any>
    });

    return appReducer(state, action);
};

export interface IActionWithPayload<T = any> extends AnyAction {
    payload: T;
}

export default rootReducer;
