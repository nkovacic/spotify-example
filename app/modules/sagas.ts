import { all, take } from 'redux-saga/effects';
import { appSagas } from './app';

const PERSIST_REHYDRATE_ACTION = 'persist/REHYDRATE';

export default function* rootSaga() {
    yield take(PERSIST_REHYDRATE_ACTION);
    
    yield all([...appSagas]);
}
