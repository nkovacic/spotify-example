import React, { SFC } from "react";
import { View, StyleSheet } from "react-native";

import PlaylistItemSmallComponent from "./PlaylistItemSmallComponent";

interface Props {
    playlists: SpotifyApi.PlaylistObjectSimplified[];
}

const PlaylistsListComponent: SFC<Props> = (props) => {
    return (
        <View style={style.container}>
            {
                props.playlists.map(q => (
                    <PlaylistItemSmallComponent playlist={q} />            
                ))
            }
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaylistsListComponent;