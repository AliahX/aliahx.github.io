name = localStorage.getItem("name");
dontAskForName = localStorage.getItem("dontAskForName");
if(name != "null") {
  document.getElementsByName("name")[0].value = name;
  if(dontAskForName == "true") {
    document.getElementById("name tr").style.display = "none";
  }
}

if(location.search != "") {
  document.body.innerHTML += `<style>@keyframes hide {
    from {filter: opacity(100);}
    to {filter: opacity(0);}
  }

  #message {
    animation-name: hide;
    animation-delay: 5s;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
</style>`;
  switch(location.search.split("=")[1]) {
    case "false":
      localStorage.setItem("dontAskForName", "false");
      document.forms[0].dontAskForName.checked = false;
      document.body.innerHTML += `<div id="message" class="center">
  <h1 class="center message">Error.</h1>
  <span class="center message">Please make sure you have entered the correct information.</span>
</div><style>.message {-webkit-text-fill-color: #faa !important;}</style>`;
      break;
    case "true":
      document.body.innerHTML += `<div id="message" class="center">
  <h1 class="center message">Success!</h1>
  <span class="center message">You should now be automatically logged out for a long time (hopefully). When it stops working, do this again.</span>
</div><style>.message {-webkit-text-fill-color: #afa !important;}</style>`;
      break;
  }
  window.history.pushState("", "", "/autologout");
}
