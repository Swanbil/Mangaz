import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { getDataUser } from './utilities/localStorage';
import { API_URL } from '@env';
import axios from 'axios';

global.Buffer = require('buffer').Buffer;

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
<<<<<<< HEAD
        let userData = await getDataUser();
        console.log("USER CRED", userData);
        if (userData) {
          const response = await axios.get(`${API_URL}/user/${userData.userPseudo}/subscription/me`);
          setIsLogedIn(true);
          setIsSubscribe(response.data.active)
        }
=======
        // let userData = await getDataUser();
        // console.log("USER CRED", userData);
        // if (userData) {
        //   setIsLogedIn(true);
        //   setSubState(userData);
        //}
        setAppIsReady(true);
>>>>>>> 8445147853f68511ef19d6c7362e36aca7eb0a45

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

<<<<<<< HEAD
=======
  const setSubState = (data) => {
    let dateNow = new Date();
    if ((data.endedDateSubscription && new Date(data.endedDateSubscription).valueOf() > dateNow.valueOf()) || data === true) {
      setIsSubscribe(true);
      return
    }
    setIsSubscribe(false);
  }

>>>>>>> 8445147853f68511ef19d6c7362e36aca7eb0a45
  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <AppNavigator isLogedIn={isLogedIn} getLogState={getLogState} isSubscribe={isSubscribe} getSubState={setIsSubscribe} />
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
