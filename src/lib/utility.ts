export function camelToTitleCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
    .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
}
