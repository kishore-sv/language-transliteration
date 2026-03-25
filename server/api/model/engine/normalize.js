/**
 * normalize.js
 * Step 1 of the pipeline: Clean and normalize an input English sentence.
 */

/**
 * Normalize the input string:
 *  - trim whitespace
 *  - lowercase
 *  - remove punctuation (except apostrophes in contractions)
 *  - collapse multiple spaces
 *
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    // Remove all punctuation (apostrophes, commas, etc.)
    .replace(/[^a-z0-9\s]/g, "")
    // Collapse multiple spaces
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = { normalize };
