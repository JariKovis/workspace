import "./styles.css";
import { rodut } from "./rodut.js";
if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  document.getElementById("app").innerHTML = "<h1><i>Koira-Wiki</i></h1>";
  const divi = document.createElement("div");
  divi.setAttribute("class", "container");

  rodut.forEach(function (rotu, i) {
    const divi1 = document.createElement("div");
    divi1.setAttribute("class", "wiki-item"); const h1 = document.createElement("h1");
    h1.setAttribute("class", "wiki-header");
    h1.textContent = rotu;
    const divi2 = document.createElement("div");
    divi2.setAttribute("class", "wiki-content");
    const p = document.createElement("p");
    p.setAttribute("class", "wiki-text");
    const divi3 = document.createElement("div");
    divi3.setAttribute("class", "img-container");
    const img = document.createElement("img");
    img.setAttribute("class", "wiki-img");
    var str = rotu;
    str = str.replace(/\s+/g, "-").toLowerCase();
    const kuvalinkki = "https://dog.ceo/api/breed/" + str + "/images/random";
    // console.log(kuvalinkki);
    fetch(kuvalinkki)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((response) => {
        // img.setAttribute("src", response.message);
        img.src = response.message;
        //        console.log(response.message);
        console.log(i);
      });
    let linkki = "";
    if (i < 3) {
      linkki = "https://en.wikipedia.org/api/rest_v1/page/summary/" + rotu;
    } else if (i === 3) {
      linkki =
        "https://en.wikipedia.org/api/rest_v1/page/summary/Boxer_%28dog%29";
    } else {
      linkki =
        "https://en.wikipedia.org/api/rest_v1/page/summary/Redbone Coonhound";
    }
    const myRequest = new Request(linkki);
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((response) => {
        p.textContent = response.extract;
      });

    divi3.appendChild(img);
    //console.log(img);
    divi2.appendChild(p);
    divi2.appendChild(divi3);
    divi1.appendChild(h1);
    divi1.appendChild(divi2);
    divi.appendChild(divi1);
  });
  
  document.body.appendChild(divi);
}
