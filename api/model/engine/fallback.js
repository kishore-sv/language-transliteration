/**
 * fallback.js
 * Step 3 fallback: If no pattern matches, produce a best-effort output.
 *
 * Strategy:
 *   1. Replace known English words with language equivalents using the phrase dict
 *   2. Try to replace known verbs
 *   3. Return word-by-word substituted sentence (Hinglish / code-mix style)
 *
 * This keeps English words that aren't in the dict (they're already understood
 * in casual Indian code-mixed chat).
 */

/**
 * @param {string}   normalizedText
 * @param {object}   langModule  - { phrases, verbMap }
 * @param {string}   language    - language name (for debugging)
 * @returns {string}
 */
function fallback(normalizedText, langModule, language) {
  const { phrases, verbMap } = langModule;

  const words = normalizedText.split(" ");

  const translated = words.map((word) => {
    // Strip trailing 's' to try verb root lookup (run → running, runs)
    const stripped = word.replace(/ing$/, "").replace(/s$/, "").replace(/ed$/, "");

    return (
      phrases[word] ||
      verbMap[word] ||
      verbMap[stripped] ||
      word // keep English word as-is (Hinglish style)
    );
  });

  return translated.join(" ");
}

module.exports = { fallback };
