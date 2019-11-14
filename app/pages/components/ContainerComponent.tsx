import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { CustomText, FontWeight } from 'app/components';

import { scale } from 'app/utilities/scaling';
import appStyle from 'app/appStyle';

class ContainerComponent extends PureComponent<Props> {
	render() {
		return (
			<View style={styles.container}>
				<CustomText fontWeight={FontWeight.regular}>test</CustomText>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1
	}
});

export default ContainerComponent;
