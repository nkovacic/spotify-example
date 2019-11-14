// @ts-ignore
import SpotifySdk from 'rn-spotify-sdk';
import SpotifyApi from 'spotify-web-api-js';

import { UtilityHelper } from 'app/services';

interface ISpotifySession {
    accessToken: string;
    expireTime: Date;
    refreshToken: string;
    scopes: string[];
}

class SpotifyService {
    private spotifyApi: SpotifyApi.SpotifyWebApiJs;

    public async initializeAsync() {
        const isInitialized = await this.isInitializedAsync();

        if (!isInitialized) {
            const spotifyOptions = {
				'clientID': '46b53485b8e548dcae66adaf7163a0da',
				'sessionUserDefaultsKey':'SpotifySession',
				'redirectURL':'examplespotifyapp://auth',
				'scopes': ['user-read-private', 'playlist-read', 'playlist-read-private'],
            };
            
            await SpotifySdk.initialize(spotifyOptions);
        }

        const session = await this.getSessionAsync();

        if (session && UtilityHelper.isNotEmpty(session.accessToken)) {
            this.spotifyApi = new SpotifyApi();

            this.spotifyApi.setAccessToken(session.accessToken);
        }

        return session;
    }

    public async isInitializedAsync() {
        return SpotifySdk.isInitializedAsync() as Promise<boolean>;
    }

    public async getSessionAsync() {
        return await SpotifySdk.getSessionAsync() as ISpotifySession;
    }
} 

export default new SpotifyService();