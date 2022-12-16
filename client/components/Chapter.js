import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Chapter({ route, navigation }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [numberPageRead, setNumberPageRead] = useState(0);
  const [isUserHistorySaved, setUserHistorySaved] = useState(false);

  const { chapterNumber, mangaTitle } = route.params;
 
  useEffect(() => {
    getPagesOfChapter();
  }, [chapterNumber]);

  const getDataUserPseudo = async () => {
    try {
        const userPseudo =  await AsyncStorage.getItem('@username');
        return userPseudo;
    } catch (error) {
        alert(error)
    }
};

  const getPagesOfChapter = async () => {
    const response = await axios.get(API_URL + `/manga/${mangaTitle}/chapter/${chapterNumber}`);
    setPages(response.data.pages);
    setCurrentPage(response.data.pages[0]);
  }

  const saveUserHistoryChapterRead = async () => {
    const userPseudo = await getDataUserPseudo('@username');
    console.log(userPseudo)
    const payload = {
      userPseudo : userPseudo, //store user pseudo
      chapterNumber : chapterNumber,
      mangaName : mangaTitle
    };
    console.log("Saving user history", payload);
    await axios.post(API_URL + `/chapter/history/save`, payload);
    setUserHistorySaved(true)
  }

  const goPreviousPage = () => {
    const currentIndex = pages.findIndex((page) => {return page.idPage == currentPage.idPage});
    if(currentIndex>0){
      setCurrentPage(pages[currentIndex - 1]);
    }
  }
  const goNextPage = async() => {
    const currentIndex = pages.findIndex((page) => {return page.idPage == currentPage.idPage});
    if(currentIndex<pages.length){
      setCurrentPage(pages[currentIndex + 1]);
      setNumberPageRead(state => state + 1);
    }
    if(numberPageRead === 8 && !isUserHistorySaved){    //saving user history if 5 page is read
      await saveUserHistoryChapterRead();
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
        <Image source={{uri : currentPage.source}} style={{ width: 320, height: 530 }} />
        <View style={{
          flexDirection: "row",
          marginTop:10,
          alignItems:"center",
        }}>
          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginRight: 100, opacity : ((currentPage.pageNumber === "1") ? 0.5 : 1)}}
            onPress={goPreviousPage}
            disabled={currentPage.pageNumber === "1"}
            >
            <Ionicons name="ios-arrow-back-circle" color="#C0A6F7" size={36} />
          </TouchableOpacity>
          <Text style={{fontWeight:"bold"}}>Page {currentPage.pageNumber}</Text>
          
          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginLeft: 100, opacity : ((parseInt(currentPage.pageNumber) === pages.length) ? 0.5 : 1)}}
            onPress={goNextPage}
            disabled={(parseInt(currentPage.pageNumber) === pages.length)}
            >
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