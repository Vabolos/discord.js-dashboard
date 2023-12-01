const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('itemview')
        .setDescription('View all items in the database'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Upcoming items')
            .setDescription('List of all upcoming items')
            .setColor('#342B7E');

        const sql = 'SELECT `id`, `info` FROM `upcoming`';
        const values = [];

        dbConnection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error:', err);
                return interaction.reply('An error occurred while fetching data.');
            }

            // Loop through all results and add them to the embed
            results.forEach(result => {
                embed.addFields(
                    { name: `ID: ${result.id}`, value: `Info: ${result.info}` },
                );
            });

            // Send the populated embed as a reply
            interaction.reply({ embeds: [embed] });
        });
    },
};
