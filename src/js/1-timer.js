import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button');
const input = document.querySelector('input');
const daysElement = document.querySelector('.value[ data-days]');
const hoursElement = document.querySelector('.value[ data-hours]');
const minutesElement = document.querySelector('.value[ data-minutes]');
const secondsElement = document.querySelector('.value[ data-seconds]');
startButton.disabled = true;
let date = Date.now();
let userSelectedDate;
let difference;
let setIntervalId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
      });
    } else {
      startButton.disabled = false;
      startButton.style.background = '#4E75FF';
      startButton.style.color = '#FFF';
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', e => {
  startButton.disabled = true;
  input.disabled = true;
  startButton.style.background = '#CFCFCF';
  startButton.style.color = '#989898';
  difference = userSelectedDate - Date.now();
  timerNumber(convertMs(difference));
  setIntervalId = setInterval(() => {
    difference -= 1000;
    timerNumber(convertMs(difference));
    stopTimer(difference);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function timerNumber({ days, hours, minutes, seconds }) {
  daysElement.textContent = `${addLeadingZero(days)}`;
  hoursElement.textContent = `${addLeadingZero(hours)}`;
  minutesElement.textContent = `${addLeadingZero(minutes)}`;
  secondsElement.textContent = `${addLeadingZero(seconds)}`;
}

function stopTimer(difference) {
  if (difference <= 0) {
    clearInterval(setIntervalId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}