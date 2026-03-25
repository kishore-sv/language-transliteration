/**
 * Telugu (Casual Roman Script) Language Module
 * Chat-style Telugu as spoken between friends (Hyderabadi/Andhra style)
 */

// ─── Phrase Dictionary ───────────────────────────────────────────────────────
const phrases = {
  yes: "avunu",
  no: "ledu",
  okay: "sare",
  ok: "sare",
  good: "baagundi",
  bad: "bagaledu",
  now: "ipudu",
  later: "tarvata",
  today: "ippudu",
  tomorrow: "raale",
  yesterday: "neeru",
  here: "ikkade",
  there: "akkade",
  home: "intiki",
  office: "office",
  work: "pani",
  food: "tindi",
  water: "neellu",
  time: "time",
  money: "dabbu",
  phone: "phone",
  friend: "mitrudu",
  brother: "anna",
  sister: "akka",
  mother: "amma",
  father: "nanna",
  quickly: "vegam ga",
  slowly: "mellaga",
  really: "nijam ga",
  very: "chaala",
  little: "konchem",
  again: "mariyadha",
  already: "aaindi",
  still: "inkaa",
  also: "kuda",
  only: "matrame",
  please: "please",
  sorry: "sorry",
  thanks: "thanks",
  together: "kalisi",
  alone: "okkadinne",
  always: "eppudu",
  never: "epudu ledu",
  why: "enduku",
  how: "ela",
  what: "emi",
  where: "ekkada",
  when: "eppudu",
  who: "evaru",
  meeting: "meeting",
  call: "call",
  message: "message",
};

// ─── Verb Mappings ───────────────────────────────────────────────────────────
const verbMap = {
  call: "call cheyu",
  come: "ra",
  go: "vell",
  eat: "tinu",
  drink: "taaGu",
  do: "chey",
  say: "cheppu",
  tell: "cheppu",
  see: "choosu",
  look: "choosu",
  know: "telusu",
  understand: "artham chesuko",
  help: "help chey",
  send: "pampinchu",
  give: "ivvu",
  take: "teesukooo",
  buy: "konuu",
  sell: "ammu",
  sit: "koochooo",
  stand: "nindu",
  sleep: "paduko",
  wake: "lev",
  try: "try chey",
  start: "start chey",
  stop: "aagu",
  finish: "avvudu",
  wait: "wait chey",
  check: "check chey",
  ask: "adugu",
  listen: "vinuu",
  think: "alochinchu",
  work: "pani chey",
  play: "aad",
  run: "paaraatu",
  walk: "nadduu",
  meet: "kalu",
  talk: "matladuu",
  write: "raayii",
  read: "chaduvuu",
  watch: "choosu",
  hear: "vinuu",
  feel: "feel chesuko",
  need: "kaavali",
  want: "kaavali",
  like: "istam",
  love: "premistanu",
  hate: "istam ledu",
  forget: "marchipoo",
  remember: "gurtupetu",
  manage: "manage chey",
  plan: "plan chey",
  join: "join avvu",
  leave: "vell",
  return: "vapas ra",
  bring: "teesukoora",
  keep: "petto",
  make: "chey",
};

// ─── Suffixes ─────────────────────────────────────────────────────────────────
const suffixes = {
  i_future: "taanu",      // chestaanu, velaataanu
  i_present: "tunnaanu",  // chestunnaanu
  i_past: "aanu",         // chesaanu

  you_future: "taavu",
  you_present: "tunnaavu",

  q_present: "tunnaavaa?",
  q_future: "taavaa?",
};

// ─── Sentence Patterns ───────────────────────────────────────────────────────
const patterns = [
  {
    id: "i_will_verb_you_later",
    regex: /^i will (\w+) you later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `niku tarvata ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_you",
    regex: /^i will (\w+) you$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `niku ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_noun_later",
    regex: /^i will (\w+) (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      const noun = phrases[m[2].toLowerCase()] || m[2];
      return `${noun} tarvata ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_later",
    regex: /^i will (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `tarvata ${vRoot}${suffixes["i_future"]}`;
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
    build: () => "nenu vastunnaanu",
  },
  {
    id: "i_am_going",
    regex: /^i am going$/i,
    build: () => "nenu velutunnaanu",
  },
  {
    id: "i_am_verbing",
    regex: /^i am (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `nenu ${vRoot}${suffixes["i_present"]}`;
    },
  },
  {
    id: "can_you_verb",
    regex: /^can you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `neev ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "can_you_verb_me",
    regex: /^can you (\w+) me$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `neev naku ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "what_are_you_doing",
    regex: /^what are you doing$/i,
    build: () => "emi chestunnaavu?",
  },
  {
    id: "what_are_you_verbing",
    regex: /^what are you (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `emi ${vRoot}${suffixes["q_present"]}`;
    },
  },
  {
    id: "where_are_you",
    regex: /^where are you$/i,
    build: () => "ekkada unnavu?",
  },
  {
    id: "when_will_you_verb",
    regex: /^when will you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `neev eppudu ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "are_you_coming",
    regex: /^are you coming$/i,
    build: () => "vastunnaavaa?",
  },
  {
    id: "i_have_verbed",
    regex: /^i have (\w+)(?:ed)?$/i,
    build: (m) => {
      const base = m[1].toLowerCase().replace(/ed$/, "");
      const vRoot = verbMap[base] || m[1];
      return `nenu ${vRoot}${suffixes["i_past"]}`;
    },
  },
  {
    id: "lets_verb",
    regex: /^lets? (?:us )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `poda ${vRoot}dam`;
    },
  },
  {
    id: "dont_verb",
    regex: /^don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot} vaddu`;
    },
  },
  {
    id: "i_dont_verb",
    regex: /^i don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nenu ${vRoot} ledu`;
    },
  },
  {
    id: "call_me",
    regex: /^call me$/i,
    build: () => "naku call chey",
  },
  {
    id: "i_will_be_there",
    regex: /^i will be there$/i,
    build: () => "nenu akkade untaanu",
  },
  {
    id: "i_am_here",
    regex: /^i am here$/i,
    build: () => "nenu ikkade unnaanu",
  },
  {
    id: "are_you_free",
    regex: /^are you free$/i,
    build: () => "neev free ga unnaavaa?",
  },
  {
    id: "okay_i_will_verb",
    regex: /^(?:okay|ok) i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `sare, ${vRoot}${suffixes["i_future"]}`;
    },
  },
];

module.exports = { phrases, verbMap, suffixes, patterns };
