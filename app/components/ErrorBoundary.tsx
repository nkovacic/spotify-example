import React, { Component, ErrorInfo } from 'react';

import { AlertService, Logger } from 'app/services';
import mainTranslations from 'app/mainTranslations';

interface Props {

}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    private errorShown: boolean;

    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        errorInfo = errorInfo || {};

        if (__DEV__) {
            return;
        }

        if (this.errorShown) {
            return;
        }

        this.errorShown = true;

        Logger.error(error, errorInfo.componentStack);

        let result = false;

        try {
            result = await AlertService.error(mainTranslations.dialogs.fatalError.message, mainTranslations.dialogs.fatalError.title, [
                {
                    style: 'default',
                    text: mainTranslations.dialogs.fatalError.ok,
                },
                {
                    style: 'destructive',
                    text: mainTranslations.dialogs.fatalError.cancel,
                }
            ]);
        }
        catch (e) {
            result = false;
        }

        if (result) {
            //AppService.restartApp();
        }
        else {
            //AppService.exitApp();
        }
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
