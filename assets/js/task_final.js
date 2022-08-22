// Задаем сообщения для ошибок
const pageNumError = 'Номер страницы вне диапазона от 1 до 10';
const limitValueError = 'Лимит вне диапазона от 1 до 10';
const pageLimitValueError = 'Номер страницы и лимит вне диапазона от 1 до 10';
const picsumOutput = document.getElementById('output'); // Очищаем фото


function setError(errorMessage) {
    // Функция устанавливает сообщение об ошибке на странице
    document.getElementById('error').innerHTML = errorMessage;
}

function appendPhoto(url) {
    // Функция Добавляет фото на страницу
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('class', 'photo-list__photo');
    picsumOutput.appendChild(img);
}

function setStorage(data) {
    // Добавляет результат запроса в localStorage
    localStorage.setItem('photos', JSON.stringify(data));
}

function getStorageData() {
    // Получает данные из localStorage
    return JSON.parse(localStorage.getItem('photos'));
}

function sendRequest(event) {
    // Функция отправки запроса
    event.preventDefault(); // Предотвращаем отправку формы
    setError(''); // Очищаем вывод ошибки
    const picsumOutput = document.getElementById('output');
    picsumOutput.innerHTML = ''; // Убираем предыдущие фотографии

    // Проверяем введенные данные
    const page = parseInt(document.getElementById('page').value);
    const limit = parseInt(document.getElementById('limit').value);
    if ((page < 1 || page > 10 || isNaN(page)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        setError(pageLimitValueError);
    }
    else if (page < 1 || page > 10 || isNaN(page)) {
        setError(pageNumError);
    }
    else if (limit < 1 || limit > 10 || isNaN(limit)) {
        setError(limitValueError);
    }
    // Задаем сообщения об ошибках. Если все в порядке, то формируем запрос
    else {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let i in data) {
                    appendPhoto(data[i].download_url); // Добавляем фото на страницу
                }
                setStorage(data); // Записываем полученные данные в localStorage
            })
    }
}

submitButton.addEventListener('click', sendRequest);
window.addEventListener('load', () => {
    // Срабатывает при загрузке страницы, добавляет последние просмотренные фото
    const data = getStorageData();
    for (let i in data) {
        appendPhoto(data[i].download_url);
    }
})