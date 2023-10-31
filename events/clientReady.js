const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready!\nLogged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'Javascript' }] });
	},
};
