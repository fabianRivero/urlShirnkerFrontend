const logout = document.querySelector('#logout');
const login = document.querySelector('#first-links');
const del = document.querySelector('#delete-account'); 

import { item } from "./getToken";

const now = new Date();

if(!item){
    logout.className = "off";
    login.className = 'on';
    del.className = 'off';
} else {
    if (now.getTime() > item.expiry) {
        console.log(now.getTime(), item.expiry)
        console.log(now.getTime() - item.expiry)
        console.log("qwqwqwqw")
        localStorage.removeItem("authToken"); 
        logout.className = "off";
        login.className = 'on';
        del.className = 'off';
    } else {
        logout.className = "on";
        login.className = 'off';
        del.className = 'on';
    };
};
