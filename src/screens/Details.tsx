import React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Moment from "moment";

const formatDate = (dateString) => {
    const date = Moment(dateString);
    return `Publié le ${date.format('DD MMMM YYYY')}`;
};

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const window = useWindowDimensions();

    const styles = StyleSheet.create({
        image: {
            height: window.height * 0.3,
            width: '100%',
        },
        container: {
            flex: 1,
            backgroundColor: '#F2F2F2',
        },
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: '#DBDBDB',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            padding: 24,
            color: '#192345',
        },
        date: {
            fontSize: 16,
            color: '#192345',
            padding: 24
        },
        content: {
            fontSize: 16,
            color: '#192345',
            padding: 24
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: item.featured_image }} style={styles.image} />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.separator} />
                <Text style={styles.date}>{formatDate(item.date)}</Text>
                <View style={styles.separator} />
                <Text style={styles.content}>{item.content}</Text>
            </ScrollView>
        </View>
    );
};

export default DetailsScreen;
