const {MongoClient} = require("mongodb");
let dbConnection;
let connectionString = "mongodb+srv://amimehsaan:changezkhan@cluster0.talcrkq.mongodb.net/?retryWrites=true&w=majority";
module.exports = {
    connectToDb: (cb)=> {
        MongoClient.connect(connectionString)
        .then(client => {
            dbConnection = client.db();
            cb();
        })
        .catch(err=>{
            console.log(err);
            cb(err);
        });
    },
    getDb: () => dbConnection
}