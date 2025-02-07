import { item } from "./getToken";

// const backendDomain = 'http://localhost:5000';
// const currentDomain = 'http://localhost:5173';

const backendDomain = 'https://urlshirnkerapi.onrender.com';
const currentDomain = 'https://myurlshrinker.netlify.app/';

del.addEventListener("click", async () => {
    if (!item){
        window.location.href = `${currentDomain}/`;
        return;
    };

    await fetch(`${backendDomain}/api/users/${item.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${item.token}`,
        }
    }); 
    alert("Account deleted successfully.");
    localStorage.removeItem("authToken"); 
    window.location.href = `${currentDomain}/`;

});