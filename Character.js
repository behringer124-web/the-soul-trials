/* =========================================================
   THE SOUL TRIAL
   D&D 5E CHARACTER ENGINE
   character.js
   ========================================================= */

"use strict";


/* =========================================================
   CHARACTER ENGINE
   ========================================================= */

const CharacterEngine = {


  /* =======================================================
     CREATE DEFAULT CHARACTER
     ======================================================= */

  create() {

    return {

      name: "",

      race: "",

      subrace: "",

      class: "",

      subclass: "",

      background: "",

      level: 1,

      experience: 0,

      alignment: "",

      abilities: {

        STR: 8,
        DEX: 8,
        CON: 8,
        INT: 8,
        WIS: 8,
        CHA: 8

      },

      abilityMethod: "standard",

      skills: [],

      savingThrows: [],

      languages: [],

      tools: [],

      equipment: [],

      spells: {

        cantrips: [],
        known: [],
        prepared: []

      },

      personality: {

        traits: "",
        ideals: "",
        bonds: "",
        flaws: "",
        backstory: ""

      },

      deathSaves: {

        successes: 0,
        failures: 0

      }

    };

  },


  /* =======================================================
     ABILITY MODIFIER
     ======================================================= */

  modifier(score) {

    return Math.floor(
      (Number(score) - 10) / 2
    );

  },


  /* =======================================================
     FORMATTED MODIFIER
     ======================================================= */

  modifierText(score) {

    const modifier =
      this.modifier(score);

    return modifier >= 0
      ? `+${modifier}`
      : `${modifier}`;

  },


  /* =======================================================
     PROFICIENCY BONUS
     ======================================================= */

  proficiency(level) {

    level =
      Math.max(
        1,
        Math.min(
          20,
          Number(level) || 1
        )
      );

    return Math.ceil(
      level / 4
    ) + 1;

  },


  /* =======================================================
     RACE
     ======================================================= */

  getRace(character) {

    if (
      typeof getRaceData ===
      "function"
    ) {

      return getRaceData(
        character.race
      );

    }

    return null;

  },


  getSubrace(character) {

    if (
      typeof getSubraceData ===
      "function"
    ) {

      return getSubraceData(
        character.race,
        character.subrace
      );

    }

    return null;

  },


  /* =======================================================
     CLASS
     ======================================================= */

  getClass(character) {

    if (
      typeof getClassData ===
      "function"
    ) {

      return getClassData(
        character.class
      );

    }

    return null;

  },


  getSubclass(character) {

    if (
      typeof getSubclassData ===
      "function"
    ) {

      return getSubclassData(
        character.subclass
      );

    }

    return null;

  },


  /* =======================================================
     FINAL ABILITY SCORES
     ======================================================= */

  getFinalAbilities(character) {

    const scores = {

      STR: Number(
        character.abilities.STR
      ) || 0,

      DEX: Number(
        character.abilities.DEX
      ) || 0,

      CON: Number(
        character.abilities.CON
      ) || 0,

      INT: Number(
        character.abilities.INT
      ) || 0,

      WIS: Number(
        character.abilities.WIS
      ) || 0,

      CHA: Number(
        character.abilities.CHA
      ) || 0

    };


    const race =
      this.getRace(character);

    const subrace =
      this.getSubrace(character);


    if (race?.abilityBonuses) {

      Object.entries(
        race.abilityBonuses
      ).forEach(
        ([ability, bonus]) => {

          if (
            scores[ability] !==
            undefined
          ) {

            scores[ability] +=
              Number(bonus);

          }

        }
      );

    }


    if (subrace?.abilityBonuses) {

      Object.entries(
        subrace.abilityBonuses
      ).forEach(
        ([ability, bonus]) => {

          if (
            scores[ability] !==
            undefined
          ) {

            scores[ability] +=
              Number(bonus);

          }

        }
      );

    }


    return scores;

  },


  /* =======================================================
     ALL MODIFIERS
     ======================================================= */

  getModifiers(character) {

    const scores =
      this.getFinalAbilities(
        character
      );

    const modifiers = {};

    Object.entries(
      scores
    ).forEach(
      ([ability, score]) => {

        modifiers[ability] =
          this.modifier(score);

      }
    );

    return modifiers;

  },


  /* =======================================================
     HIT POINTS
     ======================================================= */

  getHitPoints(character) {

    const classData =
      this.getClass(character);

    if (!classData) {

      return 0;

    }

    const level =
      Math.max(
        1,
        Number(character.level) || 1
      );

    const conModifier =
      this.modifier(
        this.getFinalAbilities(
          character
        ).CON
      );


    /*
     * First level:
     * Full hit die + CON modifier
     */

    let hp =
      classData.hitDie +
      conModifier;


    /*
     * Every level after first:
     * Average hit die + CON modifier
     *
     * D&D 5E fixed values:
     * d6  = 4
     * d8  = 5
     * d10 = 6
     * d12 = 7
     */

    const average = {

      6: 4,
      8: 5,
      10: 6,
      12: 7

    };


    const perLevel =
      (
        average[
          classData.hitDie
        ] ||
        Math.floor(
          classData.hitDie / 2
        ) + 1
      ) +
      conModifier;


    if (level > 1) {

      hp +=
        perLevel *
        (level - 1);

    }


    /*
     * Minimum of 1 HP per level.
     */

    return Math.max(
      level,
      hp
    );

  },


  /* =======================================================
     ARMOR CLASS
     ======================================================= */

  getArmorClass(character) {

    const scores =
      this.getFinalAbilities(
        character
      );

    const dex =
      this.modifier(
        scores.DEX
      );

    const con =
      this.modifier(
        scores.CON
      );

    const wis =
      this.modifier(
        scores.WIS
      );


    /*
     * Base AC.
     */

    let ac =
      10 + dex;


    /*
     * Barbarian:
     * 10 + DEX + CON
     */

    if (
      character.class ===
      "Barbarian"
    ) {

      ac =
        10 +
        dex +
        con;

    }


    /*
     * Monk:
     * 10 + DEX + WIS
     */

    if (
      character.class ===
      "Monk"
    ) {

      ac =
        10 +
        dex +
        wis;

    }


    return ac;

  },


  /* =======================================================
     INITIATIVE
     ======================================================= */

  getInitiative(character) {

    const scores =
      this.getFinalAbilities(
        character
      );

    return this.modifier(
      scores.DEX
    );

  },


  /* =======================================================
     SPEED
     ======================================================= */

  getSpeed(character) {

    const race =
      this.getRace(character);

    const subrace =
      this.getSubrace(character);

    return (
      subrace?.speed ||
      race?.speed ||
      30
    );

  },


  /* =======================================================
     PROFICIENT SAVING THROWS
     ======================================================= */

  getSavingThrows(character) {

    const classData =
      this.getClass(character);

    if (!classData) {

      return [];

    }

    return [
      ...(classData.savingThrows || [])
    ];

  },


  /* =======================================================
     SAVING THROW VALUE
     ======================================================= */

  getSavingThrow(
    character,
    ability
  ) {

    const scores =
      this.getFinalAbilities(
        character
      );

    const modifier =
      this.modifier(
        scores[ability]
      );

    const proficient =
      this.getSavingThrows(
        character
      ).includes(
        ability
      );

    return modifier +
      (
        proficient
          ? this.proficiency(
              character.level
            )
          : 0
      );

  },


  /* =======================================================
     SKILL PROFICIENCIES
     ======================================================= */

  getSkills(character) {

    return [
      ...new Set(
        character.skills || []
      )
    ];

  },


  /* =======================================================
     SKILL ABILITY
     ======================================================= */

  getSkillAbility(skill) {

    const data =
      SOUL_TRIAL_DATA
        ?.skills?.[skill];

    return data?.ability ||
      null;

  },


  /* =======================================================
     SKILL VALUE
     ======================================================= */

  getSkillValue(
    character,
    skill
  ) {

    const ability =
      this.getSkillAbility(
        skill
      );

    if (!ability) {

      return 0;

    }

    const scores =
      this.getFinalAbilities(
        character
      );

    const modifier =
      this.modifier(
        scores[ability]
      );

    const proficient =
      this.getSkills(
        character
      ).includes(
        skill
      );

    return modifier +
      (
        proficient
          ? this.proficiency(
              character.level
            )
          : 0
      );

  },


  /* =======================================================
     PASSIVE PERCEPTION
     ======================================================= */

  getPassivePerception(character) {

    return 10 +
      this.getSkillValue(
        character,
        "Perception"
      );

  },


  /* =======================================================
     SPELLCASTING ABILITY
     ======================================================= */

  getSpellcastingAbility(character) {

    const className =
      character.class;

    const abilities = {

      Bard: "CHA",
      Cleric: "WIS",
      Druid: "WIS",
      Paladin: "CHA",
      Ranger: "WIS",
      Sorcerer: "CHA",
      Warlock: "CHA",
      Wizard: "INT"

    };

    return abilities[
      className
    ] || null;

  },


  /* =======================================================
     SPELLCASTING MODIFIER
     ======================================================= */

  getSpellcastingModifier(
    character
  ) {

    const ability =
      this.getSpellcastingAbility(
        character
      );

    if (!ability) {

      return 0;

    }

    const scores =
      this.getFinalAbilities(
        character
      );

    return this.modifier(
      scores[ability]
    );

  },


  /* =======================================================
     SPELL SAVE DC
     ======================================================= */

  getSpellSaveDC(character) {

    const ability =
      this.getSpellcastingAbility(
        character
      );

    if (!ability) {

      return null;

    }

    return 8 +
      this.proficiency(
        character.level
      ) +
      this.getSpellcastingModifier(
        character
      );

  },


  /* =======================================================
     SPELL ATTACK BONUS
     ======================================================= */

  getSpellAttackBonus(
    character
  ) {

    if (
      !this.getSpellcastingAbility(
        character
      )
    ) {

      return null;

    }

    return this.proficiency(
      character.level
    ) +
    this.getSpellcastingModifier(
      character
    );

  },


  /* =======================================================
     LANGUAGES
     ======================================================= */

  getLanguages(character) {

    const race =
      this.getRace(character);

    if (!race) {

      return [];

    }

    return [
      ...(race.languages || [])
    ];

  },


  /* =======================================================
     TOOLS
     ======================================================= */

  getTools(character) {

    const background =
      typeof getBackgroundData ===
      "function"
        ? getBackgroundData(
            character.background
          )
        : null;

    const tools =
      background?.tools || [];

    return [
      ...new Set(tools)
    ];

  },


  /* =======================================================
     CLASS FEATURES
     ======================================================= */

  getFeatures(character) {

    if (
      typeof getClassFeatures !==
      "function"
    ) {

      return [];

    }

    return getClassFeatures(
      character.class,
      character.level
    );

  },


  /* =======================================================
     ASI LEVELS
     ======================================================= */

  getASILevels(character) {

    const className =
      character.class;

    const asiLevels = {

      Barbarian:
        [4, 8, 12, 16, 19],

      Bard:
        [4, 8, 12, 16, 19],

      Cleric:
        [4, 8, 12, 16, 19],

      Druid:
        [4, 8, 12, 16, 19],

      Fighter:
        [4, 6, 8, 12, 14, 16, 19],

      Monk:
        [4, 8, 12, 16, 19],

      Paladin:
        [4, 8, 12, 16, 19],

      Ranger:
        [4, 8, 12, 16, 19],

      Rogue:
        [4, 8, 10, 12, 16, 19],

      Sorcerer:
        [4, 8, 12, 16, 19],

      Warlock:
        [4, 8, 12, 16, 19],

      Wizard:
        [4, 8, 12, 16, 19]

    };

    return asiLevels[
      className
    ] || [];

  },


  /* =======================================================
     CHECK ASI AVAILABLE
     ======================================================= */

  hasASI(character) {

    return this
      .getASILevels(character)
      .includes(
        Number(character.level)
      );

  },


  /* =======================================================
     LEVEL VALIDATION
     ======================================================= */

  setLevel(
    character,
    level
  ) {

    level =
      Number(level);

    if (
      Number.isNaN(level)
    ) {

      return false;

    }

    if (
      level < 1 ||
      level > 20
    ) {

      return false;

    }

    character.level =
      level;

    return true;

  },


  /* =======================================================
     SUBCLASS AVAILABILITY
     ======================================================= */

  getSubclassLevel(
    character
  ) {

    const subclass =
      this.getSubclass(
        character
      );

    if (!subclass) {

      return null;

    }

    return subclass.level;

  },


  isSubclassAvailable(
    character
  ) {

    const subclass =
      this.getSubclass(
        character
      );

    if (!subclass) {

      return false;

    }

    return Number(
      character.level
    ) >=
    Number(
      subclass.level
    );

  },


  /* =======================================================
     CHARACTER SUMMARY
     ======================================================= */

  buildSummary(character) {

    const abilities =
      this.getFinalAbilities(
        character
      );

    return {

      name:
        character.name || "Unnamed",

      race:
        character.race || "—",

      subrace:
        character.subrace || "—",

      class:
        character.class || "—",

      subclass:
        character.subclass || "—",

      background:
        character.background || "—",

      level:
        Number(
          character.level
        ) || 1,

      proficiencyBonus:
        this.proficiency(
          character.level
        ),

      hitPoints:
        this.getHitPoints(
          character
        ),

      armorClass:
        this.getArmorClass(
          character
        ),

      initiative:
        this.getInitiative(
          character
        ),

      speed:
        this.getSpeed(
          character
        ),

      passivePerception:
        this.getPassivePerception(
          character
        ),

      abilities,

      savingThrows:
        this.getSavingThrows(
          character
        ),

      skills:
        this.getSkills(
          character
        ),

      features:
        this.getFeatures(
          character
        ),

      spellcastingAbility:
        this.getSpellcastingAbility(
          character
        ),

      spellSaveDC:
        this.getSpellSaveDC(
          character
        ),

      spellAttackBonus:
        this.getSpellAttackBonus(
          character
        ),

      languages:
        this.getLanguages(
          character
        ),

      tools:
        this.getTools(
          character
        ),

      asiAvailable:
        this.hasASI(
          character
        )

    };

  },


  /* =======================================================
     VALIDATION
     ======================================================= */

  validate(character) {

    const errors = [];


    if (
      !character.name ||
      !character.name.trim()
    ) {

      errors.push(
        "Character name is required."
      );

    }


    if (
      !character.race
    ) {

      errors.push(
        "Race is required."
      );

    }


    if (
      !character.class
    ) {

      errors.push(
        "Class is required."
      );

    }


    if (
      !character.background
    ) {

      errors.push(
        "Background is required."
      );

    }


    const level =
      Number(character.level);

    if (
      level < 1 ||
      level > 20
    ) {

      errors.push(
        "Character level must be between 1 and 20."
      );

    }


    Object.entries(
      character.abilities || {}
    ).forEach(
      ([ability, score]) => {

        if (
          Number(score) < 1 ||
          Number(score) > 30
        ) {

          errors.push(
            `${ability} must be between 1 and 30.`
          );

        }

      }
    );


    return {

      valid:
        errors.length === 0,

      errors

    };

  },


  /* =======================================================
     SERIALIZE
     ======================================================= */

  serialize(character) {

    return JSON.stringify(
      character,
      null,
      2
    );

  },


  /* =======================================================
     DESERIALIZE
     ======================================================= */

  deserialize(json) {

    try {

      const parsed =
        typeof json === "string"
          ? JSON.parse(json)
          : json;

      const base =
        this.create();

      return this.merge(
        base,
        parsed
      );

    } catch {

      return this.create();

    }

  },


  /* =======================================================
     DEEP MERGE
     ======================================================= */

  merge(
    original,
    incoming
  ) {

    const result =
      Array.isArray(original)
        ? [...original]
        : {
            ...original
          };


    Object.keys(
      incoming || {}
    ).forEach(
      key => {

        if (
          incoming[key] &&
          typeof incoming[key] ===
          "object" &&
          !Array.isArray(
            incoming[key]
          ) &&
          original[key] &&
          typeof original[key] ===
          "object"
        ) {

          result[key] =
            this.merge(
              original[key],
              incoming[key]
            );

        } else {

          result[key] =
            incoming[key];

        }

      }
    );


    return result;

  },


  /* =======================================================
     SAVE LOCAL CHARACTER
     ======================================================= */

  save(character) {

    localStorage.setItem(
      "soulTrialCharacter",
      this.serialize(
        character
      )
    );

    return true;

  },


  /* =======================================================
     LOAD LOCAL CHARACTER
     ======================================================= */

  load() {

    const saved =
      localStorage.getItem(
        "soulTrialCharacter"
      );

    if (!saved) {

      return null;

    }

    return this.deserialize(
      saved
    );

  },


  /* =======================================================
     DELETE LOCAL CHARACTER
     ======================================================= */

  clearSaved() {

    localStorage.removeItem(
      "soulTrialCharacter"
    );

  },


  /* =======================================================
     DOWNLOAD JSON
     ======================================================= */

  download(character) {

    const json =
      this.serialize(
        character
      );

    const blob =
      new Blob(
        [json],
        {
          type:
            "application/json"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    const filename =
      (
        character.name ||
        "Soul-Trial-Character"
      )
      .trim()
      .replace(
        /[^a-z0-9-_]+/gi,
        "-"
      );


    link.href =
      url;

    link.download =
      `${filename}.json`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );

  }

};


/* =========================================================
   EXPOSE ENGINE
   ========================================================= */

window.CharacterEngine =
  CharacterEngine;


/* =========================================================
   COMPATIBILITY HELPERS
   ========================================================= */

function buildCompleteCharacter(
  character
) {

  return CharacterEngine
    .buildSummary(
      character
    );

}


function getCharacterHitPoints(
  character
) {

  return CharacterEngine
    .getHitPoints(
      character
    );

}


function getCharacterArmorClass(
  character
) {

  return CharacterEngine
    .getArmorClass(
      character
    );

}


function getCharacterInitiative(
  character
) {

  return CharacterEngine
    .getInitiative(
      character
    );

}


function getCharacterProficiency(
  character
) {

  return CharacterEngine
    .proficiency(
      character.level
    );

}
