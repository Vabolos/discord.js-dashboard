# Discord.js-template

A template for discord.js bots.

## Installation

1. Clone the repository 
```bash
git clone https://github.com/Vabolos/Discord.js-template.git
```

2. Install dependencies
```bash
npm install
```

3. Create a config.json file and add the following code to it:
```js
{
	"token": "TOKEN",
	"clientId": "ID",
	"guildId": "ID"
}
```

4. Run the bot
```bash
node .
```

*If you have nodemon installed you can simply do:
```bash
nodemon
```

5. Express server
This bot has a built-in fastify server which listens for the port: 4000. You can change this in the index.js file.
The server sends the bot status to the dashboard website.

