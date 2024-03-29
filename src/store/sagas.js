import { fork } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import webrtcSagas from './webrtc/sagas';
import videochatSagas from './videochat/sagas';

/**
 * rootSaga
 */
export default function* rootSaga() {
  yield fork(authSagas)
  yield fork(webrtcSagas)
  yield fork(videochatSagas)
}