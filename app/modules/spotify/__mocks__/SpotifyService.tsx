// @ts-ignore
import SpotifyApi from 'spotify-web-api-js';
import { isAfter, addHours } from 'date-fns';

import { UtilityHelper } from 'app/services';

import featurePlaylists from 'mocks/spotify-mocked-requests/feature-playlists';
import userMe from 'mocks/spotify-mocked-requests/user-me';
import singlePlaylist from 'mocks/spotify-mocked-requests/single-playlist';

export interface ISpotifySession {
    accessToken: string;
    expireTime: Date;
    refreshToken: string;
    scopes: string[];
}

const fakeSpotifyApi: SpotifyApi.SpotifyWebApiJs = {
    getMe: () => {
        return new Promise((resolve) => {
            resolve(userMe);
        });
    },
    getFeaturedPlaylists: (options?: Object) => {
        return new Promise((resolve) => {
            resolve(featurePlaylists);
        });
    },
    getPlaylist: (playlistId: string) => {
        return new Promise((resolve) => {
            resolve(singlePlaylist);
        });
    }
} as any;

class SpotifyService {
    private isLoggedIn = false;
    
    private spotifyApi: SpotifyApi.SpotifyWebApiJs | null = null;

    public async initializeAsync() {
        return await this.refreshAccessToken();
    }

    public async isInitializedAsync() {
        return Promise.resolve(true);
    }

    public async isLoggedInAsync() {
        let isLoggedIn = this.isLoggedIn;

        if (isLoggedIn) {
            const session = await this.getSessionAsync();

            return session && isAfter(session.expireTime, new Date());
        }

        return isLoggedIn;
    }

    public async loginAsync() {
        return new Promise<boolean>((resolve) => {
            this.isLoggedIn = true;

            resolve(true);
        });
    }

    public async getSessionAsync() {
        return Promise.resolve({
            accessToken: UtilityHelper.createGuid(),
            expireTime: addHours(new Date(), 2),
            refreshToken: UtilityHelper.createGuid(),
            scopes: ['user-read-private', 'playlist-read', 'playlist-read-private']
        } as ISpotifySession);
    }

    public getSpotifyApi() {
        return this.spotifyApi;
    }

    public async refreshLogin() {
        this.isLoggedIn = false;
        
        return await this.loginAsync();
    }

    public async refreshAccessToken() {
        const session = await this.getSessionAsync();

        if (session && UtilityHelper.isNotEmpty(session.accessToken)) {
            this.spotifyApi = fakeSpotifyApi;
        }
        else {
            this.spotifyApi = null;
        }

        return session;
    }
} 

export default new SpotifyService();