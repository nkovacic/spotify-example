
import { AnyAction } from "redux";
import { takeLeading, call, put } from "redux-saga/effects";

import { appReducerActionCreators } from "./reducer";
import { spotifyReducerActionCreators } from "app/modules/spotify/reducer";

import SpotifyService from "app/modules/spotify/SpotifyService";
import { AlertService, Logger, UtilityHelper } from "app/services";


export const appInit = function* (action: AnyAction) {
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
            fn: SpotifyService.refreshLogin
        });

        yield call({
            context: SpotifyService,
            fn: SpotifyService.refreshAccessToken
        });
    }

    const spotifyApi = SpotifyService.getSpotifyApi();

    if (isLoggedIn && spotifyApi) {
        yield put(appReducerActionCreators.showPageLoader());

        const currentUser: SpotifyApi.CurrentUsersProfileResponse = yield call({
            context: spotifyApi,
            fn: spotifyApi.getMe
        });

        const userCountryFeaturedPlaylists: SpotifyApi.ListOfFeaturedPlaylistsResponse = yield call({
            context: spotifyApi,
            fn: spotifyApi.getFeaturedPlaylists,          
        }, {
            country: currentUser.country
        });
        
        if (userCountryFeaturedPlaylists) {
            yield put(spotifyReducerActionCreators.setPlaylists(userCountryFeaturedPlaylists.playlists));
        }

        yield put(appReducerActionCreators.hidePageLoader());
    }
    else {
        AlertService.warning('Spotify login is required! Restart app and start again.');
    } 
};

export default [
    takeLeading(appReducerActionCreators.init.type, appInit)
];
