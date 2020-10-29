module.exports = {
    name: 'createcountry',
    description: 'creates a country with the message author as the owner',
    execute(message, args){
        var name = args[0];
        if(!args.length) {
            message.channel.send('Syntax error, try again');
            return;
        }
        message.channel.send('The country: ´' + name + '´will be created with ´' + message.author.username + '´ as the owner.');
    },
};