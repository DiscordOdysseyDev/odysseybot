const mysql = require('mysql');

var pool = mysql.createPool({
    host: "freedb.tech",
    database: "freedbtech_OdysseyDB",
    user: "freedbtech_odysseydev",
    password: "CostarricA2010."
});

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