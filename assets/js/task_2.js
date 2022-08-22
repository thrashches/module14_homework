jsonData = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
`

const obj = JSON.parse(jsonData);

for (let itemIndex in obj.list) {
    // Исправляем тип данных в поле возраста
    obj.list[itemIndex].age = parseInt(obj.list[itemIndex].age);
}
console.log(obj);
