/**
 * Kannada (Casual Roman Script) Language Module
 * Chat-style Kannada as spoken between friends (Bangalore-style)
 */

// ─── Phrase Dictionary ───────────────────────────────────────────────────────
// English word → Kannada roman equivalent
const phrases = {
  // Common words
  yes: "haudu",
  no: "illa",
  okay: "sari",
  ok: "sari",
  good: "chennagide",
  bad: "ketta",
  now: "eega",
  later: "amele",
  today: "ivattu",
  tomorrow: "naale",
  yesterday: "ninna",
  here: "illi",
  there: "alli",
  home: "mane",
  office: "office",
  work: "kelsa",
  food: "oota",
  water: "niru",
  time: "time",
  money: "duddu",
  phone: "phone",
  friend: "geleya",
  brother: "anna",
  sister: "akka",
  mother: "amma",
  father: "appa",
  quickly: "bega",
  slowly: "nidhanakke",
  really: "nijakklu",
  very: "thumba",
  little: "swalpa",
  again: "matte",
  already: "aglee",
  still: "innoo",
  also: "kuda",
  only: "mattre",
  please: "please",
  sorry: "sorry",
  thanks: "thanks",
  together: "jothe",
  alone: "ondu",
  always: "yavaglu",
  never: "yavaglu illa",
  why: "yake",
  how: "henge",
  what: "enu",
  where: "elli",
  when: "yavaga",
  who: "yaru",

  // Meeting / schedule words
  meeting: "meeting",
  call: "call",
  message: "message",
  chat: "chat",

  // Places
  market: "market",
  park: "park",
  school: "school",
};

// ─── Verb Mappings ───────────────────────────────────────────────────────────
// English verb root → Kannada verb root (roman)
const verbMap = {
  call: "call mad",
  come: "bar",
  go: "hog",
  eat: "tin",
  drink: "kud",
  do: "mad",
  say: "hel",
  tell: "hel",
  see: "nog",
  look: "nog",
  know: "gottid",
  understand: "arth mad",
  help: "help mad",
  send: "kals",
  give: "kod",
  take: "tegond",
  buy: "kond",
  sell: "mard",
  sit: "kuth",
  stand: "nint",
  sleep: "mad",
  wake: "ell",
  try: "try mad",
  start: "shuru mad",
  stop: "nils",
  finish: "maad",
  wait: "wait mad",
  check: "check mad",
  ask: "kelu",
  listen: "kelu",
  think: "yoch mad",
  work: "kelsa mad",
  play: "aad",
  run: "odu",
  walk: "nad",
  meet: "sik",
  talk: "mat mad",
  write: "bar",
  read: "odi",
  watch: "nog",
  hear: "kelu",
  feel: "annis",
  need: "bek",
  want: "beku",
  like: "ishta",
  love: "preethi",
  hate: "ishta illa",
  forget: "marit",
  remember: "nenapid",
  manage: "manage mad",
  plan: "plan mad",
  tell: "hel",
  catch: "hid",
  follow: "follow mad",
  join: "join mad",
  leave: "hog",
  return: "wapas bar",
  bring: "tand",
  keep: "itu",
  put: "hak",
  make: "maad",
  have: "ide",
  get: "sik",
};

// ─── Suffixes ─────────────────────────────────────────────────────────────────
// Tense/person suffix to attach to verb root
const suffixes = {
  // first person
  "i_future": "tini",       // "I will do" → madtini
  "i_present": "tiddini",   // "I am doing" → madtiddini
  "i_past": "de",           // "I did" → maadle / maade

  // second person
  "you_future": "",         // verb alone or with suffix depending on context
  "you_present": "tiddiya", // "you are doing" → madtiddiya
  "you_past": "dya",        // "you did" → maadya

  // question
  "q_present": "tiddiya",
  "q_future": "tiya",
};

// ─── Sentence Patterns ───────────────────────────────────────────────────────
// Each pattern has:
//   regex  – matches the English sentence structure
//   build  – function(match, verbMap, suffixes) → Kannada roman string
const patterns = [
  // "i will [verb] you later"
  {
    id: "i_will_verb_you_later",
    regex: /^i will (\w+) you later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninge amele ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] you"
  {
    id: "i_will_verb_you",
    regex: /^i will (\w+) you$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninge ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] [noun] later"
  {
    id: "i_will_verb_noun_later",
    regex: /^i will (\w+) (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      const noun = phrases[m[2].toLowerCase()] || m[2];
      return `${noun} amele ${vRoot}${suffixes["i_future"]}`;
    },
  },
  // "i will [verb] later"
  {
    id: "i_will_verb_later",
    regex: /^i will (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `amele ${vRoot}${suffixes["i_future"]}`;
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
  // specific first — then fall through to generic
  {
    id: "i_am_coming",
    regex: /^i am coming$/i,
    build: () => "nanu bartiddini",
  },
  {
    id: "i_am_going",
    regex: /^i am going$/i,
    build: () => "nanu hogtiddini",
  },
  // "i am [verb]ing"  (generic — must come after specific aliases)
  {
    id: "i_am_verbing",
    regex: /^i am (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || verbMap[`${base}e`] || m[1];
      return `nanu ${vRoot}${suffixes["i_present"]}`;
    },
  },
  // "can you [verb]"
  {
    id: "can_you_verb",
    regex: /^can you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `neevu ${vRoot}${suffixes["q_future"]}?`;
    },
  },
  // "can you [verb] me"
  {
    id: "can_you_verb_me",
    regex: /^can you (\w+) me$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `neevu nange ${vRoot}${suffixes["q_future"]}?`;
    },
  },
  // "what are you doing"
  {
    id: "what_are_you_doing",
    regex: /^what are you doing$/i,
    build: () => "enu madtiddiya?",
  },
  // "what are you [verb]ing"
  {
    id: "what_are_you_verbing",
    regex: /^what are you (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `enu ${vRoot}${suffixes["q_present"]}?`;
    },
  },
  // "where are you"
  {
    id: "where_are_you",
    regex: /^where are you$/i,
    build: () => "elli iddiya?",
  },
  // "when will you [verb]"
  {
    id: "when_will_you_verb",
    regex: /^when will you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `yavaga ${vRoot}${suffixes["q_future"]}?`;
    },
  },
  // "are you coming"
  {
    id: "are_you_coming",
    regex: /^are you coming$/i,
    build: () => "bartiya?",
  },
  // "i have [verb]ed" / "i have [verb]"
  {
    id: "i_have_verbed",
    regex: /^i have (\w+)(?:ed)?$/i,
    build: (m) => {
      const base = m[1].toLowerCase().replace(/ed$/, "");
      const vRoot = verbMap[base] || m[1];
      return `nanu ${vRoot}${suffixes["i_past"]}`;
    },
  },
  // "let's [verb]" / "let us [verb]"
  {
    id: "lets_verb",
    regex: /^lets? (?:us )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `baa ${vRoot}na`;
    },
  },
  // "don't [verb]" / "do not [verb]"
  {
    id: "dont_verb",
    regex: /^don'?t (?:not )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot}beda`;
    },
  },
  // "i don't [verb]"
  {
    id: "i_dont_verb",
    regex: /^i don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nanu ${vRoot} maadalla`;
    },
  },
  // "call me"
  {
    id: "call_me",
    regex: /^call me$/i,
    build: () => "nange call maadu",
  },
  // "i will be there"
  {
    id: "i_will_be_there",
    regex: /^i will be there$/i,
    build: () => "nanu alli irtini",
  },
  // "i am here"
  {
    id: "i_am_here",
    regex: /^i am here$/i,
    build: () => "nanu illi iddini",
  },
  // "are you free"
  {
    id: "are_you_free",
    regex: /^are you free$/i,
    build: () => "neevu free iddiya?",
  },
  // "okay i will [verb]"
  {
    id: "okay_i_will_verb",
    regex: /^(?:okay|ok) i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `sari, ${vRoot}${suffixes["i_future"]}`;
    },
  },
];

module.exports = { phrases, verbMap, suffixes, patterns };
