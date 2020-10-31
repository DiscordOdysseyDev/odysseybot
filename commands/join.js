module.exports = {
    name: 'join',
    description: 'Joins the game',
    execute(message, args, con){
        author = message.author;
        username = args[0];
        password = args[1];

        console.log('command received with '+args.length+' arguments');

        if(args.length != 2) {
            message.channel.send('Bad Syntax');
            console.log('command refused due to bad Syntax');
            return;
        }

        con.query('INSERT INTO `players` (`discord-id`, `password` , `username`) VALUES (?, ?, ?)', [author.id, password, username], function(err, result) {
            if(err) throw err;
            console.log('1 player inserted to database');
        });
        con.end;

        message.channel.send(author.username + ' joined the game as: ' + username);
    },
};