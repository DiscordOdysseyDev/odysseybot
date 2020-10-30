module.exports = {
    name: 'join',
    description: 'Joins the game',
    execute(message, args){
        author = message.author;
        username = args[0];
        password = args[1];

        console.log(author.username + ' joined the game as: ' + username);
    },
};