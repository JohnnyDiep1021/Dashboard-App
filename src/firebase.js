import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: `${process.env.FIREBASE_APIKEY}`,
//   authDomain: "netflix-76544.firebaseapp.com",
//   projectId: "netflix-76544",
//   storageBucket: "netflix-76544.appspot.com",
//   messagingSenderId: "107461363030",
//   appId: "1:107461363030:web:f97ae48525b10fa813c2f7",
//   measurementId: "G-8WVNWTT9J7",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCCVN8DgNr7ImB5OunWFE_5R-QurVkXjJc",
  authDomain: "netflix-dashboard-app.firebaseapp.com",
  projectId: "netflix-dashboard-app",
  storageBucket: "netflix-dashboard-app.appspot.com",
  messagingSenderId: "895939683815",
  appId: "1:895939683815:web:f40a75edb7904adc608942",
  measurementId: "G-HN10DEKTLE",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
