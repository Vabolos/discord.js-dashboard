const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delall')
        .setDescription('Delete all upcoming items from the database'),
    async execute(interaction) {
        try {
            // Check the count of upcoming items before deletion
            dbConnection.query('SELECT COUNT(*) AS count FROM upcoming WHERE id <> 1', (countErr, result) => {
                if (countErr) {
                    console.error('Error:', countErr);
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('Error!')
                        .setDescription('An error occurred while trying to delete upcoming items from the database.')
                        .setColor('#342B7E')
                        .setTimestamp();
                    interaction.reply({ embeds: [errorEmbed] });
                }
                else {
                    const count = result[0].count;

                    // Delete all upcoming items from the database excluding item with ID 1
                    dbConnection.query('DELETE FROM upcoming WHERE id <> 1', (deleteErr) => {
                        if (deleteErr) {
                            console.error('Error:', deleteErr);
                            const deleteErrorEmbed = new EmbedBuilder()
                                .setTitle('Error!')
                                .setDescription('An error occurred while trying to delete upcoming items from the database.')
                                .setColor('#342B7E')
                                .setTimestamp();
                            interaction.reply({ embeds: [deleteErrorEmbed] });
                        }
                        else {
                            const successEmbed = new EmbedBuilder()
                                .setTitle('Success!')
                                .setDescription(`All upcoming items except the default item have been deleted from the database.\n **${count}** items deleted.`)
                                .setColor('#342B7E')
                                .setTimestamp();
                            interaction.reply({ embeds: [successEmbed] });

                            // If there are no remaining items, insert a default item into the database after deletion
                            if (count === 0) {
                                const defaultItem = ['No upcoming items', '0', '0'];
                                const sql = 'INSERT INTO `upcoming` (`info`, `userId`, `userName`) VALUES (?, ?, ?)';
                                dbConnection.query(sql, defaultItem, (insertErr) => {
                                    if (insertErr) {
                                        console.error('Error:', insertErr);
                                    }
                                });
                            }
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
