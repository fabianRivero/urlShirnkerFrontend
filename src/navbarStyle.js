const logout = document.querySelector('#logout');
const login = document.querySelector('#first-links');

import { item } from "./getToken";

const now = new Date();

if(item){
    if (now.getTime() > item.expiry) {
        localStorage.removeItem("authToken"); 
    };
    logout.className = "on";
    login.className = 'off';


} else {
    logout.className = "off";
    login.className = 'on';
};

