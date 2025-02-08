const logout = document.querySelector('#logout');
const login = document.querySelector('#first-links');
const del = document.querySelector('#delete-account'); 

import { item } from "./getToken";

const now = new Date();

if(item){
    if (now.getTime() > item.expiry) {
        localStorage.removeItem("authToken"); 
        logout.className = "off";
        login.className = 'on';
        del.className = 'off';
    };
    logout.className = "on";
    login.className = 'off';
    del.className = 'on';

} else {
    logout.className = "off";
    login.className = 'on';
    del.className = 'off';
};

