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

        DB.query('INSERT INTO `players` (`discord-id`, `password` , `username`) VALUES (?, ?, ?)', [author.id, password, username], function (data, error) {
            console.log('1 player inserted into the database');
         });

        message.channel.send(author.username + ' joined the game as: ' + username + '.');
    },
};