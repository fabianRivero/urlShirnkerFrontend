import { item } from "./getToken";
import { backendDomain, currentDomain } from "./urlDomains.js";
import { jwtDecode } from "jwt-decode";

const del = document.querySelector("#delete-account");


if (item){
    const userId = jwtDecode(item.token).id  

    del.addEventListener("click", async () => {
        if (!item){
            window.location.href = `${currentDomain}/`;
            return;
        };
    
        await fetch(`${backendDomain}/api/users/${userId}`, {
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
};

