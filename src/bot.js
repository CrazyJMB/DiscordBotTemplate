const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config({path:'../.env'});

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands/");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolder, "./commands");

    client.login(process.env.TOKEN)
})();