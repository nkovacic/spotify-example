import { ImmerReducer, createActionCreators, createReducerFunction } from 'immer-reducer';
import { IAppState } from './state';

const initialState: IAppState = {
    showPageLoader: false
};

class AppReducer extends ImmerReducer<IAppState> {
    init() { }

    hidePageLoader() {
        this.draftState.showPageLoader = false;
    }
    
    showPageLoader() {
        this.draftState.showPageLoader = true;
    }
}

export const appReducerActionCreators = createActionCreators(AppReducer);
export const appReducerFunction = createReducerFunction(AppReducer, initialState);
