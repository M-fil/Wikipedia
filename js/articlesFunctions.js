;(function () {
    // ВАЖНО!!! --> Функция marked() преобразует текст в Markdown <--
    
    const ArticleFunction = {}; //Объект функция для статей

    const json = localStorage.getItem("articles"); //Получаем данные из localStorage
    const articles = JSON.parse(json); // Преобразуем строку JSON в объект


    articles.sort((a, b) => b.id - a.id); // Сортируем статьи по убыванию параметра id

    ArticleFunction.getArticleById = function getArticleById(id) { // Функция для получения статьи по id из localStorage
        for (let article of articles) {
            if (article.id === id) {
                return JSON.parse(JSON.stringify(article));
            }
        }
        return null;
    }

    ArticleFunction.getLastArtciles = function getlastArtciles(articlesPlace) { // Функция для вставки заголовков 3-х последних статей
        let newArticleStr = "";

        for (let i = 0; i < articles.length; i++) {
            if (i > 2) continue;                
            
            let currentArticle = articles[i];

            if (currentArticle.title.length > 40) {
                currentArticle.title = currentArticle.title.substr(0, 40) + "...";
            }

            newArticleStr += `
            <li class="articles-list-item">
            <a href="article.html?id=` + currentArticle.id + `" class="articles-list-link">` + currentArticle.title + `</a>
            </li>
            `;
        }

        articlesPlace.innerHTML = newArticleStr;
    }


    ArticleFunction.getAllArticles = function getAllArticles(articlesPlace) { // Функция для вставки заголовков всех статей
        let allArticleStr = "";

        for (let i = 0; i < articles.length; i++) { 
            let currentArticle = articles[i];
            allArticleStr += `
            <li class="other-list__item">
                <a class="other-list__link" href="article.html?id=` + currentArticle.id + `">` + currentArticle.title + `</a>
            </li>

            `;
        }

        articlesPlace.innerHTML = allArticleStr;
    }


    ArticleFunction.createNewArticle = 
        function createNewArticle( //Функция для создания новой статьи
            titleInput,
            contentInput,
            contentResult,
            button,
            id,
            artcileFromDatabase,
            EmptyInputsWarning) {

                contentInput.addEventListener("input", function (event) { 
                    contentResult.innerHTML = marked(contentInput.value); 
                    EmptyInputsWarning.classList.remove("show");     //Убираем предупреждение о пустых полях при наборе тескта
                });

                titleInput.addEventListener("input", function (event) {
                    EmptyInputsWarning.classList.remove("show");    //Убираем предупреждение о пустых полях при наборе тескта
                })

                if (id) { // Если id из location.search и мы хотим редактировать статью
        
                    let article = null;
                    if (artcileFromDatabase.id === id) { //Если id из location.search совпадает с id из localSotorage
                        article = artcileFromDatabase;
                    }
            
                    titleInput.value = article.title;
                    contentInput.value = article.content;
            
                    contentResult.innerHTML = marked(article.content); // Заполняем колонку предпросмотра содержимого статьи
                } 
            
            
                button.addEventListener("click", function (event) { // Отслеживаем нажатие на кнопку "Сохранить статью"
                    if (titleInput.value.length == 0 || contentInput.value.length == 0) { // Если поля пустые, то показываем предупреждение
                        EmptyInputsWarning.classList.add("show");
                        return false;
                    }

                    if (id) {
                        for (let article of articles) { // Если мы хотим редактировать статью, то всатвляем данные из localStorage
                            if (article.id === id) {
                                article.title = titleInput.value;
                                article.content = contentInput.value
                            }
                        }
                    } 
                    else {                   // Если же мы хотим создать новую статью
                        const newArticle = { // Основные данные статьи
                            id: 0,
                            title: titleInput.value,
                            content: contentInput.value
                        };
                
                        newArticle.id = articles.length + 1; // Увеличиваем id статьи на 1
                
                        articles.push(newArticle); // Добавляем статью в массива статей
                    }
                    
                    localStorage.setItem("articles", JSON.stringify(articles)); // Сохраняем созданную статью в localStorage
            
                    if (id) { // При нажатии на кнопку перенаправляем пользователя на страницу с данными статьи
                        location.replace("./article.html?id=" + id);
                    } else {
                        location.replace("./article.html?id=" + articles[articles.length - 1].id);
                    }
            });
    }



    ArticleFunction.specifyArticleLink = // Функция для указания ссылки на статью в всплывающем окне
        function specifyArticleLink(
            selectElement,
            button,
            pastePlace,
            contentResult) {
                                     
        let option = null;

        for (let i = 0; i < articles.length; i++) { // Заполняем тег select заголвками статей
            let currentArticle = articles[i];
            option = document.createElement("option")
            option.text = currentArticle.title;
            option.value = currentArticle.id;

            selectElement.options[i] = option;
        }

        button.addEventListener("click", function (event) { // Отслеживаем нажатие на кнопку "Добавить ссылку"
            event.preventDefault();

            let selectedOption = selectElement.options[selectElement.options.selectedIndex];
            let articleLinkTemplate = `[${selectedOption.text}](article.html?id=${parseInt(selectedOption.value)})`;
            pastePlace.value += articleLinkTemplate;
    
            pastePlace.focus();

            contentResult.innerHTML += marked(articleLinkTemplate);
        }); 
    }
            


    window.ArticleFunction = ArticleFunction;
})();