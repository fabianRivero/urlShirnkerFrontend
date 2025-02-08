import { backendDomain } from "./urlDomains";
import { currentDomain } from "./urlDomains";

const signupForm = document.querySelector("#form");
const signupButton = document.querySelector("#signup-button");

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
  
    signupButton.disabled = true;
    signupButton.textContent = "Processing...";
    signupButton.style.backgroundColor = "#ccc";
    signupButton.style.cursor = "not-allowed";

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
  } finally {
    signupButton.disabled = false;
    signupButton.textContent = "Sign Up";
    signupButton.style.backgroundColor = "#FF9800";
    signupButton.style.cursor = "pointer";
  };
});
