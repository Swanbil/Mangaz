import React, { useState } from 'react';
import MangaItem from "../components/MangaItem";
import { TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const MangaPage = ({ route, navigation }) => {
    const { manga, width } = route.params;
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
            style={{margin:20}}
                underlayColor='#fff' onPress={() => navigation.goBack()}
            >
                <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
            </TouchableOpacity>
            <MangaItem manga={manga} width={width} navigation={navigation}/>
        </View>

    )
}

export default MangaPage;