const clock = document.getElementById('clock');
const itis = document.getElementById('itis');
const main = document.getElementById('main');
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function timeToLimit(hourEnd, minuteEnd, secondEnd) {
  // const cuando = 'June 12, 2021 8:01:00';
  const cuando = Date.now();
  const now = new Date(cuando);
  const end = new Date(cuando);
  end.setHours(hourEnd);
  end.setMinutes(minuteEnd);
  end.setSeconds(secondEnd);
  const distance = end - now;
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  return { hours, minutes, seconds };
}

function time() {
  // const now = new Date();
  // const cuando = 'June 12, 2021 8:01:00';
  const cuando = Date.now();
  const now = new Date(cuando);
  const hoursNow = now.getHours();
  const dayNow = now.getDay();
  if (dayNow === 6) {
    itis.innerHTML = 'Si';
    const finalValle = timeToLimit(24, 0, 0);
    clock.innerHTML = `Aún te quedan ${finalValle.hours + 24}:${`0${finalValle.minutes}`.substr(
      -2
    )}:${`0${finalValle.seconds}`.substr(-2)} de horario valle`;
  } else if (dayNow === 0) {
    itis.innerHTML = 'Si';
    const finalValle = timeToLimit(24, 0, 0);
    clock.innerHTML = `Aún te quedan ${finalValle.hours}:${`0${finalValle.minutes}`.substr(
      -2
    )}:${`0${finalValle.seconds}`.substr(-2)} de horario valle`;
  } else if (hoursNow >= 0 && hoursNow < 8) {
    itis.innerHTML = 'Si';
    const finalValle = timeToLimit(8, 0, 0);

    clock.innerHTML = `Aún te quedan ${finalValle.hours}:${`0${finalValle.minutes}`.substr(
      -2
    )}:${`0${finalValle.seconds}`.substr(-2)} de horario valle`;
  } else if (
    (hoursNow >= 8 && hoursNow < 10) ||
    (hoursNow >= 14 && hoursNow < 18) ||
    (hoursNow >= 22 && hoursNow < 24)
  ) {
    itis.innerHTML = 'No';
    main.className = 'darklight';
    clock.innerHTML = `Pero es horario llano ¯\\_(ツ)_/¯`;
    const nextValle = timeToLimit(24, 0, 0);
    let finalLlano;
    if (hoursNow < 10) {
      finalLlano = timeToLimit(10, 0, 0);
    } else if (hoursNow < 18) {
      finalLlano = timeToLimit(18, 0, 0);
    } else if (hoursNow < 24) {
      finalLlano = timeToLimit(24, 0, 0);
    }
    clock.innerHTML += `<br>Aún te quedan ${finalLlano.hours}:${`0${finalLlano.minutes}`.substr(
      -2
    )}:${`0${finalLlano.seconds}`.substr(-2)} de horario llano`;
    clock.innerHTML += `<br>Te quedan ${nextValle.hours}:${`0${nextValle.minutes}`.substr(
      -2
    )}:${`0${nextValle.seconds}`.substr(-2)} para el próximo de horario valle`;
  } else {
    itis.innerHTML = 'No';
    main.className = 'dark';
  }
}

setInterval(time, 1000);
