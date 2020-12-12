var DB = require('../database.js')

module.exports = {
    name: 'quit',
    description: 'Quits the current game',
    execute(message, args, callback){
        var author = message.author;

        DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', author.id, function(results, err) {
            if(err) {
                console.log(err);
                callbackFunc('query error', null);
                return;
            }
            if(!results.length) {
                console.log('Rejected, the player is not registered')
                message.channel.send('You have not joined the game yet');
                callbackFunc('command rejected', null);
                return;
            }
            else {
                DB.query('DELETE FROM `players` WHERE `discord-id` = ?', message.author.id, function (data, error) {
                    if(error) {
                        callbackFunc('query error');
                        return;
                    }
                    console.log('1 player deleted from the database');
                    message.channel.send(author.username + ' has left the game.');
                 });
            }
        });
        callbackFunc(null, author.username + 'left the game');

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