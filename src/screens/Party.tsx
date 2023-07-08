import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

import { API_URL } from '../../config';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const PartyScreen = ({ navigation }) => {
    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await fetch(`${API_URL}?categories`);
                const data = await response.json();
                const filteredData = data.filter(party => party.featured_image);
                setParties(filteredData);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParties();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const handlePress = (partyId) => {
        navigation.navigate('Posts', { categoryId: partyId });
    };

    const renderParty = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
            <ImageBackground source={{ uri: item.featured_image }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={parties}
            renderItem={renderParty}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        backgroundColor: '#F3F3F3',
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    item: {
        flex: 1,
        margin: 8,
        height: (screenWidth - 64) / 2,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default PartyScreen;
