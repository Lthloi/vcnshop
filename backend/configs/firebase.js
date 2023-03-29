
import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA7_kAvn75_9Q_05KzedmPMR41je5QXvtY",
    authDomain: "vcn-shop.firebaseapp.com",
    projectId: "vcn-shop",
    storageBucket: "vcn-shop.appspot.com",
    messagingSenderId: "897012060645",
    appId: "1:897012060645:web:f9ef51df645695e628df0c",
    measurementId: "G-N0TZ2W3BXH"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export default storage