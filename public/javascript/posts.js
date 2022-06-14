const editPostFormHandler = async (e) => {
  e.preventDefault();

  const post_text = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();

  const post_title = document.querySelector("#title-edit").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  if (post_text) {
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

const newPostFormHandler = async (e) => {
  e.preventDefault();

  const post_text = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();

  const post_title = document.querySelector("#title-create").value.trim();

  if (post_text) {
    const response = await fetch(`/api/posts/`, {
      method: "POST",
      body: JSON.stringify({
        title: post_title,
        content: post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

if (document.querySelector("#edit-post-form")) {
  document
    .querySelector("#edit-post-form")
    .addEventListener("submit", editPostFormHandler);
}

if (document.querySelector("#create-post-form")) {
  document
    .querySelector("#create-post-form")
    .addEventListener("submit", newPostFormHandler);
}
