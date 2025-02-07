import { item } from "./getToken";

const logout = document.querySelector("#logout");

// const currentDomain = 'http://localhost:5173';

const currentDomain = 'https://myurlshrinker.netlify.app/';


logout.addEventListener("click", () => {
    if (!item){
        window.location.href = `${currentDomain}/`;
    };

    localStorage.removeItem("authToken"); 
    window.location.href = `${currentDomain}/`;

});