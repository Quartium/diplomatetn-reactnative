import React, { useEffect, useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParametersScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    // Function to toggle the switch
    const toggleSwitch = async () => {
        const previousState = !isEnabled;
        setIsEnabled(previousState);
        // save the notification preference in AsyncStorage
        await AsyncStorage.setItem('notificationsEnabled', String(previousState));
    };

    // Fetch the notification preference when the component is loaded
    useEffect(() => {
        const fetchNotificationPreference = async () => {
            const savedPreference = await AsyncStorage.getItem('notificationsEnabled');
            setIsEnabled(savedPreference === 'true');
        };
        fetchNotificationPreference();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.parameterContainer}>
                <Text style={styles.parameterText}>Push Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#e97687" }}
                    thumbColor={isEnabled ? "#D91F3C" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#192444'
    },
    parameterContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        borderRadius: 8
    },
    parameterText: {
        color: '#192444',
        fontWeight: 'bold'
    }
});

export default ParametersScreen;
