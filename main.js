const keep_alive = require('./keep_alive.js');

const fs = require('fs');
const discord = require('discord.js');

const config = require('./config.json');

const logger = require('./logger.js');
const ticker = require('./ticker.js');

const token = //'NzcwODEyMTkwMDU5OTIxNDc5.X5jAyw.4EW7QpnKa7Su2nfaSmouiaKKrQI'; 
process.env.BOT_TOKEN;
const prefix = config.BOT_CONFIG.PREFIX;


const client = new discord.Client();
const log = new logger.Logger(client);
const tick = new ticker.Ticker(client);

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', ()=>{
    console.log('Bot deployed succesfuly');
    tick.start();
})

client.on('message', message=>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    console.log('trying to execute: #' + message.content + '# by ' + message.author.username);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try{
        if(command != 'config') {
            client.commands.get(command).execute(message, args, function(error, result) {
                if(error){
                    log.error(error);
                }
                else {
                    log.result(result);
                }
            });
        }
        else if(command == 'config') {
            switch(args[0]) {
                case 'clear': tick.clear(); console.log('data cleared');break;
                case 'stop': tick.stop(); console.log('ticker stopped'; break;
                case 'start': tick.start(); console.log('starting ticker'); break;
                default: console.log('UNKNOWN CONFIGURATION');
            }
        }
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})

client.login(token);
