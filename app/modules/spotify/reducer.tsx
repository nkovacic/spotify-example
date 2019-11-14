import { ImmerReducer, createActionCreators, createReducerFunction } from 'immer-reducer';

export interface ISpotifyState {
    playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const initialState: ISpotifyState = {
    playlists: []
};

class SpotifyReducer extends ImmerReducer<ISpotifyState> {
    setPlaylists(playlistsResponse: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>) {
        if (playlistsResponse) {
            this.draftState.playlists = playlistsResponse.items;
        }
    }
}

export const spotifyReducerActionCreators = createActionCreators(SpotifyReducer);
export const spotifyReducerFunction = createReducerFunction(SpotifyReducer, initialState);