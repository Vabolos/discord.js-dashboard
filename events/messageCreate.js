const { Events } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;

		// You need to extract the required information from the message object
		const messageId = message.id;
		const messageContent = message.content;
		const userName = message.author.username;
		const userId = message.author.id;

		const sql = 'INSERT INTO `messageinfo`(`messageId`, `messageContent`, `userName`, `userId`) VALUES (?, ?, ?, ?)';
		const values = [messageId, messageContent, userName, userId];

		dbConnection.query(sql, values, (err) => {
			if (err) {
				console.error('Error:', err);
			}
			else {
				console.log('Message sent and data inserted into the database.');
			}
		});
	},
};

