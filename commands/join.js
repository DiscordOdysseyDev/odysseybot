var DB = require('../database.js');

module.exports = {
    name: 'join',
    description: 'Joins the game',
    execute(message, args){
        author = message.author;
        username = args[0];
        password = args[1];

        if(args.length != 2) {
            message.channel.send('Bad Syntax');
            console.log('command refused due to bad Syntax');
            return;
        }

        DB.query('SELECT * FROM `players` WHERE `discord-id`', author.id, function(results, err) {
            if(err) {
                console.log(err);
            }
            if(!results.length) {
                DB.query('INSERT INTO `players` (`discord-id`, `password` , `username`) VALUES (?, ?, ?)', [author.id, password, username], function (data, error) {
                    console.log('1 player inserted into the database');
                    message.channel.send(author.username + ' joined the game as: ' + username + '.');
                });
            }
            else {
                console.log('Rejected, the player is already registered')
                message.channel.send('You are already registered');
            }
        });
    },
};