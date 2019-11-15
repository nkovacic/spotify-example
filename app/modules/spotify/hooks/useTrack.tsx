import useSpotifyApi, { SpotifyApiHookResult } from "./useSpotifyApi";
import SpotifyService from "app/modules/spotify/SpotifyService";

const useTrack = (id: string) => {
    const spotify = SpotifyService.getSpotifyApi();

    return useSpotifyApi(() => spotify ? spotify.getTrack(id): Promise.reject(), id) as SpotifyApiHookResult<SpotifyApi.SingleTrackResponse | null>;
};

export default useTrack