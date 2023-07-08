import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const PostItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.postContainer}>
        <Image source={{ uri: item.featured_image }} style={styles.image} />
        <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
            <Text style={styles.content} numberOfLines={4}>{item.content}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
    },
    image: {
        width: 125,
        height: 125,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#192344',
    },
    content: {
        color: '#192344',
    },
});

export default PostItem;
