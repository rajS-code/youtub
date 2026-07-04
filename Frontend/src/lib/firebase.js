import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
    apiKey: "AIzaSyCV1SHlKPH_lZUn4828AYtbs8V3g1LFtuw",
    authDomain: "clone-app-53a24.firebaseapp.com",
    projectId: "clone-app-53a24",
    storageBucket: "clone-app-53a24.firebasestorage.app",
    messagingSenderId: "721445816605",
    appId: "1:721445816605:web:2f73363010e9e55c16b9f4",
    measurementId: "G-6NNEZ33S81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { auth, provider };