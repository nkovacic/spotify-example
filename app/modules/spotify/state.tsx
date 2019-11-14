import { BaseSelector } from "../base/BaseSelector";

const emptyArray = [] as any[];

export class SpotifySelectors extends BaseSelector {
    getPlaylists() {
        return this.state.spotify.playlists || emptyArray;
    }
}