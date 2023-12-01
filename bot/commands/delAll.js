const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delall')
        .setDescription('Delete all upcoming items from the database'),
    async execute(interaction) {
        try {
            // Delete all upcoming items from the database
            dbConnection.query('DELETE FROM upcoming', (err) => {
                if (err) {
                    console.error('Error:', err);
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('Error!')
                        .setDescription('An error occurred while trying to delete all upcoming items from the database.')
                        .setColor('#342B7E')
                        .setTimestamp();
                    interaction.reply({ embeds: [errorEmbed] });
                }
                else {
                    const successEmbed = new EmbedBuilder()
                        .setTitle('Success!')
                        .setDescription('All upcoming items have been deleted from the database.')
                        .setColor('#342B7E')
                        .setTimestamp();
                    interaction.reply({ embeds: [successEmbed] });

                    // Insert a default item into the database after deletion
                    const defaultItem = ['No upcoming items', '0', '0'];
                    const sql = 'INSERT INTO `upcoming` (`info`, `userId`, `userName`) VALUES (?, ?, ?)';
                    dbConnection.query(sql, defaultItem, (insertErr) => {
                        if (insertErr) {
                            console.error('Error:', insertErr);
                        }
                    });
                }
            });
        }
        catch (error) {
            console.error(error);
            const catchErrorEmbed = new EmbedBuilder()
                .setTitle('Error!')
                .setDescription('An unexpected error occurred.')
                .setColor('#342B7E')
                .setTimestamp();
            interaction.reply({ embeds: [catchErrorEmbed] });
        }
    },
};
