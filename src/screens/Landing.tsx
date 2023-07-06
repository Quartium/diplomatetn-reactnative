import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('HomeTab')} style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/logo.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192444',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
  },
});

export default LandingScreen;
