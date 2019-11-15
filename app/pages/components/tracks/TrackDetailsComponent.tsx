import React, { SFC } from "react";
import { Image, StyleSheet, View } from "react-native";

import { CustomText, HumanReadableTime } from "app/components";

import { scale } from "app/utilities/scaling";

import { UtilityHelper } from "app/services";

interface Props {
    track: SpotifyApi.TrackObjectFull;
}

const TrackDetailsComponent: SFC<Props> = (props) => {
    if (!props.track) {
        return (
            <View>
                <CustomText>
                    No track found!
                </CustomText>
            </View>
        );
    }

    let albumImageUrl = props.track.album 
        && UtilityHelper.isNotEmpty(props.track.album.images)
        ? props.track.album.images[0].url : '';

    const artists = UtilityHelper.isNotEmpty(props.track.artists)
        ? props.track.artists.map(q => q.name).join(', ')
        : '';

    const trackDurationInSeconds = Math.round(props.track.duration_ms / 1000);

    return (
        <View>
            <Image style={style.image} source={ { uri: albumImageUrl } } />
            <CustomText>
                Name: { props.track.name}
            </CustomText>
            <CustomText>
                Artists: { artists }
            </CustomText>
            <CustomText>
                Album: { props.track.album.name }
            </CustomText>
            <CustomText>
                Popularity: { props.track.popularity }
            </CustomText>
            <CustomText>
                Duration: <HumanReadableTime durationInSeconds={trackDurationInSeconds} />
            </CustomText>
        </View>
    );
};

const style = StyleSheet.create({
    image: {
        height: scale(40),
        width: scale(40)
    }
});

export default TrackDetailsComponent;