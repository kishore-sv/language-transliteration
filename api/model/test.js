/**
 * test.js – Manual test runner for the conversion engine
 * Run: node test.js
 */

const { convert, SUPPORTED_LANGUAGES } = require("./convert");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Test cases: [inputText, language, description]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const tests = [
  // ── Kannada ─────────────────────────────────────────────────────────────────
  ["I will call you later",       "kannada",   "signature example"],
  ["I will come later",           "kannada",   "i will verb later"],
  ["I am eating",                 "kannada",   "i am verbing"],
  ["Where are you",               "kannada",   "where are you"],
  ["What are you doing",          "kannada",   "what are you doing"],
  ["Can you help me",             "kannada",   "can you verb me"],
  ["Let's eat",                   "kannada",   "let's verb"],
  ["Don't go",                    "kannada",   "don't verb"],
  ["Call me",                     "kannada",   "call me shortcut"],
  ["I am here",                   "kannada",   "i am here"],
  ["Are you free",                "kannada",   "are you free"],
  ["I will be there",             "kannada",   "i will be there"],
  ["Okay I will go",              "kannada",   "okay + verb"],
  ["I don't know",                "kannada",   "i don't verb"],

  // ── Hindi ────────────────────────────────────────────────────────────────────
  ["I will call you later",       "hindi",     "signature example"],
  ["I will come",                 "hindi",     "i will verb"],
  ["I am going",                  "hindi",     "i am going"],
  ["What are you doing",          "hindi",     "what are you doing"],
  ["Where are you",               "hindi",     "where are you"],
  ["Can you help me",             "hindi",     "can you verb me"],
  ["Let's eat",                   "hindi",     "let's verb"],
  ["Don't go",                    "hindi",     "don't verb"],
  ["Call me",                     "hindi",     "call me"],
  ["Are you coming",              "hindi",     "are you coming"],
  ["Are you free",                "hindi",     "are you free"],
  ["I have done",                 "hindi",     "i have done"],

  // ── Telugu ───────────────────────────────────────────────────────────────────
  ["I will call you later",       "telugu",    "signature example"],
  ["I am coming",                 "telugu",    "i am coming"],
  ["What are you doing",          "telugu",    "what are you doing"],
  ["Where are you",               "telugu",    "where are you"],
  ["Can you come",                "telugu",    "can you verb"],
  ["Let's go",                    "telugu",    "let's go"],
  ["I don't know",                "telugu",    "i don't know"],
  ["Call me",                     "telugu",    "call me"],

  // ── Tamil ────────────────────────────────────────────────────────────────────
  ["I will call you later",       "tamil",     "signature example"],
  ["I am going",                  "tamil",     "i am going"],
  ["What are you doing",          "tamil",     "what are you doing"],
  ["Where are you",               "tamil",     "where are you"],
  ["Can you help me",             "tamil",     "can you verb me"],
  ["Call me",                     "tamil",     "call me"],
  ["Are you coming",              "tamil",     "are you coming"],
  ["Let's eat",                   "tamil",     "let's eat"],
  ["Don't go",                    "tamil",     "don't go"],

  // ── Malayalam ────────────────────────────────────────────────────────────────
  ["I will call you later",       "malayalam", "signature example"],
  ["I am coming",                 "malayalam", "i am coming"],
  ["What are you doing",          "malayalam", "what are you doing"],
  ["Where are you",               "malayalam", "where are you"],
  ["Can you help me",             "malayalam", "can you verb me"],
  ["Call me",                     "malayalam", "call me"],
  ["Are you coming",              "malayalam", "are you coming"],
  ["Are you free",                "malayalam", "are you free"],
  ["I don't go",                  "malayalam", "i don't verb"],

  // ── Fallback tests (unrecognized pattern) ────────────────────────────────────
  ["Send me the file tomorrow",   "kannada",   "fallback test"],
  ["The meeting is at 5 pm",      "hindi",     "fallback test"],
  ["Let me know when you reach",  "tamil",     "fallback test"],
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Runner
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const RESET  = "\x1b[0m";
const BOLD   = "\x1b[1m";
const CYAN   = "\x1b[36m";
const GREEN  = "\x1b[32m";
const YELLOW = "\x1b[33m";
const DIM    = "\x1b[2m";

let currentLang = null;

console.log(`\n${BOLD}Language Conversion Engine – Test Suite${RESET}`);
console.log(`Supported: ${SUPPORTED_LANGUAGES.join(", ")}\n`);
console.log("─".repeat(70));

let passed = 0;
let failed = 0;

for (const [input, lang, desc] of tests) {
  if (lang !== currentLang) {
    currentLang = lang;
    console.log(`\n${BOLD}${CYAN}▸ ${lang.toUpperCase()}${RESET}`);
  }

  try {
    const result = convert(input, lang);
    const methodTag = result.method === "pattern"
      ? `${GREEN}[pattern:${result.patternId}]${RESET}`
      : `${YELLOW}[fallback]${RESET}`;

    console.log(`  ${DIM}${desc}${RESET}`);
    console.log(`  ${BOLD}EN${RESET}: ${input}`);
    console.log(`  ${BOLD}→ ${RESET}: ${result.output}  ${methodTag}`);
    console.log();
    passed++;
  } catch (err) {
    console.log(`  ${BOLD}✗ ERROR${RESET}: ${err.message}`);
    failed++;
  }
}

console.log("─".repeat(70));
console.log(`\n${BOLD}Results: ${GREEN}${passed} passed${RESET}${failed ? `, \x1b[31m${failed} failed\x1b[0m` : ""}${RESET}\n`);
