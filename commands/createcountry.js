const discord = require('discord.js');

module.exports = {
    name: 'createcountry',
    description: 'creates a country with the message author as the owner',
    execute(message, args){
        var name = args[0];

        if(args.length != 1) {
            message.channel.send('Syntax error, try again');
            return;
        }

        message.guild.channels.create(name, { 
            type: 'text',
        }).then(c => {
            var category = message.guild.channels.cache.find(category => category.name === 'countries');

            if(!category) {
                category = message.guild.channels.create('countries', { type: 'category' }).then(p => {
                    c.setParent(p, { lockPermissions: true });
                }).catch(error => console.log(error));
            }
            else {
                c.setParent(category.id, { lockPermissions: true });
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
        }).catch(error => console.log(error));

        message.channel.send('The country: ´' + name + '´will be created with ´' + message.author.username + '´ as the owner.');
    },
};