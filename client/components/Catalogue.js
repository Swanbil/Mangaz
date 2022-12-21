import axios from "axios";
import React from "react";
import { View, ScrollView, Text } from 'react-native';
import MangaItem from "./MangaItem";

const Catalogue = ({ navigation, catalogue, pageName, widthMangaItem }) => {
    return (
        <ScrollView contentContainerStyle={{ padding: 24 }} style={{marginTop:10}}>
            {catalogue?.length === 0
                ? <Text style={{ flex: 1, textAlign:"center", fontWeight:"500", marginTop:50 }}>Any mangas in the {pageName === "Favoris" ? "favorites" : "catalogue"} 😪</Text>
                : (
                    <View className="catalogue" style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
                        {catalogue?.map((manga, idx) => (
                            <MangaItem manga={manga} key={manga.idManga} navigation={navigation} width={widthMangaItem}/>
                        )
                        )}
                    </View>
                )
            }

        </ScrollView>)

}

export default Catalogue;