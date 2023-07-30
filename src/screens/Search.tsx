import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

    const filteredPosts = useMemo(() => posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    ), [posts, search]);

    const handlePress = useCallback((post) => {
        navigation.navigate('Details', { item: post });
    }, [navigation]);

    const renderPost = ({ item }) => (
        <PostItem item={item} onPress={() => handlePress(item)} />
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Ionicons
                    name="arrow-back"
                    size={25}
                    onPress={() => navigation.navigate('HomeTab')}
                    style={styles.iconMenu}
                />
                <Input
                    placeholder="Rechercher..."
                    rightIcon={search ? { type: 'ionicon', name: 'close', onPress: () => setSearch(''), color: '#fff' } : null}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    renderErrorMessage={false}
                />
            </View>
            <View style={styles.container}>
                {search ? (
                    loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            contentContainerStyle={styles.flatListContainer}
                            data={filteredPosts}
                            renderItem={renderPost}
                            keyExtractor={item => item.id.toString()}
                        />
                    )
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
        </View >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    headerContainer: {
        position: 'relative',
        backgroundColor: '#192444',
        height: 60
    },
    iconMenu: {
        color: '#fff',
        marginLeft: 10,
        marginTop: 16
    },
    inputContainer: {
        position: 'absolute',
        borderRadius: 4,
        borderBottomWidth: 0,
        marginLeft: 32,
        left: 12,
        top: -39,
    },
    input: {
        borderWidth: 0,
        borderRadius: 10,
        color: '#fff'
    },
    flatListContainer: {
        paddingTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        marginTop: 55
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
