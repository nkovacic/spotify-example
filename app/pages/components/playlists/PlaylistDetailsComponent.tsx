import React, { SFC } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { usePlaylist } from "app/modules/spotify/hooks";

import { CustomText } from "app/components";
import { TrackItemComponent } from "app/pages/components/tracks";
import { scale } from "app/utilities/scaling";

interface Props {
    playlist: SpotifyApi.PlaylistObjectSimplified
}

const PlayListDetailsComponent: SFC<Props> = (props) => {
    const [data, loading, error ] = usePlaylist(props.playlist.id)

    if (loading) {
        return (
            <View>
                <CustomText>
                    Loading...
                </CustomText>
            </View>
        )
    }

    if (data) {
        return (
            <ScrollView>
                { data.tracks.items.map(q => <TrackItemComponent key={q.track.id} track={q.track} style={styles.trackItem} />) }
            </ScrollView>
        );
    }
    
    return (
        <View>
            <CustomText>
                An error occured: {JSON.stringify(error)}
            </CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    trackItem: {
        marginBottom: scale(20)
    }
});

export default PlayListDetailsComponent;