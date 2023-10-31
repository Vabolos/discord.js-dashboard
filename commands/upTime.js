const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Shows the current bot uptime'),
    async execute(interaction) {

        const uptime = humanizeDuration(process.uptime() * 1000, { round: true });

        const embed = new EmbedBuilder()
            .setTitle(uptime)
            .setColor('#0099ff');

        await interaction.reply({ embeds: [embed] });
    }
};
