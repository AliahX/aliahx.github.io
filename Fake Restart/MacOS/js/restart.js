var noSleep = new NoSleep();
window.onkeypress = window.onclick = function() {document.body.requestFullscreen();noSleep.enable()}
// window.onkeydown = window.ondragstart = window.oncontextmenu = function() {return false}

function setPercent(num) {
  if(num < 100) {
    document.getElementById("progress").style.setProperty("border-style", "solid");
    document.getElementById("progress").style.setProperty("border-right-style", "none");
    document.getElementById("progress").style.setProperty("border-radius", "25px 0 0 25px");
    if(num == 0) {
      document.getElementById("progress").style.setProperty("border-left-style", "none")
    }
  } else {
    setTimeout(function() {
      document.getElementById("progress").style.setProperty("border-radius", "25px");
      document.getElementById("progress").style.setProperty("border-right-style", "solid");
      document.getElementById("progress").style.setProperty("transition", "none")
    }, 500);
  }
  document.getElementById("progress").style.setProperty("width", "calc(" + num + "% - 2px)")
}

setPercent(0);

function fixFavicon() {document.getElementById("favicon").href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='.06em' y='.82em' font-size='110'" + (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? " fill='white'" : "") + "></text></svg>"}fixFavicon();

num = 0;
speed = 6;

function loop() {
  fixFavicon();
  if(num < 100) {
    num++
    setPercent(num);
    setTimeout(function() {
      document.getElementById("progress").style.setProperty("transition", "width 0.5s linear")
      loop();
    }, 400 / speed);
  } else {
    speed = Math.floor(Math.random() * 8);
    num = 0;
    setTimeout(function() {
      loop();
    }, 30000 + (Math.random() * 7000));
  }
}

setTimeout(function() {
  loop();
}, 2500)

