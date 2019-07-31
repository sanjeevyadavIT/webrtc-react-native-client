import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './actions';
import { signallingServer } from '../../services/signallingServer';
import Status from '../../services/Status';

const SERVER_LOGIN_ACTION = 'login';

// worker saga: Dispatch login loading and send login request to server
function* authRequest({ payload }) {
    try {
        yield put({ type: LOGIN_LOADING, payload: { status: Status.LOADING, name: payload.name } });
        // Server action
        signallingServer.send({
            type: SERVER_LOGIN_ACTION,
            name: payload.name
        });
    }
    catch (error) {
        yield put({ LOGIN_ERROR, payload: { errorMessage: error.message } });
    }
}

// worker saga: intercept login status from server
function* authResponse({ type, ...payload }) {
    try {
        // Server action
        const success = payload.success;
        if(success) {
            yield put({ type: LOGIN_SUCCESS, payload: { status: Status.SUCCESS } });
        } else {
            yield put({ type: LOGIN_ERROR, payload: { status: Status.ERROR, errorMessage: payload.errorMessage } });
        }
    }
    catch (error) {
        yield put({ LOGIN_ERROR, payload: { errorMessage: error.message } });
    }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
    yield takeLatest(LOGIN_REQUEST, authRequest);
    yield takeEvery(SERVER_LOGIN_ACTION, authResponse);
}