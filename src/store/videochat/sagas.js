import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
    SEND_OFFER_ACTION,
    SEND_ANSWER_ACTION,
    SEND_CANDIDATE_ACTION,
} from './actions';
import { signallingServer } from '../../services/signallingServer';
import Status from '../../services/Status';

const SEND_OFFER_SERVER_ACTION = 'offer';
const SEND_ANSWER_SERVER_ACTION = 'answer';
const SEND_CANDIDATE_SERVER_ACTION = 'candidate';

// worker saga: Add Description
function* sendOffer({ payload }) {
    send(SEND_OFFER_SERVER_ACTION, payload);
}

// worker saga: Add Description
function* sendAnswer({ type, payload }) {
    send(SEND_ANSWER_SERVER_ACTION, payload);
}

// worker saga: Add Description
function* sendCandidate({ type, payload }) {
    signallingServer.send({
        type: SEND_CANDIDATE_SERVER_ACTION,
        [SEND_CANDIDATE_SERVER_ACTION]: payload.candidate,
        to: payload.remoteUser,
        from: payload.localUser,
    })
}

// worker saga: Add Description
function send(SERVER_ACTION, { sdp, localUser, remoteUser }){
    signallingServer.send({
        type: SERVER_ACTION,
        [SERVER_ACTION]: sdp,
        to: remoteUser,
        from: localUser,
    })
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
    yield takeLatest(SEND_OFFER_ACTION, sendOffer);
    yield takeLatest(SEND_ANSWER_ACTION, sendAnswer);
    yield takeLatest(SEND_CANDIDATE_ACTION, sendCandidate);
}