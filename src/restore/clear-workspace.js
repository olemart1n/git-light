import fs from "fs";
import path from "path";

export function clearWorkspace() {
  const items = fs.readdirSync(".");

  for (const item of items) {
    if (item === "node_modules" || item === ".git-light") {
      continue;
    }

    const fullPath = path.join(".", item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

