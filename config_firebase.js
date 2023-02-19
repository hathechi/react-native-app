// import firebase from 'firebase'
// import 'firebase/compat/auth'
import axios from "axios";
export const firebaseConfig = {
    apiKey: "AIzaSyDU-c1Uvs0OaKUfMRpsp3wCJHsbcVdi1Vo",
    authDomain: "react-native-app-a822b.firebaseapp.com",
    projectId: "react-native-app-a822b",
    storageBucket: "react-native-app-a822b.appspot.com",
    messagingSenderId: "769578937961",
    appId: "1:769578937961:web:ac9a7381071de25a163cf8"
};
export const convertUriToBlob = async (uri) => {
    try {
        console.log("uri".uri);
        const response = await axios.get(uri, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return null;
    }
};