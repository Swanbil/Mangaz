import React, { useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, ScrollView, Text, StyleSheet } from "react-native";

const MangaItem = ({ navigation, manga, width, chapters }) => {
    const [cardWidth, setCardWidth] = useState(width == "large" ? "100%" : "30%");
    
    
    const goToMangaPage = () => {
        navigation.navigate('MangaPage', { manga, width: "large"})
    }

    const goToChapter = (chapterNumber) => {
        navigation.navigate('Chapter', {chapterNumber:chapterNumber, mangaTitle:manga.technicalName});
    }

    if (cardWidth == "30%") {
        return (
            <View style={{ width: cardWidth, marginBottom: 20, marginRight: 10, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
                <Card >
                    <Card.Content style={{ textAlign: "center", height: 100 }}>
                        <Title style={{ fontSize: 10 }} onPress={goToMangaPage}>{manga.titleName}</Title>
                        <Paragraph style={{ fontSize: 5 }}>{manga.createdDate}</Paragraph>
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
                    <Card.Title title={manga.titleName} subtitle={(manga.createdDate !== null) ? manga.createdDate.split('-')[0] : ''} />
                    <Card.Cover source={{ uri: manga.coverImage }} style={{ width: cardWidth, height: 300 }} />
                    <Card.Content>
                        <Text style={styles.cardSubtitle}>Description</Text>
                        <Paragraph style={{ fontSize: 10 }}>{manga.description}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Text style={styles.cardSubtitle}>Chapters</Text>
                        <View>
                            {chapters.map((chapter) => {
                                return (
                                    <Text key={chapter.number} style={styles.chapter} onPress={goToChapter.bind(this,chapter.number)}>{chapter.number} - {chapter.title}</Text>
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
    chapter:{ marginBottom: 5, backgroundColor: "#F5F5F5", padding: 4, fontStyle: "italic" },
        
    
})
export default MangaItem;