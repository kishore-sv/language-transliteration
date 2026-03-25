/**
 * Tamil (Casual Roman Script) Language Module
 * Chat-style Tamil as spoken between friends (Chennai casual)
 */

// ─── Phrase Dictionary ───────────────────────────────────────────────────────
const phrases = {
  yes: "aamaa",
  no: "illa",
  okay: "seri",
  ok: "seri",
  good: "nallairukku",
  bad: "mosam",
  now: "ippove",
  later: "appuram",
  today: "inniki",
  tomorrow: "naaliku",
  yesterday: "netthu",
  here: "inga",
  there: "anga",
  home: "veedu",
  office: "office",
  work: "velai",
  food: "saapadu",
  water: "thanni",
  time: "neram",
  money: "panam",
  phone: "phone",
  friend: "nanbhan",
  brother: "anna",
  sister: "akka",
  mother: "amma",
  father: "appa",
  quickly: "vegama",
  slowly: "mellama",
  really: "nijamava",
  very: "romba",
  little: "konjam",
  again: "thirumba",
  already: "aarambichiten",
  still: "innumaa",
  also: "kuda",
  only: "matrum",
  please: "please",
  sorry: "sorry",
  thanks: "nandri",
  together: "saerndu",
  alone: "thaniama",
  always: "epppovum",
  never: "epppovum illai",
  why: "yen",
  how: "epdi",
  what: "enna",
  where: "enga",
  when: "eppa",
  who: "yaaru",
  meeting: "meeting",
  call: "call",
  message: "message",
};

// ─── Verb Mappings ───────────────────────────────────────────────────────────
const verbMap = {
  call: "call pannu",
  come: "va",
  go: "po",
  eat: "saapidu",
  drink: "kudii",
  do: "pannu",
  say: "sollu",
  tell: "sollu",
  see: "paaru",
  look: "paaru",
  know: "theriyum",
  understand: "puriyum",
  help: "help pannu",
  send: "anuppu",
  give: "kudu",
  take: "edu",
  buy: "vaangu",
  sell: "vil",
  sit: "ukkaaru",
  stand: "nilluu",
  sleep: "thoong",
  wake: "ezhum",
  try: "try pannu",
  start: "start pannu",
  stop: "nillu",
  finish: "mudichu",
  wait: "wait pannu",
  check: "check pannu",
  ask: "kelu",
  listen: "kelu",
  think: "yosei pannu",
  work: "velai pannu",
  play: "vilayaadu",
  run: "odu",
  walk: "nada",
  meet: "paaru",
  talk: "pesuu",
  write: "ezhuthu",
  read: "padii",
  watch: "paaru",
  hear: "kelu",
  feel: "feel aagum",
  need: "venum",
  want: "venum",
  like: "pidikkum",
  love: "kaadhalippom",
  hate: "pidikkaadhu",
  forget: "marandu",
  remember: "nyaabagam",
  manage: "manage pannu",
  plan: "plan pannu",
  join: "join aagu",
  leave: "po",
  return: "thirumbu va",
  bring: "konndu va",
  keep: "vei",
  make: "pannu",
};

// ─── Suffixes ─────────────────────────────────────────────────────────────────
const suffixes = {
  i_future: "ven",         // pannuven, varen
  i_present: "kiren",      // pannukiren
  i_past: "ten",           // panninen

  you_future: "vai",
  you_present: "kurai",

  q_present: "kiraiya?",
  q_future: "vaiya?",
};

// ─── Sentence Patterns ───────────────────────────────────────────────────────
const patterns = [
  {
    id: "i_will_verb_you_later",
    regex: /^i will (\w+) you later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `unakku appuram ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_you",
    regex: /^i will (\w+) you$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `unakku ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_noun_later",
    regex: /^i will (\w+) (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      const noun = phrases[m[2].toLowerCase()] || m[2];
      return `${noun} appuram ${vRoot}${suffixes["i_future"]}`;
    },
  },
  {
    id: "i_will_verb_later",
    regex: /^i will (\w+) later$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `appuram ${vRoot}${suffixes["i_future"]}`;
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
    build: () => "naan varukiren",
  },
  {
    id: "i_am_going",
    regex: /^i am going$/i,
    build: () => "naan pokiren",
  },
  {
    id: "i_am_verbing",
    regex: /^i am (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `naan ${vRoot}${suffixes["i_present"]}`;
    },
  },
  {
    id: "can_you_verb",
    regex: /^can you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nee ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "can_you_verb_me",
    regex: /^can you (\w+) me$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nee enakku ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "what_are_you_doing",
    regex: /^what are you doing$/i,
    build: () => "enna pannukiraiya?",
  },
  {
    id: "what_are_you_verbing",
    regex: /^what are you (\w+)ing$/i,
    build: (m) => {
      const base = m[1].toLowerCase();
      const vRoot = verbMap[base] || m[1];
      return `enna ${vRoot}${suffixes["q_present"]}`;
    },
  },
  {
    id: "where_are_you",
    regex: /^where are you$/i,
    build: () => "enga irukkaiya?",
  },
  {
    id: "when_will_you_verb",
    regex: /^when will you (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `nee eppa ${vRoot}${suffixes["q_future"]}`;
    },
  },
  {
    id: "are_you_coming",
    regex: /^are you coming$/i,
    build: () => "varaiya?",
  },
  {
    id: "i_have_verbed",
    regex: /^i have (\w+)(?:ed)?$/i,
    build: (m) => {
      const base = m[1].toLowerCase().replace(/ed$/, "");
      const vRoot = verbMap[base] || m[1];
      return `naan ${vRoot}${suffixes["i_past"]}`;
    },
  },
  {
    id: "lets_verb",
    regex: /^lets? (?:us )?(\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `namma ${vRoot}laam`;
    },
  },
  {
    id: "dont_verb",
    regex: /^don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `${vRoot} vendam`;
    },
  },
  {
    id: "i_dont_verb",
    regex: /^i don'?t (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `naan ${vRoot} maaten`;
    },
  },
  {
    id: "call_me",
    regex: /^call me$/i,
    build: () => "enakku call pannu",
  },
  {
    id: "i_will_be_there",
    regex: /^i will be there$/i,
    build: () => "naan anga iruppen",
  },
  {
    id: "i_am_here",
    regex: /^i am here$/i,
    build: () => "naan inga irukken",
  },
  {
    id: "are_you_free",
    regex: /^are you free$/i,
    build: () => "nee free-aa irukkaiya?",
  },
  {
    id: "okay_i_will_verb",
    regex: /^(?:okay|ok) i will (\w+)$/i,
    build: (m) => {
      const vRoot = verbMap[m[1].toLowerCase()] || m[1];
      return `seri, ${vRoot}${suffixes["i_future"]}`;
    },
  },
];

module.exports = { phrases, verbMap, suffixes, patterns };
