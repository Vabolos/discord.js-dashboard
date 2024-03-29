# Discord.js Bot with Database and React Dashboard
This is a Discord.js bot that uses a database to store data and has a React dashboard for managing the bot. Each folder has a README.md file with more information about that folder.

## Requirements
- Node.js
- Discord.js
- Database (e.g., MySQL (XAMPP), PostgreSQL, MongoDB)
- React
- Installation 
    - ```npm i```
- Clone this repository.

### Start the bot:

`node .` or `nodemon`

Nodemon is not installed by default and can be installed by running the following command in the terminal:

`npm i -g nodemon`

The bot will automatically restart when you make changes to the code and hit save (CTRL + S).
This project can also be started using the .bat files that it comes with. All you have to do is go to these .bat files and change paths where needed. After that, double click the Startup.bat file to start the bot, database and react Server. This will then open 1 cmd window containing different tabs for each process. **Closing this window will close all processes!**

Keep in mind that you do NOT need the .bat files to start the bot, this is just a way to make it easier to start the bot, database and react server.

Alternatively, you can open multiple terminals in visual studio code and running the start commands in each one. This will also allow you to see the output of each process. (the cmd does this too, just in an external window)

### Start the dashboard:

`npm start`

## Usage
Once the bot is running, you can start using it by adding it to your Discord server. Once the bot has been added to your server, you can start using its commands.

## Dashboard
The dashboard can be used to manage the bot. It allows you to view and edit the bot's settings, as well as view and manage the bot's data.

To access the dashboard, go to the following URL in your web browser:

`http://localhost:3000 `

### Misc URLs
There are 2 more URLs used in this project to track both the online status of the bot and the items being sent from the database to the website. These URLs are:
- `http://localhost:4000/bot-status`
- `http://localhost:5000/result`

## Contributing
If you would like to contribute to this project, please feel free to submit a pull request.
