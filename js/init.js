;(function () {
    'use strict';

    const articles = [];         // Массив статей

    if (!localStorage.getItem("articles")) {              // сохраняем массив статей в localStorage
        localStorage.setItem("articles", JSON.stringify(articles));
    }
    
})();