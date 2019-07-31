import {
    setSignallingServerConnectionStatus,
    SIGNALLING_SERVER_CONNECTION_SUCCESS,
    SIGNALLING_SERVER_CONNECTION_ERROR,
} from '../../store/actions';
import Status from '../Status';

class SignallingServer {
    init(dispatch) {
        this.dispatch = dispatch;
        this.connection = new WebSocket('ws://webrtc29.herokuapp.com/');
        // Attaching Listeners
        this.connection.onopen = () => this.dispatch(setSignallingServerConnectionStatus(SIGNALLING_SERVER_CONNECTION_SUCCESS, Status.SUCCESS));
        this.connection.onerror = error => this.dispatch(setSignallingServerConnectionStatus(SIGNALLING_SERVER_CONNECTION_ERROR, Status.ERROR, error.message));
        this.connection.onmessage = message => {
            this.dispatch(JSON.parse(message.data));
        }
    }

    send(message) {
        this.connection.send(JSON.stringify(message));
    }
}

export const signallingServer = new SignallingServer();