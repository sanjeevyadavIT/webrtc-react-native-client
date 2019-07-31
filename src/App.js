import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Dashboard from './components/Dashboard';
import VideoChat from './components/VideoChat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'not connected!',
      username: '',
      loggedIn: false,
      users: [],
      call: {
        status: false,
      }
    }
    this.connection = new WebSocket('ws://webrtc29.herokuapp.com/');
  }

  componentDidMount() {

    this.connection.onopen = () => {
      this.setState({
        status: 'connected!'
      });
      console.log('Connection Established!');
    }
    this.connection.onmessage = (message) => {
      console.log('Message received!', message);
      this.handleMessage(message);
    }
  }

  parseMessage(message) {
    try {
      return JSON.parse(message.data);
    } catch (e) {
      console.log('enable to parse JSON');
      return {};
    }
  }

  handleMessage(message) {
    const data = this.parseMessage(message);
    switch (data.type) {
      case 'all_user':
        this.setState({ users: data.names });
        break;
      case 'new_user':
        this.setState({ users: [...this.state.users, data.name] })
        break;
      case 'login':
        this.setState({ loggedIn: data.success || false });
        break;
      case 'offer':
        this.call(this.state.username, data.from, data.from, data.offer);
        break;
      case 'answer':
        this.call(this.state.username, data.from, this.state.username, null, data.answer);
        break;
      case 'candidate':
        this.call(this.state.username, data.from, this.state.from, null, null, data.candidate);
        break;
      default:
        console.log('Unknown action ' + data.type);
    }
  }

  call(localUser, remoteUser, originalCaller, offer, answer, candidate) {
    this.setState({
      call: {
        status: true,
        localUser: localUser,
        remoteUser: remoteUser,
        originalCaller,
        offer,
        answer,
        candidate,
      }
    })
  }

  hangup() {
    this.setState({
      call: {
        status: false
      }
    })
  }

  sendMessage(message) {
    this.connection.send(JSON.stringify(message));
  }

  login() {
    const { username } = this.state;
    if (username === '') return;

    const payload = {};
    payload.type = 'login';
    payload.name = username;
    console.log(this.connection);
    this.connection.send(JSON.stringify(payload));
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
        if(sourceInfo.kind === "videoinput" && sourceInfo.facing === (isFront ? "front" : "back")) {
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
          optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
        }
      })
      .then(stream => {
        // Got stream!
        console.log('Streaming OK!', stream);
        this.setState({
          videoUrl: stream.toURL()
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
    

  }

  */

  /*render() {
    console.log('url',this.state.videoUrl)
    return (
      <View style={{ flex: 1, backgroundColor: 'pink'}}>
        <RTCView streamURL={this.state.videoUrl} style={styles.container} />
      </View>
    );
  }*/

  render() {
    const { username, loggedIn, call, status } = this.state;
    if (loggedIn) {
      if (call.status) {
        return (
          <VideoChat
            localUser={call.localUser}
            remoteUser={call.remoteUser}
            originalCaller={call.originalCaller}
            offer={call.offer}
            answer={call.answer}
            candidate={call.candidate}
            hangup={this.hangup.bind(this)}
            sendMessage={this.sendMessage.bind(this)}
          />
        );
      } else {
        return <Dashboard currentUser={username} users={this.state.users} call={this.call.bind(this)} />
      }
    }

    return (
      <View>
        <Text>{status}</Text>
        <TextInput type="text" value={username} onChangeText={(text) => this.setState({ username: text })} />
        <Button onPress={this.login.bind(this)} title="login" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#000',
  }
};

export default App;