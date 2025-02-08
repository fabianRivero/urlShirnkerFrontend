import { item } from "./getToken";
import { currentDomain } from "./urlDomains";

const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
    if (!item){
        window.location.href = `${currentDomain}/`;
    };

    localStorage.removeItem("authToken"); 
    window.location.href = `${currentDomain}/`;

});