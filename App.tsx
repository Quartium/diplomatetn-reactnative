import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';

import LandingScreen from "./src/screens/Landing";
import OnboardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import CategoryScreen from './src/screens/Category';
import PostsScreen from './src/screens/Posts';
import PartyScreen from './src/screens/Party';
import SearchScreen from './src/screens/Search';
import BookmarkScreen from './src/screens/Bookmark';

// OneSignal Initialization
OneSignal.setAppId("28eddd7f-3e86-41b5-b305-8daeba0544ac");

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Category" component={CategoryScreen} />
    <Tab.Screen name="Party" component={PartyScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Bookmark" component={BookmarkScreen} />
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
