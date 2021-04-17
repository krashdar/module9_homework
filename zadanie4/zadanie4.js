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