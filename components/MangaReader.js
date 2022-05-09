import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MangaReader({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>MangaReader</Text>
      <Image source={require('../assets/scan_test.jpg')} style={{ width: 300, height: 450 }} />
      <View style={{
        flexDirection: "row",
      }}>
        <TouchableOpacity
          underlayColor='#fff'
          style={{marginRight: 150}}>
          <Ionicons name="ios-arrow-back-circle" color="#C0A6F7" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor='#fff'
          style={{alignSelf: 'flex-end'}}>
          <Ionicons name="ios-arrow-forward-circle" color="#C0A6F7" size={32} />
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        underlayColor='#fff'>
        <Text style={styles.textButton}>Go To MangaReader</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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