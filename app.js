require("./global")(__dirname);
const express = require('express');
//const { connectToDb } = require("./database/mongodb");
const { connectToDb } = require("./database/sqldb");
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);
const BodyParser = require('body-parser');
const routes = require("./router/routes");
const { exit } = require("process");
app.use(cors({
    origin: '*'
}));
// connectToDb((err)=>{
//     if(!err){
//         server.listen(1100, () => console.log("Server listening to port 1100"));
//     }
//     else{
//         exit();
//     }
// });
server.listen(1100, () => console.log("Server listening to port 1100"));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded());
app.use(express.json());



routes.loadRoutes(app);


