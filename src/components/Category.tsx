import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions } from 'react-native';

const API_URL = 'https://script.google.com/macros/s/AKfycbwRSJrG748NCEZvBANIhMJM1uwu4QiITrPmqLTRNN91YjqLTxNYgb-Z07iJQ4RL7jc14g/exec';

const Category = ({ item, categoryId, onPress }) => {
    const [categoryPosts, setCategoryPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const window = useWindowDimensions();

    useEffect(() => {
        if (categoryId) {
            fetch(`${API_URL}?categoryId=${categoryId}`)
                .then(response => response.json())
                .then(data => setCategoryPosts(data))
                .catch(error => console.error(error));

            fetch(`${API_URL}?categories&categoryId=${categoryId}`)
                .then(response => response.json())
                .then(data => setCategoryName(data.name))
                .catch(error => console.error(error));
        }
    }, [categoryId]);

    const styles = StyleSheet.create({
        container: {
            width: window.width * 0.8,
            height: window.height * 0.3,
            marginRight: window.width * 0.1,
            borderRadius: 10,
            overflow: 'hidden',
        },
        image: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        textContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 10,
        },
        text: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
        },
    });

    return (
        <View>
            <Text>{categoryName}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryPosts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={onPress} style={styles.container}>
                        <ImageBackground source={{ uri: item.featured_image }} style={styles.image}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default Category;
