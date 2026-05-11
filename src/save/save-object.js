import * as crypto from "crypto";
import * as fs from "fs";
import path from "path";

export function saveObject(content) {
  const contentHash = crypto.createHash("sha1").update(content).digest("hex");

  const objectPath = path.join(".git-light", "objects", contentHash);

  if (!fs.existsSync(objectPath)) {
    fs.writeFileSync(objectPath, content);
  }

  return contentHash;
}

