
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyColor: document.querySelector('body'),
}

refs.startBtn.addEventListener('click', onStartBtn);
 
refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    refs.startBtn.classList.remove("disabled");
  });

function onStartBtn() {
      if(refs.startBtn.classList.contains("disabled")) {
           return
           }
           refs.startBtn.classList.add("disabled");
           timerId = setInterval(() => {
                 refs.bodyColor.style.backgroundColor = getRandomHexColor();
            }, 1000);
            return timerId;
        }

