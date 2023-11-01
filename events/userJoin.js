const { Events } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		if (member.user.bot) return;

		// Get info from the joined user
		const userName = member.user.username;
		const userId = member.user.id;

		const checkSql = 'SELECT COUNT(*) AS userCount FROM `joins` WHERE `userId` = ?';
		const checkValues = [userId];

		// Check if the user is already in the database
		dbConnection.query(checkSql, checkValues, (checkErr, results) => {
			if (checkErr) {
				console.error('Error checking database:', checkErr);
				return;
			}

			const userCount = results[0].userCount;

			if (userCount === 0) {
				// User is not in the database, so insert the new record
				const insertSql = 'INSERT INTO `joins` (`userName`, `userId`) VALUES (?, ?)';
				const insertValues = [userName, userId];

				dbConnection.query(insertSql, insertValues, (insertErr) => {
					if (insertErr) {
						console.error('Error inserting into database:', insertErr);
					}
					else {
						console.log('User joined and data inserted into the database.');
					}
				});
			}
		});
	},
};

