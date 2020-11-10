const discord = require('discord.js');
const DB = require('../database.js');

module.exports = {
    name: 'createcountry',
    description: 'creates a country with the message author as the owner',
    execute(message, args){
        if(args.length != 1) {
            message.channel.send('Syntax error, try again');
            return;
        }

        DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', message.author.id, function(results, error) { 
            if(error){
                message.channel.send('You must join the game before creating a country!');
                return;
            }
            else{
                console.log(results.game_id);
                var name = args[0];

            message.guild.channels.create(name, { 
                type: 'text',
            }).then(c => {

                var category = message.guild.channels.cache.find(category => category.name === 'countries');

                if(!category) {
                    category = message.guild.channels.create('countries', { type: 'category' }).then(p => {
                        c.setParent(p, { lockPermissions: false });
                    }).catch(error => console.log(error));
                }
                else {
                    c.setParent(category.id, { lockPermissions: false });
                }

                c.overwritePermissions([
                    {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL'],
                    }
                ]);
                
                DB.query('INSERT INTO `countries` (`game_id`, `channel_id`) VALUES (?, ?)', [results['game-id'], c.id], function(results, error) {
                    if(error){
                        console.log(error);
                        return;
                    }
                });
                
            }).catch(error => console.log(error));
            
            message.channel.send('The country: ´' + name + '´will be created with ´' + message.author.username + '´ as the owner.');
                }
        })
    },
};