var DB = require('../database.js');

module.exports = {
    name: 'setchannel',
    description: 'Sets a channel role in the game',
    execute(message, args, callback){
        if(args.length != 2) {
            message.channel.send('Syntax error, try again');
            callbackFunc('bad syntax', null);
            return;
        }
        
        var channelRole;
        switch(args[1]) {
            case 'main': channelRole = 'MAIN'; break;
            case 'logs': channelRole = 'LOG'; break;
            default: message.channel.send('Unknown channel role'); callbackFunc('bad syntax', null); return;
        }

        var channel;
        if(args[0] == 'this') {
            channel = message.channel;
        }
        else{
            channel = message.guild.channels.cache.find(c => c.name === args[0]);
            if(!channel) {
                console.log('Could not find the channel '+args[0]);
                callbackFunc('Unknown channel', null);
                return;
            }
        }
        
        DB.query('SELECT * FROM `channels` WHERE `channel_role` = ?', channelRole, function(results, error) {
            if(error){
                message.channel.send('There was an error processing this command');
                callbackFunc('query error', null);
                console.log(error);
                return;
            }
            
            if(results.length){
                console.log('role exists');
                DB.query('DELETE FROM `channels` WHERE `channel_role` = ?', channelRole, function(results, error) {
                    if(error){
                        message.channel.send('There was an error processing this command');
                        console.log(error);
                        callbackFunc('query error', null);
                        return;
                    }
                    console.log('A channel with the role '+channelRole+' has been deleted');
                });
            }
            console.log('role does not exist');
            DB.query('SELECT * FROM `channels` WHERE `channel_id` = ?', channel.id, function(results, error) {
                if(error){
                    console.log(error);
                    callbackFunc('query error', null);
                    return;
                }
        
                if(results.length){
                    console.log('id exists');
                    DB.query('UPDATE `channels` SET `channel_role` = ? WHERE `channel_id`', [channelRole, channel.id], function(results, error) {
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
                    DB.query('INSERT INTO `channels` (`channel_name`, `channel_id` , `channel_role`) VALUES (?, ?, ?)', [channel.name, channel.id, channelRole], function (results, error) {
                        if(error){
                            callbackFunc('query error', null);
                            console.log(error);
                            return;
                        }
                        console.log(channel.name+' set as '+channelRole+' channel');
                    });
                    }
                });
            });

        message.channel.send(channel.name+' succesfuly set as '+channelRole+' channel');
        callbackFunc(null, args[0] + ' succesfully set as ' + args[1] + ' channel');
        
        function callbackFunc(error, result) {
            if(typeof callback == "function") {
                if(error) {
                    callback(error + '@ module ||setchannel.js||', null);
                }
                if(result) {
                    callback(null, result);
                }
            }
        }
    },
};
