export function newCommitObject(message) {
  const commitObject = {
    message,
    date: new Date().toISOString(),
    files: [],
  };
  return commitObject;
}
export function newFileObject(filepath, meta) {
  return {
    filepath,
    contentHash: "",
    size: meta.size,
    mtime: meta.mtime,
  };
}
