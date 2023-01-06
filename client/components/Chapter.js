import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { API_URL } from '@env';
import { getDataUser } from '../utilities/localStorage';

export default function Chapter({ route, navigation }) {
  const [pages, setPages] = useState([]);
  const [selectPageItems, setSelectPageItems] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [numberPageRead, setNumberPageRead] = useState(0);
  const [isUserHistorySaved, setUserHistorySaved] = useState(false);

  const { chapterNumber, mangaTitle } = route.params;

  useEffect(() => {
    getPagesOfChapter();
  }, [chapterNumber]);

  const getPagesOfChapter = async () => {
    const response = await axios.get(API_URL + `/manga/${mangaTitle}/chapter/${chapterNumber}`);
    setPages(response.data.pages);
    setSelectPageItems(response.data.pages.map((page, index) => {return {label : 'Page ' + page.pageNumber, value : index }}));
    setCurrentPage(response.data.pages[0]);
  }

  const saveUserHistoryChapterRead = async () => {
    const { userPseudo } = await getDataUser();
    const payload = {
      userPseudo: userPseudo, //store user pseudo
      chapterNumber: chapterNumber,
      mangaName: mangaTitle
    };
    console.log("Saving user history", payload);
    await axios.post(API_URL + `/chapter/history/save`, payload);
    setUserHistorySaved(true)
  }

  const goPreviousPage = () => {
    const currentIndex = pages.findIndex((page) => { return page.idPage == currentPage.idPage });
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1]);
    }
  }
  const goNextPage = async () => {
    const currentIndex = pages.findIndex((page) => { return page.idPage == currentPage.idPage });
    if (currentIndex < pages.length) {
      setCurrentPage(pages[currentIndex + 1]);
      setNumberPageRead(state => state + 1);
    }
    if (numberPageRead === 8 && !isUserHistorySaved) {    //saving user history if 5 page is read
      await saveUserHistoryChapterRead();
    }
  }
  const changePange = (value) => {
    setCurrentPage(pages[value]);
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
        <Image source={{ uri: currentPage?.source }} style={{ width: 320, height: 530 }} />
        <View style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}>
          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginRight: 80, opacity: ((currentPage?.pageNumber === "1") ? 0.5 : 1) }}
            onPress={goPreviousPage}
            disabled={currentPage?.pageNumber === "1"}
          >
            <Ionicons name="ios-arrow-back-circle" color="#C0A6F7" size={36} />
          </TouchableOpacity>

          <RNPickerSelect
            onValueChange={(value) => changePange(value)}
            items={selectPageItems}
            placeholder={{ label: "Select page", value: null }}
            style={{...pickerSelectStyles, iconContainer: {
              top: 10,
              right: 12,
            }}}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Ionicons name="chevron-down-outline" size={16} color="black" />;
            }}
          />

          <TouchableOpacity
            underlayColor='#fff'
            style={{ marginLeft: 80, opacity: ((parseInt(currentPage?.pageNumber) === pages.length) ? 0.5 : 1) }}
            onPress={goNextPage}
            disabled={(parseInt(currentPage?.pageNumber) === pages.length)}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    color: '#B7B7B7',
    fontStyle:'italic',
    textAlign:'center',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    color: '#B7B7B7',
    fontStyle:'italic',
    textAlign:'center',
    paddingRight: 30,
  },
});