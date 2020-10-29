module.exports = {
    name: 'setmainchannel',
    description: 'Sets this channel as the main channel',
    execute(message, args){
        var ch = message.channel;
        message.channel.send(ch.name + ' id: ' + ch.id + ' will be set as the main channel.');
    },
};