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




const fechaInicio = new Date("2026-08-01T00:00:00+02:00").getTime();

const countdownInterval = setInterval(() => {

    const ahora = new Date().getTime();
    const distancia = fechaInicio - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(dias).padStart(2, "0");
    document.getElementById("hours").textContent = String(horas).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutos).padStart(2, "0");
    document.getElementById("seconds").textContent = String(segundos).padStart(2, "0");

    if (distancia < 0) {

        clearInterval(countdownInterval);
        const container = document.getElementById("countdown-container");

        container.innerHTML = `<h2 class="countdown-title-active">!LA SHINY WAR HA COMENZADO¡ 🔥</h2>`;
    }



}, 1000);