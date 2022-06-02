import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import MangaReader from './components/MangaReader';
import TabsNavigator from './components/TabNavigator';
import AppNavigator from './components/AppNavigator';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <AppNavigator />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
