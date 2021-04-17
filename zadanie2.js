const message = `
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
`;

const data = JSON.parse(message);
const list = data.list;

const result = {
    list: [
        { name: list[0].name,
            age: list[0].age,
            prof: list[0].prof
        },
        { name: list[1].name,
            age: list[1].age,
            prof: list[1].prof
        },
    ]
}
console.log(result);