import fs from "fs";

fs.copyFileSync("src/mfront-default-style.css", "dist/mfront-default-style.css");

console.log("File copied");