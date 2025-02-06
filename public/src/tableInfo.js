import { item } from "./getToken";
import { jwtDecode } from "jwt-decode";
import dotenv from 'dotenv';
dotenv.config();

const backendDomain = process.env.VITE_BACKEND_URL;

const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");

export const tableInfo = async () => {
    if (!item || !item.token) {
        table.className = "off";
        return;
    }

    table.className = "on";

    const token = item.token;
    const payload = jwtDecode(token);
    const id = payload.id;

    try {
        const response = await fetch(`${backendDomain}/api/urls/user/${id}`);
        const data = await response.json();
        (data);

        const columns = ["long_url", "short_url", "clicks"];

        tbody.innerHTML = "";

        let index = 0;
        data.forEach((obj, index) => {
            const tr = document.createElement("tr");

            tr.classList.add("row-url");
            tr.setAttribute("id", `row-${index}`);

            columns.forEach(col => {
                const td = document.createElement("td");
                td.classList.add(`column-${col}`);
                let url = obj[col];

                if (col === "long_url") {
                    if (!url.startsWith("http")) {
                        url = `http://${url}`;
                    }
                    const a = document.createElement("a");
                    a.href = url;
                    a.textContent = url;
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.classList.add("long-url");
                    td.appendChild(a);
                } else if (col === "short_url") {
                    const a = document.createElement("a");
                    a.href = `${backendDomain}/api/urls/${url}`;
                    a.textContent = url; 
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.classList.add("short-url");
                    td.appendChild(a);
                } else {
                    td.textContent = obj[col];
                    td.classList.add("clicks"); 
                }

                tr.appendChild(td);
            });

            const qrTd = document.createElement("td");
            const qrDiv = document.createElement("div");
            qrDiv.classList.add("qr-code");
            const downloadBtn = document.createElement("button");
            downloadBtn.textContent = "📥 Descargar QR";
            downloadBtn.classList.add("download-btn");

            qrTd.appendChild(qrDiv);
            qrTd.appendChild(downloadBtn);
            tr.appendChild(qrTd);

            tbody.appendChild(tr);

            const qr = new QRCode(qrDiv, {
                text: `${backendDomain}/api/urls/${obj.short_url}`,
                width: 100,
                height: 100
            });

            downloadBtn.addEventListener("click", () => {
                const qrCanvas = qrDiv.querySelector("canvas");
                if (qrCanvas) {
                    const link = document.createElement("a");
                    link.href = qrCanvas.toDataURL("image/png");
                    link.download = `QR_${obj.short_url}.png`;
                    link.click();
                }
            });
        });
    } catch (error) {
        console.error("Error al obtener las URLs:", error);
    }
};

tableInfo();