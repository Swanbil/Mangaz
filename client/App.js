import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const userInfos = await AsyncStorage.getItem('@username');
        console.log("USER CRED", userInfos);
        if (userInfos) {
          setIsLogedIn(true);
        }

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const getLogState = (data) => {
    setIsLogedIn(data);
  }
 

  if (!appIsReady) {
    return null;
  }
  return (
      <NavigationContainer>
        <AppNavigator isLogedIn={isLogedIn} getLogState={getLogState} />
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
