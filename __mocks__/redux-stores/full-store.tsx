import configureStore from 'redux-mock-store';

import { IMainState } from 'app/modules/state';
import featurePlaylists from '../spotify-mocked-requests/feature-playlists';

const mockStore = configureStore();

const initialState: IMainState = {
    app: {
        showPageLoader: false
    },
    spotify: {
        playlists: featurePlaylists.playlists as any
    },
    routing: {
        currentRoute: '',
        currentRouteIndex: 0,
        previousRoute: '',
        previousRouteIndex: -1
    }
};

export default mockStore(initialState);