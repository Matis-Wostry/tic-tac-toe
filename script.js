/* =========================
   1. SÉLECTION DES ÉLÉMENTS
   ========================= */
const cases = document.querySelectorAll(".case");

const scorePlayer1 = document.querySelector("#score1");
const scorePlayer2 = document.querySelector("#score2");

const messageElement = document.querySelector("#message");

const restartBtn = document.querySelector("#restart-btn");

/* =========================
   2. ÉTAT DU JEU (VARIABLES)
   ========================= */
let tourJoueur = "X";
let jeuActif = true;
let scores = {
  X: 0,
  O: 0,
};

let etatJeu = ["", "", "", "", "", "", "", "", ""];

console.log("Éléments sélectionnés :", cases);
