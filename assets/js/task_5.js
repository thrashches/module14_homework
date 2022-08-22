function getPhoto(event) {
    // Функция для загрузки фотографий с picsum
    event.preventDefault(); // Предотвращаем отправку формы
    document.getElementById('error').innerHTML = ''; // Очищаем вывод ошибки
    const picsumOutput = document.getElementById('output');
    picsumOutput.innerHTML = ''; // Убираем предыдущие фотографии

    // Получаем размеры и проверяем их
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    if (height < 100 || height > 300 || width < 100 || width > 300 || isNaN(width) || isNaN(height)) {
        document.getElementById('error').innerHTML = 'Одно из чисел вне диапазона от 100 до 300!';
    }
    else {
        fetch(`https://picsum.photos/${width}/${height}`)
            .then((response) => {return response.blob()}) // Формируем blob
            .then((blob) => {
                // Создаем url из blob и создаем <img>
                const url = URL.createObjectURL(blob);
                const img = document.createElement('img');
                img.setAttribute('src', url);
                img.setAttribute('width', width);
                img.setAttribute('height', height);
                picsumOutput.appendChild(img);
            })
            .catch((error) => {
                // Обрабатываем ошибку при загрузке(сработает если нет интернета или сервер недоступен)
                document.getElementById('error').innerHTML = 'Не удалось получить изображение!';
            })
    }
}

submitButton.addEventListener('click', getPhoto);
