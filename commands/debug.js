const config = require('./../config.json');

module.exports = {
    name: 'debug',
    description: 'debug options',
    execute(message, args){
        if(args.lenght != 1) {
            message.channel.send('Syntax error, try again');
            return;
        }

        switch(args[0]) {
            case 'channels': console.log(config.CHANNELS);
            default: message.channel.send('Unknown option');
        }
    },
};