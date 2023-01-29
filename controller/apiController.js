const fs = require("fs");
const path = require("path");
class ApiController{
    static returnJson(req, res){
        const filePath = path.join(global.__rootDir, "files/blogs.json");
        fs.readFile(filePath, 'utf8', (error, data) =>{
            getFileData(data, req, res);
        });  
    } 

    static insertJson(req, res) {
        const filePath = path.join(global.__rootDir, "files/blogs.json"); 
        var parsedData ;
        fs.readFile(filePath, 'utf8', (error, data) => {
            parsedData = JSON.parse(data);
            var payload = req.body;
            payload.id = parsedData.length + 1;
            parsedData.push(payload); 
            var dataWrite = JSON.stringify(parsedData);
            fs.writeFile(filePath, dataWrite, (err) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end("thanks");
            });
        }); 
    }

    static deleteJson(req, res) {
        const filePath = path.join(global.__rootDir, "files/blogs.json");
        var parsedData;
        fs.readFile(filePath, 'utf8', (error, data) => {
            parsedData = JSON.parse(data);
            const filteredData = parsedData.filter(data => data.id !== Number(req.params.id));
            var dataWrite = JSON.stringify(filteredData);
            fs.writeFile(filePath, dataWrite, (err) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end("deleted blog with ID:" + req.params.id);
            });
        });
    }
};

function getFileData(dataList, req, res) {
    setTimeout(() => {
        const parsedData = JSON.parse(dataList);
        if (!!req.params.id) {
            const dataFiltered = parsedData.filter(data => data.id === Number(req.params.id)) || [];
            res.json(dataFiltered.length ? dataFiltered[0] : null);
        }
        else {
            res.json(parsedData);
        }

    }, 1000);//delaying it by one second to show the loading message in the front end
}

module.exports = ApiController