var DB = require('../database.js');

module.exports = {
    name: 'setrole',
    description: 'assigns a server role to a game role',
    execute(message, args, callback){
        if(args.length != 2) {
            message.channel.send('Syntax error, try again');
            callbackFunc('bad syntax', null);
            return;
        }
        
        var serverRole = message.guild.roles.cache.find(r => r.name === args[0]);
        if(!serverRole) {
            message.channel.send('Could not find the role '+args[1]+' in this server');
            callbackFunc('Unknown role', null);
            return;
        }
        

        var gameRole;
        switch(args[1])
        {
            case 'admin': gameRole = 'ADMIN'; break;
            default: message.channel.send('Could not find the game role '+args[1]); callbackFunc('Unknown role'); return;
        }
        
        DB.query('SELECT * FROM `roles` WHERE `game_role` = ?', gameRole, function(results, error) {
            if(error){
                console.log(error);
                callbackFunc('query error', null);
                return
            }
            
            if(results.length){
                console.log('role exists');
                DB.query('DELETE FROM `roles` WHERE `game_role` = ?', gameRole, function(results, error) {
                    if(error){
                        console.log(error);
                        callbackFunc('query error', null);
                        return;
                    }
                    console.log('A role with the ingame role '+channelRole+' has been deleted');
                });
            }
            console.log('role does not exist');
            DB.query('SELECT * FROM `roles` WHERE `role_id` = ?', serverRole.id, function(results, error) {
                if(error){
                    message.channel.send('There was an error processing this command');
                    console.log(error);
                    callbackFunc('query error', null);
                    return;
                }
        
                if(results.length){
                    console.log('id exists');
                    DB.query('UPDATE `roles` SET `game_role` = ? WHERE `role_id`', [gameRole, serverRole.id], function(results, error) {
                        if(error){
                            console.log(error);
                            callbackFunc('query error', null);
                            return;
                        }
                        console.log(results);
                    })
                }
                else{
                    console.log('id does not exist')
                    DB.query('INSERT INTO `roles` (`role_name`, `role_id` , `game_role`) VALUES (?, ?, ?)', [serverRole.name, serverRole.id, gameRole], function (results, error) {
                        if(error){
                            console.log(error);
                            callbackFunc('query error', null);
                            return;
                        }
                        console.log(serverRole.name+' set as '+gameRole+' ingame role');
                    });
                    }
                });
            });
        
        message.channel.send(serverRole.name+' succesfuly set as '+gameRole+' ingame role');
        callbackFunc(null, serverRole.name+' succesfuly set as '+gameRole+' ingame role');

        function callbackFunc(error, result) {
            if(typeof callback == "function") {
                if(error) {
                    callback(error + '@ module ||setrole.js||', null);
                }
                if(result) {
                    callback(null, result);
                }
            }
        }
    },
};
