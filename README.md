# create-jobar-app

🚀 **create-jobar-app** is a library that allows you to quickly initialize a **Jobar** application with the necessary configurations and dependencies.

## 📦 Installation

To use `create-jobar-app`, simply run the following command:

```sh
npm create jobar-app@latest my-app
```

or with **npx**:

```sh
npx create-jobar-app my-app
```

or with **yarn**:

```sh
yarn create jobar-app my-app
```

This will create a `my-app` folder containing a pre-configured Jobar application.

You can now test it easily with **Docker**:

```sh
cd my-app && docker compose up -d
```

---

## 🎯 Features

-   📂 Automatically generates the project structure.
-   📌 Installs essential dependencies.
-   ⚙️ Optimized configuration for a quick start.
-   🔌 Ready to be customized and deployed.

---

## 🚀 Usage

Once the project is created, navigate to the folder and start the application:

```sh
cd my-app
npm install
npm run dev
```

This will start the development server with hot-reloading.

---

## 🛠️ Configuration

If needed, you can customize the initialization by passing options:

```sh
npm create jobar-app@latest my-app -- --template=custom
```

Find all the templates here: [https://github.com/william-donnette/jobar/tree/main/examples](https://github.com/william-donnette/jobar/tree/main/examples)

---

## 📝 Contributing

Contributions are welcome!

-   Fork the repository
-   Create a feature branch: `git checkout -b feature-my-feature`
-   Commit your changes: `git commit -m 'Add my feature'`
-   Push to the branch: `git push origin feature-my-feature`
-   Open a Pull Request 🚀

---

💡 **Need help?** Feel free to open an issue [here](https://gitlab.com/william-donnette/create-jobar-app/-/issues/new)! 😊

---

## 📞 Contact

-   👨🏻‍💻 [William Donnette](https://william-donnette.dev/#contact)
