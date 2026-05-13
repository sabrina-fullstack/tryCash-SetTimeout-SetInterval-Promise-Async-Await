//Exercice pratique 01
// 1. Afficher un message après 3 secondes
// 2. Changer la couleur de fond de la page après 2 secondes
// 3. Afficher une alerte après 5 secondes
//==================1===================
console.log("Bonjour");
setTimeout(() => {
  console.log("Delayed");
}, 3000);
console.log("Aurevoir");
console.log("A bientot");
//================2====================
setTimeout(() => {
  document.body.style.background = "red";
}, 2000);
//===============3=====================
setTimeout(() => {
  alert("Hello");
}, 5000);

// Exercice pratique 02
//1. Imprimer les nombres de 1 et plus toutes les secondes
//2. Changer le texte toutes les 2 secondes
//3. Afficher l'heure actuelle toutes les secondes

//====================1=====================

let count = 0; // ✅ dehors — garde sa valeur !

setInterval(function () {
  count++; // ✅ incrémente
  console.log(count); // ✅ affiche le compteur
}, 1000);
//====================2=====================

let count1 = 0;
setInterval(function () {
  count1++;
  document.getElementById("counter").innerHTML = count;
}, 2000);

//====================3=====================
setInterval(function () {
  const now = new Date();
  document.getElementById("clock").innerHTML = now.toLocaleTimeString();
}, 1000);

//xercice pratique 03
// 1. Afficher un message après 4 secondes en utilisant setTimeout.

// 2. Créez un compteur qui s'incrémente chaque seconde à l'aide de setInterval.

// 3. Arrêtez l'intervalle après qu'il se soit exécuté 10 fois.

// 4. Changez la couleur de fond toutes les 2 secondes et arrêtez-vous après 5 changements.

// 5. Expliquez en une phrase la différence entre setTimeout et setInterval.

//====================1=====================

setTimeout(function () {
  console.log("Shalom!");
}, 4000);

//====================2=====================

let count2 = 0;
setInterval(function () {
  count2++;
  console.log(count2);
}, 1000);

//====================3=====================
let count3 = 0;
const t = setInterval(() => {
  console.log(count3);
  count3++;
  if (count3 === 10) {
    clearInterval(t);
    clearInterval(setInterval);
    console.log("STOP");
  }
}, 1000);

//====================4=====================
const couleurs = ["red", "blue", "green", "yellow", "purple"];
let changes = 0;

const colorId = setInterval(() => {
  // 1. changer la couleur
  document.body.style.backgroundColor = couleurs[changes];
  changes++;

  // 2. arrêter après 5 changements
  if (changes === 5) {
    clearInterval(colorId); // ← STOP !
    console.log("stop color !");
  }
}, 2000);

//===============================================================

// 1. Utilisez setTimeout pour afficher un message de bienvenue 3 secondes après le chargement de la page.

// 2. Utilisez setInterval pour mettre à jour un compteur à l'écran chaque seconde.

// 3. Créez un compte à rebours de 10 à 0. Lorsqu'il atteint 0, affichez « Le temps est écoulé ! ».

// 4. Créez un texte qui change entre 3 messages différents toutes les 2 secondes.

// 5. Combinez setTimeout et setInterval : démarrez l'intervalle après un délai de 3 secondes et arrêtez-le après 5 occurrences.

// 1.

setTimeout(function () {
  let element = document.getElementById("message");
  element.innerHTML = "Bienvenue !";
}, 3000);

// 2.
let count8 = 0;
setInterval(function () {
  count8++;

  let element2 = document.getElementById("counter2");
  element2.innerHTML = count8;
}, 1000);

// 3. Créez un compte à rebours de 10 à 0. Lorsqu'il atteint 0, affichez « Le temps est écoulé ! ».
let count9 = 10;

const t1 = setInterval(function () {
  count9--;
  let element3 = document.getElementById("count9");
  element3.innerHTML = count9;
  if (count9 === 0) {
    let element3 = document.getElementById("message2");
    element3.innerHTML = "Le temps est écoulé !";
    clearInterval(t1);
  }
}, 1000);

// 4. Créez un texte qui change entre 3 messages différents toutes les 2 secondes.
const messages = ["Bienvenue", "Sabrina", "La plus belle"];
let count10 = 0;
setInterval(function () {
  document.getElementById("count10").innerHTML = messages[count10++];
}, 2000);

// 5. Combinez setTimeout et setInterval : démarrez l'intervalle après un délai de 3 secondes et arrêtez-le après 5 occurrences.
setTimeout(function () {
  let element4 = document.getElementById("message4");
  element4.innerHTML = "Demarrer";
  let count11 = 0;
  const timer = setInterval(function () {
    count11++;
    let element4 = document.getElementById("count11");
    element4.innerHTML = count11;
    if (count11 === 5) {
      let element4 = document.getElementById("message4");
      element4.innerHTML = "stop";
      clearInterval(timer);
    }
  }, 3000);
});
