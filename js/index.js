small = false;
s = false;

dropdowns = document.querySelectorAll(".dropdown button");
for(i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function(e){
        e.preventDefault();
        this.parentElement.classList.toggle("expanded");
    });
}

document.querySelector("button.bars").addEventListener("click", function() {
  document.querySelector("header").classList.toggle("dropdowndisplay");
  if(document.querySelector("header").classList.contains("dropdowndisplay")){
    setTimeout(function(){
      document.querySelector(".nav-ul").classList.toggle("dropdowndisplay");
      document.querySelector(".nav").classList.toggle("dropdowndisplay");
    }, 50)
  } else {
    document.querySelector(".nav-ul").classList.toggle("dropdowndisplay");
    document.querySelector(".nav").classList.toggle("dropdowndisplay");
  }
});

window.onclick = function(event) {
  if (!event.target.matches(".dropdown > *, .dropdown > * > *, .nav-ul, header, header > div")) {
    closeDropdowns(1);
  } else if(!event.target.matches(".dropdown > *, .dropdown > * > *")) {
    closeDropdowns();
  }
}

function closeDropdowns(both) {
  if(both) {
    document.querySelector("header").classList.remove("dropdowndisplay");
    document.querySelector(".nav-ul").classList.remove("dropdowndisplay");
    document.querySelector(".nav").classList.remove("dropdowndisplay");
    document.querySelector("i.dropdown button").parentElement.classList.remove("expanded");
  } else {
    document.querySelector("li.dropdown button").parentElement.classList.remove("expanded");
  }
}

function check(media) {
  if (media.matches) {
    document.body.children[0].classList.add("small");
    document.body.classList.add("small");
	  small = true;
  } else {
    document.body.children[0].classList.remove("small");
    document.body.classList.remove("small");
    small = false;
  }
  if(s != small) {
    s = small;
    closeDropdowns(1);
  }
}
minSize = window.matchMedia("(max-width: 1002px)");
check(minSize);
minSize.addListener(check);


function procede(self) {
  self.parentElement.parentElement.remove();
  if(self.parentElement.children[3].children[1].children[0].checked) {
    localStorage.setItem("procede", true);
  }
}

window.onload = function() {
  if(localStorage.getItem("procede") != null) {
    document.getElementsByClassName("content-warning")[0].remove();
  }
}