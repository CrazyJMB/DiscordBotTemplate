const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('djs')
        .setDescription('Nos busca informacion sobre lo solicitado en la API de Discord.js')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Variable a buscar')
                .setRequired(true)),
                
    async execute(interaction) {
        let response = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(interaction.options.getString('input'))}`);
        let match = await response.json()
        match = JSON.parse(JSON.stringify(match))

        if (!match) await interaction.reply("No he encontrado informacion!");
        await interaction.reply({embeds: [match] });
    }
}