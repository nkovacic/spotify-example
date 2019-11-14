import { applyMiddleware, createStore, compose, Middleware } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';
import rootSaga from './sagas';

const persistConfig: PersistConfig = {
    key: 'root',
    // tslint:disable-next-line: object-shorthand-properties-first
    storage,
    blacklist: ['routing', 'layout']
};

if (__DEV__) {
    persistConfig.timeout = 0;
}

const composeEnhancers =
    typeof (window as any) === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    // tslint:disable-next-line: prefer-array-literal
    const middlewares = [sagaMiddleware] as Array<Middleware>;

    if (__DEV__) {
        //middlewares.push(logger);
    }

    const enhancers = [applyMiddleware(...middlewares)];
    const persistedReducer = persistReducer(persistConfig, reducers);

    return { ...createStore(persistedReducer, composeEnhancers(...enhancers)), runSaga: sagaMiddleware.run };
};

const createPersistedStore = () => {
    const store = configureStore();

    store.runSaga(rootSaga);

    const persistor = persistStore(store);

    return {
        store,
        persistor
    };
};

const storeWithPersistor = createPersistedStore();

export const store = storeWithPersistor.store;
export const persistor = storeWithPersistor.persistor;
