import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDataUser(){
    try {
        let userData = await AsyncStorage.getItem('@userData');
        userData = JSON.parse(userData);
        return userData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function storeDataUser(data){
    try {
        await AsyncStorage.setItem('@userData', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

export async function removeDataUser(){
    try {
        await AsyncStorage.removeItem('@userData');
    } catch (error) {
        console.log(error);
    }
}