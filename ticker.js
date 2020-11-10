const DB = require('./database.js');
const discord = require('discord.js');

var timer;

var mainChannel;
var logChannel;

var turn = 0;

function update() {
    mainChannel.send('turn tick');
}

function Ticker(client) {
    this.client = client;
}

Ticker.prototype.start = function() {
    let m;
    let l;
    let that = this;
    DB.query('SELECT * FROM `channels`', null, function(results, error) {
        if(error){
            console.log(error);
            return;
        }
        else{
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                if(row['channel_role'] == 'MAIN') m = row['channel_name'];
                else if(row['channel_role'] == 'LOG') l = row['channel_name'];
              });
        }

        mainChannel = that.client.channels.cache.find(channel => channel.name === m);
        logChannel = that.client.channels.cache.find(channel => channel.name === l);
        mainChannel.send('ticker.js started');
    })
    DB.query('SELECT * FROM `game_status`', null, function(results, error) {
        if(error){
            console.log(error);
            return;
        }
        else{
            turn = results['turn'];
        }
    });
    
    timer = setInterval(update, 1800000);
}

module.exports = {
    Ticker: Ticker
}