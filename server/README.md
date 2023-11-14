<!-- readme with info about the server -->
# Quick info

This server is built for fetching and sending the data from the database to the dashboard website.

## Installation

1. Modules
```bash
npm install (npm i)
```
This will install all the needed node modules

2. Environment variables
Copy the .env.example file and rename it to ".env" (without quotes) Then fill in the needed information.

3. Run the server
```bash
node . (node server.js)
```

If you have nodemon installed you can run this command:
```bash
nodemon server.js
```

To install nodemon:
```bash
npm install -g nodemon
```

*Nodemon listens for changes to the files and restarts the server when the file is saved.

## Usage
You can go to: [http://localhost:4000](http://localhost:4000) to see the server status.
If the bot is online, you will see the following message:
```bash
"I am online!"
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# Enjoy!