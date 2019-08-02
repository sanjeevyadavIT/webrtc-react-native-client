import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import {
    NAVIGATION_VIDEOCHAT_PATH
} from '../../../navigation/types';

const HomePage = ({
    navigation,
}) => {
    const name = useSelector(state => state.auth.name);
    const users = useSelector(state => state.webrtc.users);
    const incomingOffer = useSelector(state => state.webrtc.incomingOffer);

    const renderIncomingCall = () => (
        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }}>
            <View style={{ borderWidth: 1, padding: 16 }}>
                <Text style={{ marginBottom: 8, fontSize: 20, fontWeight: 'bold' }}>{incomingOffer.from} is calling</Text>
                <Button onPress={() => navigation.navigate(NAVIGATION_VIDEOCHAT_PATH, { remoteUser: incomingOffer.from })} title="Accept" />
                <View style={{ height: 8 }} />
                <Button onPress={() => console.log('reject')} title="Reject" />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, margin: 16 }}>
            <Text style={{ fontSize: 22, marginBottom: 8 }}>Welcome {name}</Text>
            <Text style={{ marginBottom: 8}}>Users online: {users.length}</Text>
            <View>
                {
                    users.map(user => (
                        <View key={user}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 16, }}>
                                <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold' }}>{user}  </Text>
                                <Button onPress={() => navigation.navigate(NAVIGATION_VIDEOCHAT_PATH, { remoteUser: user, mode: 'calling' })} title="Call" />
                            </View>
                        </View>
                    ))
                }
            </View>
            {incomingOffer && renderIncomingCall()}
        </View>
    );
}

HomePage.navigationOptions = {
    title: 'WebRTC Demo'
}

export default HomePage;