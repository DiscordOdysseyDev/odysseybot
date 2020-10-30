module.exports = {
    name: 'setchannel',
    description: 'Sets this channel as the main channel',
    execute(message, args){
        var ch = message.channel;
        switch(args[0])
        {
            case 'main': message.channel.send(ch.name + ' id: ' + ch.id + ' will be set as the main channel.');
            default: message.channel.send('Unknwon channel')
        }
    },
};