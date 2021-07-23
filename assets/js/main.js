const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
};

const getMockData = (t) => +t.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((cartPrice + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  contentContainer.removeEventListener('click', fn);
    t.disabled = true;
}
const enableControls = (t, fn) => {
    t.disabled = false;
    contentContainer.addEventListener('click', fn);
}


const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  let restoreHtml = null;

  if (target && target.matches('.item-actions__cart')) {
    incrementCounter();

    cartPrice = getPrice(target, cartPrice);

    restoreHtml = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    //ниже получаем число, без лишних символов, при нажатии на кнопку
    // console.log(+target.parentElement.previousElementSibling.innerHTML.replace('$', '').replace(' <sup>', '.').replace('</sup>', ''));
    
    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHtml;
      enableControls(target, btnClickHandler);
    }, interval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);