import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvJ4TopsDSWX-D6EKN5gUNfrDJNZHXCCs",
  authDomain: "chat-app-f276f.firebaseapp.com",
  databaseURL: "https://chat-app-f276f-default-rtdb.firebaseio.com",
  projectId: "chat-app-f276f",
  storageBucket: "chat-app-f276f.appspot.com",
  messagingSenderId: "405440143964",
  appId: "1:405440143964:web:6116ec9f732050ebbd7c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
