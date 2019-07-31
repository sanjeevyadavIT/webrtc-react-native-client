import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const VideoPage = ({
    navigation,
}) => {
    const [localVideoUrl, setLocalVideoUrl] = useState();
    const remoteUser = navigation.getParam('remoteUser', '#');
    const localUser = useSelector(state => state.auth.name);

    useEffect(() => {

        const isFront = false;

        const success = (stream) => {
            // Got stream!
            console.log('Streaming OK!', stream);
            setLocalVideoUrl(stream.toURL());
        }

        const failure = (e) => {
            console.log('get userMedia error', e);
        }

        mediaDevices.enumerateDevices()
            .then(sourceInfos => {
                console.log('MediaStreamTrack.getSource', sourceInfos);
                let videoSourceId;
                for (let i = 0; i < sourceInfos.length; i++) {
                    const sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === "videoinput" && sourceInfo.facing === (isFront ? "front" : "back")) {
                        videoSourceId = sourceInfo.deviceId;
                    }
                }

                mediaDevices.getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            minWidth: 250, // Provide your own width, height and frame rate here
                            minHeight: 250,
                            minFrameRate: 30
                        },
                        facingMode: (isFront ? "user" : "environment"),
                        optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                    }
                })
                    .then(success)
                    .catch(failure);
            });
    }, []);
    return (
        <View>
            <Text>VideoChat Page</Text>
            <RTCView streamURL={localVideoUrl} style={{ width: 250, height: 250 }} />
            <Button onPress={() => navigation.pop()} title="go back" />
        </View>
    );
}

VideoPage.navigationOptions = ({ navigation }) => ({
    title: `Calling ${navigation.getParam('remoteuser', '#')}`
})

export default VideoPage;