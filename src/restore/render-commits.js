export function renderCommits(commits, index) {
  console.clear();
  console.log("Velg en commit (↑/↓, Enter for å velge, q for å avslutte)\n");

  commits.forEach((c, i) => {
    const selected = i === index;
    if (selected) {
      // Bakgrunnsfarge + bold
      console.log(
        `\x1b[47m\x1b[30m> ${c.filename} | ${c.date} | ${c.message}\x1b[0m`,
      );
    } else {
      console.log(`  ${c.filename} | ${c.date} | ${c.message}`);
    }
  });
}
