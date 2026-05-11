export function detectDeletedFiles(previousCommit, newFiles) {
  if (!previousCommit.files) return;
  previousCommit?.files.forEach((f) => {
    const isInFiles = newFiles.some((x) => f.filepath === x);

    if (!isInFiles) console.log("\x1b[31mDELETED:\x1b[0m", f.filepath);
  });
}
