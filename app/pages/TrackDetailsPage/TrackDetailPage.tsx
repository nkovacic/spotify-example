import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Page } from 'app/components';
import { TrackDetailsComponent } from 'app/pages/components/tracks';

import appStyle from 'app/appStyle';

interface INavigationParams {
	track: SpotifyApi.TrackObjectFull;
}

interface Props extends NavigationScreenProps<INavigationParams> {}

class TrackDetailPage extends PureComponent<Props> {
	render() {
		return (
			<Page noMargin={true}>
				<SafeAreaView style={{ flex: 1, backgroundColor: appStyle.colors.background }}>
					<ScrollView>
						<TrackDetailsComponent track={this.props.navigation.getParam('track')} />
					</ScrollView>					
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
