import React, { SFC } from "react";
import { Image, View, StyleSheet } from "react-native";

import { CustomText } from "app/components";

import { scale } from "app/utilities/scaling";

interface Props {
    playlists: SpotifyApi.PlaylistObjectSimplified[];
}

const PlaylistsListComponent: SFC<Props> = (props) => {
    return (
        <View>
            {
                props.playlists.map(q => (
                    <View key={q.id}>
                        { 
                            q.images && q.images.length 
                            ? <Image style={style.image} source={ { uri: q.images[0].url } } />
                            : null 
                        }
                        <CustomText>
                            { q.name }
                        </CustomText>
                        <CustomText>
                            { q.tracks ? q.tracks.total : 0 }
                        </CustomText>
                    </View>
                ))
            }
        </View>
    )
};

const style = StyleSheet.create({
    image: {
        height: scale(40),
        width: scale(40)
    }
})

export default PlaylistsListComponent;