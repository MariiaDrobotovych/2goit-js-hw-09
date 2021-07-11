import Swal from 'sweetalert2';

let deadlineTimestamp = null;

const refs = {
    second: document.querySelector('[data-seconds]'),
    minutes: document.querySelector('[data-minutes]'),
    hours: document.querySelector('[data-hours]'),
    days: document.querySelector('[data-days]'),
    selector: document.querySelector('#date-selector'),
    startBtn: document.querySelector('[data-start]'),
}

function dateAboveNow(ms) {
    return Number(Date.now()) < ms;
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

refs.selector.addEventListener('input', evt => {
    deadlineTimestamp = Number(new Date(evt.currentTarget.value));

    if (dateAboveNow(deadlineTimestamp)) {
        refs.startBtn.disabled = false;
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please choose a date in the future',
            icon: 'error',
            confirmButtonText: 'Got it!'
        });

        refs.startBtn.disabled = true;
    }
});

refs.startBtn.addEventListener('click', () => {
    startTimer(deadlineTimestamp);
});

function startTimer(ms) {
    setInterval(() => {
        const diff = ms - Number(new Date());
        const { days, hours, minutes, seconds } = convertMs(diff);
        refs.days.innerHTML = days;
        refs.hours.innerHTML = hours;
        refs.minutes.innerHTML = minutes;
        refs.second.innerHTML = seconds;
    }, 1000);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}