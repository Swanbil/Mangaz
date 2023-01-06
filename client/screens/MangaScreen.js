import React, { useState, useEffect } from 'react';
import MangaItem from "../components/MangaItem";
import { TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import {API_URL} from '@env';

const MangaPage = ({ route, navigation }) => {
    const { manga, width } = route.params;

    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        getChapters();

    }, [manga]);

    const getChapters = async () => {
        const response = await axios.get(API_URL + `/manga/${manga.technicalName}/chapters`);
        setChapters(response.data.chapters);
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{ margin: 20 }}
                underlayColor='#fff' onPress={() => navigation.goBack()}
            >
                <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
            </TouchableOpacity>
            <MangaItem manga={manga} chapters={chapters} width={width} navigation={navigation} />
        </View>

    )
}

export default MangaPage;