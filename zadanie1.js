//Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
const xmlString = `
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
    </list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString,"text/xml");

const listNode = xmlDOM.querySelector("list");
const result = {
    list: []
}

for (let i=0;i<=1;i++) {
    const studNode = listNode.querySelectorAll("student")[i];
    const studNameNode = studNode.querySelector("name");
    const studNameNodeLang = studNode.getAttribute('lang');
    const studNameNodeFirst = studNameNode.querySelector("first");
    const studNameNodeSecond = studNameNode.querySelector("second");
    const studAgeNode = studNode.querySelector("age");
    const studProfNode = studNode.querySelector("prof");
    let person = {
        name: `${studNameNodeFirst.textContent} ${studNameNodeSecond.textContent}`,
        age: Number(studAgeNode.textContent),
        prof: studProfNode.textContent,
        lang: studNameNodeLang
    }
    result.list.push(person);
}
console.log(result);
