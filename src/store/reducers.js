import { combineReducers } from 'redux';
import webrtcReducer from './webrtc/reducer';

export default combineReducers({
    webrtc: webrtcReducer,
});