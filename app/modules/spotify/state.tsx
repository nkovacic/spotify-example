import { BaseSelector } from "../base/BaseSelector";

export interface ISpotifyState {
    playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const emptyArray = [] as any[];

export class SpotifySelectors extends BaseSelector {
    getPlaylists() {
        return this.state.spotify.playlists || emptyArray;
    }
}