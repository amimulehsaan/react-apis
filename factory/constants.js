const ArticleCategoryTables = {
    GENERAL: 'general',
    POLITICS: 'politics',
    SPORTS: 'sports',
    CRIME_ACCIDENT: 'crime_accident'
};

const ArticleParamToTable = {
    general: ArticleCategoryTables.GENERAL,
    politics: ArticleCategoryTables.POLITICS,
    sports: ArticleCategoryTables.SPORTS,
    morbid: ArticleCategoryTables.CRIME_ACCIDENT
};

module.exports = { ArticleCategoryTables, ArticleParamToTable};


