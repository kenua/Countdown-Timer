let timer = new Timer();

// ## digits
const daysDigits = document.querySelectorAll('.days-digits'),
      hourDigits = document.querySelectorAll('.hour-digits'),
      minuDigits = document.querySelectorAll('.minu-digits'),
      secoDigits = document.querySelectorAll('.seco-digits');

// ## buttons
const startTimerBtn = document.querySelector('#start-timer-btn'),
      setTimeBtn = document.querySelector('#set-time-btn'),
      openControlsBtn = document.querySelector('#open-controls-btn');

// ## inputs
const eventNameInput = document.querySelector('#event-name'),
      daysInput = document.querySelector('#days-input'),
      hourInput = document.querySelector('#hour-input'),
      minuInput = document.querySelector('#minu-input'),
      secoInput = document.querySelector('#seco-input');

const display = document.querySelector('#display');
const stickyDisplay = document.querySelector('#sticky-display');
const controlsContainer = document.querySelector('#controls-container');
const eventDefaultValue = ' will start in:';
let eventName = null;
let timerOn = false;

function updateTaskParag() {
   let value = eventNameInput.value.trim();
   eventName = value;
   document.querySelectorAll('.task-parag')[0].innerHTML = eventName + eventDefaultValue;
   document.querySelectorAll('.task-parag')[1].innerHTML = eventName + eventDefaultValue;

   if (value.length <= 0) {
      document.querySelectorAll('.task-parag')[0].innerHTML = 'Task' + eventDefaultValue;
      document.querySelectorAll('.task-parag')[1].innerHTML = 'Task' + eventDefaultValue;
   }
}

function setTimerDigits() {
   let addZero = function(number) {
      if (number < 10) return '0' + number;
      return number;
   }

   daysDigits[0].textContent = 'd' + addZero(timer.days);
   hourDigits[0].textContent = addZero(timer.hours) + ':';
   minuDigits[0].textContent = addZero(timer.minutes) + ':';
   secoDigits[0].textContent = addZero(timer.seconds);

   daysDigits[1].textContent = 'd' + addZero(timer.days);
   hourDigits[1].textContent = addZero(timer.hours) + ':';
   minuDigits[1].textContent = addZero(timer.minutes) + ':';
   secoDigits[1].textContent = addZero(timer.seconds);
}

// ## DOM events
eventNameInput.addEventListener('keyup', updateTaskParag);

startTimerBtn.addEventListener('click', function(evt) {
   evt.preventDefault();
   if (!timerOn) { // turn on timer
      timer.start(setTimerDigits);
      startTimerBtn.textContent = 'Stop';
      timerOn = true;
   } else { // turn off timer
      timer.stop();
      startTimerBtn.textContent = 'Start';
      timerOn = false;
   }
});

setTimeBtn.addEventListener('click', function(evt) {
   evt.preventDefault();

   let inputs = [hourInput, minuInput, secoInput];
   let inputsValue = [];
   let daysValue = (!isNaN(daysInput.value) ? Math.floor(Number(daysInput.value)) : 0);

   // fix days value range
   if (daysValue < 0) daysValue = 0;
   daysInput.value = daysValue;
   
   // fix inputs value range
   inputs.forEach((input, index) => {
      inputsValue.push((!isNaN(input.value)) ? Math.floor(Number(input.value)) : 0);
      if (inputsValue[index] <= 0) {
         inputsValue[index] = 0;
         input.value = 0;
      } else if (inputsValue[index] >= 60) {
         inputsValue[index] = 59;
         input.value = 59;
      }
   });

   // fix hours value range
   if (inputsValue[0] >= 24) inputsValue[0] = 23;
   hourInput.value = inputsValue[0];

   timer.setTime(
      daysValue,
      inputsValue[0],
      inputsValue[1],
      inputsValue[2]
   );
   
   //console.log(timer.days, timer.hours, timer.minutes, timer.seconds);
   setTimerDigits();
});

openControlsBtn.addEventListener('click', function(evt) {
   if (controlsContainer.classList.contains('controls-container--close')) { // open
      controlsContainer.classList.remove('controls-container--close');
      document.querySelector('#down-arrow').style.transform = 'rotateX(190deg)';
   } else { // close
      controlsContainer.classList.add('controls-container--close');
      document.querySelector('#down-arrow').style.transform = 'rotateX(0deg)';
   }
});

// Hide and show stickyDisplay
// Maybe this is a vague implementation of funtionality, check out this: https://developer.mozilla.org/docs/Mozilla/Performance/ScrollLinkedEffects
let displayHeight = display.offsetHeight;

window.addEventListener('scroll', function() {
   let windowHeight = window.pageYOffset;

   if (windowHeight > displayHeight) {
      stickyDisplay.style.transform = 'translate(0, 0px)';
   } else {
      stickyDisplay.style.transform = 'translate(0, -150px)';
   }
});

updateTaskParag();