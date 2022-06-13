const comment_text = document.querySelector('textarea [name="post-body"]').value.trim();

const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

if (comment_text) {
    // need api 
    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}