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
      <Text>Push Notifications</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ParametersScreen;
