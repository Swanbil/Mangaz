import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import {API_URL} from '@env';


export default function Chapter({ route, navigation }) {
  const [chapter, setChapter] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [numberCurrentPage, setNumberCurrentPage] = useState(0);
  const { chapterNumber, mangaTitle } = route.params;
 
  useEffect(() => {
    const getChapter = async () => {
      const res = await axios.get(API_URL + '/chapter/' + mangaTitle + '/' + chapterNumber);
      setChapter(res.data);
      setCurrentPage(res.data[0]);
      setNumberCurrentPage(0)
    }
    getChapter();
  }, []);

  const goPreviousPage = () => {
    const currentIndex = chapter.findIndex((page) => {return page.uri == currentPage.uri});
    if(currentIndex>0){
      setCurrentPage(chapter[currentIndex - 1]);
      setNumberCurrentPage(currentIndex - 1);
    }
  }
  const goNextPage = () => {
    const currentIndex = chapter.findIndex((page) => {return page.uri == currentPage.uri});
    if(currentIndex<chapter.length-1){
      setCurrentPage(chapter[currentIndex + 1]);
      setNumberCurrentPage(currentIndex + 1);
    }
  }
  return (
    <View>
      <TouchableOpacity
        style={{ margin: 20 }}
        underlayColor='#fff' onPress={() => navigation.goBack()}
      >
        <AntDesign name="leftcircleo" size={26} color="#C0A6F7" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image source={currentPage} style={{ width: 320, height: 530 }} />
        <View style={{
          flexDirection: "row",
          marginTop:10,
          alignItems:"center",
        }}>
          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginRight: 100}}
            onPress={goPreviousPage}>
            <Ionicons name="ios-arrow-back-circle" color="#C0A6F7" size={36} />
          </TouchableOpacity>
          <Text style={{fontWeight:"bold"}}>Page {numberCurrentPage}</Text>
          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginLeft: 100}}
            onPress={goNextPage}>
            <Ionicons name="ios-arrow-forward-circle" color="#C0A6F7" size={36} />
          </TouchableOpacity>
        
         </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#C0A6F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});