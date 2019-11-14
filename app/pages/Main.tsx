import React, { Component, PureComponent } from 'react';
import { View,StyleSheet } from 'react-native';
import { MappedStateAndActions } from 'redux-render-prop';

import { CustomText, Page } from 'app/components';
import { createAppConnect } from 'app/modules/connect';
import HeaderComponent from './components/HeaderComponent';
import mainTranslations from 'app/mainTranslations';
import images from '../../assets/images';
import ContainerComponent from './components/ContainerComponent';

class Main extends PureComponent<MappedStateAndActions<typeof MainConnect>> {
	render() {
		return (
			<Page noMargin={true}>
				<View style={styles.container}>
					<HeaderComponent title={mainTranslations.general.appTitle} imageSrc={images.header} />
					<ContainerComponent />
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
			currentRoute: state.routingSelector.currentRouteSelector()
		};
	},
	mapActions: (actions) => {
		return {
			changeRoute(route: string) {
				actions.routingActions.changeRoute(route);
			}
		};
	}
});

export default () => <MainConnect>{(data, actions) => <Main {...data} {...actions} />}</MainConnect>;
