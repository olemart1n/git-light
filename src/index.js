#!/usr/bin/env node
import * as fs from "fs";
import save from "./save/index.js";
import { showLog } from "./show-log.js";
import diff from "./diff.js";
import restore from "./restore/index.js";
const command = process.argv[2];
const commandMsg = process.argv[3];

if (command === "init") init();
if (command === "save") save(commandMsg);
if (command === "restore") restore(commandMsg);
if (command === "diff") diff();
if (command === "log") showLog();

function init() {
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
