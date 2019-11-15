import React, { SFC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { CustomTouchable, CustomText, FontWeight, CircleView } from 'app/components';

import { MainNavigator } from 'app/services';

import { scale } from 'app/utilities/scaling';
import appStyle from 'app/appStyle';

interface Props {
	playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistItemSmallComponent: SFC<Props> = (props) => {
	const navigateToSinglePlaylist = () => {
		MainNavigator.dispatch('trackPage', {
			playlist: props.playlist
		});
	};

	return (
		<CustomTouchable onPress={navigateToSinglePlaylist}>
			<View style={style.container}>
				{props.playlist.images && props.playlist.images.length ? (
					<Image style={style.image} source={{ uri: props.playlist.images[0].url }} />
				) : null}
				<CustomText style={style.title} fontWeight={FontWeight.bold}>
					{props.playlist.name}
				</CustomText>
				<CircleView size={scale(30)} style={style.circle}>
					
					<CustomText fontWeight={FontWeight.bold} style={{color:'white'}}>{props.playlist.tracks ? props.playlist.tracks.total : 0}</CustomText>
				</CircleView>
				
			</View>
		</CustomTouchable>
	);
};

const style = StyleSheet.create({
	image: {
		height: scale(150),
		width: scale(150),
		borderRadius: scale(10)
	},
	container: {
		width: '45%',
		margin: scale(5)
	},
	title: {
		flex:1,
		color: 'black',
		fontSize: 18
    },
    circle:{
        backgroundColor:appStyle.colors.accentColor,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        margin:scale(10)
    }
});

export default PlaylistItemSmallComponent;
