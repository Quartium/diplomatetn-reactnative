import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LandingScreen from "./src/screens/Landing";
import OnboardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import CategoryScreen from './src/screens/Category';
import PostsScreen from './src/screens/Posts';
import PartyScreen from './src/screens/Party';
import SearchScreen from './src/screens/Search';
import BookmarkScreen from './src/screens/Bookmark';

import QuiSommesNousScreen from './src/screens/QuiSommesNous';
import MentionsLegalesScreen from './src/screens/MentionsLegales';
import ContactezNousScreen from './src/screens/ContactezNous';
import ParametersScreen from './src/screens/Parameters';

// OneSignal Configuration
OneSignal.setAppId("28eddd7f-3e86-41b5-b305-8daeba0544ac");
OneSignal.promptForPushNotificationsWithUserResponse();
OneSignal.setNotificationWillShowInForegroundHandler(async (notificationReceivedEvent) => {
  const notificationsEnabled = await AsyncStorage.getItem('notificationsEnabled');
  if (notificationsEnabled === 'false') {
    notificationReceivedEvent.complete();
  } else {
    let notification = notificationReceivedEvent.getNotification();
    notificationReceivedEvent.complete(notification);
  }
});

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

// Common styles
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#192444',
    padding: 48
  },
  DrawerContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  drawerContentLinks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageLogo: {
    width: '80%',
    resizeMode: 'contain',
    marginTop: 48
  },
  title: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16
  },
  iconMenu: {
    marginLeft: 10,
    color: '#fff'
  },
  headerLogo: {
    width: 200,
    resizeMode: 'contain'
  },
  headerLeftIcon: {
    color: 'white',
    marginLeft: 10
  },
  headerRightIcon: {
    color: 'white',
    marginRight: 10
  }
});

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.DrawerContentContainer}>
        <Image source={require('./src/assets/images/logo.png')} style={styles.imageLogo} />
        <View style={styles.drawerContentLinks}>
          <Text style={styles.title} onPress={() => props.navigation.navigate('QuiSommesNous')}>Qui sommes-nous?</Text>
          <Text style={styles.title} onPress={() => props.navigation.navigate('MentionsLegales')}>Mentions légales</Text>
          <Text style={styles.title} onPress={() => props.navigation.navigate('ContactezNous')}>Contactez-nous</Text>
          <Text style={styles.title} onPress={() => props.navigation.navigate('Parametres')}>Paramètres</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

// Home Tab Component
const HomeTab = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Actualités"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#192444' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarIndicatorStyle: { backgroundColor: 'white', height: 3 },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          textTransform: 'capitalize',
        },
        tabBarItemStyle: { width: 'auto' },
        tabBarScrollEnabled: true
      }}
    >
      <Tab.Screen name="Actualités" component={HomeScreen} />
      <Tab.Screen name="Catégories" component={CategoryScreen} />
      <Tab.Screen name="Partis" component={PartyScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
    </Tab.Navigator>
  );
};

// Drawer Icon Component
const DrawerIcon = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="menu"
      size={25}
      onPress={() => navigation.openDrawer()}
      style={styles.headerLeftIcon}
    />
  );
};

// Search Icon Component
const SearchIcon = () => {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="search"
      size={25}
      onPress={() => navigation.navigate('Search')}
      style={styles.headerRightIcon}
    />
  );
};

// Logo Title Component
const LogoTitle = () => {
  return (
    <Image
      source={require('./src/assets/images/logo.png')}
      style={styles.headerLogo}
    />
  );
};

// Main Drawer Navigator
const DrawerNavigator = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#192444' },
          headerTitleAlign: 'center',
          headerTitle: props => <LogoTitle {...props} />,
          headerLeft: props => <DrawerIcon {...props} />,
          headerRight: props => <SearchIcon {...props} />
        }}
      />
      <Drawer.Screen
        name="QuiSommesNous"
        component={QuiSommesNousScreen}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#192444',
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.iconMenu}
            />
          ),
        }} />
      <Drawer.Screen
        name="MentionsLegales"
        component={MentionsLegalesScreen}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#192444',
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.iconMenu}
            />
          ),
        }} />
      <Drawer.Screen
        name="ContactezNous"
        component={ContactezNousScreen}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#192444',
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.iconMenu}
            />
          ),
        }} />
      <Drawer.Screen
        name="Parametres"
        component={ParametersScreen}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#192444',
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.iconMenu}
            />
          ),
        }} />
    </Drawer.Navigator>
  );
};

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
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={completedOnboarding ? 'Landing' : 'Onboarding'}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Posts" component={PostsScreen} options={{ headerStyle: { backgroundColor: '#F3F3F3' } }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
