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
    return (
        <View>
            <Text>Welcome {name}</Text>
            <Text>Users online: {users.length}</Text>
            <View>
                {
                    users.map(user => (
                        <View key={user}>
                            <View style={{ display: 'flex' }}>
                                <Text>{user}  </Text>
                                <Button onPress={() => navigation.navigate(NAVIGATION_VIDEOCHAT_PATH, { remoteUser: user })} title="Call" />
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    );
}

HomePage.navigationOptions = {
    title: 'WebRTC Demo'
}

export default HomePage;