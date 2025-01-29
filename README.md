# 🤖 Discord.js Bot with Database and React Dashboard

This is a Discord.js bot that uses a database to store data and has a React dashboard for managing the bot. Each folder has a README.md file with more information about that folder.

## 📋 Requirements

- Node.js 🟢
- Discord.js 💬
- Database (e.g., MySQL (XAMPP), PostgreSQL, MongoDB) 🗄️
- React ⚛️

## 🛠️ Installation

1. Clone this repository.
2. Install the necessary packages:
    ```bash
    npm i
    ```

### 🚀 Start the bot

Run the following command to start the bot:
```bash
node .
```
or use `nodemon` for automatic restarts:
```bash
nodemon
```
*Nodemon is not installed by default and can be installed by running:*
```bash
npm i -g nodemon
```
The bot will automatically restart when you make changes to the code and hit save (CTRL + S).

You can also use the provided `.bat` files to start the bot, database, and React server. Simply edit the paths in the `.bat` files as needed and double-click the `Startup.bat` file. This will open a CMD window with different tabs for each process. **Closing this window will close all processes!**

Alternatively, you can open multiple terminals in Visual Studio Code and run the start commands in each one. This will also allow you to see the output of each process (CMD does this too, just in an external window).

### 🖥️ Start the dashboard

```bash
npm start
```

## 📖 Usage

Once the bot is running, you can start using it by adding it to your Discord server. After adding the bot, you can start using its commands.

## 🛠️ Dashboard

The dashboard can be used to manage the bot. It allows you to view and edit the bot's settings, as well as view and manage the bot's data.

To access the dashboard, go to the following URL in your web browser:

```http
http://localhost:3000
```

### 🌐 Misc URLs

There are 2 more URLs used in this project to track both the online status of the bot and the items being sent from the database to the website:

- `http://localhost:4000/bot-status`
- `http://localhost:5000/result`

## 🤝 Contributing

If you would like to contribute to this project, please feel free to submit a pull request. 🌟
