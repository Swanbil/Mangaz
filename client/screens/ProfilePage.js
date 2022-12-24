import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../components/UserProfile';
import MenuProfile from '../components/MenuProfile';
import axios from 'axios';
import { API_URL } from '@env';

export default function ProfilePage({ navigation, isLog, getLogState }) {
    const [userInfos, setUserInfos] = useState();

    useEffect(() => {
        getUserInfos();
    }, [])

    const getUserInfos = async () => {
        const userPseudo = await AsyncStorage.getItem('@username');
        if (userPseudo) {
            try {
                const response = await axios.get(`${API_URL}/user/${userPseudo}`);
                console.log(response.data.userInfos)
                setUserInfos(response.data.userInfos);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.blockUser}>
                <UserProfile isLog={isLog} userInfos={userInfos} />
            </View>
            <View style={styles.menu}>
                <MenuProfile />

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
        marginTop:5

    },
    menu: {
        marginTop:30
    }
})
