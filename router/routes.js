const ApiController = require("../controller/apiController");
const BookController = require("../controller/bookController");
const ArticleController = require("../controller/articleController");
const FileController = require("../controller/fileStreamThroughController");
class Routes{
    static loadRoutes(app){
        app.get("/apiFile", async (req, res) => {
            await FileController.modifyFile(req, res);
        });
        app.get("/api", (req, res)=>{
             ApiController.returnJson(req, res);
        });
        app.get("/api/:id", (req, res) => {
            ApiController.returnJson(req, res);
        });
        app.post("/api", (req, res) => {
            ApiController.insertJson(req, res);
        });
        app.delete("/api/:id", (req, res) => {
            ApiController.deleteJson(req, res);
        });

        //books mongo
        app.get("/books", (req, res) => {
            BookController.getBooks(req, res);
        });

        app.get("/books/:id", (req, res) => {
            BookController.getBook(req, res);
        });

        app.post("/books", (req, res) => {
            BookController.addBook(req, res);
        });

        app.delete("/books/:id", (req, res) => {
            BookController.deleteBook(req, res);
        });

        app.patch("/books/:id", (req, res) => {
            BookController.updateBook(req, res);
        });

        // newzinfo articles
        app.get(["/articles", "/articles/:category"], async (req, res)=>{
            await ArticleController.getArticles(req, res);
        });
        
    }
}

module.exports = Routes;