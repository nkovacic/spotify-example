import React, { SFC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { CustomText, HumanReadableTime, FontWeight } from 'app/components';

import { scale } from 'app/utilities/scaling';

import { UtilityHelper } from 'app/services';

interface Props {
	track: SpotifyApi.TrackObjectFull;
}

const TrackDetailsComponent: SFC<Props> = (props) => {
	if (!props.track) {
		return (
			<View>
				<CustomText>No track found!</CustomText>
			</View>
		);
	}

	let albumImageUrl =
		props.track.album && UtilityHelper.isNotEmpty(props.track.album.images) ? props.track.album.images[0].url : '';

	const artists = UtilityHelper.isNotEmpty(props.track.artists)
		? props.track.artists.map((q) => q.name).join(', ')
		: '';

	const trackDurationInSeconds = Math.round(props.track.duration_ms / 1000);

	return (
		<View>
			<Image style={style.image} source={{ uri: albumImageUrl }} />
			<View style={{ margin: scale(10) }}>
				<CustomText
					fontWeight={FontWeight.bold}
					style={{
						color: 'black',
						fontSize: 16,
						flexWrap: 'wrap',
						width: scale(230)
					}}
				>
					Name:
				</CustomText>
				<CustomText fontWeight={FontWeight.medium} style={style.valueText}>
					{props.track.name}
				</CustomText>
				<CustomText fontWeight={FontWeight.bold} style={style.labelText}>
					Artists:
				</CustomText>
				<CustomText fontWeight={FontWeight.medium} style={style.valueText}>
					{artists}
				</CustomText>
				<CustomText fontWeight={FontWeight.bold} style={style.labelText}>
					Album:
				</CustomText>
				<CustomText fontWeight={FontWeight.medium} style={style.valueText}>
					{props.track.album.name}
				</CustomText>
				<CustomText fontWeight={FontWeight.bold} style={style.labelText}>
					Popularity:
				</CustomText>
				<CustomText fontWeight={FontWeight.medium} style={style.valueText}>
					{props.track.popularity}
				</CustomText>
				<CustomText fontWeight={FontWeight.bold} style={style.labelText}>
					Duration:
				</CustomText>
				<CustomText fontWeight={FontWeight.medium} style={style.valueText}>
					<HumanReadableTime durationInSeconds={trackDurationInSeconds} />
				</CustomText>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	image: {
		height: scale(300),
		width: '100%',
		borderBottomRightRadius: scale(40)
	},
	valueText: {
		color: 'gray',
		fontSize: 16,
		flexWrap: 'wrap',
		width: scale(230),
		marginBottom: scale(10)
	},
	labelText: {
		color: 'black',
		fontSize: 16,
		flexWrap: 'wrap',
		width: scale(230)
	}
});

export default TrackDetailsComponent;
