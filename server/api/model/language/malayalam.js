/**
 * Malayalam (Casual Roman Script) Language Module
 * Chat-style Malayalam as spoken between friends (Kerala casual / Thug life style)
 */

// ─── Phrase Dictionary ───────────────────────────────────────────────────────
const phrases = {
  yes: "aa",
  no: "alla",
  okay: "sheri",
  ok: "sheri",
  good: "nannayirikkunnu",
  bad: "moshamaanu",
  now: "ippol",
  later: "pinne",
  today: "innu",
  tomorrow: "nale",
  yesterday: "inna",
  here: "ividey",
  there: "evidey",
  home: "veedu",
  office: "office",
  work: "pani",
  food: "kazhikkal",
  water: "vellam",
  time: "neram",
  money: "kashi",
  phone: "phone",
  friend: "koottukar",
  brother: "etta",
  sister: "chechi",
  mother: "amma",
  father: "achan",
  quickly: "vegam",
  slowly: "pothiye",
  really: "sathyam",
  very: "valare",
  little: "konjam",
  again: "vere",
  already: "aayittundu",
  still: "innum",
  also: "koodey",
  only: "matram",
  please: "please",
  sorry: "sorry",
  thanks: "nandhi",
  together: "koode",
  alone: "okkaney",
  always: "eppozhum",
  never: "eppozhum illa",
  why: "enthinaa",
  how: "engane",
  what: "entha",
  where: "evidey",
  when: "eppol",
  who: "aaru",
  meeting: "meeting",
  call: "call",
  message: "message",
};

// ─── Verb Mappings ───────────────────────────────────────────────────────────
const verbMap = {
  call: "call cheyyuu",
  come: "var",
  go: "poo",
  eat: "kazhi",
  drink: "kudii",
  do: "cheyyuu",
  say: "paraa",
  tell: "paraa",
  see: "kaanuu",
  look: "nokku",
  know: "ariyum",
  understand: "manassilaakum",
  help: "help cheyyuu",
  send: "ayakku",
  give: "thar",
  take: "edukku",
  buy: "vaangu",
  sell: "vill",
  sit: "irikku",
  stand: "ninnu",
  sleep: "oonangu",
  wake: "ezhunelku",
  try: "try cheyyuu",
  start: "start cheyyuu",
  stop: "nilku",
  finish: "theerkkuu",
  wait: "kaakka",
  check: "nokku",
  ask: "chodiikku",
  listen: "keelkku",
  think: "alocchikku",
  work: "pani cheyyuu",
  play: "kalikku",
  run: "ooduu",
  walk: "nanduu",
  meet: "kandaruu",
  talk: "samsaarikku",
  write: "ezhuthuu",
  read: "vaayikku",
  watch: "kaanuu",
  hear: "keelkku",
  feel: "feel aakum",
  need: "venam",
  want: "venam",
  like: "ishtamaanu",
  love: "sneham",
  hate: "ishtamilla",
  forget: "marannu",
  remember: "ormayundu",
  manage: "manage cheyyuu",
  plan: "plan cheyyuu",
  join: "join aakuu",
  leave: "poo",
  return: "thirich var",
  bring: "kondu var",
  keep: "vekku",
  make: "undaakku",
};

// ─── Suffixes ─────────────────────────────────────────────────────────────────
const suffixes = {
  i_future: "um",          // cheyyum, varum, pokum
  i_present: "unnu",       // cheyyunnu
  i_past: "u",             // cheythu

  you_future: "umoo?",
  you_present: "unnundoo?",

  q_present: "unnundoo?",
  q_future: "umoo?",
};

// ─── Sentence Patterns ───────────────────────────────────────────────────────
const patterns = [
  {
    id: "i_will_verb_you_later",
    regex: /^i will (\w+) you later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninne pinne ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_you",
    regex: /^i will (\w+) you$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninne ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_noun_later",
    regex: /^i will (\w+) (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      const noun = phrases[m[2].toLowerCase()] || m[2];
      return `${noun} pinne ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_later",
    regex: /^i will (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `pinne ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb",
    regex: /^i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_am_coming",
    regex: /^i am coming$/i,
    build: () => "njan varunnu",
  },
  {
    id: "i_am_going",
    regex: /^i am going$/i,
    build: () => "njan pookunnu",
  },
  {
    id: "i_am_verbing",
    regex: /^i am (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `njan ${vRoot}${suffixes["i_present"]}`;
    },
  },
  {
    id: "can_you_verb",
    regex: /^can you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninakku ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "can_you_verb_me",
    regex: /^can you (\w+) me$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `ninakku enne ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "what_are_you_doing",
    regex: /^what are you doing$/i,
    build: () => "entha cheyyunne?",
  },
  {
    id: "what_are_you_verbing",
    regex: /^what are you (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `entha ${vRoot}${suffixes["q_present"]}`;
    },
  },
  {
    id: "where_are_you",
    regex: /^where are you$/i,
    build: () => "evideyaanu ninee?",
  },
  {
    id: "when_will_you_verb",
    regex: /^when will you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nee eppol ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "are_you_coming",
    regex: /^are you coming$/i,
    build: () => "varumooo?",
  },
  {
    id: "i_have_verbed",
    regex: /^i have (\w+)(?:ed)?$/i,
    build: (m) => {
      const base = m[1].toLowerCase().replace(/ed$/, "");
      const vRoot = verbMap[base] || m[1];
      return `njan ${vRoot}${suffixes["i_past"]}`;
    },
  },
  {
    id: "lets_verb",
    regex: /^lets? (?:us )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nammukku ${vRoot}vaam`;
    },
  },
  {
    id: "dont_verb",
    regex: /^don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot} aruthu`;
    },
  },
  {
    id: "i_dont_verb",
    regex: /^i don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `njan ${vRoot} illa`;
    },
  },
  {
    id: "call_me",
    regex: /^call me$/i,
    build: () => "enne call cheyyuu",
  },
  {
    id: "i_will_be_there",
    regex: /^i will be there$/i,
    build: () => "njan evidey varum",
  },
  {
    id: "i_am_here",
    regex: /^i am here$/i,
    build: () => "njan ividey undu",
  },
  {
    id: "are_you_free",
    regex: /^are you free$/i,
    build: () => "nee free aano?",
  },
  {
    id: "okay_i_will_verb",
    regex: /^(?:okay|ok) i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `sheri, ${vRoot}${suffixes["i_future"]}`;
    },
  },
];

module.exports = { phrases, verbMap, suffixes, patterns };
