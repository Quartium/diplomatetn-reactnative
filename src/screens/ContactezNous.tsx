import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Linking } from 'react-native';
import { Input } from 'react-native-elements';

const ContactezNousScreen = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSendEmail = () => {
        if (!subject || !body) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const emailUrl = `mailto:ataacg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.canOpenURL(emailUrl)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Error', 'Sending an email is not supported on this device');
                } else {
                    return Linking.openURL(emailUrl);
                }
            })
            .catch(error => {
                console.error('Error opening email:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.contactText}>N'hésitez pas à nous contacter pour toute question, suggestion ou demande spécifique concernant notre association. Nous sommes là pour vous aider et répondre à vos besoins.
                </Text>
                <Text style={styles.emailAddressText}>Vous pouvez nous joindre par e-mail à l'adresse suivante :</Text>
                <Text style={styles.emailAddress}>ataacg@gmail.com.</Text>
            </View>
            <View style={styles.inputMainContainer}>
                <Input
                    placeholder='Subject'
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="Body"
                    multiline
                    value={body}
                    onChangeText={text => setBody(text)}
                    inputStyle={styles.input}
                    inputContainerStyle={[styles.inputContainer, styles.bodyInput]}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Send Email" onPress={handleSendEmail} color="#D91F3C" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#192444'
    },
    textContainer: {
        paddingHorizontal: 24,
        paddingTop: 24
    },
    buttonContainer: {
        paddingHorizontal: 24
    },
    inputMainContainer: {
        paddingHorizontal: 14
    },
    contactText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 16
    },
    emailAddressText: {
        fontSize: 14,
        color: '#fff',
    },
    emailAddress: {
        fontSize: 16,
        marginBottom: 20,
        color: '#D91F3C',
    },
    bodyInput: {
        height: 150,
    },
    input: {
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
    },
    inputContainer: {
        borderRadius: 4,
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
    },

});

export default ContactezNousScreen;
