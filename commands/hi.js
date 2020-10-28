module.exports = {
    name: 'hi',
    description: 'says hi to the bot',
    execute(message, args){
        message.channel.send('Hi!');
    },
};