export const SEND_OFFER_ACTION = 'SEND_OFFER_ACTION';
export const OFFER_ACCEPTED_ACTION = 'OFFER_ACCEPTED_ACTION';
export const SEND_ANSWER_ACTION = 'SEND_ANSWER_ACTION';
export const ANSWER_ACCEPTED_ACTION = 'ANSWER_ACCEPTED_ACTION';
export const SEND_CANDIDATE_ACTION = 'SEND_CANDIDATE_ACTION';
export const CANDIDATE_ACCEPTED_ACTION = 'CANDIDATE_ACCEPTED_ACTION';

export const sendOffer = (sdp, localUser, remoteUser) => ({
    type: SEND_OFFER_ACTION,
    payload: {
        sdp,
        localUser,
        remoteUser,
    }
});

export const sendAnswer = (sdp, localUser, remoteUser) => ({
    type: SEND_ANSWER_ACTION,
    payload: {
        sdp,
        localUser,
        remoteUser,
    }
});

export const sendCandidate = (candidate, localUser, remoteUser) => ({
    type: SEND_CANDIDATE_ACTION,
    payload: {
        candidate,
        localUser,
        remoteUser,
    }
});

export const offerAccepted = (incomingOffer) => ({
    type: OFFER_ACCEPTED_ACTION,
    payload: {
        ...incomingOffer
    }
})

export const answerAccepted = (incomingAnswer) => ({
    type: ANSWER_ACCEPTED_ACTION,
    payload: {
        ...incomingAnswer
    }
})

export const candidateAccepted = (incomingAnswer) => ({
    type: CANDIDATE_ACCEPTED_ACTION,
    payload: {
        ...incomingAnswer
    }
})