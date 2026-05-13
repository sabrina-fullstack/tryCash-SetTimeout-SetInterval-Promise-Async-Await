//Exercice 1 — Crée une Promise qui se résout après 2 secondes.
function maPromesse() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //Résoudre ou rejeter la promesse de manière aléatoire.
      const ok = Math.random() > 0.5;
      if (ok) {
        resolve("Donnees chargees !");
      } else {
        reject("Erreur de chargement");
      }
    }, 2000); // ← le 2000 va ici
  });
}

//3. Imprimez un message de succès en utilisant .then()
//4. Imprimez un message d'erreur en utilisant .catch().

maPromesse()
  .then((resultat) => {
    console.log("✅ " + resultat);
  })
  .catch((erreur) => {
    console.log("❌ " + erreur);
  });

//5. Enchaînez deux appels .then().

maPromesse()
  .then((resultat) => {
    console.log("Etape 1 : ", resultat);
    return "Etape suivante";
  })
  .then((suite) => {
    console.log("Etape 2 : ", suite);
  })

  .catch((erreur) => {
    console.log("Erreur : ", erreur);
  });
//Exercice pratique 02
//1. Réécrivez la promesse avec .then() en utilisant async/await.
async function main() {
  try {
    //2. Gérer les succès avec try.
    const res = await maPromesse();
    console.log(res);
  } catch (err) {
    //3. Gérer les erreurs avec catch.
    console.log(err);
  }
}
main();
//4. Utilisez await avec une promesse qui se résout après 3 secondes.

function maPromesse2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = Math.random() > 0.5;
      if (ok) {
        resolve("Donnees chargees !");
      } else {
        reject("Erreur de chargement");
      }
    }, 3000);
  });
}
async function tester() {
  try {
    const res = await maPromesse2();
    console.log("✅", res);
  } catch (err) {
    console.log("❌", err);
  }
}
tester();
//=================================================================================
function checkPassword(mdp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mdp.length >= 8) {
        resolve("Mot de passe accepté !");
      } else {
        reject("Mot de passe trop court");
      }
    }, 2000); // ← le 2000 va ici
  });
}
checkPassword("monmdp123")
  .then((resultat) => {
    console.log("✅ " + resultat);
  })
  .catch((erreur) => {
    console.log("❌ " + erreur);
  });

async function main() {
  try {
    const res = await checkPassword("monmdp123");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

main();
//4. Utilisez await avec une promesse qui se résout après 3 secondes.

function checkPassword2(mdp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ok = Math.random() > 0.5;
      if (mdp.length >= 8) {
        resolve("Mot de passe accepté !");
      } else {
        reject("Mot de passe trop court");
      }
    }, 2000);
  });
}
async function tester() {
  try {
    const res = await checkPassword2("monmdp123");
    console.log("✅", res);
  } catch (err) {
    console.log("❌", err);
  }
}
tester();
