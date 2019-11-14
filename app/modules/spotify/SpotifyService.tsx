// @ts-ignore
import SpotifySdk from 'rn-spotify-sdk';
import SpotifyApi from 'spotify-web-api-js';
import { isAfter } from 'date-fns';

import { UtilityHelper, Logger } from 'app/services';

interface ISpotifySession {
    accessToken: string;
    expireTime: Date;
    refreshToken: string;
    scopes: string[];
}

class SpotifyService {
    private spotifyApi: SpotifyApi.SpotifyWebApiJs | null = null;

    public async initializeAsync() {
        const isInitialized = await this.isInitializedAsync();

        if (!isInitialized) {
            const spotifyOptions = {
				'clientID': '46b53485b8e548dcae66adaf7163a0da',
				'sessionUserDefaultsKey':'SpotifySession',
				'redirectURL':'spotifyexample://auth',
				'scopes': ['user-read-private', 'playlist-read', 'playlist-read-private'],
            };
            
            await SpotifySdk.initialize(spotifyOptions);
        }

        return await this.refreshAccessToken();
    }

    public async isInitializedAsync() {
        return await SpotifySdk.isInitializedAsync() as Promise<boolean>;
    }

    public async isLoggedInAsync() {
        let isLoggedIn = await (SpotifySdk.isLoggedInAsync() as Promise<boolean>);

        if (isLoggedIn) {
            const session = await this.getSessionAsync();

            Logger.log(`Session: ${JSON.stringify(session)}`);

            return session && isAfter(session.expireTime, new Date());
        }

        return isLoggedIn;
    }

    public async loginAsync() {
        return await SpotifySdk.login({
            showDialog: true
        }) as Promise<boolean>;
    }

    public async getSessionAsync() {
        return await SpotifySdk.getSessionAsync() as ISpotifySession;
    }

    public getSpotifyApi() {
        return this.spotifyApi;
    }

    public async refreshLogin() {
        SpotifySdk.logout();

        return await this.loginAsync();
    }

    public async refreshAccessToken() {
        const session = await this.getSessionAsync();

        if (session && UtilityHelper.isNotEmpty(session.accessToken)) {
            if (!this.spotifyApi) {
                this.spotifyApi = new SpotifyApi();
            }

            this.spotifyApi.setAccessToken(session.accessToken);
        }
        else {
            this.spotifyApi = null;
        }

        return session;
    }
} 

export default new SpotifyService();