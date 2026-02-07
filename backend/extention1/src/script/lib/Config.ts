import Constants from './Constants';
import type { WordOptions } from './Word';

export default class Config {
  censorCharacter: string;
  censorFixedLength: number;
  defaultSubstitution: string;
  defaultWordMatchMethod: number;
  defaultWordRepeat: number;
  defaultWordSeparators: number;
  filterMethod: number;
  filterWordList: boolean;
  iWordAllowlist: string[];
  loggingLevel: number;
  preserveCase: boolean;
  preserveFirst: boolean;
  preserveLast: boolean;
  showCounter: boolean;
  showSummary: boolean;
  substitutionMark: boolean;
  wordAllowlist: string[];
  wordlistId: number;
  wordlists: string[];
  wordlistsEnabled: boolean;
  words: { [key: string]: WordOptions };
  wordSubSeparator: string;

  protected static initializeDefaults(...defaults) {
    return Object.assign({}, this._configDefaults, ...defaults);
  }

  static readonly _configDefaults = {
    censorCharacter: '*',
    censorFixedLength: 0,
    defaultSubstitution: 'censored',
    defaultWordMatchMethod: Constants.MATCH_METHODS.EXACT,
    defaultWordRepeat: Constants.FALSE,
    defaultWordSeparators: Constants.FALSE,
    filterMethod: Constants.FILTER_METHODS.SUBSTITUTE,
    filterWordList: true,
    iWordAllowlist: [],
    loggingLevel: Constants.LOGGING_LEVELS.WARN,
    preserveCase: true,
    preserveFirst: true,
    preserveLast: false,
    showCounter: true,
    showSummary: true,
    substitutionMark: false,
    wordAllowlist: [],
    wordlistId: 0,
    wordlists: [],
    wordlistsEnabled: true,
    words: undefined,
    wordSubSeparator: ';;',
  };

  static readonly _defaultWords: { [key: string]: WordOptions } = {
    ass: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'butt',
    },
    asses: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.FALSE,
      separators: Constants.FALSE,
      sub: 'butts',
    },
    asshole: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'jerk',
    },
    badass: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.TRUE,
      sub: 'cool',
    },
    bastard: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'idiot',
    },
    bitch: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'bench',
    },
    cocksucker: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.TRUE,
      sub: 'suckup',
    },
    cunt: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'expletive',
    },
    dammit: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.FALSE,
      separators: Constants.TRUE,
      sub: 'dangit',
    },
    damn: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.FALSE,
      separators: Constants.FALSE,
      sub: 'dang',
    },
    dumbass: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'idiot',
    },
    fag: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'gay',
    },
    faggot: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'gay',
    },
    fags: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'gays',
    },
    fuck: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.TRUE,
      sub: 'freak',
    },
    goddammit: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.TRUE,
      sub: 'dangit',
    },
    hell: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.FALSE,
      separators: Constants.FALSE,
      sub: 'heck',
    },
    jackass: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.TRUE,
      sub: 'jerk',
    },
    nigga: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'bruh',
    },
    nigger: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'man',
    },
    niggers: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'people',
    },
    piss: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'pee',
    },
    pissed: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'ticked',
    },
    pussies: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'softies',
    },
    pussy: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'softie',
    },
    shit: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'crap',
    },
    slut: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'tramp',
    },
    tits: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'chest',
    },
    twat: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'dumbo',
    },
    twats: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'dumbos',
    },
    
    whore: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.PARTIAL,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'tramp',
    },
    wtf: {
      lists: [],
      matchMethod: Constants.MATCH_METHODS.EXACT,
      repeat: Constants.TRUE,
      separators: Constants.FALSE,
      sub: 'what',
    },
    zebi: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

zab: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

zabzoub: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

zabour: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

sorm: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

zouk: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

ja3b: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

khareg: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

nouna: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

kahba: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

gahaba: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

malhat: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

miboun: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

bassas: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

hawi: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'offensive_term'
},

naik: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'inappropriate_word'
},

nik: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'inappropriate_word'
},

zaaka: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'body_part'
},

khara: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'inappropriate_word'
},

زبي: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

زب: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

زبزوب: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

زبور: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

سرم: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

زوك: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

نونـة: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'private_part'
},

كحبة: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

قهبة: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

مالحات: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

مبون: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

بصاص: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

هاوي: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'offensive_term'
},

نيك: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'inappropriate_word'
},

زكّة: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'body_part'
},

خرا: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'inappropriate_word'
},

ديرابك: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'offensive_term'
},

غبي: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

قرود: {
  lists: [],
  matchMethod: Constants.MATCH_METHODS.PARTIAL,
  repeat: Constants.TRUE,
  separators: Constants.FALSE,
  sub: 'insult'
},

    
  };

  // Extending: Sub classes should pass in additional config defaults
  static _defaults = this.initializeDefaults(this._configDefaults) as Config;
  static _persistableKeys = Object.keys(this._defaults); // Make sure _defaults has already been assigned before this

  constructor(data: Record<string, unknown> = {}) {
    Object.assign(this, Config._defaults, data);
  }

  get _persistableKeys(): string[] {
    return (this.constructor as typeof Config)._persistableKeys;
  }

  addWord(str: string, options: WordOptions = this.defaultWordOptions()) {
    str = str.trim();
    options = Object.assign({}, this.defaultWordOptions(), options);

    if (options.matchMethod !== Constants.MATCH_METHODS.REGEX) {
      str = str.toLowerCase();
    }

    if (Object.keys(this.words).includes(str)) {
      return false; // Already exists
    } else {
      options.sub = options.case == Constants.TRUE ? options.sub.trim() : options.sub.trim().toLowerCase();
      this.words[str] = options;
      return true;
    }
  }

  defaultWordOptions(): WordOptions {
    return {
      lists: [],
      matchMethod: this.defaultWordMatchMethod,
      repeat: this.defaultWordRepeat,
      separators: this.defaultWordSeparators,
      sub: '',
    };
  }

  removeWord(str: string) {
    str = str.trim();
    const lower = str.toLowerCase();

    if (Object.keys(this.words).includes(lower)) {
      delete this.words[lower];
      return true;
    } else if (this.words[str]) {
      delete this.words[str];
      return true;
    } else {
      return false;
    }
  }

  repeatForWord(word: string): number {
    if (this.words[word].repeat === Constants.TRUE || this.words[word].repeat === Constants.FALSE) {
      return this.words[word].repeat;
    } else {
      return this.defaultWordRepeat;
    }
  }

  sanitizeWords() {
    const sanitizedWords = {};
    Object.keys(this.words)
      .sort()
      .forEach((key) => {
        sanitizedWords[key.trim().toLowerCase()] = this.words[key];
      });
    this.words = sanitizedWords;
  }
}
