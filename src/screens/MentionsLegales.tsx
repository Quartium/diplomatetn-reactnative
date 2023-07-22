import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
const mentionsLegalesHTML = require('../assets/mentions_legales.html');

const MentionsLegalesScreen = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={mentionsLegalesHTML}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MentionsLegalesScreen;
