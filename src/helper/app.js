import { signallingServer } from '../services/signallingServer';
import {
    setSignallingServerConnectionStatus,
    SIGNALLING_SERVER_CONNECTION_LOADING
} from '../store/actions';
import Status from '../services/Status';

export const onAppStart = async dispatch => {
    dispatch(setSignallingServerConnectionStatus(SIGNALLING_SERVER_CONNECTION_LOADING, Status.LOADING));
    signallingServer.init(dispatch);
};