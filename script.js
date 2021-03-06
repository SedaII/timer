const timerEl = document.querySelector('.timer')
const startBtn = document.getElementById('start-btn')
const intervalBtn = document.getElementById('interval-btn')
const resetBtn = document.getElementById('reset-btn')
const intervalContainer = document.getElementById('interval-container')
const mainTimer = {hours: '00', minutes: '00', seconds: '00', mseconds: '00'}
let mainIntervalId
const intervalTimer = {hours: '00', minutes: '00', seconds: '00', mseconds: '00'}
let intervalIdx = 1
let intervalId

const circles = document.querySelectorAll('.circle')

function stopAnimation() {
  circles.forEach((circle) => {
    circle.style.animationPlayState = 'paused'
  })
}

function startAnimation() {
  circles.forEach((circle) => {
    circle.style.animationPlayState = 'running'
  })
}



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

  if(timer === mainTimer) {
    timerEl.innerHTML = `<span>${timer.hours}:${timer.minutes}:${timer.seconds}.${timer.mseconds}</span>`
  } else if(timer === intervalTimer) {
    if(intervalContainer.firstChild) {
      intervalContainer.firstChild.innerHTML = `<span>${intervalTimer.hours}:${intervalTimer.minutes}:${intervalTimer.seconds}.${intervalTimer.mseconds}</span> <strong class="idx">${intervalIdx}</strong>`
    }
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
    startAnimation()
    mainIntervalId = setInterval(timeHandler, 10, mainTimer)
    startBtn.innerText = "Stop"
    intervalBtn.disabled = false
    resetBtn.disabled = false
    if(intervalIdx > 0) {
      intervalId = setInterval(timeHandler, 10, intervalTimer)
    } else {
    }
  } else {
    stopAnimation()
    clearInterval(mainIntervalId)
    startBtn.innerText = "Start"
    intervalBtn.disabled = true

    if(intervalIdx > 0) {
      clearInterval(intervalId)
    }
  }
}


const createInterval = () => {
    if(intervalIdx === 1) {
      const intervalEl = document.createElement("div")
      intervalEl.classList.add('interval')
      intervalEl.innerHTML = `<span>${mainTimer.hours}</span>:<span>${mainTimer.minutes}</span>:<span>${mainTimer.seconds}</span>.<span>${mainTimer.mseconds}</span>
      <strong class="idx">${intervalIdx}</strong>`
      intervalContainer.appendChild(intervalEl)
      intervalIdx++

      const nextIntervalEl = document.createElement("div")
      nextIntervalEl.classList.add('interval')
      nextIntervalEl.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>.<span>00</span>
      <strong class="idx">${intervalIdx}</strong>`
      intervalContainer.prepend(nextIntervalEl)
      
      intervalContainer.style.backgroundColor = 'var(--prim-dark)'
    } else {
      intervalIdx++
      const intervalEl = document.createElement("div")
      intervalEl.classList.add('interval')
      intervalEl.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>.<span>00</span>
      <strong class="idx">${intervalIdx}</strong>`
      intervalContainer.prepend(intervalEl)
    }
    for(let prop in intervalTimer) {
      intervalTimer[prop] = '00'
    }
    clearInterval(intervalId)
    intervalId = setInterval(timeHandler, 10, intervalTimer)
}

const resetTimer = () => {
  if(resetBtn.disabled === false) {
    stopAnimation()
    clearInterval(mainIntervalId)
    clearInterval(intervalId)
    for(let prop in intervalTimer) {
      intervalTimer[prop] = '00'
    }
    for(let prop in mainTimer) {
      mainTimer[prop] = '00'
    }

    timerEl.innerHTML = `<span>${mainTimer.hours}:${mainTimer.minutes}:${mainTimer.seconds}.${mainTimer.mseconds}</span>`
    intervalContainer.innerHTML = ''
    intervalIdx = 1
    resetBtn.disabled = true
    startBtn.innerText = "Start"
    intervalBtn.disabled = true
    
    intervalContainer.style.backgroundColor = ''
  } else {

  }
}


startBtn.addEventListener('click', () => toggleTimer())
intervalBtn.addEventListener('click', () => createInterval())
resetBtn.addEventListener('click', () => resetTimer())
