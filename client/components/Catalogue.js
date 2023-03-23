import axios from "axios";
import React from "react";
import { View, ScrollView, Text } from 'react-native';
import MangaItem from "./MangaItem";

const Catalogue = ({ navigation, catalogue, pageName, widthMangaItem, direction }) => {
    return (
        <ScrollView horizontal={ direction === "vertical" ? false : true} showsHorizontalScrollIndicator={false}>
            {catalogue?.length === 0
                ? <Text style={{ flex: 1, textAlign: "center", fontWeight: "500", marginTop: 50 }}>Aucun manga dans {pageName === "Favoris" ? "les favoris" : "le catalogue"} 😪</Text>
                : (
                    <View className="catalogue" style={{ flexGrow: 1, flexDirection:'row', flexWrap: 'wrap', justifyContent:'center' }}>
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