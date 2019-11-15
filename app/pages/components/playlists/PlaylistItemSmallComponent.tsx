import React, { SFC } from "react";
import { Image, StyleSheet, View  } from 'react-native';

import { CustomTouchable, CustomText } from "app/components";

import { MainNavigator } from "app/services";

import { scale } from "app/utilities/scaling";

interface Props {
    playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistItemSmallComponent: SFC<Props> = (props) => {
    const navigateToSinglePlaylist = () => {
        MainNavigator.dispatch('trackPage', {
            playlist: props.playlist
        });
    }

    return (
        <CustomTouchable onPress={navigateToSinglePlaylist}>
            <View>
                { 
                    props.playlist.images && props.playlist.images.length 
                    ? <Image style={style.image} source={ { uri: props.playlist.images[0].url } } />
                    : null 
                }
                <CustomText>
                    { props.playlist.name }
                </CustomText>
                <CustomText>
                    { props.playlist.tracks ? props.playlist.tracks.total : 0 }
                </CustomText>
            </View>      
        </CustomTouchable>               
    )
};

const style = StyleSheet.create({
    image: {
        height: scale(40),
        width: scale(40)
    }
});

export default PlaylistItemSmallComponent;