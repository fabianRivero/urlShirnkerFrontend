const signupForm = document.querySelector("#form");

const backendDomain = process.env.VITE_BACKEND_URL || "Valor por defecto";
console.log("Backend URL:", backendDomain);
console.log(import.meta.env);
console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

// const backendDomain = import.meta.env.VITE_BACKEND_URL;
const currentDomain = import.meta.env.VITE_FRONTEND_URL;

console.log(backendDomain, currentDomain);

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {

    if (password.length < 8){
            alert("Password must have at least 8 characters");
            return;
    };   

    const usersResponse = await fetch(`${backendDomain}/api/users`);
    const responseInfo = await usersResponse.json();

    if (responseInfo.length > 0){
        let userExists = responseInfo.some(user => user.email === email);
        if (userExists) {
            alert("This user already exists,");
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
  };
});
