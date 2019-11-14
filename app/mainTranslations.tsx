import LocalizedStrings from 'react-native-localization';

const mainTranslations = new LocalizedStrings({
	en: {
		general: {
			appTitle: 'Spotify - challenge app'
		},
		alert: {
			errorTitle: 'Error!',
			infoTitle: 'Info',
			warningTitle: 'Warning!'
		},
		dialogs: {
			fatalError: {
				title: 'There was a fatal error in the app',
				message: 'Please restart the app!',
				ok: 'Restart app',
				cancel: 'Exit app'
			}
		},
		shared: {
			cancel: 'cancel',
			ok: 'ok'
		},
		or: 'or'
	}
});

export default mainTranslations;
