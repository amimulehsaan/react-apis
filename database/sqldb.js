var mysql = require('mysql');


// var pool = mysql.createPool({
//     connectionLimit: 4,
//     host: "localhost",
//     user: "root",
//     //password: "crackhead",
//     database: "newzinfo"
// });

// pool.getConnection((err, connection) => {
//     if (err)
//         throw err;
//     console.log('Database connected successfully!!');
//     connection.release();
// });

//module.exports = pool;
var dbConnection;
const connectionConfig = {
    connectionLimit: 4,
    host: "localhost",
    user: "root",
    //password: "crackhead",
    database: "newzinfo"
};
module.exports = {
    connectToDb: (cb) => {
        dbConnection = mysql.createConnection(connectionConfig);
        dbConnection.connect((err) => {
            if(!err){
                console.log("sql db connected!");
                cb();
            }
            else{
                console.log("Couldn't connect to DB!", err);
                cb(err);
            }
            
        });
    },
    getDb: () => dbConnection
}