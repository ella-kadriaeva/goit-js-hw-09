import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
 
const stopTime = Date.now();
let electedTime = 0;
let intervalId = null;
const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.classList.add("disabled");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     let electedTime = selectedDates[0].getTime();
     checkValidDate(electedTime);
     },
  };

  flatpickr('#datetime-picker', options);
  
  refs.input.addEventListener('input', flatpickr);

  function checkValidDate(date) {
    
    if(date < stopTime) {
        if(!refs.startBtn.classList.contains("disabled")) {
            refs.startBtn.classList.add("disabled");
        }
        Notiflix.Notify.warning("Please choose a date in the future");
       
          return
      }
      refs.startBtn.classList.remove("disabled");
      return electedTime = date;
    }  

  refs.startBtn.addEventListener('click', onStartBtn)
  
  function onStartBtn () {
      let deltaTime = electedTime - stopTime;
      
        intervalId = setInterval(() => {
            if (deltaTime <= 1000) {
                clearInterval(intervalId);
              return
              }
        deltaTime -= 1000;
        
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateClock({ days, hours, minutes, seconds })
       
        }, 1000)
      };

    function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));  
    return { days, hours, minutes, seconds }
  }
  function addLeadingZero(value) {
      return String(value).padStart(2, '0');
  };

 

  function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }



  
      
