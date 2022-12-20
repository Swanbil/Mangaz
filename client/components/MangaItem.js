import React, { useState } from 'react';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { View, ScrollView, Text, StyleSheet } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const MangaItem = ({ navigation, manga, width, chapters }) => {
    const [cardWidth, setCardWidth] = useState(width == "large" ? "100%" : "30%");
    const [mangaItem, setMangaItem] = useState(manga)

    const goToMangaPage = () => {
        console.log(mangaItem)
        navigation.navigate('MangaPage', { manga : mangaItem, width: "large" })
    }

    const goToChapter = (chapterNumber) => {
        navigation.navigate('Chapter', { chapterNumber: chapterNumber, mangaTitle: mangaItem.technicalName });
    }

    const toogleMangaToFavoris = async (manga) => {
        const userPseudo = await AsyncStorage.getItem('@username');
        const payload = {
            userPseudo: userPseudo,
            idManga: mangaItem.idManga
        };
        console.log(mangaItem.isFavoris)
        if(mangaItem.isFavoris){
            setMangaItem((prevState) => ({...prevState, isFavoris : false}))
            await axios.post(`${API_URL}/manga/remove/favoris`, payload)
        }
        else{
            setMangaItem((prevState) => ({...prevState, isFavoris : true}))
            await axios.post(`${API_URL}/manga/add/favoris`, payload)
        }
    }

    if (cardWidth == "30%") {
        return (
            <View style={{ width: "45%", marginBottom: 20, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card onPress={goToMangaPage}>
                    <Card.Title
                        title={mangaItem.titleName} titleStyle={{ fontSize: 8 }}
                        subtitle={(mangaItem.createdDate !== null) ? mangaItem.createdDate.split('-')[0] : ''} subtitleStyle={{ fontSize: 5 }}
                        right={(props) => <IconButton {...props} icon={mangaItem.isFavoris ? "heart-circle" : "heart-circle-outline"} color={mangaItem.isFavoris ? "#EFA8FF" : "#D7D7D7"} onPress={toogleMangaToFavoris.bind(this, mangaItem)} size={20} />}
                    />
                    <Card.Cover width={"100%"} source={{ uri: mangaItem.coverImage }} />
                </Card>
            </View>

        )
    }
    else {
        return (
            <ScrollView style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card style={{ marginRight: 20, marginLeft: 20 }}>
                    <Card.Title title={mangaItem.titleName} subtitle={(mangaItem.createdDate !== null) ? mangaItem.createdDate.split('-')[0] : ''} />
                    <Card.Cover source={{ uri: manga.coverImage }} style={{ width: cardWidth, height: 300, backgroundColor: 'white' }} resizeMode="contain" />
                    <Card.Content>
                        <Text style={styles.cardSubtitle}>Description</Text>
                        <Paragraph style={{ fontSize: 10 }}>{mangaItem.description}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Text style={styles.cardSubtitle}>Chapters</Text>
                        <View>
                            {chapters.map((chapter) => {
                                return (
                                    <Text key={chapter.number} style={styles.chapter} onPress={goToChapter.bind(this, chapter.number)}>{chapter.number} - {chapter.title}</Text>
                                )
                            })}
                        </View>

                    </Card.Content>
                </Card>
            </ScrollView>

        )
    }

}
const styles = StyleSheet.create({
    cardSubtitle: {
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: "#C0A6F7"
    },
    chapter: { marginBottom: 5, backgroundColor: "#F5F5F5", padding: 4, fontStyle: "italic", fontWeight: "600" },


})
export default MangaItem;