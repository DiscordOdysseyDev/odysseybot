const localjson = require('./../localjson.js');

module.exports = {
    name: 'setchannel',
    description: 'Sets this channel as the main channel',
    execute(message, args){
        var key;
        switch(args[0])
        {
            case 'main': key = 'MAIN_CHANNEL'; break;
            default: message.channel.send('Unknwon channel');
        }
        localjson.writeToConfig(key, message.channel.id);
    },
};