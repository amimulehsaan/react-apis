const ArticleFactory = require("../factory/articleFactory");

class ArticleController{
    static async getArticles(req, res){
        
        //current page
        const page = Number(req.query.page) || 1;
        const articleCategory =  req.params.category || "";
        const articlesPerPage = 3;
        const results = await ArticleFactory.getArticles(articleCategory, page, articlesPerPage);
        res.json(results);
        
    }
}

module.exports = ArticleController;