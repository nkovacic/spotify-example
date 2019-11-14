import useSpotifyApi, { ISpotifyApiHookResult } from "./useSpotifyApi";
import SpotifyService from "../SpotifyService";

const usePlaylist = (id: string) => {
    const spotify = SpotifyService.getSpotifyApi();

    return useSpotifyApi(() => spotify ? spotify.getPlaylist(id): Promise.reject()) as ISpotifyApiHookResult<SpotifyApi.SinglePlaylistResponse | null>;
};

export default usePlaylist