const DB = require('./database.js');
const LocalDB = require('@replit/database');
const CronJob = require('cron').CronJob;

var localDB = new LocalDB();
var timer;

var mainChannel;
var logChannel;

var turn;


function update() {
    localDB.get('turn', { raw: false }).then(r => {
        localDB.set('turn', r+1).then(c => {
            turn = r;
            logChannel.send('turn #'+turn);
        })
    });
}

const job = new CronJob('00 00 00 * * *', function() {
	const d = new Date();
	logChannel.send('Turn changed at: ', d)
    update();
});

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
        logChannel.send('ticker.js started');
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
}

Ticker.prototype.clear = function() {
    localDB.empty().then(localDB.set('turn', 0));
}

Ticker.prototype.stop = function() {
    try {
        job.stop();
    }catch(error) {
        console.log(error);
    }
    
}

Ticker.prototype.start = function() {
    console.log('Attempting to start CronJob');
    try {
        job.start();
    } catch(e) {
        console.error(e);
    }
    console.log('CronJob created successfully');
}

module.exports = {
    Ticker: Ticker
}