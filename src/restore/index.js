import path from "path";
import fs from "fs";
import { clearWorkspace } from "./clear-workspace.js";
import { showList } from "./show-list.js";
export default function restore(id) {
  if (!id) {
    showList();
    return;
  }
  const commitPath = path.join(".git-light", "commits", id);
  if (!fs.existsSync(commitPath)) {
    console.log("commit with ID: ", id, " does not exist");
    return;
  }
  const commitJSON = fs.readFileSync(commitPath, "utf8");
  const commit = JSON.parse(commitJSON);
  const files = commit.files;
  clearWorkspace();

  for (let i = 0; i < files.length; i++) {
    const filepath = files[i].filepath;
    const contentHash = files[i].contentHash;
    const objectPath = path.join(".git-light", "objects", contentHash);
    const content = fs.readFileSync(objectPath);

    ensureDirectoryExists(filepath);

    fs.writeFileSync(filepath, content);
  }

  console.log("Restored id: ", id);
}

function ensureDirectoryExists(filepath) {
  const dir = path.dirname(filepath);
  fs.mkdirSync(dir, { recursive: true });
}
