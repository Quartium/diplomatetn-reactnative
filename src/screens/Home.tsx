import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from "moment";

import Category from '../components/Category';

const API_URL = 'https://script.google.com/macros/s/AKfycbwRSJrG748NCEZvBANIhMJM1uwu4QiITrPmqLTRNN91YjqLTxNYgb-Z07iJQ4RL7jc14g/exec?posts=true';

const formatDate = (dateString) => {
    const date = Moment(dateString);
    return `Publié le ${date.format('DD MMMM YYYY')}`;
};

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const window = useWindowDimensions();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            width: window.width * 0.65,
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
        loadingText: {
            fontSize: 18,
            textAlign: 'center',
            marginTop: 50,
        },
        errorText: {
            fontSize: 18,
            textAlign: 'center',
            marginTop: 50,
            color: 'red',
        },
        mainContainer: {
            backgroundColor: 'white',
        },
        flatListContainer: {
            backgroundColor: '#F2F2F2',
            paddingVertical: 24,
            paddingLeft: 24
        },
    }), [window.width, window.height]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setData(data.slice(0, 3)); // Get the three latest posts
                }
            } catch (error) {
                console.error('Fetch error: ', error);
                setError('An error occurred while fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <FlatList
                    contentContainerStyle={styles.flatListContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Details', { item })}
                            style={styles.container}
                        >
                            <ImageBackground source={{ uri: item.featured_image }} style={styles.image}>
                                <View style={styles.textContainer}>
                                    <Text>À la une</Text>
                                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
                <Category categoryId={7} navigation={navigation}/>
                <Category categoryId={8} navigation={navigation}/>
                <Category categoryId={9} navigation={navigation}/>
                <Category categoryId={10} navigation={navigation}/>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
