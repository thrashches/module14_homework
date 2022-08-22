const xmlData = `
<list>
    <student>
    <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
    </student>
    <student>
    <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
    </student>
</list>`;

const parser = new DOMParser();

const parsedData = parser.parseFromString(xmlData, 'application/xml');

const output = {
    list: []
}


for (let i = 0; i < parsedData.querySelectorAll('student').length; i++) {
    const item = parsedData.querySelectorAll('student')[i];
    const first = item.querySelector('name').querySelector('first').innerHTML;
    const second = item.querySelector('name').querySelector('second').innerHTML;
    // Вытаскиваем данные из каждого <student> и добавляем их в объект
    const jsonItem = {
        name: `${first} ${second}`,
        age: parseInt(item.querySelector('age').innerHTML),
        prof: item.querySelector('prof').innerHTML,
        lang: item.querySelector('name').getAttribute('lang')
    }
    output.list.push(jsonItem);
    // Добавляем созданный объект в список
}

console.log(output);
