import path from "node:path";
import fs from "node:fs";

export function readCommits() {
  const directoryPath = path.join(".git-light", "commits");
  const dir = fs.readdirSync(directoryPath);
  const commits = dir.map((filename) => {
    const filepath = path.join(".git-light", "commits", filename);
    const json = fs.readFileSync(filepath, "utf8");
    const data = JSON.parse(json);
    return { filename, ...data };
  });
  return commits;
}
