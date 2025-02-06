const loginForm = document.querySelector("#form");

const backendDomain = import.meta.env.VITE_BACKEND_URL;
const currentDomain = import.meta.env.VITE_FRONTEND_URL;

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
  try{ 
    
    const response = await fetch(`${backendDomain}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  
    });
    if (response.status === 400) {
        alert('Invalid password o email.');
        return;
      } else if (!response.ok) {
        alert('Error: ' + response.status);
        return;
      };

    const data = await response.json();
    const token = data.token;

        const now = new Date();
        const ttl = 3600000;
        const item = {
            token: token,
            expiry: now.getTime() + ttl,
        };
        alert("Successful login");
        localStorage.setItem('authToken', JSON.stringify(item));
        window.location.href = `${currentDomain}`;
    }catch{
      alert("Something went wrong.");
    };
});
