export const SIGNALLING_SERVER_CONNECTION_SUCCESS = 'SIGNALLING_SERVER_CONNECTION_SUCCESS';
export const SIGNALLING_SERVER_CONNECTION_LOADING = 'SIGNALLING_SERVER_CONNECTION_LOADING';
export const SIGNALLING_SERVER_CONNECTION_ERROR = 'SIGNALLING_SERVER_CONNECTION_ERROR';

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_USER_ACTION = 'NEW_USER_ACTION';
export const ALL_USER_ACTION = 'ALL_USER_ACTION';

export const setSignallingServerConnectionStatus = (type, status, errorMessage) => ({
    type,
    payload: {
        status,
        errorMessage,
    }
});

export const messageAction = message => ({
    type: NEW_MESSAGE,
    message,
})