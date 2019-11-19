// @ts-ignore
import SpotifyApi from 'spotify-web-api-js';
import { isAfter, addHours } from 'date-fns';

import { UtilityHelper } from 'app/services';

import featurePlaylists from './spotify-mocked-requests/feature-playlists';
import userMe from './spotify-mocked-requests/user-me';
import singlePlaylist from './spotify-mocked-requests/single-playlist';

export interface ISpotifySession {
    accessToken: string;
    expireTime: Date;
    refreshToken: string;
    scopes: string[];
}

const fakeSpotifyApi: SpotifyApi.SpotifyWebApiJs = {
    getMe: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userMe);
            }, 100);
        });
    },
    getFeaturedPlaylists: (options?: Object) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(featurePlaylists);
            }, 200);
        });
    },
    getPlaylist: (playlistId: string) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(singlePlaylist);
            }, 200);
        });
    }
} as any;

class SpotifyService {
    private spotifyApi: SpotifyApi.SpotifyWebApiJs | null = null;

    public async initializeAsync() {
        return await this.refreshAccessToken();
    }

    public async isInitializedAsync() {
        return Promise.resolve(true);
    }

    public async isLoggedInAsync() {
        let isLoggedIn = true;

        if (isLoggedIn) {
            const session = await this.getSessionAsync();

            return session && isAfter(session.expireTime, new Date());
        }

        return isLoggedIn;
    }

    public async loginAsync() {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 500)
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