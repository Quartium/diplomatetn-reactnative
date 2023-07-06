import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { API_URL } from '../../config';

const MAX_CATEGORIES = 6;

const CategoryItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.backgroundLetter}>
            <Text style={styles.backgroundLetterText}>{item.name.charAt(0)}.</Text>
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
);

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}?categories`);
                const data = await response.json();

                if (Array.isArray(data) && data.length >= MAX_CATEGORIES) {
                    setCategories(data.slice(0, MAX_CATEGORIES));
                } else {
                    setCategories(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handlePress = (categoryId) => {
        navigation.navigate('Posts', { categoryId });
    };

    return (
        <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} onPress={() => handlePress(item.id)} />}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 24,
        paddingVertical: 12
    },
    item: {
        backgroundColor: '#ea1f3d',
        padding: 24,
        marginVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        borderRadius: 15
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    backgroundLetter: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.2,
        zIndex: -1,
    },
    backgroundLetterText: {
        fontSize: 130,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.8)'
    }
});

export default CategoryScreen;
