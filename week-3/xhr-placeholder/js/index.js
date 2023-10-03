function makePostRequest(postID) {
  let httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("Giving up :( Cannot create an XMLHTTP instance");
    return false;
  }

  httpRequest.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts/${postID}`
  );
  httpRequest.onreadystatechange = function () {
    if (
      httpRequest.status === 200 &&
      httpRequest.readyState === 4 // to make sure data already load well
    ) {
      const data = JSON.parse(httpRequest.responseText);

      const userID = document.getElementById("user-id");
      const postContent = document.getElementById("post-content");
      const postTitle = document.getElementById("post-title");

      userID.innerText = data.userId;
      postContent.innerText = data.body;
      postTitle.innerText = data.title;
    }
  };
  httpRequest.send();
}

function makeCommentRequest(postID) {
  let httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("Giving up :( Cannot create an XMLHTTP instance");
    return false;
  }

  httpRequest.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts/${postID}/comments`
  );
  httpRequest.onreadystatechange = function () {
    if (
      httpRequest.status === 200 &&
      httpRequest.readyState === 4 // to make sure data already load well
    ) {
      const data = JSON.parse(httpRequest.responseText);

      const comments = document.getElementById("comments");
      comments.innerHTML = "";

      data.map((item, _i) => {
        comments.insertAdjacentHTML(
          "beforeend",
          `
        <div id="post-comment" class="flex gap-3 py-2 ml-12">
            <div class="h-10 w-10 block shrink-0 rounded-full bg-gray-200"></div>
            <div class="space-y-2">
              <h4 class="font-medium" id="comment-user">${item.name}</h4>
              <p>
                ${item.body}
              </p>
            </div>
          </div>`
        );
      });
    }
  };
  httpRequest.send();
}

function createPostButton(postID) {
  const postList = document.getElementById("post-list");
  const button = document.createElement("button");
  button.textContent = postID;
  button.classList.add(
    "block",
    "px-4",
    "py-2",
    "hover:bg-gray-100",
    "dark:hover:bg-graydark:hover:text-white",
    "w-full"
  );
  button.addEventListener("click", function () {
    const selectedPost = document.getElementById("selected-post");

    selectedPost.innerText = postID;
    makePostRequest(postID);
    makeCommentRequest(postID);
  });
  postList.appendChild(button);
}

Array.from({ length: 20 }).forEach((_val, i) => {
  createPostButton(i + 1);
});

makePostRequest(1);
makeCommentRequest(1);
