import React from "react";
import {  Card, Title, Paragraph } from 'react-native-paper';
import { View } from "react-native";

const MangaItem = ({ manga }) => {
    return (
        <View style={{ width:"30%", marginBottom:20, marginRight:10,boxShadow:"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
            <Card >
                <Card.Content style={{textAlign:"center", height:100}}>
                    <Title style={{fontSize:10}}>{manga.title}</Title>
                    <Paragraph style={{fontSize:5}}>{manga.startDate}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: manga.coverImage }} />
            </Card>
        </View>

    )
}

export default MangaItem;