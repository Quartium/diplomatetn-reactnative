import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';

import { API_URL } from '../../config';
import PostItem from '../components/PostItem';

const ItemSeparator = () => <View style={styles.separator} />;

const PostsScreen = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = route.params;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}?categoryId=${categoryId}`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId]);

    const handlePress = useCallback((item) => {
        navigation.navigate('Details', { item });
    }, [navigation]);

    const renderPost = useCallback(({ item }) => (
        <PostItem item={item} onPress={() => handlePress(item)} />
    ), [handlePress]);

    return (
        loading ? 
            <ActivityIndicator size="large" color="#0000ff" /> :
            <FlatList
                contentContainerStyle={styles.flatListContainer}
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPost}
                ItemSeparatorComponent={ItemSeparator}
            />
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#DBDBDB',
    },
});

export default PostsScreen;
