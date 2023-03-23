import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from "axios";
import { API_URL } from '@env';
import { List } from 'react-native-paper';

export default function History({ isLog, navigation, route }) {
    const [historyReadChapters, setHistoryReadChapters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (route.params?.userInfos) {
            getHistoryReadChapters()
        }
    }, [route.params?.userInfos]);

    const getHistoryReadChapters = async () => {
        setIsLoading(true);
        const userPseudo = route.params?.userInfos.pseudo;
        const response = await axios.get(`${API_URL}/reporting/user/${userPseudo}/history/manga`);
        setHistoryReadChapters(response.data.historyUser);
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ margin: 20 }}
                underlayColor='#fff' onPress={() => navigation.goBack()}
            >
                <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
            </TouchableOpacity>

            <View style={styles.historyContainer}>
                <View style={styles.pageTitleContainer}>
                    <Icon name={"history"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>Vos mangas lus</Text>
                </View>

                <ScrollView style={styles.chapterContainer}>
                    {isLoading
                        ? <ActivityIndicator style={{ flex: 1 }}/>
                        : (
                            historyReadChapters?.map((chapter, index) => (
                                <List.Item
                                    key={index}
                                    title={"Chapter " + chapter.number + ' - ' + chapter.title}
                                    titleStyle={styles.titleListItem}
                                    description={chapter.titleName}
                                    left={props => <List.Icon {...props} icon="book" style={{ marginLeft: 0, backgroundColor: '#333', borderRadius: 50 }} color="#C0A6F7" />}
                                    style={{ borderBottomColor: 'grey', borderBottomWidth: .5 }}
                                />
                            ))
                        )
                    }

                </ScrollView>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    historyContainer: {
        padding: 20,
        height: "100%"
    },
    pageTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#C0A6F7",
        borderBottomWidth: 3,
        width: "38%",
        paddingBottom: 6
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5
    },
    chapterContainer: {
        marginTop: 10,
    },
    titleListItem: {
        fontWeight: "500",
        color: "black",
        fontStyle: 'italic',
        textDecorationStyle: 'dotted'
    }
})