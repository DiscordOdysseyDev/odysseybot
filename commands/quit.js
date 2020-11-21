var DB = require('../database.js')

module.exports = {
    name: 'quit',
    description: 'Quits the current game',
    execute(message, args, callback){
        var author = message.author;

        DB.query('SELECT * FROM `players` WHERE `discord-id` = ?', author.id, function(results, err) {
            if(err) {
                console.log(err);
                callbackFunc('query error');
                return;
            }
            if(!results.length) {
                console.log('Rejected, the player is not registered')
                message.channel.send('You have not joined the game yet');
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

        function callbackFunc(error) {
            if(typeof callback == "function") {
                callback(error + '@ module ||hi.js||');
            }
        }
    },
};