import { item } from "./getToken";
import { tableInfo } from "./tableInfo";
import { jwtDecode } from 'jwt-decode';
import { backendDomain } from "./urlDomains.js";

document.addEventListener("DOMContentLoaded", () => {

const shrinkButton = document.querySelector("#shrink-button");

    if (!shrinkButton) {
        return;
    }

    function urlValid(url) {
        try {
          new URL(url);
          return true; 
        } catch (error) {
          return false; 
        }
      }
      
      const url = document.querySelector('#originalUrl');

    shrinkButton.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!item) {
            alert("You must log in first");
            return;
        };

        if (!urlValid(url.value)) {
            alert("You must enter a valid URL");
            return;
        };

        shrinkButton.disabled = true;
        shrinkButton.textContent = "Processing...";
        shrinkButton.style.backgroundColor = "#ccc";
        shrinkButton.style.cursor = "not-allowed";

        const token = item.token;
        const payload = jwtDecode(token);
        const id = payload.id;
         
        try {
            await fetch(`${backendDomain}/api/urls/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    long_url: url.value.trim(),
                    userId: id,
                }),
            });
            tableInfo();
            alert("Link shrink successfully");
        } catch (error) {
            console.error(error);
        } finally {
            shrinkButton.disabled = false;
            shrinkButton.textContent = "Shrink";
            shrinkButton.style.backgroundColor = "#4CAF50";
            shrinkButton.style.cursor = "pointer";
          };
    });
});
