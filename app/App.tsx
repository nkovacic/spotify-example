import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'app/modules/store';

import { ErrorBoundary } from 'app/components';

import Scenes from './navigation/Scenes';

interface Props { }

class App extends Component<Props> {

    render() {

        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor} >
                        <Scenes />
                    </PersistGate>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default App;
