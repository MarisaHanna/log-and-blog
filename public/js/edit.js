  
const edit = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const render_text = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];




    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            render_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
   }

  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', edit);