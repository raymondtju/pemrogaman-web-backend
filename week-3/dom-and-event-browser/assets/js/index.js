let change_text = function () {
  let h2 = document.querySelector("section#one header h2");
  h2.innerText = "Event in Javascript";

  let p = document.querySelector("section#one p");
  p.innerText =
    "HTML DOM events allow Javascript to register = different event handlers on elements in an HTML document. Events are normally used in combination with functions, and the function will not be excevuted before the event occurs (such as when a user clicks a button).";
  p.style.textAlign = "justify";

  return false;
};

let hello = function () {
  alert("Hi, event");
};

let click = function () {
  let target = document.querySelector("section#one a");
  target.target = "#load_more_from_javascript";
  target.onclick = hello;
  target.addEventListener("click", change_text);
};
click();

let new_button = (info) => {
  let button = document.createElement("button");
  button.classList.add("button");
  let text = document.createTextNode(info);
  button.appendChild(text);

  return button;
};

let before = function () {
  let info = prompt("information on rge button");
  let button = new_button(info);
  this.parentNode.insertBefore(button, this);
};
let after = function () {
  let info = prompt("information on rge button");
  let button = new_button(info);
  this.parentNode.appendChild(button);
};

let one = document.querySelector("section#one");
let left = new_button("<<");
left.onclick = before;
let right = new_button(">>");
right.onclick = after;
one.appendChild(left);
one.appendChild(right);
