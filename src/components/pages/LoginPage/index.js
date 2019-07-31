import React from 'react';
import { View, Text, Button } from 'react-native';
import {
    NAVIGATION_DASHBOARD_PATH
} from '../../../navigation/types';

const Page = props => (
    <View>
        <Text>Login Page</Text>
        <Button onPress={() => props.navigation.navigate(NAVIGATION_DASHBOARD_PATH)} title="login" />
    </View>
);

export default Page;