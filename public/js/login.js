const signIn = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        alert('New User has been created!')
        document.location.replace('/');
      } else {
        alert('Ooops! Something went wrong!');
      }
    }
  };
  
  const login = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if ( username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
        
      if (response.ok) {  
        document.location.replace('/');
      } else {
        alert('Ooops! Something went wrong!');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signIn);
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', login);