import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

const Login = ({ navigation, getLogState }) => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassWord] = useState("");

    const _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('@username', data);
        } catch (error) {
            alert(error)
        }
    };

    const login = async () => {
        const user = { "pseudo": pseudo, "password": password };
        try {
            const response = await axios.post(API_URL + '/login', user);
            const data = response.data;
            getLogState(true);
            _storeData(data);
            navigation.navigate("TabNavigator", { screen: 'Catalogue', params: { userName: data }, merge: true, });
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <View style={styles.container}>
             <View style={styles.loginAppImage}>
                <Image source={require('../assets/MangaZ_logo.png')} style={{width:180, height:100, borderRadius:30}} resizeMode="contain" />
                <Text style={styles.logo}>MANGAZ</Text>
            </View>
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
                onPress={() => login()}
                underlayColor='#fff'>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate('Register')}
                underlayColor='#fff'
            >
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
        marginVertical: 10
    },
    textInput: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10,
        paddingTop: 10,
        margin: 20,
        width: "60%",
        fontStyle: 'italic',
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
        borderBottomColor:"#333",
        borderBottomWidth:2
    },
    registerText: {
        marginTop: 20,
        fontSize: 10,
        color: "grey",
        fontStyle: 'italic'
    },
    loginBlock: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        
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
    loginAppImage:{
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center'
    }
});

export default Login;