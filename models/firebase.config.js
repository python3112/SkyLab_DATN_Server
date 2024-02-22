// Import the functions you need from the SDKs you need
const {initializeApp , getApps} = require("firebase/app");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQTaVbsAvnb1KWVl1HlhoOum8YwcbEbZE",
  authDomain: "skylap-md03.firebaseapp.com",
  projectId: "skylap-md03",
  storageBucket: "skylap-md03.appspot.com",
  messagingSenderId: "206926809191",
  appId: "1:206926809191:web:e8dc6a3da11ea129b4ecc2",
  measurementId: "G-TSY3SXB2F5"
};

// Initialize Firebase


const app = async() =>{
    try {
        await initializeApp(firebaseConfig);
        console.log('kết nối thành công firebase')
    } catch (error) {
        console.log('kết nối firebase thất bại')
    }
}



module.exports = {app} ;