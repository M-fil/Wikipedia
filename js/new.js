;(function () {
    'use strict';

    const newArticleTitle = document.querySelector("#titleInput"); 
    const newArticleContent = document.querySelector("#ContentInput");
    const newArticleContentResult = document.querySelector("#ContentResult");

    const createArticleButton = document.querySelector("#createNewArticle");

    const createdArticleId = Location.getId();
    const DbArticleData = ArticleFunction.getArticleById(createdArticleId);

    const titlesSelesctList = document.querySelector("#titlesSelesctList");
    const specifyLinkButton = document.querySelector("#specifyLink");

    const EmptyInputsWarning = document.querySelector(".EmptyInputsWarning");

    ArticleFunction
        .createNewArticle(   // Вызываем функцию для создания новой статьи
            newArticleTitle,
            newArticleContent,
            newArticleContentResult,
            createArticleButton,
            createdArticleId,
            DbArticleData,
            EmptyInputsWarning);


    ArticleFunction
        .specifyArticleLink(  // Вызываем функцию для указания ссылки на статью
            titlesSelesctList,
            specifyLinkButton,
            newArticleContent,
            newArticleContentResult);
            
})();

