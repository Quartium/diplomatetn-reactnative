import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
    color: '#000'
  },
  iconMenuNegative: {
    marginLeft: 10,
    color: '#fff'
  }
});

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

const HomeTab = ({ navigation }) => {
  const renderHeaderLeft = (menuName) => (
    <Ionicons
      name={menuName}
      size={25}
      onPress={() => navigation.openDrawer()}
      style={styles.iconMenu}
    />
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#D91F3C",
        tabBarInactiveTintColor: "white",
        tabBarInactiveBackgroundColor: "#192444",
        tabBarActiveBackgroundColor: "#192444"
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F3F3F3'
          },
          headerLeft: () => renderHeaderLeft("menu"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F3F3F3'
          },
          headerLeft: () => renderHeaderLeft("menu"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Party"
        component={PartyScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F3F3F3'
          },
          headerLeft: () => renderHeaderLeft("menu"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerLeft: () => renderHeaderLeft("menu"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F3F3F3'
          },
          headerLeft: () => renderHeaderLeft("menu"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator initialRouteName="HomeTab" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false, drawerLabel: () => null }} />
      <Drawer.Screen
        name="QuiSommesNous" component={QuiSommesNousScreen} options={{
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
              style={ styles.iconMenuNegative }
            />
          ),
        }} />
      <Drawer.Screen name="MentionsLegales" component={MentionsLegalesScreen} options={{
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
            style={ styles.iconMenuNegative }
          />
        ),
      }} />
      <Drawer.Screen name="ContactezNous" component={ContactezNousScreen} options={{
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
            style={ styles.iconMenuNegative }
          />
        ),
      }} />
      <Drawer.Screen name="Parametres" component={ParametersScreen} options={{
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
            style={ styles.iconMenuNegative }
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
