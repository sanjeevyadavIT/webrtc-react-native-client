import Status from '../../services/Status';
import {
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    LOGIN_ERROR,
} from './actions';

const initialState = {
    status: Status.DEFAULT,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_LOADING:
            return {
                ...state,
                status: payload.status,
                name: payload.name,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: payload.status
            }
        case LOGIN_ERROR:
            return {
                ...state,
                status: payload.status,
                errorMessage: payload.errorMessage,
            }
        default:
            return state;
    }
}