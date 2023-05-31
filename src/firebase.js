// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASdekLdhT_TiD64nQHdAM2DYtJN8XU9eU",
    authDomain: "amine-shop.firebaseapp.com",
    databaseURL: "https://amine-shop-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "amine-shop",
    storageBucket: "amine-shop.appspot.com",
    messagingSenderId: "350948814464",
    appId: "1:350948814464:web:2d5025c906577969110065"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;