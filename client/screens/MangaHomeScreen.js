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
    const [isLoading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getCatalogue();
            getRecommandations()
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <ImageBackground source={{ uri: "https://leclaireur.fnac.com/wp-content/uploads/2023/01/jujutsu-header.jpg" }} resizeMode="cover" blurRadius={10} >
                        <View style={{ padding: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{padding:8, backgroundColor:'#EEEEEE', borderRadius:25, flexDirection:'row', alignItems:'center'}} onPress={() => navigation.navigate('Search')}>
                                    <Icon name={"search"} size={18} color={''} />
                                    <Text style={{marginLeft:5}}>Search Mangas</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 10 }}>
                                    <Image source={{ uri: "https://img.wattpad.com/6d13c0a6090e0e3b8851180426edf247b461205f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f376a68464955746e42735a3750773d3d2d3937393137353136322e313634356663326464396631393063383933353132383638303036322e6a7067?s=fit&w=720&h=720" }}
                                        style={{ width: 79, height: 79, borderRadius: 50, borderWidth: 2, borderColor: '#333' }} />
                                    <View style={{ position: 'absolute', left: 64, top: 6 }}>
                                        <Badge style={{ color: "white", fontWeight: "bold", backgroundColor: (isSubscribe ? "#9CE594" : "#FFCA68") }}>{isSubscribe ? "V" : "Free"}</Badge>
                                    </View>
                                </View>


                            </View>
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }}>Recommandation</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <View>
                                        <Image source={{ uri: recommandations[0]?.coverImage }} style={{ width: 132, height: 175, borderRadius: 12 }} />
                                    </View>
                                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                            <Text style={{ fontWeight: '700', fontSize: 16, letterSpacing: -0.33, color: 'white' }}>{recommandations[0]?.titleName}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                                <Icon name={"star"} color={"yellow"} size={22} />
                                                <Text style={{ fontWeight: '500', fontSize: 12, letterSpacing: -0.33, color: 'white', marginLeft: 5 }}>{recommandations[0]?.rate}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: '300', fontSize: 13, letterSpacing: -0.33, color: 'white' }}>{recommandations[0]?.genre}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>

                        </View>

                    </ImageBackground>
                </View>

                <View style={{ padding: 20 }}>
                    <View>
                        <Text style={{ fontWeight: '700', fontSize: 22 }}>Catalogue</Text>
                        <View style={{ marginTop: 15 }}>
                            <Catalogue navigation={navigation} catalogue={catalogue} pageName="Home" widthMangaItem="large" />
                        </View>

                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontWeight: '700', fontSize: 22 }}>Recommandations</Text>
                        <View style={{ marginTop: 15 }}>
                            <Catalogue navigation={navigation} catalogue={recommandations} pageName="Home" widthMangaItem="large" />
                        </View>
                    </View>

                </View>

            </ScrollView>


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