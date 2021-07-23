const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = '${++cartCounter}';
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
};

const btnClickHandler = (e) => {
  const target = e.target;

  if (target && target.matches('.item-actions__cart')) {
    incrementCounter();

    const mockData = +target.parentElement.previousElementSibling.innerHTML.replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

    cartPrice = Math.round((cartPrice + mockData) * 100) / 100;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    //ниже получаем число, без лишних символов, при нажатии на кнопку
    // console.log(+target.parentElement.previousElementSibling.innerHTML.replace('$', '').replace(' <sup>', '.').replace('</sup>', ''));
  }
};

contentContainer.addEventListener('click', btnClickHandler)