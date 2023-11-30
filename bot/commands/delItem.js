const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delitem')
        .setDescription('Remove an item from the dashboard')

        .addIntegerOption(option => option.setName('id').setDescription('ID of the item to delete').setRequired(true)),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Deleted item!')
            .setDescription(`**Deleted item with ID:** ${interaction.options.getInteger('id')}`)
            .setColor('#0099ff');

        const id = interaction.options.getInteger('id');

        const sql = 'DELETE FROM `upcoming` WHERE `id` = ?';
        const values = [id];

        dbConnection.query(sql, values, (err) => {
			if (err) {
				console.error('Error:', err);
			}
		});

        await interaction.reply({ embeds: [embed] });
    },
};
