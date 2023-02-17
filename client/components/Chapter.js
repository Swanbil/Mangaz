import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { API_URL } from '@env';
import { getDataUser } from '../utilities/localStorage';
import Carousel from "react-native-reanimated-carousel";

export default function Chapter({ route, navigation }) {
  const [pages, setPages] = useState([]);
  const [selectPageItems, setSelectPageItems] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [numberPageRead, setNumberPageRead] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserHistorySaved, setIsUserHistorySaved] = useState(false);

  const { chapterNumber, mangaTitle } = route.params;
  const NUMBER_PAGE_TO_READ = 10;

  useEffect(() => {
    getPagesOfChapter();
  }, [chapterNumber]);

  const getPagesOfChapter = async () => {
    const response = await axios.get(API_URL + `/manga/${mangaTitle}/chapter/${chapterNumber}`);
    setPages(response.data.pages);
    setSelectPageItems(response.data.pages.map((page, index) => { return { label: 'Page ' + page.pageNumber, value: index } }));
    setCurrentPage(response.data.pages[0]);
  }

  
  const isUserHistoryCanBeSaved = () => {
    if (numberPageRead > NUMBER_PAGE_TO_READ && !isUserHistorySaved) {
      return true
    }
    return false;
  }

  const saveUserHistoryChapterRead = async () => {
    if (isUserHistoryCanBeSaved()) {
      const { userPseudo } = await getDataUser();
      const payload = {
        userPseudo: userPseudo, //store user pseudo
        chapterNumber: chapterNumber,
        mangaName: mangaTitle
      };
      console.log("Saving user history", payload);
      await axios.post(API_URL + `/chapter/history/save`, payload);
      setIsUserHistorySaved(true)
    }
  }

  const selectPage = (value) => {
    setCurrentIndex(value)
    setCurrentPage(pages[value]);
  }
  const swipePage = (value) => {
    setCurrentPage(pages[value]);
    setCurrentIndex(value)
    if (value > numberPageRead) {
      setNumberPageRead(prevState => prevState + 1);
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
        <Carousel
          width={320}
          height={530}
          data={pages}
          scrollAnimationDuration={500}
          defaultIndex={currentIndex}
          loop={false}
          onSnapToItem={(index) => swipePage(index)}
          onScrollEnd={() => saveUserHistoryChapterRead()}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Image source={{ uri: pages[index]?.source }} style={{ width: 320, height: 530 }} />
            </View>
          )}
        />

        <View style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}>

          <RNPickerSelect
            onValueChange={(value) => selectPage(value)}
            items={selectPageItems}
            value={currentIndex}
            placeholder={{ label: "Select page", value: null }}
            style={{
              ...pickerSelectStyles, iconContainer: {
                top: 10,
                right: 12,
              }
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Ionicons name="chevron-down-outline" size={16} color="black" />;
            }}
          />
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
    fontStyle: 'italic',
    textAlign: 'center',
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
    fontStyle: 'italic',
    textAlign: 'center',
    paddingRight: 30,
  },
});