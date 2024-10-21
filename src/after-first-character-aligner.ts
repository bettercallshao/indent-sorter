export class AfterFirstCharacterAligner {
  perform(input: string, target: string): string {
    const lines = input.split("\n");
    const validLines: string[] = [];
    const validLinesIndices: number[] = [];

    // Step 1: Filter valid lines (non-empty, not a comment, containing the target)
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#") && !trimmedLine.startsWith("/") && line.includes(target)) {
        // Remove multiple spaces immediately after the target
        const targetIndex = line.indexOf(target) + target.length;
        let spaceIndex = targetIndex;
        while (spaceIndex < line.length && line[spaceIndex] === ' ') {
          spaceIndex++;
        }
        const cleanedLine = line.slice(0, targetIndex) + ' ' + line.slice(spaceIndex);
        validLines.push(cleanedLine);
        validLinesIndices.push(index);
      }
    });

    // Step 2: Find the position of the first non-space character after the target in each valid line
    const afterTargetPositions = validLines.map(line => {
      const targetIndex = line.indexOf(target) + target.length;
      let nextCharIndex = targetIndex;
      while (nextCharIndex < line.length && line[nextCharIndex] === ' ') {
        nextCharIndex++;
      }
      return nextCharIndex;
    });

    // Step 3: Determine the maximum left padding needed to align all first non-space characters after the target
    const maxAfterTargetPosition = Math.max(...afterTargetPositions);

    // Step 4: Construct the modified lines with aligned first non-space character after the target
    const modifiedLines = lines.map((line, index) => {
      if (validLinesIndices.includes(index)) {
        const validLineIndex = validLinesIndices.indexOf(index);
        const targetIndex = validLines[validLineIndex].indexOf(target) + target.length;
        let nextCharIndex = targetIndex;
        while (nextCharIndex < validLines[validLineIndex].length && validLines[validLineIndex][nextCharIndex] === ' ') {
          nextCharIndex++;
        }
        const extraSpaces = " ".repeat(maxAfterTargetPosition - nextCharIndex);
        return validLines[validLineIndex].slice(0, targetIndex) + extraSpaces + validLines[validLineIndex].slice(targetIndex);
      }
      return line;
    });

    // Step 5: Join the modified lines back into a paragraph
    return modifiedLines.join("\n");
  }
}
