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

export default function Home({ navigation, route, isLog, isSubscribe, getLogState, getSubState  }) {
  const [historyReadChapters, setHistoryReadChapters] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [userInfos, setUserInfos] = useState();
  const [userStats, setUserStats] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHistoryReadChapters();
    }, [])
  );

  useEffect(() => {
    getUserInfos();
    getUserStats()
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

  const getUserStats = async () => {
    const { userPseudo } = await getDataUser();
    if (userPseudo) {
      try {
        const response = await axios.get(`${API_URL}/user/${userPseudo}/stats`);
        setUserStats(response.data);
      } catch (error) {
        console.log(error);
      }
    }

  }

  const getHistoryReadChapters = async () => {
    setLoading(true);
    const userData = await getDataUser();
    if (userData) {
      const userPseudo = userData.userPseudo;
      try {
        const response = await axios.get(`${API_URL}/reporting/user/${userPseudo}/history/manga`);
        setHistoryReadChapters(response.data.historyUser);
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
            ? <ActivityIndicator style={{ flex: 1, justifyContent:'center', alignItems:'center' }} />
            : (
              <>
                <UserProfile userInfos={userInfos} navigation={navigation} isLog={isLog} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={getSubState} stats={userStats}/>
                <View style={{ padding: 15 }}>

                  <View style={{ ...styles.shadowProp, ...styles.blockHome, ...{ backgroundColor: "#D1F1FF" } }}>
                    <Text style={styles.titleBlockHome}>Continue to read</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                      <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: historyReadChapters[0]?.coverImage }} style={styles.imageBlock} />
                        <Text style={styles.subTitleBlock}>{historyReadChapters[0]?.titleName}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: historyReadChapters[1]?.coverImage }} style={styles.imageBlock} />
                        <Text style={styles.subTitleBlock}>{historyReadChapters[1]?.titleName}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ ...styles.shadowProp, ...styles.blockHome, ...{ backgroundColor: "#FFD4D1", marginTop: 10 } }}>
                    <Text style={styles.titleBlockHome}>Yours NFT</Text>
                    <View>

                    </View>
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
    paddingTop: 10
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  blockHome: {
    padding: 12,
    borderRadius: 12
  },
  titleBlockHome: {
    fontSize: 24,
    fontWeight: "700",
    color: "#171717"

  },
  imageBlock: {
    width: 128, height: 190, borderRadius: 12

  },
  subTitleBlock: {
    fontSize: 14, fontWeight: '500', marginTop: 6

  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 7, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
