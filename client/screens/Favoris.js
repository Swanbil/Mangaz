import React, { useState, useEffect, useCallback } from 'react';
import Catalogue from "../components/Catalogue";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Favoris = ({ navigation }) => {
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
        const userPseudo = await AsyncStorage.getItem('@username');
        const response = await axios.get(API_URL + `/user/${userPseudo}/mangas/favoris`);
        setMangaFavoris(response.data.mangaFavoris);
        setIsLoading(false);
    }
    if(isLoading){
        return <ActivityIndicator style={{flex:1}}/>
    }
    return (
        <Catalogue navigation={navigation} catalogue={mangaFavoris} pageName="Favoris"/>

    )
}

export default Favoris;