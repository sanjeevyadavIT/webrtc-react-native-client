import React from 'react';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices
  } from 'react-native-webrtc';
import { View, Text, Button } from 'react-native';

class VideoChat extends React.Component {
    constructor(props) {
        super(props);
        this.localVideoref = React.createRef();
        this.remoteVideoref = React.createRef();
        this.pc = null;
        this.createOffer = this.createOffer.bind(this);

        this.state = {
            receivedAnswerFirstTime: true,
            candidate: null,
        }
    }

    /*componentDidMount() {
        // Do something
        const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
        const pc = new RTCPeerConnection(configuration);
        const { isFront } = this.state;

        mediaDevices.enumerateDevices().then(sourceInfos => {
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
                        minWidth: 500, // Provide your own width, height and frame rate here
                        minHeight: 300,
                        minFrameRate: 30
                    },
                    facingMode: (isFront ? "user" : "environment"),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                }
            })
                .then(stream => {
                    // Got stream!
                    console.log('Streaming OK!', stream);
                    this.setState({
                        localVideourl: stream.toURL()
                    });
                    pc.addStream(stream);
                })
                .catch(error => {
                    // Log error
                    console.log('Stream ERROR!', error.message)
                });

            pc.createOffer().then(desc => {
                pc.setLocalDescription(desc).then(() => {
                    // Send pc.localDescription to peer
                });
            });

            pc.onicecandidate = function (event) {
                // send event.candidate to peer
            };
        });


    }*/

    componentDidMount() {
        console.log('cdm');
        const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
        const { isFront } = this.state;
        this.pc = new RTCPeerConnection(configuration);

        this.iceCandidates = [];

        this.pc.onicecandidate = (event) => {
            console.log('onicecandidate')
            if (event.candidate) {
                //console.log(JSON.stringify(event.candidate));
                //if (this.state.shouldSendIceCandidate) {
                    this.props.sendMessage({
                        type: 'candidate',
                        to: this.props.remoteUser,
                        from: this.props.localUser,
                        candidate: event.candidate,
                    })
                    /*this.setState({
                        candidate: event.candidate,
                    })
                }*/
                //this.iceCandidates.push(event.candidate);
            }
        }

        this.pc.oniceconnectionstatechange = (event) => {
            console.log('oniceconnectionstatechange')
            console.log(event);
        }

        this.pc.onaddstream = (event) => {
            console.log('### onaddstream called', event);
            console.log('### event stream', event.stream);
            console.log('### strem URL',event.stream.toURL());
            this.setState({
                remoteVideoUrl: event.stream.toURL(),
            });
        }

        const success = (stream) => {
            // Got stream!
            console.log('Streaming OK!', stream);
            this.setState({
                localVideoUrl: stream.toURL()
            });


            this.pc.addStream(stream);
            if (this.props.originalCaller === this.props.localUser)
                this.createOffer();
            else if (this.props.offer) {
                console.log('setting offer as remoteDescription and generating answer')
                this.setRemoteDescription(this.props.offer);
                this.createAnswer();
            }
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
    }

    componentDidUpdate() {
        if (this.props.answer && this.state.receivedAnswerFirstTime) {
            console.log('Setting Answer ')
            this.setRemoteDescription(this.props.answer)
            this.setState({
                receivedAnswerFirstTime: false,
            })
        } else if (this.props.candidate) {
            console.log('Setting candidate');
            this.addCandidate(this.props.candidate);
        }
    }

    createOffer() {
        console.log('offer');
        console.log(this.pc);
        this.pc.createOffer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
            .then(sdp => {
                console.log(JSON.stringify(sdp))
                this.pc.setLocalDescription(sdp);
                this.props.sendMessage({
                    type: 'offer',
                    to: this.props.remoteUser,
                    from: this.props.localUser,
                    offer: sdp,
                });
            })
            .catch(error => {
                console.log('Unable to offer error', error);
            })
    }

    setRemoteDescription(desc) {
        this.pc.setRemoteDescription(new RTCSessionDescription(desc));
    }

    createAnswer() {
        console.log('answer')
        this.pc.createAnswer({ offerToReceiveVideo: 1, offerToReceiveAudio: 1 })
            .then(sdp => {
                console.log(JSON.stringify(sdp));
                this.pc.setLocalDescription(sdp);
                this.props.sendMessage({
                    type: 'answer',
                    to: this.props.remoteUser,
                    from: this.props.localUser,
                    answer: sdp,
                });
            })
    }

    addCandidate(candidate) {
        console.log('adding candidate');
        this.pc.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => console.log('SUCCESS! Ice Candidate added!'))
        .catch((e) => console.log('ERROR! Ice Candidate not added!', e));
    }

    render() {
        const {
            /**
             * local user name
             */
            localUser,
            /**
             * remote user name
             */
            remoteUser,
            /**
             * hangup
             */
            hangup
        } = this.props;
        console.log('++++++++++++++++++++++++++')
        console.log(this.state);
        return (
            <View>
                <View style={{ display: 'flex' }}>
                    <View>
                        <RTCView streamURL={this.state.localVideoUrl} style={{ width: 250, height: 250 }} />
                        <Text>You</Text>
                    </View>
                    <View>
                        <RTCView streamURL={this.state.remoteVideoUrl} style={{ width: 250, height: 250 }} />
                        <Text>{remoteUser}</Text>
                    </View>
                </View>
                <Button onPress={hangup} title="Hangup" />
            </View>
        );
    }
}

export default VideoChat;




