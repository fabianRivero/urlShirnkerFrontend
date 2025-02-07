const signupForm = document.querySelector("#form");

// const backendDomain = 'http://localhost:5000';
// const currentDomain = 'http://localhost:5173';

const backendDomain = 'https://urlshirnkerapi.onrender.com';
const currentDomain = 'https://myurlshrinker.netlify.app/';

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loadingOverlay.classList.remove("hidden");

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {

    if (password.length < 8){
            alert("Password must have at least 8 characters");
            loadingOverlay.classList.add("hidden"); // Oculta el overlay
            return;
    };   

    const usersResponse = await fetch(`${backendDomain}/api/users`);
    const responseInfo = await usersResponse.json();

    if (responseInfo.length > 0){
        let userExists = responseInfo.some(user => user.email === email);
        if (userExists) {
            alert("This user already exists,");
            loadingOverlay.classList.add("hidden");
            return;
          };
    };

    const signupResponse = await fetch(`${backendDomain}/api/users/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (signupResponse.ok) {
        alert("User signed up successfully");
        window.location.href = `${currentDomain}/`;
    } else {
        alert("Something went wrong");
    };
    
  } catch (error) {
    alert("Something went wrong");
  } finally {
    loadingOverlay.classList.add("hidden"); 
  };
});
