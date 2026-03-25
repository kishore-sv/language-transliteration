/**
 * matcher.js
 * Step 2 of the pipeline: Pattern detection.
 *
 * Iterates the language's `patterns` array and returns the first match.
 */

/**
 * Try to match the normalized text against all language patterns.
 *
 * @param {string} normalizedText
 * @param {Array}  patterns  - from the language module
 * @returns {{ pattern: object, match: RegExpMatchArray } | null}
 */
function matchPattern(normalizedText, patterns) {
  for (const pattern of patterns) {
    const match = normalizedText.match(pattern.regex);
    if (match) {
      return { pattern, match };
    }
  }
  return null;
}

module.exports = { matchPattern };
