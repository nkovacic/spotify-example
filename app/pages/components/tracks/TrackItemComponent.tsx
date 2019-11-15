import React, { SFC } from "react";
import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { CustomText, CustomTouchable } from "app/components";

import { MainNavigator } from "app/services";

import { scale } from "app/utilities/scaling";

interface Props {
    style?: StyleProp<ViewStyle>;
    track: SpotifyApi.TrackObjectFull;
}

const TrackItemComponent: SFC<Props> = (props) => {
    const onTrackPressed = () => {
        MainNavigator.dispatch('trackDetails', {
            track: props.track
        });
    }

    const albumImageUrl = props.track.album 
        && props.track.album.images
        && props.track.album.images.length ? props.track.album.images[0].url : '';

    const artists = props.track.artists 
        && props.track.artists.length 
        ? props.track.artists.map(q => q.name).join(', ')
        : '';

    return (
        <CustomTouchable onPress={onTrackPressed} style={props.style}>
            <View>
                <Image style={style.image} source={ { uri: albumImageUrl } }  />
                <CustomText>
                    Name: { props.track.name}
                </CustomText>
                <CustomText>
                    Artists: { artists }
                </CustomText>
                <CustomText>
                    Popularity: { props.track.popularity }
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

export default TrackItemComponent;