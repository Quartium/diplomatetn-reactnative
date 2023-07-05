import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from "moment";

const API_URL = 'https://script.google.com/macros/s/AKfycbwRSJrG748NCEZvBANIhMJM1uwu4QiITrPmqLTRNN91YjqLTxNYgb-Z07iJQ4RL7jc14g/exec';

const formatDate = (dateString) => {
    const date = Moment(dateString);
    return `Publié le ${date.format('DD MMMM YYYY')}`;
};

const Category = ({ categoryId, navigation }) => {
    const [categoryPosts, setCategoryPosts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const window = useWindowDimensions();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            width: window.width * 0.5,
            height: window.height * 0.3,
            marginRight: 24,
            borderRadius: 10,
            overflow: 'hidden',
        },
        image: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        textContainer: {
            backgroundColor: '#F2F2F2',
            padding: 10,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#192344'
        },
        date: {
            fontSize: 16,
            color: '#192344'
        },
        loadingText: {
            color: 'red',
        },
        categoryContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 24,
            marginTop: 12
        },
        categoryName: {
            fontSize: 18,
            color: '#D91F3C',
            marginLeft: 12,
        },
        flatListContainer: {
            paddingVertical: 24,
            paddingLeft: 24
        },
    }), [window.width, window.height]);

    useEffect(() => {
        setLoading(true);
        if (categoryId) {
            fetch(`${API_URL}?categoryId=${categoryId}`)
                .then(response => response.json())
                .then(data => setCategoryPosts(data))
                .catch(error => {
                    console.error(error);
                    setError('An error occurred while fetching posts');
                })
                .finally(() => setLoading(false));

            fetch(`${API_URL}?categories&categoryId=${categoryId}`)
                .then(response => response.json())
                .then(data => setCategoryName(data.name))
                .catch(error => {
                    console.error(error);
                    setError('An error occurred while fetching category name');
                });
        }
    }, [categoryId]);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View>
            <View
                style={styles.categoryContainer}>
                <MaterialCommunityIcons
                    name="label"
                    color="#D91F3C"
                    size={30} />
                <Text
                    style={styles.categoryName}>{categoryName}</Text>
            </View>
            <FlatList
                contentContainerStyle={styles.flatListContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryPosts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { item })} style={styles.container}>
                        <ImageBackground source={{ uri: item.featured_image }} style={styles.image}>
                        </ImageBackground>
                        <View style={styles.textContainer}>
                            <Text style={styles.text} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.date}>{formatDate(item.date)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default Category;
