console.log(location.href);
console.log(location.protocol);
console.log(location.hostname);

console.log(navigator.userAgent);
console.log(window.navigator.appName);
console.log(navigator.appVersion);

console.log(screen.width);
console.log(window.screen.height);

let show = function (data) {
  let arr = JSON.parse(data);

  let article = document.querySelectorAll("section#two div.row article");

  for (let x = 0; x < article.length; x++) {
    let art = article[x];
    art.querySelector("img").src = arr[x].download_url;
    art.querySelector("h3").innerText = arr[x].author;
    art.querySelector("p").innerText = arr[x].url;
  }
};

let load = function () {
  let link = "https://picsum.photos/v2/list?page=2&limit=100";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", link);
  xhr.onload = function () {
    if (xhr.status === 200) {
      show(this.responseText);
    } else console.log(xhr.status);
  };
  xhr.send();
};

let full = document.querySelector("section#two a.button");
full.onclick = load;
