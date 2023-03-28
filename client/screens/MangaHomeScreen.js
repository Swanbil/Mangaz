import React, { useState, useEffect, useCallback } from 'react';
import MangaItem from "../components/MangaItem";
import { TouchableOpacity, Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { API_URL } from '@env';
import { Badge, Searchbar, IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getDataUser } from '../utilities/localStorage';
import { ScrollView } from 'react-native-gesture-handler';
import Catalogue from '../components/Catalogue';
import Icon from 'react-native-vector-icons/FontAwesome5';


const MangaHomePage = ({ route, navigation, isSubscribe, isLog }) => {
    const [catalogue, setCatalogue] = useState([]);
    const [recommandations, setRecommandations] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [trends, setTrends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const genres = [{ title: 'Action', image: require('../assets/filter_drame.png') }, { title: 'Aventure', image: require('../assets/filter_aventure.png') }, { title: 'Drame', image: require('../assets/filter_drame.png') }, { title: 'Fun', image: require('../assets/filter_aventure.png') }, { title: 'Romance', image: require('../assets/filter_drame.png') }];
    const [userInfos, setUserInfos] = useState();

    useFocusEffect(
        useCallback(() => {
            getCatalogue();
            getUserInfos();
            getRecommandations();
            getMostPopular();
            getTrends();
        }, [])
    );

    const getCatalogue = async () => {
        setLoading(true);
        const userData = await getDataUser();
        if (userData) {
            const userPseudo = userData.userPseudo;
            try {
                const response = await axios.get(API_URL + `/manga/catalogue/${userPseudo}`);
                const data = response.data;
                setCatalogue(data);
            }
            catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }


    }
    const getRecommandations = async () => {
        setLoading(true);
        const userData = await getDataUser();
        if (userData) {
            const userPseudo = userData.userPseudo;
            try {
                const response = await axios.get(API_URL + `/manga/catalogue/${userPseudo}/recommandations`);
                const data = response.data;
                setRecommandations(data);
            }
            catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }
    const getMostPopular = async () => {
        setLoading(true);
        const userData = await getDataUser();
        if (userData) {
            const userPseudo = userData.userPseudo;
            try {
                const response = await axios.get(API_URL + `/manga/catalogue/popular/${userPseudo}`);
                const data = response.data;
                setMostPopular(data);
            }
            catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }
    const getTrends = async () => {
        setLoading(true);
        const userData = await getDataUser();
        if (userData) {
            const userPseudo = userData.userPseudo;
            try {
                const response = await axios.get(API_URL + `/manga/catalogue/trends/${userPseudo}`);
                const data = response.data;
                setTrends(data);
            }
            catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    const goToFilterByGenre = (genre) => {
        navigation.navigate('Search', { filter: genre })
    }

    const getUserInfos = async () => {
        const { userPseudo } = await getDataUser();
        if (userPseudo) {
            try {
                const response = await axios.get(`${API_URL}/user/${userPseudo}`);
                setUserInfos(response.data.userInfos);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <ImageBackground source={{ uri: recommandations[0] ? recommandations[0]?.coverImage_large : "https://wallpaper.dog/large/20475321.jpg" }} resizeMode="cover" blurRadius={10} >
                        <View style={{ padding: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: '#EEEEEE', borderRadius: 25, flexDirection: 'row', alignItems: 'center', opacity:0.7 }} onPress={() => navigation.navigate('Search')}>
                                    <Icon name={"search"} size={18} />
                                    <Text style={{ marginLeft: 5 }}>Rechercher un manga</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    <Image source={{ uri: userInfos?.profilepicture }}
                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                    <View style={{ position: 'absolute', left: 58, top: -1}}>
                                        {isSubscribe ? <Image source={require("../assets/Verified.png")}
                                            style={{ width: 26, height: 26 }} /> : null}
                                    </View>
                                </View>


                            </View>
                            <View>
                                {recommandations[0]
                                    ? (
                                        <>
                                            <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }}>Recommandation</Text>
                                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {recommandations?.map((recommandation) => (

                                                        <View key={recommandation.idManga} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginRight: 37 }}>
                                                            <View>
                                                                <Image source={{ uri: recommandation?.coverImage }} style={{ width: 132, height: 175, borderRadius: 12 }} />
                                                            </View>
                                                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                                                    <TouchableOpacity onPress={() => navigation.navigate('MangaPage', { manga: recommandation, width: "xlarge" })}>
                                                                        <Text style={{ fontWeight: '700', fontSize: 16, letterSpacing: -0.33, color: 'white' }}>{recommandation?.titleName}</Text>
                                                                    </TouchableOpacity>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                                                        <Icon name={"star"} color={"yellow"} size={22} />
                                                                        <Text style={{ fontWeight: '500', fontSize: 12, letterSpacing: -0.33, color: 'white', marginLeft: 5 }}>{recommandation?.rate}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>{recommandation?.genre}</Text>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>
                                            </ScrollView>
                                        </>
                                    )
                                    : (<></>)
                                }
                            </View>
                        </View>

                    </ImageBackground>
                </View>

                <View style={{ padding: 20 }}>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                {genres.map((genre, index) => (
                                    <ImageBackground key={index} source={genre?.image} resizeMode="cover" blurRadius={0.5}
                                        style={{ width: 124, height: 54, marginRight: 8, justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: 31 }}>
                                        <TouchableOpacity onPress={() => goToFilterByGenre(genre.title)}>
                                            <View style={{ borderBottomWidth: 3, borderBottomColor: "#C5B1F2" }}>
                                                <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }}>{genre?.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                ))}
                            </View>
                        </ScrollView>


                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontWeight: '700', fontSize: 22 }}>En tendance</Text>
                        <View style={{ marginTop: 15 }}>
                            <Catalogue navigation={navigation} catalogue={trends} pageName="Home" widthMangaItem="large"  />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontWeight: '700', fontSize: 22 }}>Les plus populaires</Text>
                        <View style={{ marginTop: 15 }}>
                            <Catalogue navigation={navigation} catalogue={mostPopular} pageName="Home" widthMangaItem="small" direction={"vertical"} />
                        </View>
                    </View>

                </View >

            </ScrollView >


        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
export default MangaHomePage;