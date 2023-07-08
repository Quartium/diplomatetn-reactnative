import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingScreen from "./src/screens/Landing";
import OnboardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import CategoryScreen from './src/screens/Category';
import PostsScreen from './src/screens/Posts';
import PartyScreen from './src/screens/Party';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Category" component={CategoryScreen} />
    <Tab.Screen name="Party" component={PartyScreen} />
  </Tab.Navigator>
);

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
        <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
