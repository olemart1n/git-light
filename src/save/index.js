import * as fs from "fs";
import { detectDeletedFiles } from "./detect-deleted-files.js";
import { collectFiles } from "./collect-files.js";
import { hashContent } from "./hash-content.js";
import { newCommitObject, newFileObject } from "./new-commit-object.js";
import { saveObject } from "./save-object.js";
import { analyzeFile } from "./analyze-file.js";
import { getFileMeta } from "./get-file-meta.js";
import { loadPreviousCommit } from "./load-previous-commit.js";
import path from "path";
export default function save(message) {
  const files = collectFiles(".");

  const previousCommit = loadPreviousCommit();
  detectDeletedFiles(previousCommit, files);
  const commitObject = newCommitObject(message);

  let fileCount = 0;
  for (const file of files) {
    const meta = getFileMeta(file);
    const match = previousCommit?.files?.find((f) => file === f.filepath);
    const result = analyzeFile(file, meta, match);
    const fileObj = newFileObject(file, meta);

    if (result.status === "NEW") {
      const content = fs.readFileSync(file);
      const contentHash = saveObject(content);
      fileObj.contentHash = contentHash;

      console.log("\x1b[35m" + result.status + " " + file + "\x1b[0m");
    }

    if (result.status === "UNCHANGED") {
      fileObj.contentHash = match.contentHash;
      console.log(result.status + " " + file);
    }

    if (result.status === "MODIFIED") {
      const content = fs.readFileSync(file);
      const contentHash = hashContent(content);
      saveObject(content);
      fileObj.contentHash = contentHash;
      console.log("\x1b[33m" + result.status + " " + file + "\x1b[0m");
    }
    commitObject.files.push(fileObj);
    // console.log(result.status, " ", file);
    fileCount++;
  }
  console.log("\x1b[32m  COMMITED: " + fileCount + " files\x1b[0m");
  const randomID = Math.random().toString(36).substring(2, 9);
  const pathh = path.join(".git-light", "commits", randomID + ".json");
  fs.writeFileSync(pathh, JSON.stringify(commitObject, null, 2));
}
