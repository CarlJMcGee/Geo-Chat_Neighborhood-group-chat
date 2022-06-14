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
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: "PUT",
      body: JSON.stringify({
        content: comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
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
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
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
