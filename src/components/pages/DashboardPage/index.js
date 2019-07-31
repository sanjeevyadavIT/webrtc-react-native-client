import React from 'react';
import { View, Text, Button } from 'react-native';
import {
    NAVIGATION_VIDEOCHAT_PATH
} from '../../../navigation/types';

const Page = props => (
    <View>
        <Text>Dashboard Page</Text>
        <Button onPress={() => props.navigation.navigate(NAVIGATION_VIDEOCHAT_PATH)} title="Video Chat" />
    </View>
);

export default Page;