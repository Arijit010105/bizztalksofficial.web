import { copyFileSync, cpSync, mkdirSync, rmSync } from "node:fs";

const outputDirectory = "dist";
const rootFiles = [
  "index.html",
  "404.html",
  "README.txt",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
];

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of rootFiles) {
  copyFileSync(file, `${outputDirectory}/${file}`);
}

cpSync("assets", `${outputDirectory}/assets`, { recursive: true });
