import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeElements = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
let userDate;
let currentInterval;
const flatpickrOptins = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'below left',
  positionElement: dateInput,
  locale: {
    weekdays: {
      shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      longhand: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
  },
  onClose(selectedDates) {
    userDate = selectedDates[0];
    console.log(userDate);
    checkDate(userDate);
  },
};

const timeUnits = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000,
};

startBtn.addEventListener('click', startTimer);

flatpickr(dateInput, flatpickrOptins);

function showMessage() {
  iziToast.error({
    position: 'topRight',
    title: 'Error',
    message: 'Please choose a date in the future',
    backgroundColor: '#EF4040',
  });
}

function checkDate(date) {
  if (new Date(date) > new Date()) {
    startBtn.disabled = false;
    return true;
  } else {
    showMessage();
    startBtn.disabled = true;
    return false;
  }
}

function startTimer() {
  if (!checkDate(userDate)) return;

  clearInterval(currentInterval);

  currentInterval = setInterval(() => checkTimer(timeUnits), 1000);
  dateInput.disabled = true
  startBtn.disabled = true
}

function checkTimer(timeUnits) {
  let totalLeft = userDate - new Date();

  if (totalLeft <= 0) return stopTimer();

  const getLeft = unit =>
    Math.floor(totalLeft / timeUnits[unit])
      .toString()
      .padStart(2, '0');

  for (let key in timeUnits) {
    timeElements[key + 'El'].textContent = getLeft(key);
    totalLeft %= timeUnits[key];
  }
}

function stopTimer() {
  clearInterval(currentInterval);
  dateInput.disabled = false;
}


