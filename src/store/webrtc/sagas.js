import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
    NEW_USER_ACTION,
    ALL_USER_ACTION,
    INCOMING_OFFER_ACTION,
    INCOMING_ANSWER_ACTION,
    INCOMING_CANDIDATE_ACTION,
} from './actions';
import { signallingServer } from '../../services/signallingServer';
import Status from '../../services/Status';

const ALL_USER_SERVER_ACTION = 'all_user';
const NEW_USER_SERVER_ACTION = 'new_user';
const RECEIVED_OFFER_SERVER_ACTION = 'offer';
const RECEIVED_ANSWER_SERVER_ACTION = 'answer';
const RECEIVED_CANDIDATE_SERVER_ACTION = 'candidate';

// worker saga: Server action interceptor, convert to local action
function* existingUserOnline({ type, ...payload }) {
    yield put({ type: ALL_USER_ACTION, payload: { users: payload.names }});
}

// worker saga: Server action interceptor, convert to local action
function* newUserOnline({ type, ...payload }) {
    yield put({ type: NEW_USER_ACTION, payload: { user: payload.name }});
}

// worker saga: Add Description
function* receivedOffer({ type, ...payload }) {
    yield put({ type: INCOMING_OFFER_ACTION, payload });
}

// worker saga: Add Description
function* receivedAnswer({ type, ...payload }) {
    yield put({ type: INCOMING_ANSWER_ACTION, payload });
}

// worker saga: Add Description
function* receivedCandidate({ type, ...payload }) {
    yield put({ type: INCOMING_CANDIDATE_ACTION, payload });
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
    yield takeLatest(ALL_USER_SERVER_ACTION, existingUserOnline);
    yield takeEvery(NEW_USER_SERVER_ACTION, newUserOnline);
    yield takeLatest(RECEIVED_OFFER_SERVER_ACTION, receivedOffer);
    yield takeLatest(RECEIVED_ANSWER_SERVER_ACTION, receivedAnswer);
    yield takeLatest(RECEIVED_CANDIDATE_SERVER_ACTION, receivedCandidate);
}