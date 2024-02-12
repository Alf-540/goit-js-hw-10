import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button');
const input = document.querySelector('input');
const day = document.querySelector('.value[ data-days]');
const hour = document.querySelector('.value[ data-hours]');
const minute = document.querySelector('.value[ data-minutes]');
const second = document.querySelector('.value[ data-seconds]');
btnStart.disabled = true;
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
      btnStart.disabled = false;
      btnStart.style.background = '#4E75FF';
      btnStart.style.color = '#FFF';
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', e => {
  btnStart.disabled = true;
  input.disabled = true;
  btnStart.style.background = '#CFCFCF';
  btnStart.style.color = '#989898';
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
  day.textContent = `${addLeadingZero(days)}`;
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
}

function stopTimer(difference) {
  if (difference <= 1000) {
    clearInterval(setIntervalId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}