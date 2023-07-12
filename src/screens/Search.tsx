import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { API_URL } from '../../config';
import PostItem from '../components/PostItem';

const SearchScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}?posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (post) => {
        navigation.navigate('Details', { item: post });
    };

    const renderPost = ({ item }) => (
        <PostItem item={item} onPress={() => handlePress(item)} />
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Rechercher..."
                leftIcon={{ type: 'ionicon', name: 'search', color: '#192344' }}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                rightIcon={search ? { type: 'ionicon', name: 'close', onPress: () => setSearch(''), color: '#192344' } : null}
                rightIconContainerStyle={styles.rightIconContainerStyle}
                onChangeText={text => setSearch(text)}
                value={search}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                renderErrorMessage={false}
            />
            {search ? (
                <FlatList
                    contentContainerStyle={styles.flatListContainer}
                    data={filteredPosts}
                    renderItem={renderPost}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyContainerIcon}>
                        <Ionicons name="search" size={100} color="#fff" />
                    </View>
                    <Text style={styles.emptyTitle}>Que souhaitez-vous trouver ?</Text>
                    <Text style={styles.emptySubtitle}>Recherchez des publications par leur titre en fonction de vos intérêts</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    flatListContainer: {
        paddingTop: 86,
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    input: {
        borderWidth: 0,
        borderRadius: 10,
    },
    inputContainer: {
        position: 'absolute',
        borderRadius: 4,
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
        marginLeft: 24,
        marginTop: 24,
        zIndex: 2
    },
    leftIconContainerStyle: {
        marginLeft: 12
    },
    rightIconContainerStyle: {
        marginRight: 12
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

export default SearchScreen;
