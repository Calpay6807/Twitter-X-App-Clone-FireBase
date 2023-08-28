import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqG8gVPHwDVkUqtxgxtz5UUsnQkwuBQoo",
  authDomain: "twitter-clone-project-39d5b.firebaseapp.com",
  projectId: "twitter-clone-project-39d5b",
  storageBucket: "twitter-clone-project-39d5b.appspot.com",
  messagingSenderId: "499370767535",
  appId: "1:499370767535:web:5cbaea11fa2d53a576105a",
};

const app = initializeApp(firebaseConfig);
//yetkilendirme işlemi için
export const auth = getAuth(app);

// google sağlayıcı
export const provider = new GoogleAuthProvider();

// veri tabanı kurulumu

export const db = getFirestore(app);

// medyaları depolayacağımız alan

export const storage = getStorage(app);
