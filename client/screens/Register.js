import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";

const Register = ({navigation}) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassWord] = useState("");

    const register = async() => {
        const user = {"lastname":lastname,"firstname":firstname,"email":email,"pseudo":pseudo, "password":password};
        const res = await axios.post('http://192.168.1.82:8000/register', user);
        alert(res.data);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.loginBlock}>
            <Text style={styles.logo}>MANGAZ</Text>
            <TextInput style={styles.textInput}
                placeholder="Firstname"
                placeholderTextColor="#C1C1C1"
                onChangeText={(firstname) => setFirstName(firstname)} />
            <TextInput style={styles.textInput}
                placeholder="Lastname"
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
                placeholder="Password"
                placeholderTextColor="#C1C1C1"
                secureTextEntry={true}
                onChangeText={(password) => setPassWord(password)} />
            <TouchableOpacity
                style={styles.button}
                onPress={register}
                underlayColor='#fff'>
                <Text style={styles.textButton}>Register</Text>
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
        marginBottom: 30
    },
    textInput: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 10,
        margin: 20,
        width: "60%",
        fontStyle: 'italic',
        backgroundColor: "white",
        borderRadius: 5
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
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#EBEBEB",
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    }
});

export default Register;