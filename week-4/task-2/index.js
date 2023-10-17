// 221111452 - Raymond Tju

import Post from "./post.js";
import Comment from "./comment.js";

Array.from({ length: 10 }).forEach((_item, i) => {
  document.querySelector(".form-select").insertAdjacentHTML(
    "beforeend",
    `
  <option value="${i + 1}">${i + 1}</option>
  `
  );
});

class App {
  constructor() {
    this.post = new Post();
    this.comment = new Comment();
  }

  async search() {
    const total = document.getElementById("fr-sl").selectedIndex;

    const c1 = document.getElementById("flexRadioDefault1").checked;
    const c2 = document.getElementById("flexRadioDefault2").checked;

    if (c1) {
      const data = await this.post.getBatchPost(total);
      document.getElementById("data").innerHTML = "";
      data.forEach((item, _i) => {
        document.getElementById("data").insertAdjacentHTML(
          "beforeend",
          `
          <li class="clearfix">
            <img src="https://bootdey.com/img/Content/user_2.jpg" class="avatar" alt="">
            <div class="post-comments">
              <p class="meta">Ariana </p>
              <p class="posts postingan">
                ${item.body}
              </p>
            </div>
          </li>
        `
        );
      });
    }
    if (c2) {
      const dataComment = await this.comment.getBatchComment(total);
      console.log(dataComment);
      for (let x = 0; x < total; x++) {
        const dataPost = await this.post.getPost(x + 1);

        if (x == 0) document.getElementById("data").innerHTML = "";
        document.getElementById("data").insertAdjacentHTML(
          "beforeend",
          `
          <li class="clearfix">
            <img src="https://bootdey.com/img/Content/user_2.jpg" class="avatar" alt="">
            <div class="post-comments">
              <p class="meta">Ariana </p>
              <p class="posts postingan">
                ${dataPost.body}
              </p>
            </div>
            ${dataComment[x].map((cmt, _i) => {
              return `
                <ul class="comments komentar" id="comments">
                  <li class="clearfix">
                    <img src="https://bootdey.com/img/Content/user_3.jpg" class="avatar" alt="">
                    <div class="post-comments">
                      <p class="meta">John </p>
                      <p>
                        ${cmt.body}
                      </p>
                    </div>
                  </li>
                </ul>
              `;
            })}
          </li>
        `
        );
      }
    }
  }
}

const app = new App();

document
  .getElementById("sbmt")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    await app.search();
  });
