//Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

//Заголовок первого input — «номер страницы».
//Заголовок второго input — «лимит».
//Заголовок кнопки — «запрос».
//При клике на кнопку происходит следующее:
//Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
//Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
//Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
//Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 

//После получения данных вывести список картинок на экран.
//Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

const btn = document.querySelector('.j-btn-request');
const resultNode = document.querySelector('.result');
const myStorage = window.localStorage;
const useRequest = (sheetNum,limit) => {
    const url = `https://picsum.photos/v2/list?page=${sheetNum}&limit=${limit}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
        myStorage.setItem('last',JSON.stringify(json));
        myStorage.setItem('lastSheetNum',sheetNum);
        myStorage.setItem('lastLimit',limit);
        displayResult(json);
        })
        .catch(() => { console.log('error') });
}
function displayResult(apiData){
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}
btn.addEventListener('click', async () => {
    const sheetNumValue = document.querySelector('.j-input-sheetNum').value;
    const limitValue = document.querySelector('.j-input-limit').value;
    // вместо всей этой гигантской проверки проще не давать пользователю возможность вводить некорректные данные
    // добавив в тег <input> св-ва min и max
    //<input type="number" id="sheetNum" class="input j-input-sheetNum" min="1" max="10" />
    //<input type="number" id="limit" class="input j-input-limit" min="1" max="10" />
    if ((sheetNumValue < 1 || sheetNumValue > 10) && (limitValue < 1 || limitValue > 10)){
        //прошу подсказать можно ли заменить такое перекрашивание полей ввода на
        //что-то более человеческое и читабельное (если это возможно,то прошу
        //объяснить как сделать эту проверку в самом html, с помощью required)
        //чтобы лишний раз не лезть в js
        document.querySelector('.j-input-limit').style.backgroundColor = "coral";
        document.querySelector('.j-input-sheetNum').style.backgroundColor = "coral";
        resultNode.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
    } else if (sheetNumValue < 1 || sheetNumValue > 10){
        document.querySelector('.j-input-sheetNum').style.backgroundColor = "coral";
        resultNode.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
    } else if (limitValue < 1 || limitValue > 10){
        document.querySelector('.j-input-limit').style.backgroundColor = "coral";
        resultNode.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>';
    }else {
        document.querySelectorAll(".input").forEach(item =>{
            item.style.backgroundColor = "aquamarine";
        });
        await useRequest(sheetNumValue, limitValue);
    }
});

let data = JSON.parse(localStorage.getItem('last'));
if (data){
    document.querySelector('.j-input-sheetNum').value = localStorage.getItem('lastSheetNum');
    document.querySelector('.j-input-limit').value = localStorage.getItem('lastLimit');
    displayResult(data);
}
