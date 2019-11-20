import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { CustomText, FontWeight } from 'app/components';

import { scale } from 'app/utilities/scaling';
import appStyle from 'app/appStyle';

import images from 'assets/images';

interface Props {
	title: string;
}

class HeaderComponent extends PureComponent<Props> {
	static defaultProps: Props = {
		title: ''
	} as any;

	render() {
		return (
			<View style={styles.container}>
				<Image resizeMode="cover" source={images.header} style={styles.image} />
				<CustomText fontWeight={FontWeight.bold} style={styles.title}>
					{this.props.title}
				</CustomText>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		borderBottomRightRadius: scale(60),
		overflow: 'hidden'
	},
	image: {
		width: '100%',
		height: scale(250),
		position: 'absolute'
	},
	title: {
		fontSize: 25,
		color: appStyle.colors.whiteText,
		marginTop: scale(180)
	}
});

export default HeaderComponent;
