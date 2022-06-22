import axios from "axios";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, ScrollView, Button } from 'react-native';
import MangaItem from "./MangaItem";


const Catalogue = ({navigation}) => {
    const [catalogue, setCatalogue] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const getCatalogue = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.1.82:8000/catalogue');
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
        <ScrollView style={{ flex: 1, padding: 24 }}>
            <View className="catalogue"  style={{ flexDirection:"row", flexWrap:"wrap", justifyContent:"center" }}>
                {catalogue.map((manga, idx) => (
                    <MangaItem manga={manga} key={idx} navigation={navigation}/>
                )
                )}
            </View>
        </ScrollView>)

}

export default Catalogue;