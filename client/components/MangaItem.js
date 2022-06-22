import React, { useState, useEffect } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { View, ScrollView, Text, FlatList } from "react-native";
import { Link } from '@react-navigation/native';

const MangaItem = ({ navigation, manga, width }) => {
    const [cardWidth, setCardWidth] = useState(width == "large" ? "100%" : "30%");
    const chapters = [{ number: "1", title:"A l'aventure !" }, { number: "2", title:"A l'aventure !" }, { number: "3", title:"A l'aventure !" }, { number: "4", title:"A l'aventure !" }, { number: "5", title:"A l'aventure !" }, { number: "6", title:"A l'aventure !" }, { number: "7", title:"A l'aventure !" }, { number: "8", title:"A l'aventure !" }, { number: "9", title:"A l'aventure !" }];
    const goToMangaPage = () => {
        navigation.navigate('MangaPage', { manga, width: "large" })
    }
    if (cardWidth == "30%") {
        return (
            <View style={{ width: cardWidth, marginBottom: 20, marginRight: 10, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card >
                    <Card.Content style={{ textAlign: "center", height: 100 }}>
                        <Title style={{ fontSize: 10 }} onPress={goToMangaPage}>{manga.title}</Title>
                        <Paragraph style={{ fontSize: 5 }}>{manga.startDate}</Paragraph>
                    </Card.Content>
                    <Card.Cover width={cardWidth} source={{ uri: manga.coverImage }} />
                </Card>
            </View>

        )
    }
    else {
        return (
            <ScrollView style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card style={{ marginRight: 20, marginLeft: 20 }}>
                    <Card.Title title={manga.title} subtitle={manga.startDate}/>
                    <Card.Cover source={{ uri: manga.coverImage }} style={{ width: cardWidth, height: 300 }} />
                    <Card.Content>
                        <Text style={{ fontWeight: "bold", marginBottom:10, marginTop:10, color: "#C0A6F7"}}>Description</Text>
                        <Paragraph style={{ fontSize: 10 }}>{manga.synopsis}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Text style={{ fontWeight: "bold", marginBottom:10, marginTop:10, color: "#C0A6F7"}}>Chapters</Text>
                        {chapters.map((chapter) => {
                            return(
                                <Text key={chapter.number} style={{marginBottom:5, backgroundColor:"#F5F5F5", padding:4, fontStyle:"italic"}}>{chapter.number} - {chapter.title}</Text>
                            )
                        })}
                    </Card.Content>
                </Card>
            </ScrollView>

        )
    }

}

export default MangaItem;