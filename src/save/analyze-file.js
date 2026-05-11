import * as fs from "fs";
import { hashContent } from "./hash-content.js";
export function analyzeFile(filepath, meta, match) {
  if (!match) return { status: "NEW" };

  if (meta.mtime.toISOString() !== match.mtime || meta.size !== match.size) {
    const content = fs.readFileSync(filepath);
    const contentHash = hashContent(content);
    if (contentHash === match.contentHash) return { status: "UNCHANGED" };

    return { status: "MODIFIED" };
  }

  return { status: "UNCHANGED" };
}
