import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from "moment";

import Category from '../components/Category';

const API_URL = 'https://script.google.com/macros/s/AKfycbwRSJrG748NCEZvBANIhMJM1uwu4QiITrPmqLTRNN91YjqLTxNYgb-Z07iJQ4RL7jc14g/exec?posts=true';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const window = useWindowDimensions();

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setData(data.slice(0, 3)); // Get the three latest posts
                } else {
                    console.error('Data is not an array of posts.');
                }
            })
            .catch(error => {
                console.error('Fetch error: ', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = Moment(dateString);
        return `Publié le ${date.format('DD MMMM YYYY')}`;
      };
    
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
        title: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
        },
        date: {
            fontSize: 16,
            color: 'white',
        },
    });

    return (
        <ScrollView>
            <View style={{}}>
                <FlatList
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
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
                <Category categoryId={2} />
                <Category categoryId={3} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
