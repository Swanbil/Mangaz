import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
import { API_URL } from '@env';

const Register = ({ navigation }) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassWord] = useState("");

    const register = async () => {
        const user = { "lastname": lastname, "firstname": firstname, "email": email, "pseudo": pseudo, "password": password };
        const res = await axios.post(API_URL + '/register', user);
        alert(res.data);
        navigation.navigate('Login');
    }

    return (
        <View style={styles.loginBlock}>
            <View style={styles.loginAppImage}>
                <Image source={require('../assets/MangaZ_logo.png')} style={{ width: 180, height: 100, borderRadius: 30 }} resizeMode="contain" />
                <Text style={styles.logo}>MANGAZ</Text>
            </View>

            <TextInput style={styles.textInput}
                placeholder="Prénom"
                placeholderTextColor="#C1C1C1"
                onChangeText={(firstname) => setFirstName(firstname)} />
            <TextInput style={styles.textInput}
                placeholder="Nom"
                placeholderTextColor="#C1C1C1"
                onChangeText={(lastname) => setLastName(lastname)} />
            <TextInput style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#C1C1C1"
                onChangeText={(email) => setEmail(email)} />
            <TextInput style={styles.textInput}
                placeholder="Pseudo"
                placeholderTextColor="#C1C1C1"
                onChangeText={(pseudo) => setPseudo(pseudo)} />
            <TextInput style={styles.textInput}
                placeholder="Mot de passe"
                placeholderTextColor="#C1C1C1"
                secureTextEntry={true}
                onChangeText={(password) => setPassWord(password)} />
            <TouchableOpacity
                style={styles.button}
                onPress={register}
                underlayColor='#fff'>
                <Text style={styles.textButton}>S'inscrire</Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: "#C0A6F7",
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 10
    },
    textInput: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 10,
        margin: 10,
        width: "60%",
        fontStyle: 'italic',
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
        borderBottomColor: "#333",
        borderBottomWidth: 2
    },
    registerText: {
        marginTop: 20,
        fontSize: 10,
        color: "grey",
        fontStyle: 'italic'
    },
    loginBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    button: {
        width: "50%",
        padding: 10,
        backgroundColor: '#C0A6F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonRegister: {
        width: "50%",
        padding: 10,
        marginTop: 10,
        backgroundColor: '#E5D9FF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "bold"
    },
    loginAppImage: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default Register;