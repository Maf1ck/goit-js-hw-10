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
startBtn.disabled = true; // Відключаємо кнопку при завантаженні

const flatpickrOptions = {
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
    checkDate(userDate);
    updateTimerDisplay(); 
  },
};

const timeUnits = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000,
};

startBtn.addEventListener('click', startTimer);
flatpickr(dateInput, flatpickrOptions);

function showMessage() {
  iziToast.error({
    position: 'topRight',
    title: 'Помилка',
    message: 'Оберіть дату в майбутньому',
    backgroundColor: '#EF4040',
  });
}

function checkDate(date) {
  const now = new Date().getTime(); 
  const selectedTime = date.getTime(); 

  if (selectedTime > now) {
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
  updateTimerDisplay(); 

  currentInterval = setInterval(() => updateTimerDisplay(), 1000);

  dateInput.disabled = true;
  startBtn.disabled = true;
}

function updateTimerDisplay() {
  let totalLeft = userDate.getTime() - new Date().getTime(); 

  if (totalLeft <= 0) {
    stopTimer();
    return;
  }

  for (let key in timeUnits) {
    const value = Math.floor(totalLeft / timeUnits[key])
      .toString()
      .padStart(2, '0');

    timeElements[key + 'El'].textContent = value;
    totalLeft %= timeUnits[key];
  }
}

function stopTimer() {
  clearInterval(currentInterval);
  dateInput.disabled = false;
}
