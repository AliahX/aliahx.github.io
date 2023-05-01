window.onkeypress = window.onclick = function() {document.body.requestFullscreen()}
// window.onkeydown = window.ondragstart = window.oncontextmenu = function() {return false}

lastFocused = document.forms[0].children[0];
days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function fixFavicon() {document.getElementById("favicon").href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='.06em' y='.82em' font-size='110'" + (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? " fill='white'" : "") + "></text></svg>"}
fixFavicon();

function loop() {
  date = new Date();
  t = date.toLocaleTimeString().split(":");

  day = days[date.getDay()];
  time = t[0] + ":" + t[1];
  batteryLevel = 50;
  
  document.getElementsByClassName("batteryLevel")[0].style.width = batteryLevel + "%";
  document.getElementById("date").innerHTML = day + " " + time;

  setTimeout(loop, 500);
}

function focus() {
  if(document.activeElement.tagName == "BODY") lastFocused.focus();
  lastFocused = document.activeElement;
  setTimeout(focus, 0.1);
}

function sleep() {
  document.getElementById("sleepBox").classList.toggle("show")
}

function restart() {

}

focus();
loop();