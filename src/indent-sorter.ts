export class IndentSorter {
  perform(input: string): string {
    const lines = input.split("\n");
    const groups: string[][] = [];
    let currentGroup: string[] = [];
    let baseIndentation: number | null = null;
    let pendingEmptyLines: number = 0;
    let leadingEmptyLines: number = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trimEnd();
      const isEmpty = trimmedLine.trim() === '';

      // Keep the number of pending empty lines and skip the rest of the code
      if (isEmpty) {
        pendingEmptyLines += 1;
        if (baseIndentation === null) {
          leadingEmptyLines = pendingEmptyLines;
        }
        return;
      }

      const currentIndentation = trimmedLine.search(/\S|$/);

      // Set the base indentation from the first non-empty line
      if (baseIndentation === null) {
        baseIndentation = currentIndentation;
      }

      // If current group is non-empty, we append the empty lines
      if (currentGroup.length > 0) {
        // If current line is base indentation following empty lines, and is not a terminator word, start new group 
        if (currentIndentation === baseIndentation && pendingEmptyLines > 0 && !/^\s*(end|\}|\]|\))/.test(trimmedLine)) {
          groups.push(currentGroup);
          currentGroup = [];
        } else {
          for (let i = 0; i < pendingEmptyLines; i++) {
            currentGroup.push('');
          }
        }
      }

      // Add current line to the current group
      currentGroup.push(line);

      // Clear pending empty lines since if we reach here the current line is non-empty
      pendingEmptyLines = 0;
    });

    // Add the last group if not empty
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    // Sort groups by the first significant non-comment line
    const sortedGroups = groups.sort((a, b) => {
      const lineA = a.find(line => !line.trim().startsWith("#") && !line.trim().startsWith("/"));
      const lineB = b.find(line => !line.trim().startsWith("#") && !line.trim().startsWith("/"));
      return (lineA || "").localeCompare(lineB || "");
    });

    return "\n".repeat(leadingEmptyLines) + sortedGroups.map(group => group.join("\n")).join("\n\n") + "\n".repeat(pendingEmptyLines);
  }
}