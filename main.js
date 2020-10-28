const Discord = require('discord.js');
const config = require('./config.json');

const token = config.BOT_TOKEN;
const prefix = config.PREFIX;

const client = new Discord.Client();

client.once('ready', ()=>{
    console.log('Bot deployed succesfuly')
})

client.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
})

client.login(token);
