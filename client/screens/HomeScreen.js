import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import Catalogue from "../components/Catalogue";
import { API_URL } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { getDataUser } from '../utilities/localStorage';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Home({ navigation, route, isLog }) {
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

  if (isLog) {
    return (
      <View style={styles.container}>
        <ScrollView >
          {isLoading
            ? <ActivityIndicator style={{ flex: 1 }} />
            : (
              <>
                <View style={{ marginTop: 20, padding: 8 }}>
                  <View style={styles.pageTitleContainer}>
                    <Icon name={"hand-holding-heart"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>For you</Text>
                  </View>
                  <View style={{ backgroundColor: '#FAFAFA', marginTop: 5 }}>
                    <Catalogue navigation={navigation} catalogue={recommandations} pageName="Home" widthMangaItem="large" />
                  </View>
                </View>
                <View style={{ marginTop: 20, padding: 8 }}>
                  <View style={styles.pageTitleContainer}>
                    <Icon name={"book-open"} color={"#333"} size={20} />
                    <Text style={styles.pageTitle}>Catalogue</Text>
                  </View>
                  <View style={{ backgroundColor: '#FAFAFA', marginTop: 5 }}>
                    <Catalogue navigation={navigation} catalogue={catalogue} pageName="Home" widthMangaItem="large" />
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
    alignItems: 'center',
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