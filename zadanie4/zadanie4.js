//Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
//Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
//Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
//После получения данных вывести ниже картинку на экран.

const btn = document.querySelector('.j-btn-request');
const resultNode = document.querySelector('.result');
const useRequest = (width,height) => {
    const url = `https://picsum.photos/${width}/${height}`;
    fetch(url)
    .then((response) => {
        displayResult(response);
    })
    .catch(() => { console.log('error') });
}
function displayResult(apiData){
    const cardBlock = `
      <div class="card" style="margin: 20px auto;">
        <img
          src="${apiData.url}"
        />
      </div>
    `;
    resultNode.innerHTML = cardBlock;
}
btn.addEventListener('click', async () => {
    const inputWidthValue = document.querySelector('.j-input-width').value;
    const inputHeightValue = document.querySelector('.j-input-height').value;
    if (inputWidthValue < 100 || inputWidthValue > 300 || inputHeightValue < 100 || inputHeightValue > 300){
    resultNode.innerHTML = '<p>Одно из чисел вне диапазона от 100 до 300</p>';
    } else {
        await useRequest(inputWidthValue, inputHeightValue);
    }
});
