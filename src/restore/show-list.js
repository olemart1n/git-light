import * as process from "process";
import readline from "readline";
import { readCommits } from "../read/read-commits.js";
import { renderCommits } from "./render-commits.js";
import restore from "./index.js";
export function showList() {
  const commits = readCommits();
  let index = 0; // valgt commit
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true); // enter trengs ikke for trigge eventet.
  process.stdin.on("keypress", (_, key) => {
    if (key.ctrl && key.name === "c") {
      process.exit();
    }
    if (key.name === "q") process.exit();
    if (key.name === "down") {
      index !== commits.length - 1 && index++;
      renderCommits(commits, index);
    }
    if (key.name === "up") {
      index !== 0 && index--;
      renderCommits(commits, index);
    }
    if (key.name === "return") {
      console.log("Du valgte commit: ", commits[index].filename);
      restore(commits[index].filename);
      process.exit();
    }
  });

  renderCommits(commits, index);
}
