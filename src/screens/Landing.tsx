import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';


interface LandingScreenProps {}

class LandingScreen extends Component<LandingScreenProps> {

  async componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/logo.png')} />
      </View>
    );
  }
}

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
