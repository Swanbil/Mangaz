import React, { useState } from 'react';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from "react-native";
import axios from 'axios';
import { getDataUser } from '../utilities/localStorage';
import { API_URL } from '@env';
import { RatingModal } from './RatingModal';

const MangaItem = ({ navigation, manga, width, chapters, subTitle}) => {
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

    const onShowModal = () => {
        setResponseMessage('');
        setModalVisible(true)
    }
    const goToMangaPage = () => {
        navigation.navigate('MangaPage', { manga: manga, width: "xlarge" })
    }

    const goToChapter = (chapterNumber) => {
        navigation.navigate('Chapter', { chapterNumber: chapterNumber, mangaTitle: mangaItem.technicalName });
    }

    const toogleMangaToFavoris = async (manga) => {
        const { userPseudo } = await getDataUser();
        const payload = {
            userPseudo: userPseudo,
            idManga: mangaItem.idManga
        };
        if (mangaItem.isFavoris) {
            setMangaItem((prevState) => ({ ...prevState, isFavoris: false }))
            await axios.post(`${API_URL}/manga/remove/favoris`, payload)
        }
        else {
            setMangaItem((prevState) => ({ ...prevState, isFavoris: true }))
            await axios.post(`${API_URL}/manga/add/favoris`, payload)
        }
    }

    if (width == "large") {
        return (
            <View style={{ marginBottom: 20, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginRight: 10 }}>
                <TouchableWithoutFeedback onPress={goToMangaPage}>
                    <ImageBackground source={{ uri: manga.coverImage }} style={{ width: 270, height: 200 }} imageStyle={{ borderRadius: 12 }} resizeMode='cover' blurRadius={0.5}>
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.20)', borderRadius: 12}}>
                            <View style={{ position: 'absolute', left: 10, bottom: 10, }}>
                                <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }} onPress={manga.title ? () => null : goToMangaPage}>{manga.titleName}</Text>
                                {manga.title 
                                ? <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }} >{manga.number} - {manga.title}</Text>
                                : <></>}
                                {manga.rate ?(<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <IconButton icon="star" color="yellow" size={24}/>
                                    <Text style={{ fontWeight: '500', fontSize: 13, color: 'white' }}>{manga.rate}</Text>

                                </View>):<></>}
                            </View>

                        </View>
                    </ImageBackground>

                </TouchableWithoutFeedback>

            </View>

        )
    }
    else if (width === "small") {
        return (
            <View style={{ width: "100%", marginBottom: 20, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card onPress={goToMangaPage} borderRadius={5} mode="outlined" borderLeftWidth={3} borderLeftColor="#EBEBEB">
                    <Card.Title
                        title={mangaItem.titleName} titleStyle={{ fontSize: 15 }}
                        subtitle={(mangaItem.createdDate !== null) ? mangaItem.createdDate.split('-')[0] : ''} subtitleStyle={{ fontSize: 10 }}
                        left={(props) => <Image {...props} source={{ uri: mangaItem.coverImage }} style={{ width: 50, height: 50, }} />}
                        right={(props) => <IconButton {...props} icon={mangaItem.isFavoris ? "heart-circle" : "heart-circle-outline"} color={mangaItem.isFavoris ? "#EFA8FF" : "#D7D7D7"} onPress={toogleMangaToFavoris.bind(this, mangaItem)} size={25} />}
                    />

                </Card>

            </View>
        )
    }
    else {
        return (
            <ScrollView style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card style={{ marginRight: 20, marginLeft: 20 }}>
                    <Card.Title
                        title={mangaItem.titleName}
                        subtitle={(mangaItem.rate !== null) ? mangaItem.rate + '⭐' : '-'} subtitleStyle={{ fontSize: 12 }}
                        right={(props) => <View style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
                            <IconButton {...props} icon={mangaItem.isFavoris ? "heart-circle" : "heart-circle-outline"} color={mangaItem.isFavoris ? "#EFA8FF" : "#D7D7D7"} onPress={toogleMangaToFavoris.bind(this, mangaItem)} size={28} />
                            <IconButton {...props} icon={"star-box"} color={"#D7D7D7"} onPress={() => onShowModal()} size={28} />
                        </View>}
                    />
                    <Card.Cover source={{ uri: mangaItem.coverImage }} style={{ width: cardWidth, height: 300, backgroundColor: 'white' }} resizeMode="contain" />
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
                        <RatingModal onValidate={rateManga} isModalVisible={isModalVisible} setModalVisible={setModalVisible} mangaName={mangaItem.titleName} responseMessage={responseMessage} />

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