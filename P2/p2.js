const hourhand = document.querySelector(".hour");
const minutehand = document.querySelector(".minute");
const secondhand = document.querySelector(".second");
let x;

function updateClock() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const secondturnRatio = seconds / 60;
  const minuteturnRatio = (secondturnRatio + minute) / 60;
  const hourturnRatio = (minuteturnRatio + hour) / 12;

  rotate(secondhand, secondturnRatio);
  rotate(minutehand, minuteturnRatio);
  rotate(hourhand, hourturnRatio);
}

function rotate(element, rotationratio) {
 
  element.style.setProperty("--rotation", rotationratio * 360);
}

updateClock();
setInterval(updateClock, 1000);

let clockdiv = document.querySelector(".clock");

let digitalBtn = document.getElementById("digi");
digitalBtn.addEventListener("click", () => {
  console.log("clicked");
  clockdiv.innerHTML = "";
  clockdiv.classList = "";
  updateDigitalClock();
  x = setInterval(updateDigitalClock, 1000);
});

function updateDigitalClock() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentSeconds = currentTime.getSeconds();

  let timeofDay = currentHour < 12 ? "AM" : "PM";

  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
  currentHour = currentHour > 12 ? currentHour - 12 : currentHour;
  currentHour = (currentHour < 10 ? "0" : "") + currentHour;

  currentHour = currentHour == 0 ? 12 : currentHour;
  let currentTimeStr =
    currentHour +
    ":" +
    currentMinutes +
    ":" +
    currentSeconds +
    "  " +
    timeofDay;


  document.getElementById("digital").innerHTML = currentTimeStr;
}

let analogclock = document.getElementById("analog");
analogclock.addEventListener("click", function () {
 
  clearInterval(x);
  let digitalelement = document.getElementById("digital")
  digitalelement.innerHTML = "";
  
  updateClock()
  setInterval(updateClock,100)


location.reload()
});