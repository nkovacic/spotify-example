import { expectSaga } from 'redux-saga-test-plan';

jest.mock('app/modules/spotify/SpotifyService');

import { spotifyReducerActionCreators, spotifyReducerFunction } from 'app/modules/spotify/reducer';
import { appInit } from 'app/modules/app/sagas';

import { ISpotifyState } from 'app/modules/spotify/state';

import featurePlaylists from 'mocks/spotify-mocked-requests/feature-playlists';

describe('Trigger app initialize', () => {
    it('Populate playlists on login success', async() => {
        const { storeState } = await expectSaga(appInit as any)
            .withReducer(spotifyReducerFunction as any, {})
            .put({
                type: spotifyReducerActionCreators.setPlaylists.type,
                payload: featurePlaylists.playlists
            })
            .run();

        expect(storeState).toEqual({
            playlists: featurePlaylists.playlists.items as any
        } as ISpotifyState);
    });
});