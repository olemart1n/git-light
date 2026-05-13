import { collectFiles } from "../save/collect-files.js";
import { loadPreviousCommit } from "../save/load-previous-commit.js";
import { detectDeletedFiles } from "../save/detect-deleted-files.js";
import { getFileMeta } from "../save/get-file-meta.js";
import { analyzeFile } from "../save/analyze-file.js";
export default function diff() {
  const previousCommit = loadPreviousCommit();
  const currentFiles = collectFiles(".");

  detectDeletedFiles(previousCommit, currentFiles);

  for (const file of currentFiles) {
    const meta = getFileMeta(file);
    const match = previousCommit?.files?.find((f) => file === f.filepath);
    const result = analyzeFile(file, meta, match);

    if (result.status === "NEW") {
      console.log("\x1b[35m" + result.status + " " + file + "\x1b[0m");
    }

    if (result.status === "UNCHANGED") {
      console.log(result.status + " " + file);
    }

    if (result.status === "MODIFIED") {
      console.log("\x1b[33m" + result.status + " " + file + "\x1b[0m");
    }
    // console.log(result.status, " ", file);
  }
}
