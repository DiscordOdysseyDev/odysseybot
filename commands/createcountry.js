module.exports = {
    name: 'createcountry',
    description: 'creates a country with the message author as the owner',
    execute(message, args){
        var name = args[0];

        if(args.length != 1) {
            message.channel.send('Syntax error, try again');
            return;
        }

        if(!message.guild.channels.cache.find(category => category.name === 'countries')) { 
            message.guild.channels.create('countries', { type: 'category' }).then(c => {
                message.guild.channels.create(name, {
                    type: 'text',
                    permissionOverwrites: [
                       {
                         id: message.channel.guild.roles.everyone.id,
                         deny: ['ALL'],
                         parent: c.id
                      },
                    ],
                  }).then(c => {
                    channel.overwritePermissions([
                        {
                           id: message.author.id,
                           allow: ['ALL'],
                        },
                      ]);
                  }).catch(error => console.log(error))
            }).catch(error => console.log(error));
        }
        else {

        }

        message.channel.send('The country: ´' + name + '´will be created with ´' + message.author.username + '´ as the owner.');
    },
};