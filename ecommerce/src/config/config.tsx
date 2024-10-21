import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAGcDZn51bIQFwmK1WfZSRJhNx88sVzks",
  authDomain: "e-commerce-2ff9a.firebaseapp.com",
  projectId: "e-commerce-2ff9a",
  storageBucket: "e-commerce-2ff9a.appspot.com",
  messagingSenderId: "1073269664738",
  appId: "1:1073269664738:web:e81f69db9f76e913e027bb",
  measurementId: "G-JP5WY82V5P",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const fs = getFirestore();
const storage = getStorage();
const sportsItem = collection(fs, "SportsItem");
const users = collection(fs, "users");

export { app, auth, fs, storage, sportsItem, users };
