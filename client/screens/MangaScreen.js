import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { API_URL } from '@env';
import { IconButton } from 'react-native-paper';
import { RatingModal } from '../components/RatingModal';
import { getDataUser } from '../utilities/localStorage';

const MangaPage = ({ route, navigation }) => {
    const { manga, width } = route.params;

    const [chapters, setChapters] = useState([]);
    const [mangaItem, setMangaItem] = useState(manga);
    const [responseMessage, setResponseMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        getChapters();
    }, [manga]);

    const getChapters = async () => {
        const response = await axios.get(API_URL + `/manga/${mangaItem.technicalName}/chapters`);
        setChapters(response.data.chapters);
    }
    const toogleMangaToFavoris = async (manga) => {
        const { userPseudo } = await getDataUser();
        const payload = {
            userPseudo: userPseudo,
            idManga: mangaItem.idManga
        };
        console.log(payload)
        if (mangaItem.isFavoris) {
            setMangaItem((prevState) => ({ ...prevState, isFavoris: false }))
            await axios.post(`${API_URL}/manga/remove/favoris`, payload)
        }
        else {
            setMangaItem((prevState) => ({ ...prevState, isFavoris: true }))
            await axios.post(`${API_URL}/manga/add/favoris`, payload)
        }
    }
    const goToChapter = (chapterNumber) => {
        navigation.navigate('Chapter', { chapterNumber: chapterNumber, mangaTitle: mangaItem.technicalName });
    }


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

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground source={{ uri: mangaItem?.coverImage }} style={{ width: '100%', height: 327 }} resizeMode='cover' blurRadius={0.5}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ margin: 20 }}
                            underlayColor='#fff' onPress={() => navigation.goBack()}
                        >
                            <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
                            <IconButton icon={mangaItem.isFavoris ? "heart-circle" : "heart-circle-outline"} color={mangaItem.isFavoris ? "#EFA8FF" : "#D7D7D7"} onPress={toogleMangaToFavoris.bind(this, mangaItem)} size={36} />
                            <IconButton icon={"star-box"} color={"#D7D7D7"} onPress={() => onShowModal()} size={36} />
                        </View>

                    </View>
                </ImageBackground>

                <View style={{ backgroundColor: '#171717', borderRadius: 24, paddingHorizontal: 16, paddingVertical:8, position: 'absolute', top: 255, left: 16, width: 328, height: 168, overflow:'hidden' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>{mangaItem.titleName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton icon="star" color="#FFFF00" size={24} style={{margin:0}}/>
                            <Text style={{ fontWeight: '500', fontSize: 13, color: 'white' }}>{mangaItem.rate}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'rgba(237, 237, 237, 0.5);' }}>Synopsis</Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(237, 237, 237, 0.5);', marginTop: 5 }}>{mangaItem.description}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 100, padding: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700' }}>Chapitres</Text>
                    <View>
                        {chapters.map((chapter) => {
                            return (
                                <View key={chapter.number} style={{ height: 95, marginTop: 10 }}>
                                    <ImageBackground source={{ uri: manga?.coverImage_large }} resizeMode='cover' blurRadius={1} imageStyle={{ borderRadius: 15 }}>
                                        <View style={{ backgroundColor: 'rgba(0,0,0, 0.20)', borderRadius: 12 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                                <Image source={{ uri: "https://lelscans.net/mangas/one-piece/1018/00.jpg?v=fr1625215883" }}
                                                    resizeMode="cover" style={{ width: 84, height: 84, borderRadius: 24 }} />

                                                <View style={{ padding: 5, marginLeft: 20, width: 0, flexGrow: 1, flex: 1, }}>
                                                    <Text onPress={goToChapter.bind(this, chapter.number)} style={{ fontSize: 14, fontWeight: '500', color: '#EDEDED' }}>Chapter {chapter.number}</Text>
                                                    <Text onPress={goToChapter.bind(this, chapter.number)} style={{ fontSize: 24, fontWeight: '700', color: 'white', marginTop: 3 }}>{chapter.title}</Text>

                                                </View>

                                            </View>
                                        </View>


                                    </ImageBackground>


                                </View>

                            )
                        })}
                    </View>
                </View>
                <RatingModal onValidate={rateManga} isModalVisible={isModalVisible} setModalVisible={setModalVisible} mangaName={manga.titleName} responseMessage={responseMessage} />
            </ScrollView>


        </View>

    )
}

export default MangaPage;