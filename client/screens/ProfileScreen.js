import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, ImageBackground, ImageBackgroundBase, Image } from "react-native";
import axios from 'axios';
import { API_URL } from '@env';
import { getDataUser, removeDataUser } from '../utilities/localStorage';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Badge } from 'react-native-paper';
import Catalogue from '../components/Catalogue';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';


export default function ProfilePage({ navigation, isLog, getLogState, isSubscribe, getSubState }) {
    const [userInfos, setUserInfos] = useState();
    const [mangaFavoris, setMangaFavoris] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [historyReadChapters, setHistoryReadChapters] = useState([]);

    //Load favoris every time go to this screen
    useFocusEffect(
        useCallback(() => {
            getMangasFavoris();
            getHistoryReadChapters();
        }, [])
    );
    const getMangasFavoris = async () => {
        setIsLoading(true);
        const { userPseudo } = await getDataUser();
        const response = await axios.get(API_URL + `/user/${userPseudo}/mangas/favoris`);
        setMangaFavoris(response.data.mangaFavoris);
        setIsLoading(false);
    }
    const getHistoryReadChapters = async () => {
        setIsLoading(true);
        const { userPseudo } = await getDataUser();
        const response = await axios.get(`${API_URL}/reporting/user/${userPseudo}/history/manga`);
        setHistoryReadChapters(response.data.historyUser);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserInfos();
    }, [])

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
                    <ImageBackground source={{ uri: "https://c4.wallpaperflare.com/wallpaper/965/883/624/manga-one-piece-wallpaper-preview.jpg" }} resizeMode='cover' style={{ height: 164 }}>
                        <TouchableOpacity
                            style={{ margin: 20 }}
                            underlayColor='#fff' onPress={() => navigation.navigate("TabNavigator", { screen: 'Home', merge: true })}
                        >
                            <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: 119, left: 14 }}>
                            <Image source={{ uri: userInfos?.profilepicture }}
                                style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                            <View style={{ position: 'absolute', left: 50, top: 10 }}>
                                {isSubscribe ? <Image source={require("../assets/Verified.png")}
                                                      style={{width : 26, height : 26 }}/> : null }
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <View style={styles.menuButton}>
                                <Icon name={"settings"} color={"#333"} size={22} onPress={() => navigation.navigate('Settings')} />
                            </View>
                            <TouchableOpacity style={{ borderRadius: 25, padding: 6, backgroundColor: '#F2BB13', width: 96 }} onPress={() => navigation.navigate('Subscribe')}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: '700', textAlign:'center' }}>{isSubscribe ? "Mon abonnement" : "Passer Premium"}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ marginTop: 35 }}>
                            <Text style={{ fontWeight: '700', fontSize: 22 }}>Vos mangas favoris</Text>
                            <View style={{ marginTop: 15 }}>
                                {
                                    isLoading
                                        ? (<ActivityIndicator style={{ flex: 1 }} />)
                                        : (<Catalogue navigation={navigation} catalogue={mangaFavoris} pageName="Home" widthMangaItem="large" />)
                                }

                            </View>

                        </View>

                        <View style={{ marginTop: 35 }}>
                            <Text style={{ fontWeight: '700', fontSize: 22 }}>Vos mangas lus</Text>
                            <View style={{ marginTop: 15 }}>
                                {
                                    isLoading
                                        ? (<ActivityIndicator style={{ flex: 1 }} />)
                                        : (<Catalogue navigation={navigation} catalogue={historyReadChapters} pageName="Home" widthMangaItem="small" direction={"vertical"}/>)
                                }
                                
                            </View>

                        </View>

                    </View>


                </View>
            </ScrollView>            


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    blockUser: {
        marginTop: 5

    },
    menu: {
        marginTop: 30
    },
    logoutBtn: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 3,
        padding: 10,
        backgroundColor: '#EA5F5F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold'
    },
    menuButton: {
        marginRight: 30,
        padding: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 15,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 2,
        shadowColor: '#333',
        shadowOpacity: 0.1,
    }
})
