
import { takeLeading, call, put } from "redux-saga/effects";

import { appReducerActionCreators } from "./reducer";

import SpotifyService from "app/modules/spotify/SpotifyService";
import { AlertService } from "app/services";

const appInit = function* () {
    yield call({
        context: SpotifyService,
        fn: SpotifyService.initializeAsync
    });

    let isLoggedIn: boolean = yield call({
        context: SpotifyService,
        fn: SpotifyService.isLoggedInAsync
    });

    if (!isLoggedIn) {
        isLoggedIn = yield call({
            context: SpotifyService,
            fn: SpotifyService.loginAsync
        });
    }

    if (isLoggedIn) {
        yield put(appReducerActionCreators.showPageLoader());

        const spotifyApi = SpotifyService.getSpotifyApi();

        const currentUser: SpotifyApi.CurrentUsersProfileResponse = yield call({
            context: spotifyApi,
            fn: spotifyApi.getMe
        })

        const userCountryFeaturedPlaylists: SpotifyApi.ListOfFeaturedPlaylistsResponse = yield call({
            context: spotifyApi,
            fn: spotifyApi.getFeaturedPlaylists,          
        }, {
            country: currentUser.country
        })
        
        
    }
    else {
        AlertService.warning('Spotify login is required! Restart app and start again.');
    } 
};

export default [
    takeLeading(appReducerActionCreators.init.type, appInit)
];
