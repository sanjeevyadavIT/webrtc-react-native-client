import React from 'react';
import { View, Button, Text } from 'react-native';

function Dashboard({
    /**
     * Current user name
     */
    currentUser,
    /**
     * List of currently online user
     */
    users,
    /**
     * function to make webRTC connection to another user
     */
    call,
}) {
    return (
        <View>
            <Text>Welcome {currentUser}</Text>
            <Text>Users online:</Text>
            <View>
                {
                    users.map(user => (
                        <View key={user}>
                            <View style={{ display: 'flex' }}>
                                <Text>{user}  </Text>
                                <Button onPress={() => call(currentUser, user, currentUser)} title="Call" />
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Dashboard;