import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_apiKey,
// 	authDomain: process.env.REACT_APP_authDomain,
// 	projectId: process.env.REACT_APP_projectId,
// 	storageBucket: process.env.REACT_APP_storageBucket,
// 	messagingSenderId: process.env.REACT_APP_messagingSenderId,
// 	appId: process.env.REACT_APP_appId,
// };

const firebaseConfig = {
	apiKey: "AIzaSyBMdGKLU0ZTsBu1Epv6g9RgT15DMPsng7I",
	authDomain: "bd-doctors-portal.firebaseapp.com",
	projectId: "bd-doctors-portal",
	storageBucket: "bd-doctors-portal.appspot.com",
	messagingSenderId: "349540193488",
	appId: "1:349540193488:web:5673214b077e93cae13ad5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
