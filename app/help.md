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
