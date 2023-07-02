import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingScreen from "./src/screens/Landing";
import OnboardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/Home';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem('completedOnboarding');
      if (value !== null) {
        setCompletedOnboarding(value === 'true');
      }
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  if (isLoading) {
    return null;  // or a loading spinner, if you prefer
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={completedOnboarding ? 'Landing' : 'Onboarding'}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
