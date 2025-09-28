// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'studio-7725569955-50002',
  appId: '1:377574069935:web:05791ee2c669a872dee65a',
  apiKey: 'AIzaSyDbdNxAwhMYtZIbbMXjEkbaABekyrxj3Og',
  authDomain: 'studio-7725569955-50002.firebaseapp.com',
  measurementId: 'G-LNZ06H9W9M',
  messagingSenderId: '377574069935',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
