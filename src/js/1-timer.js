// Імпорт бібліотеки Flatpickr
import flatpickr from 'flatpickr';
// Імпорт стилів для Flatpickr
import 'flatpickr/dist/flatpickr.min.css';

// Імпорт бібліотеки iziToast
import iziToast from 'izitoast';

// Імпорт стилів для iziToast
import 'izitoast/dist/css/iziToast.min.css';

// Ініціалізація змінних
let userSelectedDate = null;
let timerId = null;

// Елементи DOM
const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

// Налаштування для Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

// Ініціалізація Flatpickr
flatpickr(datePicker, options);

// Додавання обробника події для кнопки старт
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      datePicker.disabled = false;
      return;
    }

    updateTimerDisplay(timeRemaining);
  }, 1000);
});

// Функція для оновлення дисплею таймера
function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

// Функція для конвертації мс в дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання нуля перед числом, якщо воно менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Ініціалізація стану кнопки Start
startButton.disabled = true;
