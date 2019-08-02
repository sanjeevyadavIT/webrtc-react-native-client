import Status from '../../services/Status';
import {
    OFFER_ACCEPTED_ACTION,
    ANSWER_ACCEPTED_ACTION,
    CANDIDATE_ACCEPTED_ACTION,
} from './actions';

const initialState = {
    offerStatus: Status.DEFAULT,
    answerStatus: Status.DEFAULT,
    candidateStatus: Status.DEFAULT,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case OFFER_ACCEPTED_ACTION:
            return {
                ...state,
                offerStatus: Status.SUCCESS,
            }
        case ANSWER_ACCEPTED_ACTION:
            return {
                ...state,
                answerStatus: Status.SUCCESS,
            }
        case CANDIDATE_ACCEPTED_ACTION:
            return {
                ...state,
                candidateStatus: Status.SUCCESS,
            }
        default:
            return state;
    }
}