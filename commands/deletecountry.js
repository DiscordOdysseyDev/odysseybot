const DB = require('./../database.js');

module.exports = {
    name: 'deletecountry',
    description: 'Deletes a country',
    execute(message, args, callback){

        DB.query('SELECT * FROM `roles` WHERE `game_role` = ?', 'ADMIN', function(results, error) {
            if(error) {
                console.log(error);
                callbackFunc('query error', null);
                return;
            }
            else {
                let dbid = results['role_id'];
                let cid = message.member.roles.highest.id;
                let target;
                if(args.length) {
                    if(dbid != cid) {
                        message.channel.send('You do not have the permissions to do that!');
                        callbackFunc('permissions error', null)
                        return;
                    }
                    else {
                        target = message.guild.members.cache.find(m => m.displayname === args[0]);
                        target = target.user;
                    }
                }
                else{
                    target = message.author;
                }
                DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', target.id, function(results, error) {
                    if(error){
                        console.log(error);
                        callbackFunc('query error', null)
                        return;
                    }
                    else{
                        console.log(results); //borrar token
                        console.log(results['game-id']);
                        if(results.length){
                            DB.query('DELETE FROM `countries` WHERE `game-id` = ?', results['game-id'], function(results, error) {
                                if(error) {
                                    console.log(error);
                                    callbackFunc('query error', null)
                                    return;
                                }
                            })
                        }
                        else{
                            message.channel.send('You have not joined the game yet');
                            callbackFunc('invalid action', null);
                            return;
                        }
                    }
                });
            }
        });

        callbackFunc(null, target.username + ' country has been deleted');

        function callbackFunc(error, result) {
            if(typeof callback == "function") {
                if(error) callback(error + '@ module ||createcountry.js||', null);
                if(!error) callback(null, result); 
            }
        }
    },
};