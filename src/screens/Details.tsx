import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from "moment";

const formatDate = (dateString) => {
    const date = Moment(dateString);
    return `Publié le ${date.format('DD MMMM YYYY')}`;
};

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const window = useWindowDimensions();
    const [saved, setSaved] = useState(false);

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
        actionContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 24
        },
        date: {
            fontSize: 16,
            color: '#192345',
        },
        content: {
            fontSize: 16,
            color: '#192345',
            padding: 24
        },
    });

    const postKey = `@post_${item.id}`;

    const checkIfPostIsSaved = async () => {
        try {
            const savedPost = await AsyncStorage.getItem(postKey);
            if (savedPost !== null) {
                setSaved(true);
            }
        } catch (e) {
            console.error('Failed to load post:', e);
        }
    };

    useEffect(() => {
        checkIfPostIsSaved();
    }, []);

    const togglePost = async () => {
        if (saved) {
            // Remove the post content
            await AsyncStorage.removeItem(postKey);

            // Remove the post image
            const imagePath = `${RNFS.DocumentDirectoryPath}/${item.id}.jpg`;
            await RNFS.unlink(imagePath);

            // Remove the local path of the image from AsyncStorage
            await AsyncStorage.removeItem(`${postKey}_image`);

            setSaved(false);
        } else {
            try {
                // Save the post content
                const jsonValue = JSON.stringify(item);
                await AsyncStorage.setItem(postKey, jsonValue);

                // Download the post image
                const imagePath = `${RNFS.DocumentDirectoryPath}/${item.id}.jpg`;
                await RNFS.downloadFile({
                    fromUrl: item.featured_image,
                    toFile: imagePath,
                }).promise;

                // Save the local path of the image to AsyncStorage
                await AsyncStorage.setItem(`${postKey}_image`, imagePath);

                setSaved(true);
            } catch (e) {
                console.error('Error:', e);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: item.featured_image }} style={styles.image} />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.separator} />
                <View style={styles.actionContainer}>
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                    <TouchableOpacity onPress={togglePost}>
                        {saved ? <Ionicons name="heart" size={32} color="red"></Ionicons> : <Ionicons name="heart-outline" size={32} color="red"></Ionicons>}
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <Text style={styles.content}>{item.content}</Text>
            </ScrollView>
        </View>
    );
};

export default DetailsScreen;
