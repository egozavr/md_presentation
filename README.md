# `md_presentation` - презентация MarkDown-слайдов

`md_presentation` - простое приложение для презетации слайдов, отформатированных с использованием
синтаксиса MarkDown.

### Запуск презентации:
1. Скопировать файлы `.md` со слайдами презентации в каталог `app/presentation`.
2. В файле `package.json` изменить в строке 
    ```json
    "start": "http-server -a localhost -p 8000 -c-1 ./app"
    ```
    `localhost` на IP-адрес вашего сервера.
3. Запустить web-server из каталога `/app` командой:

    ```bash
    npm start
    ```
4. Зайти на страницу `http://<your_ip_address>:8000`.

Если все нормально, должен отобразиться первый слайд презентации. 

Слайды в презентации отображаются в порядке "имена файлов слайдов `.md` по возрастанию".

### Keyboard shortcuts
Key | Action
--- | ---
&lt;Space>, &lt;Right Arrow> | Next slide
&lt;Backspace>, &lt;Left Arrow> | Previous slide
NumPad + | Zoom In
NumPad - | Zoom Out
NumPad / | Zoom Reset

### Подсветка кода
Подсветка кода осуществляется с помощью библиотеки [highlight.js](https://highlightjs.org/).
В приложение включена custom-сборка `highlight.js` с ограниченным набором языков для подсветки:
- CSS
- JavaScript
- Bash
- JSON
- Markdown
- HTML, XML
- Java
- Python

Для подсветки блока кода можно явно указать язык кода, например:
```markdown
    ```javascript
    var foo = bar;
    ```
```
Если язык не указан, `highlight.js` попытается определить его автоматически.

Для отключения подветки вместо языка необходимо указать `nohighlight`:
```nohighlight
    ```nohighlight
    Something pale...
    ```
```