import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import Catalogue from "../components/Catalogue";
import { API_URL } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { getDataUser } from '../utilities/localStorage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Searchbar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserProfile from '../components/UserProfile';

export default function Home({ navigation, route, isLog, isSubscribe }) {
  const [catalogue, setCatalogue] = useState([]);
  const [recommandations, setRecommandations] = useState([]);
  const [filteredCatalogue, setFilteredCatalogue] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState();
  const [genres, setGenres] = useState([{ label: "Action", value: 1 }, { label: "Adventure", value: 2 }]);

  const [isLoading, setLoading] = useState(false);
  const [userInfos, setUserInfos] = useState();

  useFocusEffect(
    useCallback(() => {
      getCatalogue();
      getRecommandations()
    }, [])
  );

  useEffect(() => {
    getUserInfos();
  }, []);

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


  const getCatalogue = async () => {
    setLoading(true);
    const userData = await getDataUser();
    if (userData) {
      const userPseudo = userData.userPseudo;
      try {
        const response = await axios.get(API_URL + `/manga/catalogue/${userPseudo}`);
        const data = response.data;
        setCatalogue(data);
        setFilteredCatalogue(data);
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

  const onSearchingManga = (value) => {
    const valueLowerCase = value.toLowerCase();
    setSearchQuery(value);
    if (value.length < 2) {
      setFilteredCatalogue(catalogue);  //if no more thant two char in text search => reset catalogue to all mangas
      return;
    }
    setFilteredCatalogue(catalogue.filter((manga) => manga.titleName.toLowerCase().includes(valueLowerCase) || manga.technicalName.toLowerCase().includes(valueLowerCase)));
  }

  const onSelectGenre = (value) => {
    if (!value) {
      setFilteredCatalogue(catalogue);  //if no more thant two char in text search => reset catalogue to all mangas
      return;
    }
    const valueLowerCase = genres.find((genre) => genre.value === value).label.toLowerCase();
    console.log(valueLowerCase)
    setFilteredCatalogue(catalogue.filter((manga) => manga.genre?.toLowerCase().includes(valueLowerCase)));
  }

  if (isLog) {
    return (
      <View style={styles.container}>
        <ScrollView >
          {isLoading
            ? <ActivityIndicator style={{ flex: 1 }} />
            : (
              <>
                <UserProfile userInfos={userInfos} navigation={navigation} isSubscribe={isSubscribe}/>
                {/* <View style={{ alignItems: 'flex-end', marginTop: 10, paddingRight: 8 }}>
                  <Searchbar
                    placeholder="Search"
                    onChangeText={(value) => onSearchingManga(value)}
                    value={searchQuery}
                    style={{ width: 170, height: 25 }}
                    iconColor='#333'
                  />
                  <RNPickerSelect
                    onValueChange={(value) => onSelectGenre(value)}
                    items={genres}
                    value={selectedGenre}
                    placeholder={{ label: "Sort", value: null }}
                    style={{
                      ...pickerSelectStyles, iconContainer: {
                        top: 5,
                        right: 12,
                      }
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                      return <Ionicons name="chevron-down-outline" size={16} color="black" />;
                    }}
                  />
                </View> */}
                <View style={{ padding: 8 }}>
                  <View style={styles.pageTitleContainer}>
                    <Icon name={"book-open"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>Catalogue</Text>
                  </View>
                  <View style={{ backgroundColor: '#FAFAFA', marginTop: 5 }}>
                    <Catalogue navigation={navigation} catalogue={filteredCatalogue} pageName="Home" widthMangaItem="large" />
                  </View>

                </View>
                <View style={{ marginTop: 8, padding: 8 }}>
                  <View style={styles.pageTitleContainer}>
                    <Icon name={"hand-holding-heart"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>For you</Text>
                  </View>
                  <View style={{ backgroundColor: '#FAFAFA', marginTop: 5 }}>
                    <Catalogue navigation={navigation} catalogue={recommandations} pageName="Home" widthMangaItem="large" />
                  </View>
                </View>

              </>

            )
          }

        </ScrollView>
      </View>

    );
  }
  else {
    return (
      <View style={styles.container2}>
        <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: "bold", color: "#C0A6F7" }}>Welcome on Mangaz</Text>
        <Image source={require('../assets/luffy.jpg')} style={{ width: 200, height: 200 }} />

        <Text style={{ fontSize: 12, color: "#292929", padding: 10, textAlign: 'center' }}>Login to your account to enjoy our many mangas of our catalogue</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          underlayColor='#fff'>
          <Text style={styles.textButton}>Go To Login Page </Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:10
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  pageTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C0A6F7",
    borderBottomWidth: 3,
    width: "48%",
    paddingBottom: 6
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    color: '#B7B7B7',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingRight: 30,
    height: 25
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 4,
    color: '#B7B7B7',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingRight: 30,
    height: 25,
  },
});