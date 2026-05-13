// Exercice pratique 01
// 1. J'ai encadré l'affichage d'une variable non définie dans la console à l'aide d'un bloc try/catch.

// 2. Utilisez try/catch pour décoder en toute sécurité un JSON invalide.

// 3. Imprimez un message d'erreur personnalisé dans le bloc catch.

// 4. Ajoutez un bloc finally qui affiche « Terminé ».

// 5. Expliquez ce qui se passe lorsqu'il n'y a pas d'erreur.
// console.log("Hello");
// console.log(y); // y is not defined
// console.log("Bye Bye");
try {
} catch (error) {}
try {
  console.log(y);
} catch (error) {
  console.log("error.message");
}
try {
  JSON.parse("invalid json");
} catch (error) {
  console.log("Oups, quelque chose a mal tourné :", error.message);
}
try {
  console.log("Essaie...");
} catch (e) {
  console.log("Error");
} finally {
  console.log("Nettoyage");
}

// Exercice pratique 02
// 1. Créez une fonction qui utilise setTimeout et qui réussit ou échoue de manière aléatoire.

// 2. Transmettez les fonctions de rappel handleSuccess et handleError.

// 3. Dans handleSuccess, affichez un message de succès.

// 4. Dans handleError, affichez un message d'erreur.

// 5. Expliquez pourquoi try / catch ne fonctionne pas ici.Car cest un timeout avec counter et le temps que la faute se fasse la cash aura deja fermer et ne verra pas l'erreur et dont seul callback pour voir ce genre de faute .

//============================================================================
// 1. Créez une fonction qui utilise setTimeout et qui réussit ou échoue de manière aléatoire.
function toGo(yesCallback, noCallback) {
  const ok = Math.random() > 0.5;
  setTimeout(() => {
    if (ok) {
      yesCallback("Tâche réussie");
    } else {
      noCallback("La tâche a échoué");
    }
  }, 1000);
}
// 2. Transmettez les fonctions de rappel handleSuccess et handleError.
function handleSuccess(resultat) {
  console.log("✅ " + resultat);
}

// 4. Dans handleError, affichez un message d'erreur.

function handleError(erreur) {
  console.log("❌ " + erreur);
}
// 3. Dans handleSuccess, affichez un message de succès.

toGo(handleSuccess, handleError);

//======================================================================================
// function loadData(onSuccess, onError) {
//   const ok = Math.random() > 0.5;
//   setTimeout(() => {
//     if (ok) {
//       onSuccess("Data loaded !");
//     } else {
//       onError("Erreur");
//     }
//   }, 2000);
// }

// function handleSuccess(resultat) {
//   console.log("✅ " + resultat);
// }

// function handleError(erreur) {
//   console.log("❌ " + erreur);
// }

// loadData(handleSuccess, handleError);

//===================================================================================
// le meme script mais avec Promise

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = Math.random() > 0.5;
      if (ok) {
        resolve("Données chargées !");
      } else {
        reject("Erreur de chargement");
      }
    }, 2000);
  });
}
loadData()
  .then((resultat) => {
    console.log("✅ " + resultat);
  })
  .catch((erreur) => {
    console.log("❌ " + erreur);
  });

//============================================================================================
// Exercice pratique 01
// 1. J'ai encadré l'affichage d'une variable non définie dans la console à l'aide d'un bloc try/catch.
//עטוף console.log של משתנה לא מוגדר ב-try / catch.

// 2. Utilisez try/catch pour décoder en toute sécurité un JSON invalide.

// 3. Imprimez un message d'erreur personnalisé dans le bloc catch.

// 4. Ajoutez un bloc finally qui affiche « Terminé ».

// 5. Expliquez ce qui se passe lorsqu'il n'y a pas d'erreur.

// 1
try {
  console.log(variableInconnue);
} catch (error) {
  console.log("erreur : ", error.message);
}

function analyse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    console.log("Heure : ", data.heure);
    return data;
  } catch (error) {
    console.log("JSON invalide : ", error.message);
    return null;
  } finally {
    console.log("Tentative de traitement terminee. ");
  }
}
analyse("ceci n'est pas du json");
analyse('{"heure": "14h30"}');

//Quand il n'y a pas d'erreur — le catch est ignoré mais le finally s'exécute toujours 😊
// Cacsh ne peut agir avec timeout cest callback qui prend la releve.
//Version 1 — un seul callback : callback(erreur, resultat)
function tache(callback) {
  setTimeout(() => {
    callback(new Error("Erreur async"), null);
  }, 1000);
}
tache(function (erreur, resultat) {
  if (erreur) {
    console.log("Erreur : ", erreur.message);
  }
});

// Exemple de base — deux callbacks séparés
//Version 2 — deux callbacks séparés : successCallback et errorCallback
function doTask(successCallback, errorCallback) {
  const ok = Math.random() > 0.5;
  setTimeout(() => {
    if (ok) {
      successCallback("Task succeeded");
    } else {
      errorCallback("Task failed");
    }
  }, 1000);
}

// handleSuccess / handleError — séparation des responsabilités javascript

function handleSuccess(message) {
  console.log("SUCCESS:", message);
}

function handleError(error) {
  console.log("ERROR:", error);
}

doTask(handleSuccess, handleError);
