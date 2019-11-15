import React, { SFC } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { CustomText, CustomTouchable, FontWeight } from 'app/components';

import { MainNavigator } from 'app/services';

import { scale } from 'app/utilities/scaling';

interface Props {
	style?: StyleProp<ViewStyle>;
	track: SpotifyApi.TrackObjectFull;
}

const TrackItemComponent: SFC<Props> = (props) => {
	const onTrackPressed = () => {
		MainNavigator.dispatch('trackDetails', {
			track: props.track
		});
	};

	const albumImageUrl =
		props.track.album && props.track.album.images && props.track.album.images.length
			? props.track.album.images[0].url
			: '';

	const artists =
		props.track.artists && props.track.artists.length ? props.track.artists.map((q) => q.name).join(', ') : '';

	return (
		<CustomTouchable onPress={onTrackPressed} style={props.style}>
			<View style={style.container}>
				<Image style={style.image} source={{ uri: albumImageUrl }} />
				<View style={{marginLeft:scale(10)}}>
					<CustomText fontWeight={FontWeight.bold} style={{color:'black',fontSize:16,flexWrap:'wrap'}}>{props.track.name}</CustomText>
					<CustomText fontWeight={FontWeight.medium} style={{color:'gray',fontSize:16}}>Artists: {artists}</CustomText>
					<CustomText fontWeight={FontWeight.medium} style={{color:'gray',fontSize:16}}>Popularity: {props.track.popularity}</CustomText>
				</View>
			</View>
		</CustomTouchable>
	);
};

const style = StyleSheet.create({
	image: {
		height: scale(100),
        width: scale(100),
        borderRadius:scale(5)
	},
	container: {
        flexDirection: 'row',
        alignItems:'center'
	}
});

export default TrackItemComponent;
