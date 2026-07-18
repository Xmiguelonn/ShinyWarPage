import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlC6cK0o7L99ZVNU1WpdeGVV6ym4rwpiw",
    authDomain: "contador2k26.firebaseapp.com",
    databaseURL: "https://contador2k26-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contador2k26",
    storageBucket: "contador2k26.firebasestorage.app",
    messagingSenderId: "211348542156",
    appId: "1:211348542156:web:5518497309e5c2ec0aa869",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const scoresRef = ref(db, "puntos");

const scoreElements = {
    rojo: document.querySelector("#score-rojo"),
    verde: document.querySelector("#score-verde"),
    azul: document.querySelector("#score-azul"),
};

const previousValues = { rojo: null, verde: null, azul: null };

onValue(scoresRef, (snapshot) => {
    const data = snapshot.val() || {};
    Object.entries(scoreElements).forEach(([team, element]) => {
        const newValue = data[team] ?? 0;
        if (previousValues[team] !== null && previousValues[team] !== newValue) {
            element.classList.remove("bump");
            void element.offsetWidth; // reinicia la animacion
            element.classList.add("bump");
        }
        previousValues[team] = newValue;
        element.textContent = newValue;
    });
    document.body.classList.add("connected");
});