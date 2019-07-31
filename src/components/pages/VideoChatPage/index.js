import React from 'react';
import { View, Text, Button } from 'react-native';
import {
    NAVIGATION_VIDEOCHAT_PATH
} from '../../../navigation/types';

const Page = props => (
    <View>
        <Text>VideoChat Page</Text>
        <Button onPress={() => props.navigation.pop()} title="go back" />
    </View>
);

export default Page;