import React, { useState } from 'react';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from "react-native";
import axios from 'axios';
import { getDataUser } from '../utilities/localStorage';
import { API_URL } from '@env';
import { RatingModal } from './RatingModal';

const MangaItem = ({ navigation, manga, width, chapters, subTitle }) => {
    const [cardWidth, setCardWidth] = useState(width == "xlarge" ? "100%" : "30%");
    const [mangaItem, setMangaItem] = useState(manga);
    const [responseMessage, setResponseMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const rateManga = async (starRating) => {
        const { userPseudo } = await getDataUser();
        const payload = {
            userPseudo: userPseudo,
            idManga: mangaItem.idManga,
            starRating: starRating
        }
        try {
            const response = await axios.post(`${API_URL}/manga/rating`, payload);
            setResponseMessage(response.data.message);
            setTimeout(() => {
                setModalVisible(false)
            }, 2000);
        }
        catch (error) {
            console.log(error)
        }
    }

    const goToMangaPage = () => {
        navigation.navigate('MangaPage', { manga: manga, width: "xlarge" })
    }


    if (width == "large") {
        return (
            <View style={{ marginBottom: 20, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginRight: 10 }}>
                <TouchableWithoutFeedback onPress={goToMangaPage}>
                    <ImageBackground source={{ uri: manga.coverImage }} style={{ width: 270, height: 200 }} imageStyle={{ borderRadius: 12 }} resizeMode='cover' blurRadius={0.5}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.20)', borderRadius: 12 }}>
                            <View style={{ position: 'absolute', left: 10, bottom: 10, }}>
                                <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }} onPress={manga.title ? () => null : goToMangaPage}>{manga.titleName}</Text>
                                {manga.title
                                    ? <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }} >{manga.number} - {manga.title}</Text>
                                    : <></>}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>{manga?.genre}</Text>
                                </View>
                                {manga.rate ? (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <IconButton icon="star" color="yellow" size={24} />
                                    <Text style={{ fontWeight: '500', fontSize: 13, color: 'white' }}>{manga.rate}</Text>

                                </View>) : <></>}
                            </View>

                        </View>
                    </ImageBackground>

                </TouchableWithoutFeedback>

            </View>

        )
    }
    else if (width === "small") {
        return (
            <View style={{ marginBottom: 20, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginRight: 10 }}>
                <TouchableWithoutFeedback onPress={goToMangaPage}>
                    <ImageBackground source={{ uri: manga.coverImage_large }} style={{ width: 334, height: 122 }} imageStyle={{ borderRadius: 12 }} resizeMode='cover' blurRadius={1}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.20)', borderRadius: 12, justifyContent: 'center' }}>
                            <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                                <View>
                                    <Image source={{ uri: manga.coverImage }} style={{ width: 94, height: 107 }} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }} onPress={manga.title ? () => null : goToMangaPage}>{manga.titleName}</Text>
                                    {manga.title
                                        ? <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }} >{manga.number} - {manga.title}</Text>
                                        : <></>}
                                    {manga.rate ? (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <IconButton icon="star" color="yellow" size={24} />
                                        <Text style={{ fontWeight: '500', fontSize: 13, color: 'white' }}>{manga.rate}</Text>

                                    </View>) : <></>}

                                </View>

                            </View>

                        </View>
                    </ImageBackground>

                </TouchableWithoutFeedback>

            </View>
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