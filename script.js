const timerEl = document.querySelector('.timer')
const startBtn = document.getElementById('start-btn')
const intervalBtn = document.getElementById('interval-btn')
const intervalContainer = document.getElementById('interval-container')

///New feature//////////////////////////////////////////////////////////////
const mainTimer = {hours: '00', minutes: '00', seconds: '00', mseconds: '00'}
let mainIntervalId

const intervalTimer = {hours: '00', minutes: '00', seconds: '00', mseconds: '00'}
let intervalIdx = 0
let intervalId


const convertTo2DigitNbr = digit => {
  return "0" + digit
}

const timeHandler = (timer) => {
  if(timer.mseconds == 98) {
    timer.mseconds = '00'
    updateSec(timer)
  } else if (timer.mseconds < 9) {
    timer.mseconds++
    timer.mseconds = convertTo2DigitNbr(timer.mseconds)
  } else {
    timer.mseconds++
  }
  timerEl.innerHTML = `<span>${timer.hours}:${timer.minutes}:${timer.seconds}.${timer.mseconds}</span>`
  if(intervalIdx > 0) {
    intervalContainer.lastChild.innerHTML = `<span>${intervalTimer.hours}:${intervalTimer.minutes}:${intervalTimer.seconds}.${intervalTimer.mseconds}</span> <strong id="idx">${intervalIdx}</strong>`
  }
}
////////////////////////////////////////////////////////////////////////////



startBtn.addEventListener('click', () => toggleTimer())
intervalBtn.addEventListener('click', () => createInterval())

const updateSec = (timer) => {
  if(timer.seconds == 59) {
    timer.seconds = '00'
    updateMin(timer)
  } else if (timer.seconds < 9) {
    timer.seconds++
    timer.seconds = convertTo2DigitNbr(timer.seconds)
  }
  else timer.seconds++
}

const updateMin = (timer) => {
  if(timer.minutes == 59) {
    timer.minutes = '00'
    updateHrs(timer)
  } else if (timer.minutes < 9) {
    timer.minutes++
    timer.minutes = convertTo2DigitNbr(timer.minutes)
  }
  else timer.minutes++
}

const updateHrs = (timer) => {
  if (timer.hours < 9) {
    timer.hours++
    timer.hours = convertTo2DigitNbr(timer.hours)
  }
  else timer.hours++
}

const toggleTimer = () => {
  if(startBtn.innerText === "Start") {
    mainIntervalId = setInterval(timeHandler, 10, mainTimer)
    startBtn.innerText = "Stop"
    intervalBtn.disabled = false
    if(intervalIdx > 0) {
      intervalId = setInterval(timeHandler, 10, intervalTimer)
    }
  } else {
    clearInterval(mainIntervalId)
    startBtn.innerText = "Start"
    intervalBtn.disabled = true
    if(intervalIdx > 0) {
      clearInterval(intervalId)
    }
  }
}


const createInterval = () => {
    if(intervalIdx === 0) {
      const intervalEl = document.createElement("div")
      intervalEl.classList.add('interval')
      intervalEl.innerHTML = `<span>${mainTimer.hours}</span>:<span>${mainTimer.minutes}</span>:<span>${mainTimer.seconds}</span>.<span>${mainTimer.mseconds}</span>
      <strong id="idx">${intervalIdx}</strong>`
      intervalContainer.appendChild(intervalEl)
      intervalIdx++
      const nextIntervalEl = document.createElement("div")
      nextIntervalEl.classList.add('interval')
      nextIntervalEl.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>.<span>00</span>
      <strong id="idx">${intervalIdx}</strong>`
      intervalContainer.appendChild(nextIntervalEl)
    } else {
      intervalIdx++
      const intervalEl = document.createElement("div")
      intervalEl.classList.add('interval')
      intervalEl.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>.<span>00</span>
      <strong id="idx">${intervalIdx}</strong>`
      intervalContainer.appendChild(intervalEl)
    }

    for(let prop in intervalTimer) {
      intervalTimer[prop] = '00'
    }
    clearInterval(intervalId)
    intervalId = setInterval(timeHandler, 10, intervalTimer)

}
