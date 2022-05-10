import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const HeaderNavigator = (props) => {
  return (
    <View style={styles.headerStyle}>
        <Text style={styles.textHeader}>{props.title}</Text>
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
  textHeader:{
    fontSize: 20, 
    fontWeight: "bold", 
    color: "black", 
  },
  headerStyle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default HeaderNavigator;