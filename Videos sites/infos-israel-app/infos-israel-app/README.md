# 📱 Infos Israël News — Application Mobile

Application React Native (Expo) pour le site infos-israel.news

## 🚀 Installation rapide

### Étape 1 — Prérequis
Assure-toi d'avoir installé :
- [Node.js](https://nodejs.org) (version 18 ou plus)
- Un téléphone avec l'app **Expo Go** ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Étape 2 — Installation
Ouvre un terminal dans le dossier du projet et lance :

```bash
npm install
```

### Étape 3 — Lancement
```bash
npx expo start
```

Un QR code s'affiche dans le terminal.  
**Scanne-le** avec l'app Expo Go sur ton téléphone.

L'app se lance sur ton téléphone ! 🎉

---

## 📲 Publier sur les stores

### Pour Android (Google Play)
```bash
npm install -g eas-cli
eas login
eas build --platform android
```

### Pour iOS (App Store)
```bash
eas build --platform ios
```

> Nécessite un compte Apple Developer (99$/an) et un compte Google Play (25$ unique).

---

## 🔧 Configuration

Le fichier principal de configuration est `src/utils/api.js`.

Pour mettre à jour les catégories, modifie le tableau `CATEGORIES` avec les IDs WordPress corrects.

---

## 📁 Structure du projet

```
infos-israel-app/
├── App.js                    # Navigation principale
├── app.json                  # Config Expo
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Fil d'actualité
│   │   ├── ArticleScreen.js  # Article complet
│   │   ├── SearchScreen.js   # Recherche
│   │   └── BookmarksScreen.js # Articles sauvegardés
│   └── utils/
│       └── api.js            # Connexion API WordPress
└── assets/                   # Images et icônes
```

---

## ✨ Fonctionnalités

- ✅ Fil d'actualité en temps réel
- ✅ Filtrage par catégorie
- ✅ Recherche d'articles
- ✅ Sauvegarde d'articles (hors ligne)
- ✅ Partage d'articles
- ✅ Mode sombre
- ✅ Pull-to-refresh
- ✅ Chargement infini (pagination)

---

Développé avec ❤️ pour infos-israel.news
