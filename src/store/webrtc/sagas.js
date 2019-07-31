import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
    NEW_USER_ACTION,
    ALL_USER_ACTION,
} from './actions';
import { signallingServer } from '../../services/signallingServer';
import Status from '../../services/Status';

const ALL_USER_SERVER_ACTION = 'all_user';
const NEW_USER_SERVER_ACTION = 'new_user';

// worker saga: Server action interceptor, convert to local action
function* existingUserOnline({ type, ...payload }) {
    yield put({ type: ALL_USER_ACTION, payload: { users: payload.names }});
}

// worker saga: Server action interceptor, convert to local action
function* newUserOnline({ type, ...payload }) {
    yield put({ type: NEW_USER_ACTION, payload: { user: payload.name }});
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
    yield takeLatest(ALL_USER_SERVER_ACTION, existingUserOnline);
    yield takeEvery(NEW_USER_SERVER_ACTION, newUserOnline);
}