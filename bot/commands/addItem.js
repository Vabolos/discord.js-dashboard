const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('additem')
        .setDescription('Add a new item to the dashboard')

        .addStringOption(option => option.setName('info').setDescription('The info of the item (max 255 chars)').setRequired(true)),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('New item!')
            .setDescription(`**Added item with info:** ${interaction.options.getString('info')}`)
            .setColor('#342B7E')
            .setTimestamp();
        // vars for db info
        const info = interaction.options.getString('info');
        const userId = interaction.user.id;
        const userName = interaction.user.username;

        const sql = 'INSERT INTO `upcoming` (`info`, `userId`, `userName`) VALUES (?, ?, ?)';
		const values = [info, userName, userId];

		dbConnection.query(sql, values, (err) => {
			if (err) {
				console.error('Error:', err);
			}
		});

        await interaction.reply({ embeds: [embed] });
    },
};
