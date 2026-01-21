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

/* =========================
   3. LOGIQUE DU JEU (CLICS)
   ========================= */
cases.forEach((cell, index) => {
  cell.setAttribute("data-index", index);
  cell.addEventListener("click", gestionClicCase);
});

function gestionClicCase(event) {
  const caseCliquee = event.target;
  const indexCase = caseCliquee.getAttribute("data-index");

  if (etatJeu[indexCase] !== "" || !jeuActif) {
    if (jeuActif) {
      messageElement.innerText = "Case déjà prise !";
      messageElement.style.color = "red";

      setTimeout(() => {
        messageElement.innerText = `Au tour de ${tourJoueur} !`;
        messageElement.style.color = "";
      }, 1000);
    }

    return;
  }

  mettreAJourCase(caseCliquee, indexCase);
  changerJoueur();
}

function mettreAJourCase(cell, index) {
  etatJeu[index] = tourJoueur;
  cell.innerHTML = tourJoueur;
  cell.style.color = tourJoueur === "X" ? "#27ae60" : "#e74c3c";
}

function changerJoueur() {
  tourJoueur = tourJoueur === "X" ? "O" : "X";
  messageElement.innerHTML = `Au tour de <p style="color: ${tourJoueur === "X" ? "#27ae60" : "#e74c3c"}">${tourJoueur}</p> !`;
}
