import React, { useState, useEffect, useCallback } from 'react';
import Catalogue from "../components/Catalogue";
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getDataUser } from '../utilities/localStorage';

const Favoris = ({ navigation, isLog}) => {
    const [mangaFavoris, setMangaFavoris] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Load favoris every time go to this screen
    useFocusEffect(
        useCallback(() => {
            getMangasFavoris();
        }, [])
    );
    const getMangasFavoris = async () => {
        setIsLoading(true);
        const {userPseudo} = await getDataUser();
        const response = await axios.get(API_URL + `/user/${userPseudo}/mangas/favoris`);
        setMangaFavoris(response.data.mangaFavoris);
        setIsLoading(false);
    }
    if (!isLog) {
        return (
            <TouchableOpacity
                style
                onPress={() => navigation.navigate('Login')}
                underlayColor='#fff'>
                <Text style>Go To Login Page </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            {isLoading
                ? <ActivityIndicator style={{ flex: 1, color :'black' }} />
                : <Catalogue navigation={navigation} catalogue={mangaFavoris} pageName="Favoris" widthMangaItem={"small"} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Favoris;