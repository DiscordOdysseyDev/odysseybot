var DB = require('../database.js')

module.exports = {
    name: 'quit',
    description: 'Quits the current game',
    execute(message, args){
        var id = message.author.id;

        DB.query('DELETE FROM `players` WHERE `discord-id` = ?', id, function (data, error) {
            console.log('1 player deleted from the database');
         });

         message.channel.send(author.username + ' AKA: ' + username + ', has left the game.');
    },
};