const { Events } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {

		// get info from the joined user
		const userName = member.user.username;
		const userId = member.user.id;

		const sql = 'INSERT INTO `joins`(`userName`, `userId`) VALUES (?, ?)';
		const values = [userName, userId];

		dbConnection.query(sql, values, (err) => {
			if (err) {
				console.error('Error:', err);
			}
		});
	},
};

