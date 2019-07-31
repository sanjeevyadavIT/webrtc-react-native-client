import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { auth } from '../../../store/actions';
import Status from '../../../services/Status';
import { NAVIGATION_DASHBOARD_PATH } from '../../../navigation/types';

const LoginPage = ({
    navigation,
}) => {
    const [name, setName] = useState('');
    const isLoggedInStatus = useSelector(state => state.auth.status);
    const signallingServerConnectionStatus = useSelector(state => state.webrtc.signallingServerConnectionStatus);
    const dispatch = useDispatch();

    const onLoginClick = () => {
        console.log(name);
        if(name !== ''){
            dispatch(auth(name));
        }
    }

    if(isLoggedInStatus === Status.SUCCESS) {
        navigation.navigate(NAVIGATION_DASHBOARD_PATH);
    }

    return (
        <View>
            <Text>Signalling Server Connection: {signallingServerConnectionStatus}</Text>
            <Text>Login Page</Text>
            <TextInput type="text" value={name} onChangeText={setName} />
            <Button onPress={onLoginClick} title="login" />
        </View>
    );
}

export default LoginPage;