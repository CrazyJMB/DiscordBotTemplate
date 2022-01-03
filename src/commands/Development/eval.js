const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Nos ayuda a ver la salida esperada de un trozo de codigo en JS')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Codigo a evaluar')
                .setRequired(true)),
                
    async execute(interaction) {
        try {
            let input = interaction.options.getString('input');
            let evaled = await eval(input);
            let output = inspect(evaled, {depth: 0} );
            const embed = new MessageEmbed()
                .setTitle('Comando Eval')
                .setDescription(`**Input:**\n\`\`\`js\n${input}\n\`\`\`\n**Output:**\n\`\`\`js\n${output}\n\`\`\``)
                .setColor("GREEN")
            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            const embederror = new MessageEmbed()
                .setTitle('Comando Eval')
                .setDescription(`**Error:**\n\`\`\`js\n${error}\n\`\`\``)
                .setColor("RED")
            await interaction.reply({ embeds: [embederror] });
        }
    }
}