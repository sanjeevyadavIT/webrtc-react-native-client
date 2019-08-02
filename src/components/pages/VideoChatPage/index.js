import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices
} from 'react-native-webrtc';
import {
    sendOffer,
    sendAnswer,
    offerAccepted,
    answerAccepted,
    candidateAccepted,
    sendCandidate,
} from '../../../store/actions';
import  Status from '../../../services/Status';

const CALLING_MODE = 'calling';
const CALLED_MODE = 'called';

const VideoPage = ({
    navigation,
}) => {
    const [localVideoUrl, setLocalVideoUrl] = useState();
    const [remoteVideoUrl, setRemoteVideoUrl] = useState();
    const mode = navigation.getParam('mode', CALLED_MODE);
    const remoteUser = navigation.getParam('remoteUser', '#');
    const localUser = useSelector(state => state.auth.name);
    // incoming* means they came from remote client
    const incomingOffer = useSelector(state => state.webrtc.incomingOffer);
    const incomingAnswer = useSelector(state => state.webrtc.incomingAnswer);
    const incomingCandidate = useSelector(state => state.webrtc.incomingCandidate);
    const answerStatus = useSelector(state => state.videochat.answerStatus);
    const candidateStatus = useSelector(state => state.videochat.candidateStatus);
    const dispatch = useDispatch();
    const pc = useRef();
    const candidate = useRef();

    useEffect(() => {

        const isFront = true;
        const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
        pc.current = new RTCPeerConnection(configuration);

        pc.current.onicecandidate = (event) => {
            console.log('ICE CANDAIDATE: ', event.candidate);
            if(event.candidate){
                candidate.current = event.candidate;
            }
        }

        pc.current.oniceconnectionstatechange = (event) => {
            console.log('oniceconnectionstatechange')
            console.log(event);
        }

        pc.current.onaddstream = (event) => {
            console.log('### onaddstream called', event);
            console.log('### event stream', event.stream);
            console.log('### strem URL',event.stream.toURL());
            setRemoteVideoUrl(event.stream.toURL());
        }

        const success = (stream) => {
            // Got stream!
            console.log('Streaming OK!', stream);
            setLocalVideoUrl(stream.toURL());

            pc.current.addStream(stream);
            if(mode === CALLING_MODE) {
                // Create offer
                createOffer();
            } else {
                // Create answer
                dispatch(offerAccepted(incomingOffer));
                setRemoteDescription(incomingOffer.offer)
                createAnswer();
            }
        }

        const failure = (e) => {
            console.log('get userMedia error', e);
        }

        mediaDevices.enumerateDevices()
            .then(sourceInfos => {
                console.log('MediaStreamTrack.getSource', sourceInfos);
                mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                })
                    .then(success)
                    .catch(failure);
            });
    }, []);

    const setRemoteDescription = (desc) => {
        //new RTCSessionDescription(
        pc.current.setRemoteDescription(desc)
            .catch(error => console.log('Unable to set Remote description', error));
    }

    const addCandidate = (candidate) => {
        console.log('adding candidate');
        pc.current.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => console.log('SUCCESS! Ice Candidate added!'))
        .catch((e) => console.log('ERROR! Ice Candidate not added!', e));
    }

    const createOffer = () => {
        pc.current.createOffer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
            .then(sdp => {
                pc.current.setLocalDescription(sdp);
                // send it too the server
                dispatch(sendOffer(sdp, localUser, remoteUser));
            })
            .catch(error => console.log('Unable to create offer: ', error));
    }

    const createAnswer = () => {
        pc.current.createAnswer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
            .then(sdp => {
                pc.current.setLocalDescription(sdp);
                // send it to the server
                dispatch(sendAnswer(sdp, localUser, remoteUser));
            })
    }

    if(incomingAnswer && incomingAnswer.answer && answerStatus !== Status.SUCCESS) {
        setRemoteDescription(incomingAnswer.answer)
        // send ice candidate
        console.log('send ice candidate');
        if(candidate.current) {
            //candidates.current.forEach(candidate => dispatch(sendCandidate(candidate, localUser, remoteUser)))
            dispatch(sendCandidate(candidate.current, localUser, remoteUser))
        }
        dispatch(answerAccepted(incomingAnswer));
    }

    if(incomingCandidate && incomingCandidate.candidate && candidateStatus !== Status.SUCCESS) {
        addCandidate(incomingCandidate.candidate)
        dispatch(candidateAccepted(incomingCandidate));
    }

    return (
        <View>
            <Text>VideoChat Page</Text>
            <RTCView streamURL={localVideoUrl} style={{ width: 250, height: 250 }} />
            <RTCView streamURL={remoteVideoUrl} style={{ width: 250, height: 250 }} />
            <Button onPress={() => navigation.pop()} title="go back" />
        </View>
    );
}

VideoPage.navigationOptions = ({ navigation }) => ({
    title: `Calling ${navigation.getParam('remoteUser', '#')}`
})

export default VideoPage;