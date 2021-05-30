const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const render_text = document.querySelector('input[name="post-content"]').value;

    const res = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            render_text
        }),

        headers: {
            'Content-type': 'application/json'
        }

    });

    if (res.ok) {
        document.location.replace('/dashboard');

    }else {
        alert(res.statusText);
    }
}

 document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPost);