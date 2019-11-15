import React, { SFC } from "react";
import { View, Image, StyleProp, ViewStyle } from "react-native";
import { CustomText, CustomTouchable } from "app/components";
import { MainNavigator } from "app/services";

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

    return (
        <CustomTouchable onPress={onTrackPressed} style={props.style}>
            <View>
                <Image source={ { uri: props.track.preview_url } }  />
                <CustomText>
                    Name: { props.track.name}
                </CustomText>
                <CustomText>
                    Artists: { props.track.artists.map(q => q.name).join(', ') }
                </CustomText>
                <CustomText>
                    Popularity: { props.track.popularity }
                </CustomText>
            </View>
        </CustomTouchable>     
    )
};

export default TrackItemComponent;