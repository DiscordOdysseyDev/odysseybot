module.exports = {
    name: 'help',
    description: 'Get help with commands',
    execute(message, args){
        message.channel.send('Helping!');
    },
};