import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity, ImageBackground, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from "moment";

const formatDate = (dateString) => {
    const date = Moment(dateString);
    return `Publié le ${date.format('DD MMMM YYYY')}`;
};

const BookmarkScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const window = useWindowDimensions();

    const styles = StyleSheet.create({
        flatListContainer: {
            backgroundColor: '#F3F3F3',
            paddingHorizontal: 24,
            paddingVertical: 12
        },
        container: {
            width: '100%',
            height: window.height * 0.3,
            borderRadius: 10,
            overflow: 'hidden',
            marginVertical: 12
        },
        image: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        textContainer: {
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: 10,
            justifyContent: 'flex-end'
        },
        title: {
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
        },
        date: {
            fontSize: 16,
            color: 'white',
        },
        unsaveButton: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        emptyContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        emptyContainerIcon: {
            width: 150,
            height: 150,
            backgroundColor: '#192344',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 75,
            marginBottom: 24,
        },
        emptyTitle: {
            textAlign: 'center',
            color: '#192344',
            fontSize: 20,
            fontWeight: 'bold'
        },
        emptySubtitle: {
            textAlign: 'center',
            color: '#192344',
            fontSize: 16,
        },
    });

    const loadSavedPosts = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const postKeys = keys.filter(key => key.startsWith('@post_') && !key.endsWith('_image'));

            const postPromises = postKeys.map(key => AsyncStorage.getItem(key));
            const postStrings = await Promise.all(postPromises);
            const posts = postStrings.map(str => JSON.parse(str));

            setPosts(posts);
        } catch (e) {
            console.error('Failed to load posts:', e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadSavedPosts();
    
            return () => {};
        }, [])
    );

    const unsavePost = async (postId) => {
        try {
            await AsyncStorage.removeItem(`@post_${postId}`);
            await AsyncStorage.removeItem(`@post_${postId}_image`);
            loadSavedPosts();
        } catch (e) {
            console.error('Failed to unsave post:', e);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { item })}
            style={styles.container}
        >
            <ImageBackground source={{ uri: item.featured_image }} style={styles.image}>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
            </ImageBackground>
            <TouchableOpacity style={styles.unsaveButton} onPress={() => unsavePost(item.id)}>
                <Ionicons name="heart" size={32} color="red" />
            </TouchableOpacity>

        </TouchableOpacity>
    );

    if (posts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyContainerIcon}>
                    <Ionicons name="heart-outline" size={100} color="#fff" />
                </View>
                <Text style={styles.emptyTitle}>Pas d'articles enregistrés</Text>
                <Text style={styles.emptySubtitle}>Commencez à enregistrer des articles pour les lire hors ligne ultérieurement</Text>
            </View>
        );
    }

    return (
        <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

export default BookmarkScreen;
