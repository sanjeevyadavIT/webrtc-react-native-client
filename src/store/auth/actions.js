export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const auth = name => ({
    type: LOGIN_REQUEST,
    payload: {
        name
    },
});