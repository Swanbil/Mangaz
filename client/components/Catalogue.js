import axios from "axios";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, ScrollView, Button } from 'react-native';
import MangaItem from "./MangaItem";
import {API_URL} from '@env';

const Catalogue = ({navigation}) => {
    const [catalogue, setCatalogue] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const getCatalogue = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL + '/manga/catalogue');
            const data = response.data;
            setCatalogue(data);
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCatalogue();
    }, []);
    if(isLoading){
        return <ActivityIndicator style={{flex:1}}/>
    }
    return (
        <ScrollView contentContainerStyle={{ padding:24 }} >
            <View className="catalogue"  style={{ flexGrow :1, flexDirection:'row', justifyContent:'space-between', flexWrap:"wrap" }}>
                {catalogue.map((manga, idx) => (
                    <MangaItem manga={manga} key={manga.idManga} navigation={navigation}/>
                )
                )}
            </View>
        </ScrollView>)

}

export default Catalogue;