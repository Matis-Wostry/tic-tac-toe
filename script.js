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
  verificationResultat();
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

/* =========================
   4. DÉTECTION DE VICTOIRE
   ========================= */

const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verificationResultat() {
  let tourGagnant = false;

  for (let i = 0; i < conditionsVictoire.length; i++) {
    const condition = conditionsVictoire[i];

    let a = etatJeu[condition[0]];
    let b = etatJeu[condition[1]];
    let c = etatJeu[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      tourGagnant = true;
      break;
    }
  }

  if (tourGagnant) {
    messageElement.innerHTML = `Le joueur ${tourJoueur} a gagné ! 🎉`;
    messageElement.style.color = "#27ae60";
    jeuActif = false;

    scores[tourJoueur]++;
    if (tourJoueur === "X") {
      scorePlayer1.innerText = scores["X"];
    } else {
      scorePlayer2.innerText = scores["O"];
    }

    return;
  }

  let matchNul = !etatJeu.includes("");
  if (matchNul) {
    messageElement.innerText = "Match Nul !";
    messageElement.style.color = "orange";
    jeuActif = false;
    return;
  }

  changerJoueur();
}

/* =========================
   5. RECOMMENCER LE JEU
========================= */

restartBtn.addEventListener('click', recommencerJeu);

function recommencerJeu() {
    jeuActif = true;
    tourJoueur = "X";
    etatJeu = ["", "", "", "", "", "", "", "", ""];

    messageElement.innerHTML = "Au tour de X !";
    messageElement.style.color = "";

    document.querySelectorAll('.case').forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = "";
    });
}
