# create-jobar-app

🚀 **create-jobar-app** est une librairie permettant d'initialiser rapidement une application [**Jobar**](https://github.com/william-donnette/jobar) avec les configurations et dépendances nécessaires.

## 📦 Installation

Pour utiliser `create-jobar-app`, exécute simplement la commande suivante :

```sh
npm create jobar-app@latest my-app
```

ou avec **npx** :

```sh
npx create-jobar-app my-app
```

ou avec **yarn** :

```sh
yarn create jobar-app my-app
```

Cela créera un dossier `my-app` contenant une application Jobar préconfigurée.

---

## 🎯 Fonctionnalités

-   📂 Génération automatique de la structure de fichiers.
-   📌 Installation des dépendances essentielles.
-   ⚙️ Configuration optimisée pour un démarrage rapide.
-   🔌 Prêt à être personnalisé et déployé.

---

## 🚀 Utilisation

Une fois le projet créé, accédez au dossier et démarrez l'application :

```sh
cd my-app
docker compose up -d
npm install
npm run dev
```

Cela lancera le serveur de développement avec hot-reloading.

---

## 🛠️ Configuration

Si besoin, tu peux personnaliser l'initialisation en passant des options :

```sh
npm create jobar-app@latest my-app -- --template=custom
```

Retrouve tous les templates ici: [https://github.com/william-donnette/jobar/tree/main/examples](https://github.com/william-donnette/jobar/tree/main/examples)

---

## 📝 Contribuer

Les contributions sont les bienvenues !

-   Fork le repo
-   Crée une branche feature : `git checkout -b feature-ma-feature`
-   Commit tes changements : `git commit -m 'Ajout de ma fonctionnalité'`
-   Push : `git push origin feature-ma-feature`
-   Ouvre une Pull Request 🚀

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

💡 **Besoin d'aide ?** N'hésite pas à ouvrir une issue [ici](https://gitlab.com/william-donnette/create-jobar-app/-/issues/new) ! 😊

---

## 📞 Contact

-   👨🏻‍💻 [William Donnette](https://william-donnette.dev/#contact)
