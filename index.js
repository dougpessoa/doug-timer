var start = false;
var stop = false;
var isExercise = true;
var interval;
var localInterval;
var total = 0;

const counter = document.getElementById("counter")
const timer = document.getElementById("timer")
const littleTimer = document.getElementById("littleTimer")
const list = document.getElementById("list")
const localTimer = document.getElementById("local")
const localItem = document.getElementById("localItem")
const doOrTakeABreath = document.getElementById("doOrTakeABreath")
const doOrTakeABreathTotal = document.getElementById("doOrTakeABreathTotal")

var timerValue = "00:00:00"
var timerLocalValue = "00:00:00"
var seconds = -1;
var localSeconds = -1;

var historical = []

function z(number) {
  return `${number < 10 ? 0 : ''}${number}`
}

function getTime(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${z(hours)}:${z(minutes)}:${z(seconds)}`;
}

function generalClock() {
  seconds += 1
  timerValue = getTime(seconds)
  timer.innerHTML = timerValue
  littleTimer.innerHTML = timerValue
}

function listClock(restart = false) {
  if (restart) {
    localSeconds = 0
  } else {
    localSeconds += 1
  }
  timerLocalValue = getTime(localSeconds)
  localTimer.innerHTML = timerLocalValue
  localLittleTimer.innerHTML = timerLocalValue
}

interval = setInterval(() => {
  if (start) {
    runningNumber(true)
    generalClock()
    listClock()
  }
}, 1000);


function countDown() {
  if (stop) return

  if (!start) {
    start = true
    localItem.style.visibility = "visible"
  }

  if (doOrTakeABreathTotal.innerHTML === "Let's go!") {
    doOrTakeABreathTotal.innerHTML = "Do it!"
  }

  if (timerValue === "00:00:00") return

  historical.push(timerValue)

  const item = component("item")
  const content = component("content")
  const timerSaved = component("timerSaved")
  const timerSavedTotal = component("timerSavedTotal")
  const timerBoth = component("timerBoth")
  const type = component("type")
  const line = component("line")


  timerSaved.innerHTML = timerLocalValue
  timerSavedTotal.innerHTML = timerValue
  type.innerHTML = isExercise ? "Exercise" : "Rest"

  line.classList.add(isExercise ? 'bg-exercise' : 'bg-rest')
  timerSaved.classList.add(isExercise ? "exercise" : "rest")
  type.classList.add(isExercise ? "exercise" : "rest")

  timerBoth.appendChild(timerSaved)
  timerBoth.appendChild(line)
  timerBoth.appendChild(timerSavedTotal)
  content.appendChild(timerBoth)
  content.appendChild(type)
  item.appendChild(content)
  list.appendChild(item)
  isExercise = !isExercise
  doOrTakeABreath.innerHTML = isExercise ? "Do it" : "Take a Breath"
  doOrTakeABreathTotal.innerHTML = isExercise ? "Do it" : "Take a Breath"


  if (!isExercise) {
    total += 1
  }
  counter.innerHTML = total

  listClock(true)
}

function closeRunning() {
  clearInterval(interval)
  start = false
  stop = true
  localItem.style.visibility = "hidden"
  localLittleTimer.style.display = "none"
  doOrTakeABreathTotal.style.display = "none"
  runningNumber(false)
}


function component(className) {
  const content = document.createElement('div')
  content.classList.add(className)

  return content
}

function runningNumber(online = false) {
  const on = "-online"
  const off = "-offline";
  const pre = "counter"
  var className = `${pre}${online ? on : off}`;
  counter.classList.remove(pre + on, pre + off)
  counter.classList.add(className)
}

runningNumber(false)

function keyDown({ code }) {
  switch (code) {
    case "Space":
      countDown()
      break;

    case "Escape":
      window.location.reload()
      break;

    case "KeyP":
      closeRunning()
      break;
    default:
      break;
  }
}


addEventListener("keydown", keyDown)
counter.addEventListener("click", () => countDown())
