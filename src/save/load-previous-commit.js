import fs from "fs";
import path from "path";

export function loadPreviousCommit() {
  const dir = path.join(".git-light", "commits");
  const files = fs.readdirSync(dir);

  if (files.length === 0) return [];
  const sorted = files
    .map((file) => {
      const full = path.join(dir, file);
      return {
        file,
        mtime: fs.statSync(full).mtime,
      };
    })
    .sort((a, b) => a.mtime - b.mtime);

  const latest = sorted[sorted.length - 1].file;
  const raw = fs.readFileSync(path.join(dir, latest), "utf8");
  return JSON.parse(raw);
}
