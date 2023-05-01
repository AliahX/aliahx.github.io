fullPath = location.pathname.split("/");
path = fullPath[fullPath.length-2] + "/";

if(localStorage.getItem(path + "page") == null) localStorage.setItem(path + "page", 0);
color = "#ffffff"

function setPage(index) {
  $("#mainBox").css("display", index == 0 ? "block" : "none");
  $("#createBox").css("display", index == 1 ? "block" : "none");
  $("#allBox").css("display", index == 2 ? "block" : "none");
  localStorage.setItem(path + "page", index);
}

function search(input) {
  $(".flagBox").each(function() {
    e = $(this);
    e.find(".flagName").text().toLowerCase().includes(input.value.toLowerCase()) ? e.show() : e.hide();
  });
}

function setColor(col) {
  $(".colorButton").removeClass("active");
  $(`button[onclick="setColor('${col}')"]`).addClass("active");
  color = colorList[col];
}

function setFlagStyle(self) {
  flagElement = document.querySelector("#drawFlag");
  console.log(generateFlag(self.value, [], true));
  flagElement.innerHTML = generateFlag(self.value, [], true);
  document.querySelectorAll("#drawFlag *").forEach(function(element) {
    element.onclick = function() {
      if(element.tagName == "circle") {
        element.setAttribute("stroke", color)
      } else {
        element.setAttribute("fill", color)
      }
    }
  });
}

function nextVariant(self, flagName) {
  svg = self.parentElement.parentElement.children[1];
  currentVariant = parseInt(svg.getAttribute("flagvariant"));

  newVariant = currentVariant + 1;
  if(newVariant >= flagList[flagName].length) newVariant = 0;

  svg.setAttribute("flagvariant", newVariant);
  svg.outerHTML = generateFlag(flagList[flagName][newVariant]["style"], flagList[flagName][newVariant]["colors"], false, newVariant);

  self.parentElement.parentElement.children[2].innerHTML = flagList[flagName][newVariant]["name"];

  self.parentElement.parentElement.children[2].classList.remove("flagDescTall")
  if(self.parentElement.parentElement.children[2].offsetHeight > 40){
    self.parentElement.parentElement.children[2].classList.add("flagDescTall")
  }
}

function load() {
  Object.entries(flagList).forEach(([name, flag]) => {
    name2 = name.charAt(0).toUpperCase() + name.slice(1);
    buttonData = flag.length == 1 ? " disabled" : ` onclick='nextVariant(this, "${name}");' title='View Other Flag Variants'`;
    document.querySelector("#allBox").innerHTML += `<div class="contentBox flagBox">
    <div class="flagName">${name2} <button${buttonData} class="axInput axButton"><i class="fas fa-chevron-right"></i></button></div>
    ${generateFlag(flag[0]["style"], flag[0]["colors"], false, 0)}
    <div class="flagDesc">${flag[0]["name"]}</div>
  </div>`
  });

  // $(".flagDesc").

  Object.entries(styleList).forEach(([name]) => {
    document.querySelector("#flagStyle").innerHTML += `<option value="${name}">${name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ")}</option>`
  });

  styleCount = {};
  Object.entries(flagList).forEach(([name, flag]) => {
    if(styleCount[flag[0]["style"]] == undefined) {
      styleCount[flag[0]["style"]] = 1;
    } else {
      styleCount[flag[0]["style"]] += 1;
    }
  });

  document.querySelector("#flagStyle").value = Object.keys(styleCount).reduce((a, b) => styleCount[a] > styleCount[b] ? a : b);
  document.querySelector("#flagStyle").oninput();

  Object.entries(colorList).forEach(([name, color], i) => {
    document.querySelector("#colorBox").innerHTML += `<button class="colorButton" style="background-color: ${color};" onclick="setColor('${name}')" title="${name.charAt(0).toUpperCase() + name.slice(1)}"></button>`
  });

  colorCount = {};
  Object.entries(flagList).forEach(([name, flag]) => {
    flag[0]["colors"].forEach(function(element, i) {
      if(colorCount[element] == undefined) {
        colorCount[element] = 1;
      } else {
        colorCount[element] += 1;
      }
    });
  });

  color = colorList[Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b)];

  document.querySelector(`.colorButton[style="background-color: ${colorList[Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b)]};"]`).classList.add("active");
}

function copyFlagData(self) {
  style = self.parentElement.children[0].value;
  colors = [];
  
  Array.from(self.parentElement.parentElement.children[0].children).forEach(function(element) {
    color = ""
    if(element.tagName == "circle") {
      color = element.getAttribute("stroke");
    } else {
      color = element.getAttribute("fill");
    }

    Object.entries(colorList).forEach(([name, color2]) => {
      if(color2 == color) color = name;
    });

    colors.push("\n    \"" + color + "\"");
  });

  flagData = `{
  "style": "${style}",
  "colors": [${colors.join(",") + "\n  "}]
}`;

  navigator.clipboard.writeText(flagData);
}

function generateFlag(style, colors, strip=false, flagVariant=0) {
  SVGData = "";
  styleList[style].forEach(function(element, i) {
    if(element.split(" ")[0] == "circle") {
      element = element + "stroke='" + (colors[i] == undefined ? "#8C8273" : colorList[colors[i]]) + "'"
    } else {
      element = element + " fill='" + (colors[i] == undefined ? "#1E2021' stroke='#8C8273" : colorList[colors[i]]) + "'"
    }
    SVGData += "\n  <" + element + " />";
  });
  if(strip) {
    return SVGData;
  } else {
    return `<svg version="1.1" flagvariant="${flagVariant}" width="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">${SVGData}\n</svg>`
  }
}

$(document).ready(function(){
  setPage(localStorage.getItem(path + 'page'));
  load();
});