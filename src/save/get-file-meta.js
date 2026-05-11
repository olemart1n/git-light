import * as fs from "fs";

export function getFileMeta(filepath) {
  const stat = fs.statSync(filepath);
  const mtime = stat.mtime;
  const size = stat.size;
  return { mtime, size };
}
