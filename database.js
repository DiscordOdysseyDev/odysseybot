const mysql = require('mysql');
const config = require('./config.json');

var pool = mysql.createPool({
    host: config.DATABASE.HOST,
    database: config.DATABASE.DATABASE,
    user: config.DATABASE.USER,
    password: config.DATABASE.PASSWORD
});

/*var DBP = (function (query, params) { 

    return new Promise(function(resolve, reject) {
        pool.getConnection(query, params, function(err, rows) {
            if(err) reject(err);
            else resolve(rows);
        })
    })

})();*/

var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;
