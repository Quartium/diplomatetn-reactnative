import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
const quiSommeNousHTML = require('../assets/qui_somme_nous.html');

const QuiSommesNousScreen = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={quiSommeNousHTML}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default QuiSommesNousScreen;
