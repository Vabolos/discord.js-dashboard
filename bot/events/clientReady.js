const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready!\nLogged in as ${client.user.tag}`);
		console.log('\x1b[36m|\n└── Use CTRL+C to exit.');
		client.user.setPresence({ activities: [{ name: 'Javascript' }] });
	},
};
