const DB = require('./database.js');

var logChannel;

function Logger(client) {
    this.client = client;
    let l;
    DB.query('SELECT * FROM `channels`', null, function(results, error) {
        if(error){
            console.log(error);
            return;
        }
        else {
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                if(row['channel_role'] == 'LOG') l = row['channel_name']; console.log(row);
            });
            logChannel = client.channels.cache.find(c => c.name === l);
        }
    })
}

Logger.prototype.error = function(contents) {
    logChannel.send('Fatal error: ' + contents);
}

Logger.prototype.results = function(contents) {
    logChannel.send(contents);
}

module.exports = {
    Logger: Logger
}