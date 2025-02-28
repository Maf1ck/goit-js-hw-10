import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const stateRadio = document.querySelector('input[name="state"]:checked');

  if (!stateRadio) {
    iziToast.error({
      title: 'Помилка',
      message: 'Оберіть стан обіцянки!',
      position: 'topRight',
    });
    return;
  }

  const state = stateRadio.value === 'fulfilled';
  const delay = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state ? resolve(delay) : reject(delay);
    }, delay);
  });

  promise
    .then(delay => showMessage(true, delay))
    .catch(delay => showMessage(false, delay));
}

function showMessage(status, delay) {
  const title = status ? '✅ Обіцянку виконано' : '❌ Обіцянку відхилено';
  const message = `за ${delay} мс`;
  const backgroundColor = status ? '#59A10D' : '#EF4040';

  iziToast.show({
    position: 'topRight',
    title,
    titleSize: '16px',
    titleLineHeight: '24px',
    titleColor: 'white',
    message,
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: 'white',
    backgroundColor,
  });
}
