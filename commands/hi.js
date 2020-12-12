module.exports = {
    name: 'hi',
    description: 'says hi to the bot',
    execute(message, args, callback){
        if(args.length != 1) {
            callbackFunc('No enough arguments', null);
            return;
        }
        
        message.channel.send('Hi ' + message.author.username + '!');
        callbackFunc(null, 'hi!');

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