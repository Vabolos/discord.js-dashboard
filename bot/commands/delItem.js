const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delitem')
        .setDescription('Remove an item from the dashboard')
        .addIntegerOption(option => option.setName('id').setDescription('ID of the item to delete').setRequired(true)),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#342B7E');

        const id = interaction.options.getInteger('id');

        // Check if the item ID is 1 (default item), then prevent deletion
        if (id === 1) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Error!')
                .setDescription('You cannot delete the default item.')
                .setColor('#342B7E')
                .setTimestamp();
            await interaction.reply({ embeds: [errorEmbed] });
            return;
        }

        const sql = 'DELETE FROM `upcoming` WHERE `id` = ? AND `id` <> 1';
        const values = [id];

        dbConnection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error:', err);
                const deleteErrorEmbed = new EmbedBuilder()
                    .setTitle('Error!')
                    .setDescription('An error occurred while trying to delete the item.')
                    .setColor('#342B7E')
                    .setTimestamp();
                interaction.reply({ embeds: [deleteErrorEmbed] });
            }
            else if (result && result.affectedRows > 0) {
                    embed.setTitle('Deleted item!');
                    embed.setDescription(`**Deleted item with ID:** ${id}`)
                    .setTimestamp();
                    interaction.reply({ embeds: [embed] });
                }
                else {
                    const notFoundEmbed = new EmbedBuilder()
                        .setTitle('Error!')
                        .setDescription('Item not found or cannot be deleted.')
                        .setColor('#342B7E')
                        .setTimestamp();
                    interaction.reply({ embeds: [notFoundEmbed] });
                }
        });
    },
};
