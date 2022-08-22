function getPicsum(event) {
    // Функция для загрузки фотографий с picsum
    event.preventDefault(); // Предотвращаем отправку формы
    document.getElementById('error').innerHTML = ''; // Очищаем вывод ошибки
    const picsumOutput = document.getElementById('output');
    picsumOutput.innerHTML = ''; // Убираем предыдущие фотографии
    const count = parseInt(document.getElementById('count').value);

    if (count < 1 || count > 10 || isNaN(count)) {
        // Проверяем что число входит в диапазон от 1 до 10 и то что оно вообще введено
        document.getElementById('error').innerHTML = 'Число должно быть от 1 до 10!';
    }
    else {
        let xhr = new XMLHttpRequest();
        const url = `https://picsum.photos/v2/list?limit=${count}`;

        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = () => {
            const responseData = JSON.parse(xhr.response)
            for (let i in responseData) {
                const img = document.createElement('img');
                img.setAttribute('src', responseData[i].download_url);
                img.setAttribute('class', 'photo-list__photo')
                picsumOutput.appendChild(img);
                // Создаем <img> элементы и добавляем их на страницу
            }
        }
    }
}

submitButton.addEventListener('click', getPicsum);
