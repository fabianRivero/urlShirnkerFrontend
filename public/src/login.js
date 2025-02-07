const loginForm = document.querySelector("#form");
const loginButton = document.querySelector("#login-button");

// const backendDomain = 'http://localhost:5000';
// const currentDomain = 'http://localhost:5173';

const backendDomain = 'https://urlshirnkerapi.onrender.com';
const currentDomain = 'https://myurlshrinker.netlify.app/';

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
  try{ 

    loginButton.disabled = true;
    loginButton.textContent = "Processing...";
    loginButton.style.backgroundColor = "#ccc";
    loginButton.style.cursor = "not-allowed";
    
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
        alert("logged in successfully");
        localStorage.setItem('authToken', JSON.stringify(item));
        window.location.href = `${currentDomain}`;
    }catch{
      alert("Something went wrong.");
      loadingOverlay.classList.add("hidden");
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "Sign Up";
      loginButton.style.backgroundColor = "#4CAF50";
      loginButton.style.cursor = "pointer";
    };
});
