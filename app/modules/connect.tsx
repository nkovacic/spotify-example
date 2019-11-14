import { makeConnector } from 'redux-render-prop';
import { IMainState } from './reducers';
import { AppSelectors } from './app/state';
import { RoutingSelectors } from './routing';
import { bindActionCreators } from 'redux';
import { appReducerActionCreators } from './app/reducer';
import { routingActionCreators } from './routing/reducer';

export const createAppConnect = makeConnector({
    prepareState: (state: IMainState) => ({
        appSelector: new AppSelectors(state),
        routingSelector: new RoutingSelectors(state),
    }),

    prepareActions: (dispatch) => {
        return ({
            routingActions: bindActionCreators(routingActionCreators, dispatch),
            appActions: bindActionCreators(appReducerActionCreators, dispatch),
        });
    }
});
