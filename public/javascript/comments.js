const editCommentFormHandler = async (e) => {
  e.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const comment_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  postId = document.querySelector("#edit-comment-form").dataset.postId;

  if (comment_text) {
    try {
      const response = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        body: JSON.stringify({
          content: comment_text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resBody = await response.json();

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        if (resBody.code === "bad language") {
          if (document.querySelector(".err")) {
            return;
          }
          var badLang = document.createElement("p");
          badLang.className = "err";
          badLang.innerHTML = resBody.message;
          badLang.style.color = "#f00000";
          badLang.style.fontWeight = "normal";
          badLang.style.textDecorationLine = "none";
          badLang.style.margin = "0";
          badLang.style.padding = "0";
          document.querySelector("#edit-comment-form").append(badLang);
          return;
        }

        alert(response.statusText);
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};

const newCommentFormHandler = async (e) => {
  e.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  if (comment_text) {
    try {
      const response = await fetch(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify({
          content: comment_text,
          post_id: postId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resBody = await response.json();

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        if (resBody.code === "bad language") {
          if (document.querySelector(".err")) {
            return;
          }
          var badLang = document.createElement("p");
          badLang.className = "err";
          badLang.innerHTML = resBody.message;
          badLang.style.color = "#f00000";
          badLang.style.fontWeight = "normal";
          badLang.style.textDecorationLine = "none";
          badLang.style.margin = "0";
          badLang.style.padding = "0";
          document.querySelector("#new-comment-form").append(badLang);
          return;
        }

        alert(response.statusText);
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};

if (document.querySelector("#edit-comment-form")) {
  document
    .querySelector("#edit-comment-form")
    .addEventListener("submit", editCommentFormHandler);
}

if (document.querySelector("#new-comment-form")) {
  document
    .querySelector("#new-comment-form")
    .addEventListener("submit", newCommentFormHandler);
}
