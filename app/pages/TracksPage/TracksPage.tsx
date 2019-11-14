import React, { PureComponent } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Page } from 'app/components';
import appStyle from 'app/appStyle';

interface INavigationParams {
	playlist: SpotifyApi.PlaylistObjectSimplified;
}

interface Props extends NavigationScreenProps<INavigationParams> {}

class TracksPage extends PureComponent<Props> {
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

export default TracksPage;
