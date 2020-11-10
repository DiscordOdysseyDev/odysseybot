const tick = require('./ticker.js');
const fs = require('fs');
const discord = require('discord.js');

const config = require('./config.json');

const token = config.BOT_CONFIG.BOT_TOKEN;
const prefix = config.BOT_CONFIG.PREFIX;

const client = new discord.Client();
const ticker = new tick.Ticker(client);

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', ()=>{
    console.log('Bot deployed succesfuly');
    console.log('Deploying timer...');
    ticker.start();
})

client.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log("trying to execute: ", message.content);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try{
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})

client.login(token);
