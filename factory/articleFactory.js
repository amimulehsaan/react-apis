const { ArticleParamToTable, ArticleCategoryTables} = require("./constants");
const { getDb } = require("../database/sqldb");
class ArticleFactory{
    static async getArticles(articleCategory, page, batchSize){
        return new Promise((fulfil, reject) =>{
            try{
                const db = getDb();
                const queryStr = getQuery(articleCategory, page, batchSize);
                let results;
                db.query(queryStr, (err, result) => {
                    if (!err) {
                        fulfil(result);
                    }
                    else {
                        reject(err);
                    }
                });
                return results;
            }
            catch(err){
                reject(err);
            }
        }); 
    }
}

function getQuery(articleCategory, page, batchSize) {
    const tableName = ArticleParamToTable[articleCategory];
    const queryConstraint = `limit  ${batchSize} offset  ${(page - 1) * batchSize}`;
     switch (tableName){
         case ArticleCategoryTables.GENERAL:
             return `select * from ${ArticleCategoryTables.GENERAL} ${queryConstraint}`;
         case ArticleCategoryTables.SPORTS:
             return `select * from ${ArticleCategoryTables.SPORTS} ${queryConstraint}`;
         case ArticleCategoryTables.POLITICS:
             return `select * from ${ArticleCategoryTables.POLITICS} ${queryConstraint}`;
         case ArticleCategoryTables.CRIME_ACCIDENT:
             return `select * from ${ArticleCategoryTables.CRIME_ACCIDENT} ${queryConstraint}`;
         default:
             return `select * from ${ArticleCategoryTables.GENERAL} union
             select * from ${ArticleCategoryTables.SPORTS} union
             select * from ${ArticleCategoryTables.POLITICS} union
             select * from ${ArticleCategoryTables.CRIME_ACCIDENT} 
             ${queryConstraint}`;
     }
    
}

module.exports = ArticleFactory;