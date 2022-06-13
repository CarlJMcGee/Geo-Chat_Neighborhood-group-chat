const commentFormHandler = async (e) => {
  e.preventDefault();

  const post_text = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();

  const post_title = document.querySelector("#title-edit").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  if (post_text) {
    // need api
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: post_title,
        content: post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", commentFormHandler);