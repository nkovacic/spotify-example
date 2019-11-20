import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { MappedStateAndActions } from 'redux-render-prop';

import { Page } from 'app/components';
import { createAppConnect } from 'app/modules/connect';

import { HeaderComponent, PlaylistsListComponent } from 'app/pages/components';

import mainTranslations from 'app/mainTranslations';

import { scale } from 'app/utilities/scaling';

class Main extends PureComponent<MappedStateAndActions<typeof MainConnect>> {
	componentDidMount() {
		this.props.appInit();
	}

	render() {
		return (
			<Page noMargin={true}>
				<View style={styles.container}>
					<HeaderComponent title={mainTranslations.general.appTitle} />
					<ScrollView style={styles.dataContainer}>
						<PlaylistsListComponent playlists={this.props.playlists} />
					</ScrollView>
				</View>
			</Page>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1
	},
	dataContainer: {
		marginTop: scale(10)
	}
});

// tslint:disable-next-line: variable-name
const MainConnect = createAppConnect({
	mapState: (state) => {
		return {
			playlists: state.spotifySelectors.getPlaylists()
		};
	},
	mapActions: (actions) => {
		return {
			appInit: actions.appActions.init,
			changeRoute(route: string) {
				actions.routingActions.changeRoute(route);
			}
		};
	}
});

export default () => <MainConnect>{(data, actions) => <Main {...data} {...actions} />}</MainConnect>;
