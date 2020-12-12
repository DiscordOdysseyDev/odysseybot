var DB = require('../database.js');

module.exports = {
    name: 'join',
    description: 'Joins the game',
    execute(message, args, callback){
        author = message.author;
        username = args[0];
        password = args[1];

        if(args.length != 2) {
            message.channel.send('Bad Syntax');
            console.log('command refused due to bad Syntax');
            callbackFunc('bad syntax', null);
            return;
        }

        DB.query('SELECT * FROM `players` WHERE `discord-id`', author.id, function(results, error) {
            if(error) {
                console.log(error);
                callbackFunc('query error', null);
                return;
            }
            if(!results.length) {
                DB.query('INSERT INTO `players` (`discord-id`, `password` , `username`) VALUES (?, ?, ?)', [author.id, password, username], function (data, error) {
                    if(error) {
                        callbackFunc('query error', null);
                        return;
                    }
                    console.log('1 player inserted into the database');
                    message.channel.send(author.username + ' joined the game as: ' + username + '.');
                });
            }
            else {
                console.log('Rejected, the player is already registered')
                callbackFunc('command rejected', null);
                message.channel.send('You are already registered');
                return;
            }
        });

        callbackFunc(null, username + ' has joined the game!');

        function callbackFunc(error, result) {
            if(typeof callback == "function") {
                if(error) {
                    callback(error + '@ module ||hi.js||', null);
                }
                if(result) {
                    callback(null, result);
                }
            }
        }
    },
};