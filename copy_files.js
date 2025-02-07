import { promises as fs } from "fs";

async function copyFiles() {
  try {
    await fs.copyFile("public/signup.html", "dist/signup.html");
    await fs.copyFile("public/login.html", "dist/login.html");
    console.log("Archivos copiados correctamente.");
  } catch (err) {
    console.error("Error al copiar archivos:", err);
    process.exit(1); // Para que Netlify detecte el error
  }
}

copyFiles();
