import * as fs from "fs";
import path from "path";

export function collectFiles(dir, base = "") {
  let results = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (item === ".git-light" || item === "node_modules" || item === ".git")
      continue;

    const fullPath = path.join(dir, item);
    const relativePath = path.join(base, item);

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      results = results.concat(collectFiles(fullPath, relativePath));
    } else {
      results.push(relativePath);
    }
  }
  return results;
}

