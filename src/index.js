#!/usr/bin/env node
import init from "./init/index.js";
import save from "./save/index.js";
import showLog from "./log/index.js";
import diff from "./diff/index.js";
import restore from "./restore/index.js";
import { styleText } from "util";
const command = process.argv[2];
const commandMsg = process.argv[3];

const availableCommands = ["init", "save", "restore", "diff", "log"];
if (command === "init") init();
if (command === "save") save(commandMsg);
if (command === "restore") restore(commandMsg);
if (command === "diff") diff();
if (command === "log") showLog();
if (!command) {
  const output =
    styleText("red", "Error") +
    ": No command provided. Available commands: " +
    availableCommands +
    "\n" +
    styleText("yellow", "Usage") +
    ": git-light <command> [options]";
  console.log(output);
}
if (command && !availableCommands.some((c) => c === command)) {
  const output =
    styleText("red", "Error") +
    ": Unknown command " +
    styleText("bold", command + ".") +
    " Available commands: " +
    availableCommands;
  console.log(output);
}
