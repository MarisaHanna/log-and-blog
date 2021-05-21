const signIn = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
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
  
    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();
  
    if ( username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {  
        document.location.replace('/dashboard');
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