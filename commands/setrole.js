const localjson = require('./../localjson.js');

module.exports = {
    name: 'setrole',
    description: 'assigns a server role to a game role',
    execute(message, args){
        if(args.length != 2) {
            message.channel.send('Syntax error, try again');
            return;
        }
        
        var serverRole;
        if(args[1] == 'none') {
            serverRole = '';
        }
        else {
            serverRole = message.guild.roles.cache.find(r => r.name === args[1]);
            if(!serverRole) {
                message.channel.send('Could not find the role '+args[1]+' in this server');
                return;
            }
        }

        var gameRole;
        switch(args[0])
        {
            case 'admin': gameRole = 'ADMIN'; break;
            default: message.channel.send('Could not find the game role '+args[0]);
        }
        
        localjson.writeToConfig('ROLES', gameRole, serverRole.id);
    },
};
