const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let interval = null;

startBtn.addEventListener('click', ()=>{
    startBtn.disabled = true;

    interval = setInterval(()=>{
        bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
})

stopBtn.addEventListener('click', ()=>{
    startBtn.disabled = false;

    if (interval){
        clearInterval(interval);
    }
})

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  