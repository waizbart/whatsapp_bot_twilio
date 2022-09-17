import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCXnKMeZT1rAPGVYSOD0m_Nh4p3yGUElvk",
    authDomain: "web-bot-agendamento.firebaseapp.com",
    projectId: "web-bot-agendamento",
    storageBucket: "web-bot-agendamento.appspot.com",
    messagingSenderId: "855738614828",
    appId: "1:855738614828:web:a16dfa2215ffa121917d89",
    databaseURL: "https://web-bot-agendamento-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
