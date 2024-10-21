export class FirstCharacterAligner {
  perform(input: string, target: string): string {
    const lines = input.split("\n");
    const validLines: string[] = [];
    const validLinesIndices: number[] = [];

    // Step 1: Filter valid lines (non-empty, not a comment, containing the target)
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#") && !trimmedLine.startsWith("/") && line.includes(target)) {
        // Remove multiple spaces immediately preceding the target
        const targetIndex = line.indexOf(target);
        let spaceIndex = targetIndex - 1;
        while (spaceIndex >= 0 && line[spaceIndex] === ' ') {
          spaceIndex--;
        }
        const cleanedLine = line.slice(0, spaceIndex + 1) + ' ' + line.slice(targetIndex);
        validLines.push(cleanedLine);
        validLinesIndices.push(index);
      }
    });

    // Step 2: Find the position of the first appearance of the target in each valid line
    const targetPositions = validLines.map(line => line.indexOf(target));

    // Step 3: Determine the maximum left padding needed to align all target occurrences
    const maxTargetPosition = Math.max(...targetPositions);

    // Step 4: Construct the modified lines with aligned target
    const modifiedLines = lines.map((line, index) => {
      if (validLinesIndices.includes(index)) {
        const targetIndex = validLines[validLinesIndices.indexOf(index)].indexOf(target);
        const extraSpaces = " ".repeat(maxTargetPosition - targetIndex);
        return validLines[validLinesIndices.indexOf(index)].slice(0, targetIndex) + extraSpaces + validLines[validLinesIndices.indexOf(index)].slice(targetIndex);
      }
      return line;
    });

    // Step 5: Join the modified lines back into a paragraph
    return modifiedLines.join("\n");
  }
}
