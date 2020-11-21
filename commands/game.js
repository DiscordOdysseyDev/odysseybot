const tick = require('./../ticker.js');

function start(guild) {
    const ticker = new tick.Ticker(guild)
    console.log('Deploying timer...');
    ticker.start();
}

module.exports = {
    name: 'game',
    description: 'game options',
    execute(message, args, callback){
        if(!args.length){
            message.channel.send('bad syntax');
            callbackFunc('bad syntax')
            return;
        }
        switch(args[0]) {
            case 'start': start(message.guild); break;
            default: callbackFunc('bad argument'); return;
        }

        function callbackFunc(error) {
            if(typeof callback == "function") {
                callback(error + '@ module ||hi.js||');
            }
        }
    },
};