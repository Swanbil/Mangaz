import axios from "axios";
import React from "react";
import { View, ScrollView, Text } from 'react-native';
import MangaItem from "./MangaItem";

const Catalogue = ({ navigation, catalogue, pageName, widthMangaItem, direction }) => {
    return (
        <ScrollView horizontal={ direction === "vertical" ? false : true}>
            {catalogue?.length === 0
                ? <Text style={{ flex: 1, textAlign: "center", fontWeight: "500", marginTop: 50 }}>Any mangas in the {pageName === "Favoris" ? "favorites" : "catalogue"} 😪</Text>
                : (
                    <View className="catalogue" style={{ flexGrow: 1, flexDirection:( direction === "vertical" ? 'col' : 'row'), flexWrap: 'wrap', justifyContent:'center' }}>
                        {catalogue?.map((manga, idx) => (
                            <MangaItem manga={manga} key={manga?.title || manga.idManga} navigation={navigation} width={widthMangaItem} subTitle={manga?.title} />
                        )
                        )}
                    </View>
                )
            }
        </ScrollView>)

}

export default Catalogue;