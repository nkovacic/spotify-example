import React, { PureComponent } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { Page } from 'app/components';
import appStyle from 'app/appStyle';

interface Props {}

interface State {
	activeIndex: number;
}

class TrackDetailPage extends PureComponent<Props, State> {
	render() {
		return (
			<Page noMargin={true}>
				<SafeAreaView style={{ flex: 1, backgroundColor: appStyle.colors.background }}>
					<View style={styles.container} />
				</SafeAreaView>
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: appStyle.colors.background
	}
});

export default TrackDetailPage;
