import * as fs from "fs";
import * as path from "path";
export default function showLog() {
  const directoryPath = path.join(".git-light", "commits");

  const dir = fs.readdirSync(directoryPath);

  for (const filename of dir) {
    const filepath = path.join(directoryPath, filename);
    const fileJSON = fs.readFileSync(filepath, "utf8");
    const file = JSON.parse(fileJSON);
    console.log("-------------------");
    console.log("ID/FILENAME:", filename);
    console.log("Message:", file.message);
    console.log("Date:", file.date);
  }
}
