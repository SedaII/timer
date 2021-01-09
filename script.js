const mseconds = document.getElementById('mseconds')
const seconds = document.getElementById('seconds')
const minutes = document.getElementById('minutes')
const hours = document.getElementById('hours')
const startBtn = document.getElementById('start-btn')
const intervalBtn = document.getElementById('interval-btn')
const intervalContainer = document.getElementById('interval-container')

let intervalId
let intervalIdx = 0

startBtn.addEventListener('click', () => toggleTimer())
intervalBtn.addEventListener('click', () => createInterval())

const updateMseconds = () => {
  let ms = mseconds.innerText
  if(ms == 99) {
    ms = 0
    updateSeconds()
  }
  else ms++

  if(ms <= 9) mseconds.innerText = convertTo2DigitNbr(ms)
  else mseconds.innerText = ms
}

const updateSeconds = () => {
  let sec = seconds.innerText
  if(sec == 59) {
    sec = 0
    updateMin()
  }
  else sec++

  if(sec <= 9) seconds.innerText = convertTo2DigitNbr(sec)
  else seconds.innerText = sec
}

const updateMin = () => {
  let min = minutes.innerText
  if(min == 59) {
    min = 0
    updateHrs()
  }
  else min++

  if(min <= 9) minutes.innerText = convertTo2DigitNbr(min)
  else minutes.innerText = min
}

const updateHrs = () => {
  let hrs = hours.innerText

  hrs++

  if(hrs <= 9) hours.innerText = convertTo2DigitNbr(hrs)
  else hours.innerText = hrs
}

const toggleTimer = () => {
  if(startBtn.innerText === "Start") {
    intervalId = setInterval(updateMseconds, 10)
    startBtn.innerText = "Stop"
  } else {
    clearInterval(intervalId)
    startBtn.innerText = "Start"
  }
}

const convertTo2DigitNbr = digit => {
  return "0" + digit
}

const createInterval = () => {
    const intervalEl = document.createElement("div")
    intervalEl.classList.add('interval')
    intervalEl.innerHTML = `<span>${hours.innerText}</span>:<span>${minutes.innerText}</span>:<span>${seconds.innerText}</span>.<span>${mseconds.innerText}</span>
    <strong id="idx">${intervalIdx}</strong>`
    intervalContainer.appendChild(intervalEl)
    intervalIdx++
}
