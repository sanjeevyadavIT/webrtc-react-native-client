import { fork } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import webrtcSagas from './webrtc/sagas';

/**
 * rootSaga
 */
export default function* rootSaga() {
  yield fork(authSagas)
  yield fork(webrtcSagas)
}