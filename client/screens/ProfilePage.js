import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../components/UserProfile';
import MenuProfile from '../components/MenuProfile';
import axios from 'axios';
import { API_URL } from '@env';
import { getDataUser, removeDataUser } from '../utilities/localStorage';

export default function ProfilePage({ navigation, isLog, getLogState, isSubscribe, getSubState }) {
    const [userInfos, setUserInfos] = useState();

    useEffect(() => {
        getUserInfos();
    }, [])

    const getUserInfos = async () => {
        const { userPseudo } = await getDataUser();
        if (userPseudo) {
            try {
                const response = await axios.get(`${API_URL}/user/${userPseudo}`);
                setUserInfos(response.data.userInfos);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const logout = async () => {
        await removeDataUser();
        getLogState(false);
        getSubState(false)
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.blockUser}>
                <UserProfile isLog={isLog} userInfos={userInfos} isSubscribe={isSubscribe}/>
            </View>
            <View style={styles.menu}>
                <MenuProfile navigation={navigation} userInfos={userInfos} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={logout}
                    underlayColor='#fff'>
                    <Text style={styles.textButton}>Logout </Text>
                </TouchableOpacity>
            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    blockUser: {
        marginTop: 5

    },
    menu: {
        marginTop: 30
    },
    logoutBtn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#EA5F5F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
})
