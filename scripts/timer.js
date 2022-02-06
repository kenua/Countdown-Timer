"use strict";

class Timer {
   _date = new Date(0, 0, 0, 0, 0, 0);
   _interval = null;

   constructor() {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
   }

   updateValues(days) {
      this.days = days;
      this.hours = this._date.getHours();
      this.minutes = this._date.getMinutes();
      this.seconds = this._date.getSeconds();
   }

   setTime(d, h, m, s) {
      if (!isNaN(d) && !isNaN(h) && !isNaN(m) && !isNaN(s)) {
         this._date.setTime(new Date(0, 0, 0, h, m, s).getTime());
         this.updateValues(d);
         //console.log(this._date);
      }
   }

   start(func = undefined) {
      this._interval = setInterval(() => {
         // run function argument if it exists
         try {
            if (func) func();
         } catch (e) {
            console.log('Error: first argument is not a function :(');
         }

         // Decrement time values
         if (this.days == 0  && this.hours == 0 && this.minutes == 0 && this.seconds == 0) { // stop timer
            this.updateValues(this.days);
            this.stop();
         } else if (this.days >= 1 && this.hours == 0 && this.minutes == 0 && this.seconds == 0) { // decrement days
            this._date.setTime(new Date(0, 0, 0, 23, 59, 59).getTime());
            this.days--;
            this.updateValues(this.days);
         } else { // decrement seconds
            this._date.setTime((this._date.getTime() - 1000));
            this.updateValues(this.days);
         }
      }, 1000);
   }

   stop() {
      clearInterval(this._interval);
   }
}// Timer class

/*
let t = new Timer();

t.setTime(0,0,1,0);
t.start(function() {
   console.log(t.days +':'+ t.hours +':'+ t.minutes +':'+ t.seconds);

});
*/
/*
t.start(function() {
   console.log(t.days +':'+ t.hours +':'+ t.minutes +':'+ t.seconds);
});
*/

//let t = new Timer();
//t.setTime(1, 1, 1, 5);
//t.start(4);
