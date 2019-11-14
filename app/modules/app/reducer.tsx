import { ImmerReducer, createActionCreators, createReducerFunction } from 'immer-reducer';

export interface IAppState {

}

const initialState: IAppState = {
};

class AppReducer extends ImmerReducer<IAppState> {

}

export const appReducerActionCreators = createActionCreators(AppReducer);
export const appReducerFunction = createReducerFunction(AppReducer, initialState);
