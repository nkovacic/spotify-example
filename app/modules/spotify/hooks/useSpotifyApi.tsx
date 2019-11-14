import { useState, useEffect } from "react";

export interface ISpotifyApiHookResult<T> {
    loading: boolean;
    data: T;
    error: any;
}

type SpotifyApiFunc<T = any> = (options?: any) => Promise<T>;
type SpotifyApiHook<T> = (spotifyApiFunc: SpotifyApiFunc<T>, options?: any) => ISpotifyApiHookResult<T>;

const useSpotifyApi = (spotifyApiFunc: SpotifyApiFunc, options?: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const result = await spotifyApiFunc(options);

                setLoading(false);
                setData(data);
                setError(null);
            } catch (e) {
                setLoading(false);
                setError(e);
                setData(null);
            }
        }

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return { data, loading, error };
};

export default useSpotifyApi;