/* =========================================================
   THE SOUL TRIAL
   D&D 5E — 2014 CHARACTER DATA
   PART 2 — DATA ENGINE
   ========================================================= */

const SOUL_TRIAL_DATA = {

  /* =======================================================
     ABILITY SCORES
     ======================================================= */

  abilities: {
    STR: "Strength",
    DEX: "Dexterity",
    CON: "Constitution",
    INT: "Intelligence",
    WIS: "Wisdom",
    CHA: "Charisma"
  },


  /* =======================================================
     SKILLS
     ======================================================= */

  skills: {

    Acrobatics: {
      ability: "DEX"
    },

    AnimalHandling: {
      name: "Animal Handling",
      ability: "WIS"
    },

    Arcana: {
      ability: "INT"
    },

    Athletics: {
      ability: "STR"
    },

    Deception: {
      ability: "CHA"
    },

    History: {
      ability: "INT"
    },

    Insight: {
      ability: "WIS"
    },

    Intimidation: {
      ability: "CHA"
    },

    Investigation: {
      ability: "INT"
    },

    Medicine: {
      ability: "WIS"
    },

    Nature: {
      ability: "INT"
    },

    Perception: {
      ability: "WIS"
    },

    Performance: {
      ability: "CHA"
    },

    Persuasion: {
      ability: "CHA"
    },

    Religion: {
      ability: "INT"
    },

    SleightOfHand: {
      name: "Sleight of Hand",
      ability: "DEX"
    },

    Stealth: {
      ability: "DEX"
    },

    Survival: {
      ability: "WIS"
    }

  },


  /* =======================================================
     PROFICIENCY BONUS
     ======================================================= */

  proficiencyBonus: {

    1: 2,
    2: 2,
    3: 2,
    4: 2,

    5: 3,
    6: 3,
    7: 3,
    8: 3,

    9: 4,
    10: 4,
    11: 4,
    12: 4,

    13: 5,
    14: 5,
    15: 5,
    16: 5,

    17: 6,
    18: 6,
    19: 6,
    20: 6

  },


  /* =======================================================
     RACES
     ======================================================= */

  races: {

    Human: {

      name: "Human",

      description:
        "Humans are adaptable, ambitious, and incredibly diverse.",

      abilityBonuses: {
        STR: 1,
        DEX: 1,
        CON: 1,
        INT: 1,
        WIS: 1,
        CHA: 1
      },

      size: "Medium",

      speed: 30,

      languages: [
        "Common",
        "One additional language"
      ],

      traits: [
        "Ability Score Increase",
        "Age",
        "Alignment",
        "Size",
        "Speed",
        "Languages"
      ]

    },


    Dwarf: {

      name: "Dwarf",

      description:
        "Dwarves are resilient, hardy, and skilled craftsmen.",

      abilityBonuses: {
        CON: 2
      },

      size: "Medium",

      speed: 25,

      darkvision: 60,

      languages: [
        "Common",
        "Dwarvish"
      ],

      traits: [
        "Darkvision",
        "Dwarven Resilience",
        "Dwarven Combat Training",
        "Stonecunning"
      ],

      subraces: {

        HillDwarf: {

          name: "Hill Dwarf",

          abilityBonuses: {
            WIS: 1
          },

          traits: [
            "Dwarven Toughness"
          ]

        },

        MountainDwarf: {

          name: "Mountain Dwarf",

          abilityBonuses: {
            STR: 2
          },

          traits: [
            "Dwarven Armor Training"
          ]

        }

      }

    },


    Elf: {

      name: "Elf",

      description:
        "Elves are graceful, perceptive, and naturally connected to magic.",

      abilityBonuses: {
        DEX: 2
      },

      size: "Medium",

      speed: 30,

      darkvision: 60,

      languages: [
        "Common",
        "Elvish"
      ],

      traits: [
        "Darkvision",
        "Keen Senses",
        "Fey Ancestry",
        "Trance"
      ],

      subraces: {

        HighElf: {

          name: "High Elf",

          abilityBonuses: {
            INT: 1
          },

          traits: [
            "Elf Weapon Training",
            "Cantrip",
            "Extra Language"
          ]

        },

        WoodElf: {

          name: "Wood Elf",

          abilityBonuses: {
            WIS: 1
          },

          speed: 35,

          traits: [
            "Elf Weapon Training",
            "Fleet of Foot",
            "Mask of the Wild"
          ]

        },

        DarkElf: {

          name: "Dark Elf (Drow)",

          abilityBonuses: {
            CHA: 1
          },

          darkvision: 120,

          traits: [
            "Superior Darkvision",
            "Sunlight Sensitivity",
            "Drow Magic",
            "Drow Weapon Training"
          ]

        }

      }

    },


    Halfling: {

      name: "Halfling",

      description:
        "Halflings are small, fortunate, and remarkably brave.",

      abilityBonuses: {
        DEX: 2
      },

      size: "Small",

      speed: 25,

      languages: [
        "Common",
        "Halfling"
      ],

      traits: [
        "Lucky",
        "Brave",
        "Halfling Nimbleness"
      ],

      subraces: {

        Lightfoot: {

          name: "Lightfoot Halfling",

          abilityBonuses: {
            CHA: 1
          },

          traits: [
            "Naturally Stealthy"
          ]

        },

        Stout: {

          name: "Stout Halfling",

          abilityBonuses: {
            CON: 1
          },

          traits: [
            "Stout Resilience"
          ]

        }

      }

    },


    Dragonborn: {

      name: "Dragonborn",

      description:
        "Dragonborn carry the power and legacy of dragons.",

      abilityBonuses: {
        STR: 2,
        CHA: 1
      },

      size: "Medium",

      speed: 30,

      languages: [
        "Common",
        "Draconic"
      ],

      traits: [
        "Draconic Ancestry",
        "Breath Weapon",
        "Damage Resistance"
      ]

    },


    Gnome: {

      name: "Gnome",

      description:
        "Gnomes are inventive, intelligent, and endlessly curious.",

      abilityBonuses: {
        INT: 2
      },

      size: "Small",

      speed: 25,

      darkvision: 60,

      languages: [
        "Common",
        "Gnomish"
      ],

      traits: [
        "Darkvision",
        "Gnome Cunning"
      ],

      subraces: {

        ForestGnome: {

          name: "Forest Gnome",

          abilityBonuses: {
            DEX: 1
          },

          traits: [
            "Natural Illusionist",
            "Speak with Small Beasts"
          ]

        },

        RockGnome: {

          name: "Rock Gnome",

          abilityBonuses: {
            CON: 1
          },

          traits: [
            "Artificer's Lore",
            "Tinker"
          ]

        }

      }

    },


    HalfElf: {

      name: "Half-Elf",

      description:
        "Half-elves combine the adaptability of humans with the grace of elves.",

      abilityBonuses: {
        CHA: 2
      },

      size: "Medium",

      speed: 30,

      darkvision: 60,

      languages: [
        "Common",
        "Elvish",
        "One additional language"
      ],

      traits: [
        "Darkvision",
        "Fey Ancestry",
        "Skill Versatility"
      ]

    },


    HalfOrc: {

      name: "Half-Orc",

      description:
        "Half-orcs combine powerful physical strength with relentless endurance.",

      abilityBonuses: {
        STR: 2,
        CON: 1
      },

      size: "Medium",

      speed: 30,

      darkvision: 60,

      languages: [
        "Common",
        "Orc"
      ],

      traits: [
        "Darkvision",
        "Menacing",
        "Relentless Endurance",
        "Savage Attacks"
      ]

    },


    Tiefling: {

      name: "Tiefling",

      description:
        "Tieflings carry the influence of the Nine Hells in their blood.",

      abilityBonuses: {
        INT: 1,
        CHA: 2
      },

      size: "Medium",

      speed: 30,

      darkvision: 60,

      languages: [
        "Common",
        "Infernal"
      ],

      traits: [
        "Darkvision",
        "Hellish Resistance",
        "Infernal Legacy"
      ]

    }

  },


  /* =======================================================
     BACKGROUNDS
     ======================================================= */

  backgrounds: {

    Acolyte: {

      name: "Acolyte",

      skills: [
        "Insight",
        "Religion"
      ],

      languages: 2,

      equipment: [
        "Holy symbol",
        "Prayer book or prayer wheel",
        "5 sticks of incense",
        "Vestments",
        "Common clothes",
        "15 gp"
      ],

      feature: "Shelter of the Faithful"

    },


    Charlatan: {

      name: "Charlatan",

      skills: [
        "Deception",
        "SleightOfHand"
      ],

      tools: [
        "Disguise kit",
        "Forgery kit"
      ],

      equipment: [
        "Fine clothes",
        "Disguise kit",
        "Tools of your con",
        "10 gp"
      ],

      feature: "False Identity"

    },


    Criminal: {

      name: "Criminal",

      skills: [
        "Deception",
        "Stealth"
      ],

      tools: [
        "One type of gaming set",
        "Thieves' tools"
      ],

      equipment: [
        "Crowbar",
        "Dark common clothes",
        "Hood",
        "15 gp"
      ],

      feature: "Criminal Contact"

    },


    Entertainer: {

      name: "Entertainer",

      skills: [
        "Acrobatics",
        "Performance"
      ],

      tools: [
        "Disguise kit",
        "One musical instrument"
      ],

      equipment: [
        "Musical instrument",
        "Favor of an admirer",
        "Costume",
        "15 gp"
      ],

      feature: "By Popular Demand"

    },


    FolkHero: {

      name: "Folk Hero",

      skills: [
        "AnimalHandling",
        "Survival"
      ],

      tools: [
        "One type of artisan's tools",
        "Vehicles (land)"
      ],

      equipment: [
        "Artisan's tools",
        "Shovel",
        "Iron pot",
        "Common clothes",
        "10 gp"
      ],

      feature: "Rustic Hospitality"

    },


    GuildArtisan: {

      name: "Guild Artisan",

      skills: [
        "Insight",
        "Persuasion"
      ],

      tools: [
        "One type of artisan's tools"
      ],

      languages: 1,

      equipment: [
        "Artisan's tools",
        "Letter of introduction",
        "Traveler's clothes",
        "15 gp"
      ],

      feature: "Guild Membership"

    },


    Hermit: {

      name: "Hermit",

      skills: [
        "Medicine",
        "Religion"
      ],

      tools: [
        "Herbalism kit"
      ],

      languages: 1,

      equipment: [
        "Scroll case",
        "Winter blanket",
        "Common clothes",
        "Herbalism kit",
        "5 gp"
      ],

      feature: "Discovery"

    },


    Noble: {

      name: "Noble",

      skills: [
        "History",
        "Persuasion"
      ],

      tools: [
        "One gaming set"
      ],

      languages: 1,

      equipment: [
        "Fine clothes",
        "Signet ring",
        "Scroll of pedigree",
        "25 gp"
      ],

      feature: "Position of Privilege"

    },


    Outlander: {

      name: "Outlander",

      skills: [
        "Athletics",
        "Survival"
      ],

      tools: [
        "One musical instrument"
      ],

      languages: 1,

      equipment: [
        "Staff",
        "Hunting trap",
        "Trophy from an animal",
        "Traveler's clothes",
        "10 gp"
      ],

      feature: "Wanderer"

    },


    Sage: {

      name: "Sage",

      skills: [
        "Arcana",
        "History"
      ],

      languages: 2,

      equipment: [
        "Bottle of black ink",
        "Quill",
        "Small knife",
        "Letter from a dead colleague",
        "Common clothes",
        "10 gp"
      ],

      feature: "Researcher"

    },


    Sailor: {

      name: "Sailor",

      skills: [
        "Athletics",
        "Perception"
      ],

      tools: [
        "Navigator's tools",
        "Vehicles (water)"
      ],

      equipment: [
        "Belaying pin",
        "50 feet of silk rope",
        "Lucky charm",
        "Common clothes",
        "10 gp"
      ],

      feature: "Ship's Passage"

    },


    Soldier: {

      name: "Soldier",

      skills: [
        "Athletics",
        "Intimidation"
      ],

      tools: [
        "One gaming set",
        "Vehicles (land)"
      ],

      equipment: [
        "Insignia of rank",
        "Trophy from fallen enemy",
        "Bone dice or deck of cards",
        "Common clothes",
        "10 gp"
      ],

      feature: "Military Rank"

    },


    Urchin: {

      name: "Urchin",

      skills: [
        "SleightOfHand",
        "Stealth"
      ],

      tools: [
        "Disguise kit",
        "Thieves' tools"
      ],

      equipment: [
        "Small knife",
        "Map of hometown",
        "Pet mouse",
        "Token of parents",
        "Common clothes",
        "10 gp"
      ],

      feature: "City Secrets"

    }

  },


  /* =======================================================
     CLASSES
     ======================================================= */

  classes: {

    Barbarian: {

      name: "Barbarian",

      hitDie: 12,

      primaryAbilities: [
        "STR",
        "CON"
      ],

      savingThrows: [
        "STR",
        "CON"
      ],

      armor: [
        "Light",
        "Medium",
        "Shield"
      ],

      weapons: [
        "Simple",
        "Martial"
      ],

      skillChoices: 2,

      skillOptions: [
        "AnimalHandling",
        "Athletics",
        "Intimidation",
        "Nature",
        "Perception",
        "Survival"
      ],

      subclasses: [
        "Berserker",
        "TotemWarrior"
      ],

      progression: {

        1: [
          "Rage",
          "Unarmored Defense"
        ],

        2: [
          "Reckless Attack",
          "Danger Sense"
        ],

        3: [
          "Primal Path"
        ],

        4: [
          "Ability Score Improvement"
        ],

        5: [
          "Extra Attack",
          "Fast Movement"
        ],

        6: [
          "Primal Path Feature"
        ],

        7: [
          "Feral Instinct"
        ],

        8: [
          "Ability Score Improvement"
        ],

        9: [
          "Brutal Critical"
        ],

        10: [
          "Primal Path Feature"
        ],

        11: [
          "Relentless Rage"
        ],

        12: [
          "Ability Score Improvement"
        ],

        13: [
          "Brutal Critical"
        ],

        14: [
          "Primal Path Feature"
        ],

        15: [
          "Persistent Rage"
        ],

        16: [
          "Ability Score Improvement"
        ],

        17: [
          "Brutal Critical"
        ],

        18: [
          "Indomitable Might"
        ],

        19: [
          "Ability Score Improvement"
        ],

        20: [
          "Primal Champion"
        ]

      }

    },


    Bard: {

      name: "Bard",

      hitDie: 8,

      primaryAbilities: [
        "CHA"
      ],

      savingThrows: [
        "DEX",
        "CHA"
      ],

      armor: [
        "Light"
      ],

      weapons: [
        "Simple",
        "Hand Crossbow",
        "Longsword",
        "Rapier",
        "Shortsword"
      ],

      skillChoices: 3,

      skillOptions: [
        "Acrobatics",
        "AnimalHandling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "SleightOfHand",
        "Stealth",
        "Survival"
      ],

      subclasses: [
        "Lore",
        "Valor"
      ],

      progression: {

        1: [
          "Spellcasting",
          "Bardic Inspiration"
        ],

        2: [
          "Jack of All Trades",
          "Song of Rest"
        ],

        3: [
          "Bard College",
          "Expertise"
        ],

        4: [
          "Ability Score Improvement"
        ],

        5: [
          "Bardic Inspiration Improvement",
          "Font of Inspiration"
        ],

        6: [
          "Countercharm",
          "Bard College Feature"
        ],

        8: [
          "Ability Score Improvement"
        ],

        10: [
          "Expertise",
          "Magical Secrets",
          "Bardic Inspiration Improvement"
        ],

        12: [
          "Ability Score Improvement"
        ],

        14: [
          "Magical Secrets",
          "Bard College Feature"
        ],

        16: [
          "Ability Score Improvement"
        ],

        18: [
          "Magical Secrets"
        ],

        19: [
          "Ability Score Improvement"
        ],

        20: [
          "Superior Inspiration"
        ]

      }

    },


    Cleric: {

      name: "Cleric",

      hitDie: 8,

      primaryAbilities: [
        "WIS"
      ],

      savingThrows: [
        "WIS",
        "CHA"
      ],

      armor: [
        "Light",
        "Medium",
        "Shield"
      ],

      weapons: [
        "Simple"
      ],

      skillChoices: 2,

      skillOptions: [
        "History",
        "Insight",
        "Medicine",
        "Persuasion",
        "Religion"
      ],

      subclasses: [
        "Life",
        "Light",
        "War"
      ],

      progression: {

        1: [
          "Spellcasting",
          "Divine Domain"
        ],

        2: [
          "Channel Divinity",
          "Divine Domain Feature"
        ],

        4: [
          "Ability Score Improvement"
        ],

        5: [
          "Destroy Undead"
        ],

        6: [
          "Channel Divinity Improvement",
          "Divine Domain Feature"
        ],

        8: [
          "Ability Score Improvement",
          "Divine Domain Feature"
        ],

        10: [
          "Divine Intervention"
        ],

        11: [
          "Destroy Undead Improvement"
        ],

        12: [
          "Ability Score Improvement"
        ],

        14: [
          "Destroy Undead Improvement"
        ],

        16: [
          "Ability Score Improvement"
        ],

        17: [
          "Divine Domain Feature"
        ],

        18: [
          "Channel Divinity Improvement"
        ],

        19: [
          "Ability Score Improvement"
        ],

        20: [
          "Divine Intervention Improvement"
        ]

      }

    },


    Druid: {

      name: "Druid",

      hitDie: 8,

      primaryAbilities: [
        "WIS"
      ],

      savingThrows: [
        "INT",
        "WIS"
      ],

      armor: [
        "Light",
        "Medium",
        "Shield"
      ],

      weapons: [
        "Club",
        "Dagger",
        "Dart",
        "Javelin",
        "Mace",
        "Quarterstaff",
        "Scimitar",
        "Sickle",
        "Sling",
        "Spear"
      ],

      skillChoices: 2,

      skillOptions: [
        "Arcana",
        "AnimalHandling",
        "Insight",
        "Medicine",
        "Nature",
        "Perception",
        "Religion",
        "Survival"
      ],

      subclasses: [
        "Land",
        "Moon"
      ]

    },


    Fighter: {

      name: "Fighter",

      hitDie: 10,

      primaryAbilities: [
        "STR",
        "DEX"
      ],

      savingThrows: [
        "STR",
        "CON"
      ],

      armor: [
        "Light",
        "Medium",
        "Heavy",
        "Shield"
      ],

      weapons: [
        "Simple",
        "Martial"
      ],

      skillChoices: 2,

      skillOptions: [
        "Acrobatics",
        "AnimalHandling",
        "Athletics",
        "History",
        "Insight",
        "Intimidation",
        "Perception",
        "Survival"
      ],

      subclasses: [
        "Champion",
        "BattleMaster",
        "EldritchKnight"
      ]

    },


    Monk: {

      name: "Monk",

      hitDie: 8,

      primaryAbilities: [
        "DEX",
        "WIS"
      ],

      savingThrows: [
        "STR",
        "DEX"
      ],

      armor: [],

      weapons: [
        "Simple",
        "Shortsword"
      ],

      skillChoices: 2,

      skillOptions: [
        "Acrobatics",
        "Athletics",
        "History",
        "Insight",
        "Religion",
        "Stealth"
      ],

      subclasses: [
        "OpenHand",
        "Shadow",
        "FourElements"
      ]

    },


    Paladin: {

      name: "Paladin",

      hitDie: 10,

      primaryAbilities: [
        "STR",
        "CHA"
      ],

      savingThrows: [
        "WIS",
        "CHA"
      ],

      armor: [
        "Light",
        "Medium",
        "Heavy",
        "Shield"
      ],

      weapons: [
        "Simple",
        "Martial"
      ],

      skillChoices: 2,

      skillOptions: [
        "Athletics",
        "Insight",
        "Intimidation",
        "Medicine",
        "Persuasion",
        "Religion"
      ],

      subclasses: [
        "Devotion",
        "Ancients",
        "Vengeance"
      ]

    },


    Ranger: {

      name: "Ranger",

      hitDie: 10,

      primaryAbilities: [
        "DEX",
        "WIS"
      ],

      savingThrows: [
        "STR",
        "DEX"
      ],

      armor: [
        "Light",
        "Medium",
        "Shield"
      ],

      weapons: [
        "Simple",
        "Martial"
      ],

      skillChoices: 3,

      skillOptions: [
        "AnimalHandling",
        "Athletics",
        "Insight",
        "Investigation",
        "Nature",
        "Perception",
        "Stealth",
        "Survival"
      ],

      subclasses: [
        "Hunter",
        "BeastMaster"
      ]

    },


    Rogue: {

      name: "Rogue",

      hitDie: 8,

      primaryAbilities: [
        "DEX"
      ],

      savingThrows: [
        "DEX",
        "INT"
      ],

      armor: [
        "Light"
      ],

      weapons: [
        "Simple",
        "HandCrossbow",
        "Longsword",
        "Rapier",
        "Shortsword"
      ],

      skillChoices: 4,

      skillOptions: [
        "Acrobatics",
        "Athletics",
        "Deception",
        "Insight",
        "Intimidation",
        "Investigation",
        "Perception",
        "Performance",
        "Persuasion",
        "SleightOfHand",
        "Stealth"
      ],

      subclasses: [
        "Thief",
        "Assassin",
        "ArcaneTrickster"
      ]

    },


    Sorcerer: {

      name: "Sorcerer",

      hitDie: 6,

      primaryAbilities: [
        "CHA"
      ],

      savingThrows: [
        "CON",
        "CHA"
      ],

      armor: [],

      weapons: [
        "Dagger",
        "Dart",
        "Sling",
        "Quarterstaff",
        "LightCrossbow"
      ],

      skillChoices: 2,

      skillOptions: [
        "Arcana",
        "Deception",
        "Insight",
        "Intimidation",
        "Persuasion",
        "Religion"
      ],

      subclasses: [
        "DraconicBloodline",
        "WildMagic"
      ]

    },


    Warlock: {

      name: "Warlock",

      hitDie: 8,

      primaryAbilities: [
        "CHA"
      ],

      savingThrows: [
        "WIS",
        "CHA"
      ],

      armor: [
        "Light"
      ],

      weapons: [
        "Simple"
      ],

      skillChoices: 2,

      skillOptions: [
        "Arcana",
        "Deception",
        "History",
        "Intimidation",
        "Investigation",
        "Nature",
        "Religion"
      ],

      subclasses: [
        "Archfey",
        "Fiend",
        "GreatOldOne"
      ]

    },


    Wizard: {

      name: "Wizard",

      hitDie: 6,

      primaryAbilities: [
        "INT"
      ],

      savingThrows: [
        "INT",
        "WIS"
      ],

      armor: [],

      weapons: [
        "Dagger",
        "Dart",
        "Sling",
        "Quarterstaff",
        "LightCrossbow"
      ],

      skillChoices: 2,

      skillOptions: [
        "Arcana",
        "History",
        "Insight",
        "Investigation",
        "Medicine",
        "Religion"
      ],

      subclasses: [
        "Abjuration",
        "Conjuration",
        "Divination",
        "Enchantment",
        "Evocation",
        "Illusion",
        "Necromancy",
        "Transmutation"
      ]

    }

  },


  /* =======================================================
     SUBCLASSES
     ======================================================= */

  subclasses: {

    Berserker: {
      name: "Path of the Berserker",
      class: "Barbarian",
      level: 3
    },

    TotemWarrior: {
      name: "Path of the Totem Warrior",
      class: "Barbarian",
      level: 3
    },

    Lore: {
      name: "College of Lore",
      class: "Bard",
      level: 3
    },

    Valor: {
      name: "College of Valor",
      class: "Bard",
      level: 3
    },

    Life: {
      name: "Life Domain",
      class: "Cleric",
      level: 1
    },

    Light: {
      name: "Light Domain",
      class: "Cleric",
      level: 1
    },

    War: {
      name: "War Domain",
      class: "Cleric",
      level: 1
    },

    Land: {
      name: "Circle of the Land",
      class: "Druid",
      level: 2
    },

    Moon: {
      name: "Circle of the Moon",
      class: "Druid",
      level: 2
    },

    Champion: {
      name: "Champion",
      class: "Fighter",
      level: 3
    },

    BattleMaster: {
      name: "Battle Master",
      class: "Fighter",
      level: 3
    },

    EldritchKnight: {
      name: "Eldritch Knight",
      class: "Fighter",
      level: 3
    },

    OpenHand: {
      name: "Way of the Open Hand",
      class: "Monk",
      level: 3
    },

    Shadow: {
      name: "Way of Shadow",
      class: "Monk",
      level: 3
    },

    FourElements: {
      name: "Way of the Four Elements",
      class: "Monk",
      level: 3
    },

    Devotion: {
      name: "Oath of Devotion",
      class: "Paladin",
      level: 3
    },

    Ancients: {
      name: "Oath of the Ancients",
      class: "Paladin",
      level: 3
    },

    Vengeance: {
      name: "Oath of Vengeance",
      class: "Paladin",
      level: 3
    },

    Hunter: {
      name: "Hunter",
      class: "Ranger",
      level: 3
    },

    BeastMaster: {
      name: "Beast Master",
      class: "Ranger",
      level: 3
    },

    Thief: {
      name: "Thief",
      class: "Rogue",
      level: 3
    },

    Assassin: {
      name: "Assassin",
      class: "Rogue",
      level: 3
    },

    ArcaneTrickster: {
      name: "Arcane Trickster",
      class: "Rogue",
      level: 3
    },

    DraconicBloodline: {
      name: "Draconic Bloodline",
      class: "Sorcerer",
      level: 1
    },

    WildMagic: {
      name: "Wild Magic",
      class: "Sorcerer",
      level: 1
    },

    Archfey: {
      name: "The Archfey",
      class: "Warlock",
      level: 1
    },

    Fiend: {
      name: "The Fiend",
      class: "Warlock",
      level: 1
    },

    GreatOldOne: {
      name: "The Great Old One",
      class: "Warlock",
      level: 1
    },

    Abjuration: {
      name: "School of Abjuration",
      class: "Wizard",
      level: 2
    },

    Conjuration: {
      name: "School of Conjuration",
      class: "Wizard",
      level: 2
    },

    Divination: {
      name: "School of Divination",
      class: "Wizard",
      level: 2
    },

    Enchantment: {
      name: "School of Enchantment",
      class: "Wizard",
      level: 2
    },

    Evocation: {
      name: "School of Evocation",
      class: "Wizard",
      level: 2
    },

    Illusion: {
      name: "School of Illusion",
      class: "Wizard",
      level: 2
    },

    Necromancy: {
      name: "School of Necromancy",
      class: "Wizard",
      level: 2
    },

    Transmutation: {
      name: "School of Transmutation",
      class: "Wizard",
      level: 2
    }

  },


  /* =======================================================
     LEVEL INFORMATION
     ======================================================= */

  levels: {

    1: {
      proficiencyBonus: 2,
      xp: 0
    },

    2: {
      proficiencyBonus: 2,
      xp: 300
    },

    3: {
      proficiencyBonus: 2,
      xp: 900
    },

    4: {
      proficiencyBonus: 2,
      xp: 2700
    },

    5: {
      proficiencyBonus: 3,
      xp: 6500
    },

    6: {
      proficiencyBonus: 3,
      xp: 14000
    },

    7: {
      proficiencyBonus: 3,
      xp: 23000
    },

    8: {
      proficiencyBonus: 3,
      xp: 34000
    },

    9: {
      proficiencyBonus: 4,
      xp: 48000
    },

    10: {
      proficiencyBonus: 4,
      xp: 64000
    },

    11: {
      proficiencyBonus: 4,
      xp: 85000
    },

    12: {
      proficiencyBonus: 4,
      xp: 100000
    },

    13: {
      proficiencyBonus: 5,
      xp: 120000
    },

    14: {
      proficiencyBonus: 5,
      xp: 140000
    },

    15: {
      proficiencyBonus: 5,
      xp: 165000
    },

    16: {
      proficiencyBonus: 5,
      xp: 195000
    },

    17: {
      proficiencyBonus: 6,
      xp: 225000
    },

    18: {
      proficiencyBonus: 6,
      xp: 265000
    },

    19: {
      proficiencyBonus: 6,
      xp: 305000
    },

    20: {
      proficiencyBonus: 6,
      xp: 355000
    }

  }

};


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getAbilityModifier(score) {

  return Math.floor((Number(score) - 10) / 2);

}


function getProficiencyBonus(level) {

  return SOUL_TRIAL_DATA.proficiencyBonus[level] || 2;

}


function getClassData(className) {

  return SOUL_TRIAL_DATA.classes[className] || null;

}


function getRaceData(raceName) {

  return SOUL_TRIAL_DATA.races[raceName] || null;

}


function getBackgroundData(backgroundName) {

  return SOUL_TRIAL_DATA.backgrounds[backgroundName] || null;

}


function getSubclassData(subclassName) {

  return SOUL_TRIAL_DATA.subclasses[subclassName] || null;

}


function getClassSubclasses(className) {

  const classData =
    getClassData(className);

  if (!classData) {
    return [];
  }

  return classData.subclasses
    .map(key => getSubclassData(key))
    .filter(Boolean);

}


function getClassFeatures(className, level) {

  const classData =
    getClassData(className);

  if (!classData || !classData.progression) {
    return [];
  }

  let features = [];

  for (let lvl = 1; lvl <= level; lvl++) {

    if (classData.progression[lvl]) {

      features.push(
        ...classData.progression[lvl]
      );

    }

  }

  return features;

}


function formatDataName(value) {

  if (!value) {
    return "";
  }

  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, char => char.toUpperCase())
    .trim();

    }
