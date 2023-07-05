import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagerView from 'react-native-pager-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Slide = {
  key: string;
  title: string;
  text: string;
  icon: string;
};

const SLIDES: Slide[] = [
  {
    key: 'intro1',
    title: 'Discover',
    text: 'Explore thousands of \nfascinating articles',
    icon: 'ios-compass',
  },
  {
    key: 'intro2',
    title: 'Stay Informed',
    text: 'Get notified when our \nbest articles go viral',
    icon: 'ios-notifications',
  },
  {
    key: 'intro3',
    title: 'Save and Share',
    text: 'Save articles that you \n love to read',
    icon: 'ios-heart',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderPage = useCallback((page: Slide, index: number) => (
    <View key={index} style={styles.page}>
      <Ionicons name={page.icon} size={150} color="#ea1f3d" />
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.text}>{page.text}</Text>
    </View>
  ), []);

  const renderDotIndicator = useCallback(() => (
    <View style={styles.dotContainer}>
      {SLIDES.map((_, i) => (
        <View
          key={`dot_${i}`}
          style={[styles.dot, i === activeIndex ? styles.activeDot : {}]}
        />
      ))}
    </View>
  ), [activeIndex]);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      pagerRef.current?.setPage(activeIndex + 1);
    } else {
      AsyncStorage.setItem('completedOnboarding', 'true');
      navigation.navigate('Landing');
    }
  };

  const handlePrevious = () => {
    pagerRef.current?.setPage(activeIndex - 1);
  };

  const pagerRef = React.useRef<PagerView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' />
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
      >
        {SLIDES.map(renderPage)}
      </PagerView>
      {renderDotIndicator()}
      <View style={styles.buttonContainer}>
        {activeIndex !== 0 ? (
          <TouchableOpacity onPress={handlePrevious} style={styles.navigationButton}>
            <Ionicons name='ios-arrow-back' size={30} color='white' />
          </TouchableOpacity>
        ) : (
          <View /> // This is the placeholder for when the back button isn't present
        )}
        <TouchableOpacity onPress={handleNext} style={styles.navigationButton}>
          <Ionicons name={activeIndex === SLIDES.length - 1 ? 'ios-checkmark' : 'ios-arrow-forward'} size={30} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  pagerView: {
    width: '100%',
    height: '80%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#192444',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#192444',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  activeDot: {
    backgroundColor: '#ea1f3d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
    width: 50,
    height: 50
  }
});

export default OnboardingScreen;
