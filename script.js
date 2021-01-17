const timerEl = document.querySelector('.timer')
const startBtn = document.getElementById('start-btn')
const intervalBtn = document.getElementById('interval-btn')
const intervalContainer = document.getElementById('interval-container')

///New feature//////////////////////////////////////////////////////////////
const mainTimer = {hours: '00', minutes: '00', seconds: '11', mseconds: '00'}

const timeHandler = (timer) => {
  if(timer.mseconds == 98) {
    timer.mseconds = '00'
    updateSec(timer)
  } else if (timer.mseconds < 9) {
    timer.mseconds++
    timer.mseconds = convertTo2DigitNbr(timer.mseconds)
  }
  else timer.mseconds++



  timerEl.innerHTML = `<span>${timer.hours}:${timer.minutes}:${timer.seconds}.${timer.mseconds}</span>`
}
////////////////////////////////////////////////////////////////////////////

let intervalId
let intervalIdx = 0
let intervalTime = {hours: '00', minutes: '00', seconds: '00', mseconds: '00'}

startBtn.addEventListener('click', () => toggleTimer())
intervalBtn.addEventListener('click', () => createInterval())

const updateMsec = () => {
  let ms = mseconds.innerText
  if(ms == 99) {
    ms = 0
    intervalTime.mseconds = '00'
    updateSeconds()
  }
  else ms++

  if(ms <= 9) {
    mseconds.innerText = convertTo2DigitNbr(ms)
  }
  else {
    mseconds.innerText = ms
  }

  if(intervalTime.mseconds < 9) {
    intervalTime.mseconds++
    intervalTime.mseconds = convertTo2DigitNbr(intervalTime.mseconds)
  } else {
    intervalTime.mseconds++
  }



  if(intervalIdx > 0) {
    intervalContainer.lastChild.innerHTML = `<span>${intervalTime.hours}</span>:<span>${intervalTime.minutes}</span>:<span>${intervalTime.seconds}</span>.<span>${intervalTime.mseconds}</span>
    <strong id="idx">${intervalIdx}</strong>`
  }
}

const updateSec = (timer) => {
  if(timer.seconds == 59) {
    timer.seconds = '00'
    updateMin(timer)
  } else if (timer.seconds < 9) {
    timer.seconds++
    timer.seconds = convertTo2DigitNbr(timer.seconds)
  }
  else timer.seconds++

  if(intervalTime.seconds < 9) {
    intervalTime.seconds++
    intervalTime.seconds = convertTo2DigitNbr(intervalTime.seconds)
  } else {
    intervalTime.seconds++
  }
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
    intervalId = setInterval(timeHandler, 10, mainTimer)
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
    if(intervalIdx === 0) {
      const intervalEl = document.createElement("div")
      intervalEl.classList.add('interval')
      intervalEl.innerHTML = `<span>${hours.innerText}</span>:<span>${minutes.innerText}</span>:<span>${seconds.innerText}</span>.<span>${mseconds.innerText}</span>
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

    for(let prop in intervalTime) {
      intervalTime[prop] = '00'
    }

}
