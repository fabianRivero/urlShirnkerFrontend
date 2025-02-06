import { item } from "./getToken";
import dotenv from 'dotenv';
dotenv.config();

const logout = document.querySelector("#logout");

const currentDomain = process.env.VITE_FRONTEND_URL;

logout.addEventListener("click", () => {
    if (!item){
        window.location.href = `${currentDomain}/`;
    };

    localStorage.removeItem("authToken"); 
    window.location.href = `${currentDomain}/`;

});