;(function () {
    'use strict';


    const json = localStorage.getItem("articles");
    const articles = JSON.parse(json);

    const createdArticleId = Location.getId();
    const DbArticleData = ArticleFunction.getArticleById(createdArticleId);

    const articleTitle = document.querySelector("#articleTitle");
    const articleContent = document.querySelector("#articleContent");

    const newArticlesPlace = document.querySelector("#newTitlesArticlesPlace");

    const editArtcileContentButton = document.querySelector("#editArticle");


    for (let article of articles) {        // Заполняем блоки данными нужных нам статей, которые хранятся в localStorage
        if (article.id === createdArticleId) {
            articleTitle.innerHTML = marked(article.title);
            articleContent.innerHTML = marked(article.content);
        }
    }
        

    editArtcileContentButton.addEventListener("click", function (event) { // Отслеживаем нажатие на кнопку "Редактировать статью"
        editArtcileContentButton.href = "new.html?id=" + DbArticleData.id;     // Перенаправляем пользователя на страницу для редактирования статьи
    });

    ArticleFunction.getLastArtciles(newArticlesPlace); // Вызываем функцию для вывода последних 3-х заголовков статей
})();