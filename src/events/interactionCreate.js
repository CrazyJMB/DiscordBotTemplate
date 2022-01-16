module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: `Ha ocurrido un error intentado ejecutar el comando \`${interaction.commandName}\``,
                ephemeral: true
            });
        }
    }
}