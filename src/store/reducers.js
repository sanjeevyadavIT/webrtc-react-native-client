import { combineReducers } from 'redux';
import webrtcReducer from './webrtc/reducer';
import authReducer from './auth/reducer';
import videochatReducer from './videochat/reducer';

export default combineReducers({
    webrtc: webrtcReducer,
    auth: authReducer,
    videochat: videochatReducer,
});