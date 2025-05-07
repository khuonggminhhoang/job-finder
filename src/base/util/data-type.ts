export const mergeRegex = (...regexes: RegExp[]) =>
  new RegExp(regexes.map((regex) => regex.source).join('|'));
