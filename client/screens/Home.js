import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Catalogue from "../components/Catalogue";
import { API_URL } from '@env';

export default function Home({ navigation, route, isLog }) {
  useEffect(() => {
    if (route.params?.userName) {
    }
  }, [route.params?.userName]);

  if (isLog) {
    return (
      <View style={styles.container}>
        {route.params?.userName && <Text style={{ margin: 10, fontWeight: "bold" }}>⛩ Hello <Text style={{ color: "#C0A6F7" }}>{route.params?.userName}</Text> ⛩ </Text>}
        <Catalogue navigation={navigation}></Catalogue>
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