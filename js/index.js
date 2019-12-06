;(function () {
    'use strict';


    const articleTitle = document.querySelector("#articleTitle");        //Место для вставки заголовка самой свежей статьи
    const articleContent = document.querySelector("#articleContent");   //Место для вставки содержимого самой свежей статьи

    const newArticlesPlace = document.querySelector("#newArticlesElement");
    const allArticlesPlace = document.querySelector("#allArticlesElement");

    const readArticleButton = document.querySelector("#readArticle");

    const json = localStorage.getItem("articles");
    const articles = JSON.parse(json);

    if (articles.length > 0) {
        let titleDB = articles[articles.length - 1].title; // Заголовок самой свежей статьи                
        let contentDB = marked(articles[articles.length - 1].content); // Содержимое самой свежей статьи

        if (contentDB.length > 200) { // Если длина содержимого статьи больше 200, то обрезаем её
            contentDB = marked(articles[articles.length - 1].content.substr(0, 200) + "...");
        }

        articleTitle.innerHTML = titleDB;       //Вставляем данные из самой свежей статьи
        articleContent.innerHTML = contentDB;  //Вставляем данные из самой свежей статьи*/

        readArticleButton.href = "article.html?id=" + articles[articles.length - 1].id; //Перенаправляем пользователя на страницу содержимого самой свежей статьи
    }
    //**************************** */

    for (let article of articles) {
        if (article.title.length > 10) { // Если длина заголовка статьи больше 200, то обрезаем её
            article.title.substr(0, 10) + "...";
        }
    }

    ArticleFunction.getLastArtciles(newArticlesPlace); // Вызываем функцию для вывода последних 3-х заголовков статей
    ArticleFunction.getAllArticles(allArticlesPlace); // Вызываем функцию для вывода всех заголовков статей

    
})();


