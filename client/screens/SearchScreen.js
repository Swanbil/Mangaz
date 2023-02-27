import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, ImageBackground, ScrollView } from "react-native";
import axios from "axios";
import { API_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Catalogue from '../components/Catalogue';
import { getDataUser } from '../utilities/localStorage';


const SearchScreen = ({  navigation }) => {

    const [catalogue, setCatalogue] = useState([]);
    const [filteredCatalogue, setFilteredCatalogue] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    useFocusEffect(
        useCallback(() => {
            getCatalogue();
        }, [])
    );

    const getCatalogue = async () => {
        const userData = await getDataUser();
        if (userData) {
            const userPseudo = userData.userPseudo;
            try {
                const response = await axios.get(API_URL + `/manga/catalogue/${userPseudo}`);
                const data = response.data;
                setCatalogue(data);
                setFilteredCatalogue(data);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    const onSearchingManga = (value) => {
        const valueLowerCase = value.toLowerCase();
        setSearchQuery(value);
        if (value.length < 2) {
            setFilteredCatalogue(catalogue);  //if no more thant two char in text search => reset catalogue to all mangas
            return;
        }
        setFilteredCatalogue(catalogue.filter((manga) => manga.titleName.toLowerCase().includes(valueLowerCase) || manga.technicalName.toLowerCase().includes(valueLowerCase)));
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        style={{ margin: 20 }}
                        underlayColor='#fff' onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                    </TouchableOpacity>
                    <Searchbar
                        placeholder="Search a manga"
                        onChangeText={(value) => onSearchingManga(value)}
                        value={searchQuery}
                        style={{ width: 252, height: 40, borderRadius: 25, backgroundColor: '#EDEDED' }}
                        iconColor='#333'
                        onIconPress={() => navigation.navigate('Search')}
                    />
                </View>

                <View style={{padding: 20}}>
                    <Text style={{ fontWeight: '700', fontSize: 22 }}>Catalogue</Text>
                    <View style={{ marginTop: 20}}>
                        <Catalogue navigation={navigation} catalogue={filteredCatalogue} pageName="Home" direction={"vertical"} widthMangaItem="small" />
                    </View>

                </View>
            </ScrollView>


        </View>

    )

}

export default SearchScreen;