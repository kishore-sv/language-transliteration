/**
 * convert.js  –  Main conversion engine
 *
 * Pipeline:
 *   1. normalize(text)
 *   2. matchPattern(normalized, language.patterns)
 *   3a. If matched  → pattern.build(match)
 *   3b. If no match → fallback(normalized, langModule)
 */

const { normalize } = require("./engine/normalize");
const { matchPattern } = require("./engine/matcher");
const { fallback } = require("./engine/fallback");

// ─── Language registry ────────────────────────────────────────────────────────
const LANGUAGES = {
  kannada: require("./language/kannada"),
  hindi: require("./language/hindi"),
  telugu: require("./language/telugu"),
  tamil: require("./language/tamil"),
  malayalam: require("./language/malayalam"),
};

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

/**
 * Convert an English sentence to casual spoken Indian language in Roman script.
 *
 * @param {string} text      - English input sentence
 * @param {string} language  - Target language: kannada | hindi | telugu | tamil | malayalam
 * @returns {{ output: string, method: "pattern" | "fallback", patternId?: string }}
 */
function convert(text, language) {
  // ── Validate language ──────────────────────────────────────────────────────
  const lang = language.toLowerCase().trim();
  if (!LANGUAGES[lang]) {
    throw new Error(
      `Unsupported language: "${language}". Supported: ${SUPPORTED_LANGUAGES.join(", ")}`
    );
  }

  const langModule = LANGUAGES[lang];

  // ── Step 1: Normalize ──────────────────────────────────────────────────────
  const normalized = normalize(text);

  if (!normalized) {
    return { output: "", method: "fallback" };
  }

  // ── Step 2: Pattern match ──────────────────────────────────────────────────
  const result = matchPattern(normalized, langModule.patterns);

  if (result) {
    // ── Step 3a: Build from pattern template ─────────────────────────────────
    const output = result.pattern.build(result.match, langModule.verbMap, langModule.suffixes);
    return {
      output,
      method: "pattern",
      patternId: result.pattern.id,
    };
  }

  // ── Step 3b: Fallback ──────────────────────────────────────────────────────
  const output = fallback(normalized, langModule, lang);
  return { output, method: "fallback" };
}

module.exports = { convert, SUPPORTED_LANGUAGES };
