const comment_text = document
  .querySelector('textarea [name="comment-body"]')
  .value.trim();

const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 2
];

const commentFormHandler = async (e) => {
  e.preventDefault;

  if (comment_text) {
    // need api
    const response = await fetch(`/api/comments/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        content: comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", commentFormHandler);
