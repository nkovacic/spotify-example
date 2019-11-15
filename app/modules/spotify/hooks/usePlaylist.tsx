import useSpotifyApi, { SpotifyApiHookResult } from "./useSpotifyApi";
import SpotifyService from "../SpotifyService";

const usePlaylist = (id: string) => {
    const spotify = SpotifyService.getSpotifyApi();

    return useSpotifyApi(() => spotify ? spotify.getPlaylist(id): Promise.reject(), id) as SpotifyApiHookResult<SpotifyApi.SinglePlaylistResponse | null>;
};

export default usePlaylist