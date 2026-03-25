/**
 * Hindi (Casual Roman Script) Language Module
 * Chat-style Hindi as spoken between friends (Hinglish style)
 */

// ─── Phrase Dictionary ───────────────────────────────────────────────────────
const phrases = {
  yes: "haan",
  no: "nahi",
  okay: "theek hai",
  ok: "theek hai",
  good: "accha",
  bad: "bura",
  now: "abhi",
  later: "baad mein",
  today: "aaj",
  tomorrow: "kal",
  yesterday: "kal",
  here: "yahan",
  there: "wahan",
  home: "ghar",
  office: "office",
  work: "kaam",
  food: "khaana",
  water: "paani",
  time: "time",
  money: "paisa",
  phone: "phone",
  friend: "dost",
  brother: "bhai",
  sister: "didi",
  mother: "maa",
  father: "papa",
  quickly: "jaldi",
  slowly: "dheere dheere",
  really: "sachchi",
  very: "bahut",
  little: "thoda",
  again: "phir se",
  already: "pehle se",
  still: "abhi bhi",
  also: "bhi",
  only: "hi",
  please: "please",
  sorry: "sorry",
  thanks: "shukriya",
  together: "saath mein",
  alone: "akele",
  always: "hamesha",
  never: "kabhi nahi",
  why: "kyun",
  how: "kaise",
  what: "kya",
  where: "kahan",
  when: "kab",
  who: "kaun",
  meeting: "meeting",
  call: "call",
  message: "message",
  market: "market",
  park: "park",
  school: "school",
};

// ─── Verb Mappings ───────────────────────────────────────────────────────────
const verbMap = {
  call: "call kar",
  come: "aa",
  go: "ja",
  eat: "kha",
  drink: "pi",
  do: "kar",
  say: "bol",
  tell: "bata",
  see: "dekh",
  look: "dekh",
  know: "jaanta",
  understand: "samajh",
  help: "help kar",
  send: "bhej",
  give: "de",
  take: "le",
  buy: "kharid",
  sell: "bech",
  sit: "baith",
  stand: "khad ho",
  sleep: "so",
  wake: "uth",
  try: "koshish kar",
  start: "shuru kar",
  stop: "rok",
  finish: "khatam kar",
  wait: "ruk",
  check: "check kar",
  ask: "pooch",
  listen: "sun",
  think: "soch",
  work: "kaam kar",
  play: "khel",
  run: "daur",
  walk: "chal",
  meet: "mil",
  talk: "baat kar",
  write: "likh",
  read: "padh",
  watch: "dekh",
  hear: "sun",
  feel: "feel kar",
  need: "chahiye",
  want: "chahta",
  like: "pasand",
  love: "pyaar",
  hate: "nafrat",
  forget: "bhool",
  remember: "yaad kar",
  manage: "manage kar",
  plan: "plan kar",
  catch: "pakad",
  follow: "follow kar",
  join: "join kar",
  leave: "chhod",
  return: "wapas aa",
  bring: "le aa",
  keep: "rakh",
  put: "rakh",
  make: "bana",
  have: "hai",
  get: "mil",
};

// ─── Suffixes ─────────────────────────────────────────────────────────────────
const suffixes = {
  i_future: "unga",          // karunga, jaunga, aaaunga
  i_future_vowel: "nga",     // after verbs ending in vowel
  i_present: " raha hoon",   // "kar raha hoon"
  i_past: "a",               // kiya, gaya

  you_future: "ega",         // karega
  you_present: " raha hai",
  you_past: "a",

  q_present: " raha hai?",
  q_future: "ega?",
};

// ─── Sentence Patterns ───────────────────────────────────────────────────────
const patterns = [
  // "i will call you later"
  {
    id: "i_will_verb_you_later",
    regex: /^i will (\w+) you later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tujhe baad mein ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] you"
  {
    id: "i_will_verb_you",
    regex: /^i will (\w+) you$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tujhe ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] [noun] later"
  {
    id: "i_will_verb_noun_later",
    regex: /^i will (\w+) (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      const noun = phrases[m[2].toLowerCase()] || m[2];
      return `${noun} baad mein ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] later"
  {
    id: "i_will_verb_later",
    regex: /^i will (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `baad mein ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb]"
  {
    id: "i_will_verb",
    regex: /^i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i am coming"
  {
    id: "i_am_coming",
    regex: /^i am coming$/i,
    build: () => "main aa raha hoon",
  },
  // "i am going"
  {
    id: "i_am_going",
    regex: /^i am going$/i,
    build: () => "main ja raha hoon",
  },
  // "i am [verb]ing"
  {
    id: "i_am_verbing",
    regex: /^i am (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `main ${vRoot}${suffixes["i_present"]}`;
    },
  },
  // "can you [verb]"
  {
    id: "can_you_verb",
    regex: /^can you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tu ${vRoot}${suffixes["q_future"]}`;
    },
  },
  // "can you [verb] me"
  {
    id: "can_you_verb_me",
    regex: /^can you (\w+) me$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tu mujhe ${vRoot}${suffixes["q_future"]}`;
    },
  },
  // "what are you doing"
  {
    id: "what_are_you_doing",
    regex: /^what are you doing$/i,
    build: () => "kya kar raha hai?",
  },
  // "what are you [verb]ing"
  {
    id: "what_are_you_verbing",
    regex: /^what are you (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `kya ${vRoot}${suffixes["q_present"]}`;
    },
  },
  // "where are you"
  {
    id: "where_are_you",
    regex: /^where are you$/i,
    build: () => "kahan hai tu?",
  },
  // "when will you [verb]"
  {
    id: "when_will_you_verb",
    regex: /^when will you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tu kab ${vRoot}${suffixes["q_future"]}`;
    },
  },
  // "are you coming"
  {
    id: "are_you_coming",
    regex: /^are you coming$/i,
    build: () => "aa raha hai kya?",
  },
  // "i have [verb]ed"
  {
    id: "i_have_verbed",
    regex: /^i have (\w+)(?:ed)?$/i,
    build: (m) => {
      const base = m[1].toLowerCase().replace(/ed$/, "");
      const vRoot = verbMap[base] || m[1];
      return `main ${vRoot} chuka hoon`;
    },
  },
  // "let's [verb]"
  {
    id: "lets_verb",
    regex: /^lets? (?:us )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `chal ${vRoot}te hain`;
    },
  },
  // "don't [verb]"
  {
    id: "dont_verb",
    regex: /^don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot} mat`;
    },
  },
  // "i don't [verb]"
  {
    id: "i_dont_verb",
    regex: /^i don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `main ${vRoot} nahi ${suffixes["i_present"].trim()}`;
    },
  },
  // "call me"
  {
    id: "call_me",
    regex: /^call me$/i,
    build: () => "mujhe call kar",
  },
  // "i will be there"
  {
    id: "i_will_be_there",
    regex: /^i will be there$/i,
    build: () => "main wahan aaaunga",
  },
  // "i am here"
  {
    id: "i_am_here",
    regex: /^i am here$/i,
    build: () => "main yahan hoon",
  },
  // "are you free"
  {
    id: "are_you_free",
    regex: /^are you free$/i,
    build: () => "tu free hai kya?",
  },
  // "okay i will [verb]"
  {
    id: "okay_i_will_verb",
    regex: /^(?:okay|ok) i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `theek hai, ${vRoot}${suffixes["i_future"]}`;
    },
  },
];

module.exports = { phrases, verbMap, suffixes, patterns };
