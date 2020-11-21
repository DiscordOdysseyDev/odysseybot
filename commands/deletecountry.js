const DB = require('./../database.js');

module.exports = {
    name: 'deletecountry',
    description: 'Deletes a country',
    execute(message, args, callback){

        DB.query('SELECT * FROM `roles` WHERE `game_role` = ?', 'ADMIN', function(results, error) {
            if(error) {
                console.log(error);
                callbackFunc('query error');
                return;
            }
            else {
                let dbid = results['role_id'];
                let cid = message.member.roles.highest.id;
                if(args.length) {
                    if(dbid != cid) {
                        message.channel.send('You do not have the permissions to do that!');
                        callbackFunc('permissions error')
                        return;
                    }
                }
                DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', message.author.id, function(results, error) {
                    if(error){
                        console.log(error);
                        callbackFunc('query error')
                        return;
                    }
                    else{
                        console.log(results); //borrar token
                        console.log(results['game-id']);
                        if(results.length){
                            DB.query('DELETE FROM `countries` WHERE `game-id` = ?', results['game-id'], function(results, error) {
                                if(error) {
                                    console.log(error);
                                    callbackFunc('query error')
                                    return;
                                }
                            })
                        }
                        else{
                            message.channel.send('You have not joined the game yet');
                            callbackFunc('invalid action')
                            return;
                        }
                    }
                });
            }
        });

        function callbackFunc(error) {
            if(typeof callback == "function") {
                callbackFunc(error + '@ module ||deletecountry.js||');
            }
        }
    },
};