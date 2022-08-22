function getRandomInteger() {
    // Функция, генерирующая число от 1 до 100
    return Math.floor(Math.random() * 101);
}

const generateRandomInt = new Promise((resolve, reject) => {
    setTimeout(() => {
        const randValue = getRandomInteger();
        if (randValue % 2 == 0) {
            // Если randValue делится на 2 без остатка, вызываем resolve()
            resolve({
                message: `Завершено успешно.`,
                data: randValue
            });
        }
        else {
            // В противном случае вызываем reject()
            reject({
                message: `Завершено с ошибкой.`,
                data: randValue
            });
        }
    }, 3000);
})

generateRandomInt // Запускаем Promise
    .then((result) => {
        // Обрабатываем resolve()
        return result.data;
    })
    .then((data) => {
        // Обрабатываем данные из resolve()
        console.log(`Завершено успешно. Сгенерированное число — ${data}`);
    })
    .catch((error) => {
        // Обрабатываем reject()
        console.log(`Завершено с ошибкой. Сгенерированное число — ${error.data}`);
    })
