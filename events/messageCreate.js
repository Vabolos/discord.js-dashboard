const Discord = require('discord.js');
const client = new Discord.Client();
const dbConnection = require('./db');

client.on('message', (message) => {
	if (message.content === '!getData') {
		dbConnection.query(
			'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
			['Page', 45],
			(err, results) => {
				if (err) {
					console.error('Error executing query:', err);
					return;
				}
				console.log(results);
			},
		);
	}
});
