var DB = require('../database.js')

module.exports = {
    name: 'quit',
    description: 'Quits the current game',
    execute(message, args){
        var author = message.author;

        DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', author.id, function(results, err) {
            if(err) {
                DB.end;
                console.log(err);
            }
            if(!results.length) {
                console.log('Rejected, the player is not registered')
                message.channel.send('You have not joined the game yet');
            }
            else {
                DB.query('DELETE FROM `players` WHERE `discord-id` = ?', author.id, function (data, error) {
                    console.log('1 player deleted from the database');
                    message.channel.send(author.username + ' has left the game.');
                 });
            }
        });
    },
};