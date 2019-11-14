import React, { Component, PureComponent } from 'react';
import { View,StyleSheet } from 'react-native';
import { MappedStateAndActions } from 'redux-render-prop';

import { CustomText, Page } from 'app/components';
import { createAppConnect } from 'app/modules/connect';

import { 
	HeaderComponent, PlaylistsListComponent
} from 'app/pages/components';

import mainTranslations from 'app/mainTranslations';

import images from '../../assets/images';
import { ScrollView } from 'react-native-gesture-handler';

class Main extends PureComponent<MappedStateAndActions<typeof MainConnect>> {
	componentDidMount() {
		this.props.appInit();
	}

	render() {
		return (
			<Page noMargin={true}>
				<View style={styles.container}>
					<HeaderComponent title={mainTranslations.general.appTitle} imageSrc={images.header} />
					<ScrollView>
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
