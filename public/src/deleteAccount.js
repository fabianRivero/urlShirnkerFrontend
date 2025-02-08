import { item } from "./getToken";
import { backendDomain } from "./urlDomains";
import { currentDomain } from "./urlDomains";

const del = document.querySelector("#delete-account");

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