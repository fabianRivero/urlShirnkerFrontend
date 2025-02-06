import { item } from "./getToken";

const logout = document.querySelector("#logout");

const currentDomain = import.meta.env.VITE_FRONTEND_URL;

logout.addEventListener("click", () => {
    if (!item){
        window.location.href = `${currentDomain}/`;
    };

    localStorage.removeItem("authToken"); 
    window.location.href = `${currentDomain}/`;

});