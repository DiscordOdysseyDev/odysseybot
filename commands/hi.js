module.exports = {
    name: 'hi',
    description: 'says hi to the bot',
    execute(message, args, callback){
        if(args.length != 1) {
            callbackFunc('No enough arguments');
            return;
        }
        message.channel.send('Hi ' + message.author.username + '!');

        function callbackFunc(error) {
            if(typeof callback == "function") {
                callback(error + '@ module ||hi.js||');
            }
        }
    },
};