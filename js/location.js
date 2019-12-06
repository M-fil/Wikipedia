;(function () {
    'use strict';

    const Location = {}; 

    Location.getId = function getId() { // Функция для получения id из location.search
        if (!location.search) {
            return false;
        }

        const articleIds = location.search.slice(1).split("="); // Разбиваем строку послу домена по знаку "="
        const index = articleIds.indexOf("id");                // Вытаскиваем значение нужного id
        articleIds.push(-1);                                   // Добавляем -1, чтобы в некоторых случаях не выводился undefined

        if (index === -1) {
            return false;
        }

        return parseInt(articleIds[index + 1]);               //Преобразум значение id в число
    }


    window.Location = Location;
})();