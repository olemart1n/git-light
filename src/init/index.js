import fs from "fs";

export default function init() {
  if (!fs.existsSync(".git-light")) {
    fs.mkdirSync(".git-light");
    console.log("repository initialized");
  }
  if (!fs.existsSync(".git-light/obects/")) {
    fs.mkdirSync(".git-light/objects/");
  }
  if (!fs.existsSync(".git-light/commits/")) {
    fs.mkdirSync(".git-light/commits/");
  }
}
