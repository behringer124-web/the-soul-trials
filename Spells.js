/* =========================================================
   THE SOUL TRIAL
   D&D 5E SPELL ENGINE
   2014 RULES
   spells.js
   ========================================================= */

"use strict";


/* =========================================================
   SPELL DATABASE
   ========================================================= */

const SOUL_TRIAL_SPELLS = {

  /* =======================================================
     CANTRIPS
     ======================================================= */

  "Acid Splash": {
    level: 0,
    school: "Conjuration",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Blade Ward": {
    level: 0,
    school: "Abjuration",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "1 round"
  },

  "Chill Touch": {
    level: 0,
    school: "Necromancy",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "1 round"
  },

  "Dancing Lights": {
    level: 0,
    school: "Evocation",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Druidcraft": {
    level: 0,
    school: "Transmutation",
    classes: ["Druid"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Eldritch Blast": {
    level: 0,
    school: "Evocation",
    classes: ["Warlock"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Fire Bolt": {
    level: 0,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Friends": {
    level: 0,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Guidance": {
    level: 0,
    school: "Divination",
    classes: ["Cleric", "Druid"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Concentration, up to 1 minute"
  },

  "Light": {
    level: 0,
    school: "Evocation",
    classes: ["Bard", "Cleric", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, M",
    duration: "1 hour"
  },

  "Mage Hand": {
    level: 0,
    school: "Conjuration",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 minute"
  },

  "Mending": {
    level: 0,
    school: "Transmutation",
    classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Wizard"],
    castingTime: "1 minute",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Message": {
    level: 0,
    school: "Transmutation",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "1 round"
  },

  "Minor Illusion": {
    level: 0,
    school: "Illusion",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "S, M",
    duration: "1 minute"
  },

  "Poison Spray": {
    level: 0,
    school: "Conjuration",
    classes: ["Druid", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "10 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Prestidigitation": {
    level: 0,
    school: "Transmutation",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "10 feet",
    components: "V, S",
    duration: "Up to 1 hour"
  },

  "Produce Flame": {
    level: 0,
    school: "Conjuration",
    classes: ["Druid"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "10 minutes"
  },

  "Ray of Frost": {
    level: 0,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Resistance": {
    level: 0,
    school: "Abjuration",
    classes: ["Cleric", "Druid"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Sacred Flame": {
    level: 0,
    school: "Evocation",
    classes: ["Cleric"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Shillelagh": {
    level: 0,
    school: "Transmutation",
    classes: ["Druid"],
    castingTime: "1 bonus action",
    range: "Touch",
    components: "V, S, M",
    duration: "1 minute"
  },

  "Shocking Grasp": {
    level: 0,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Spare the Dying": {
    level: 0,
    school: "Necromancy",
    classes: ["Cleric"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Thaumaturgy": {
    level: 0,
    school: "Transmutation",
    classes: ["Cleric"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V",
    duration: "Up to 1 minute"
  },

  "Thorn Whip": {
    level: 0,
    school: "Transmutation",
    classes: ["Druid"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "True Strike": {
    level: 0,
    school: "Divination",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "S",
    duration: "Concentration, up to 1 round"
  },

  "Vicious Mockery": {
    level: 0,
    school: "Enchantment",
    classes: ["Bard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous"
  },


  /* =======================================================
     1ST LEVEL
     ======================================================= */

  "Bless": {
    level: 1,
    school: "Enchantment",
    classes: ["Cleric", "Paladin"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Burning Hands": {
    level: 1,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Charm Person": {
    level: 1,
    school: "Enchantment",
    classes: ["Bard", "Druid", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 hour"
  },

  "Command": {
    level: 1,
    school: "Enchantment",
    classes: ["Cleric", "Paladin"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "1 round"
  },

  "Cure Wounds": {
    level: 1,
    school: "Evocation",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Detect Magic": {
    level: 1,
    school: "Divination",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "Concentration, up to 10 minutes"
  },

  "Disguise Self": {
    level: 1,
    school: "Illusion",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "1 hour"
  },

  "Divine Favor": {
    level: 1,
    school: "Evocation",
    classes: ["Paladin"],
    castingTime: "1 bonus action",
    range: "Self",
    components: "V, S",
    duration: "Concentration, up to 1 minute"
  },

  "Entangle": {
    level: 1,
    school: "Conjuration",
    classes: ["Druid"],
    castingTime: "1 action",
    range: "90 feet",
    components: "V, S",
    duration: "Concentration, up to 1 minute"
  },

  "Faerie Fire": {
    level: 1,
    school: "Evocation",
    classes: ["Bard", "Druid"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Concentration, up to 1 minute"
  },

  "Feather Fall": {
    level: 1,
    school: "Transmutation",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 reaction",
    range: "60 feet",
    components: "V, M",
    duration: "1 minute"
  },

  "Find Familiar": {
    level: 1,
    school: "Conjuration",
    classes: ["Wizard"],
    castingTime: "1 hour",
    range: "10 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Healing Word": {
    level: 1,
    school: "Evocation",
    classes: ["Bard", "Cleric", "Druid"],
    castingTime: "1 bonus action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous"
  },

  "Hex": {
    level: 1,
    school: "Enchantment",
    classes: ["Warlock"],
    castingTime: "1 bonus action",
    range: "90 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Hunter's Mark": {
    level: 1,
    school: "Divination",
    classes: ["Ranger"],
    castingTime: "1 bonus action",
    range: "90 feet",
    components: "V",
    duration: "Concentration, up to 1 hour"
  },

  "Mage Armor": {
    level: 1,
    school: "Abjuration",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "8 hours"
  },

  "Magic Missile": {
    level: 1,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Protection from Evil and Good": {
    level: 1,
    school: "Abjuration",
    classes: ["Cleric", "Paladin", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 10 minutes"
  },

  "Shield": {
    level: 1,
    school: "Abjuration",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 reaction",
    range: "Self",
    components: "V, S",
    duration: "1 round"
  },

  "Sleep": {
    level: 1,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "90 feet",
    components: "V, S, M",
    duration: "1 minute"
  },

  "Thunderwave": {
    level: 1,
    school: "Evocation",
    classes: ["Bard", "Druid", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "Instantaneous"
  },


  /* =======================================================
     2ND LEVEL
     ======================================================= */

  "Aid": {
    level: 2,
    school: "Abjuration",
    classes: ["Bard", "Cleric", "Paladin"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "8 hours"
  },

  "Arcane Lock": {
    level: 2,
    school: "Abjuration",
    classes: ["Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Until dispelled"
  },

  "Barkskin": {
    level: 2,
    school: "Transmutation",
    classes: ["Druid", "Ranger"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Blur": {
    level: 2,
    school: "Illusion",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V",
    duration: "Concentration, up to 1 minute"
  },

  "Darkness": {
    level: 2,
    school: "Evocation",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, M",
    duration: "Concentration, up to 10 minutes"
  },

  "Darkvision": {
    level: 2,
    school: "Transmutation",
    classes: ["Druid", "Ranger", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "8 hours"
  },

  "Enhance Ability": {
    level: 2,
    school: "Transmutation",
    classes: ["Bard", "Cleric", "Druid", "Sorcerer"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Hold Person": {
    level: 2,
    school: "Enchantment",
    classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Invisibility": {
    level: 2,
    school: "Illusion",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Lesser Restoration": {
    level: 2,
    school: "Abjuration",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Ranger"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Misty Step": {
    level: 2,
    school: "Conjuration",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 bonus action",
    range: "Self",
    components: "V",
    duration: "Instantaneous"
  },

  "Moonbeam": {
    level: 2,
    school: "Evocation",
    classes: ["Druid"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Pass without Trace": {
    level: 2,
    school: "Abjuration",
    classes: ["Druid", "Ranger"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Scorching Ray": {
    level: 2,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Spiritual Weapon": {
    level: 2,
    school: "Evocation",
    classes: ["Cleric"],
    castingTime: "1 bonus action",
    range: "60 feet",
    components: "V, S",
    duration: "1 minute"
  },

  "Suggestion": {
    level: 2,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, M",
    duration: "Concentration, up to 8 hours"
  },


  /* =======================================================
     3RD LEVEL
     ======================================================= */

  "Counterspell": {
    level: 3,
    school: "Abjuration",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 reaction",
    range: "60 feet",
    components: "S",
    duration: "Instantaneous"
  },

  "Dispel Magic": {
    level: 3,
    school: "Abjuration",
    classes: ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Fireball": {
    level: 3,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "150 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Fly": {
    level: 3,
    school: "Transmutation",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 10 minutes"
  },

  "Haste": {
    level: 3,
    school: "Transmutation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Hypnotic Pattern": {
    level: 3,
    school: "Illusion",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Lightning Bolt": {
    level: 3,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Mass Healing Word": {
    level: 3,
    school: "Evocation",
    classes: ["Cleric"],
    castingTime: "1 bonus action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous"
  },

  "Revivify": {
    level: 3,
    school: "Necromancy",
    classes: ["Cleric", "Paladin"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Spirit Guardians": {
    level: 3,
    school: "Conjuration",
    classes: ["Cleric"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S, M",
    duration: "Concentration, up to 10 minutes"
  },

  "Water Breathing": {
    level: 3,
    school: "Transmutation",
    classes: ["Druid", "Ranger", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S, M",
    duration: "24 hours"
  },


  /* =======================================================
     4TH LEVEL
     ======================================================= */

  "Banishment": {
    level: 4,
    school: "Abjuration",
    classes: ["Cleric", "Paladin", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Dimension Door": {
    level: 4,
    school: "Conjuration",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "500 feet",
    components: "V",
    duration: "Instantaneous"
  },

  "Greater Invisibility": {
    level: 4,
    school: "Illusion",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "Concentration, up to 1 minute"
  },

  "Polymorph": {
    level: 4,
    school: "Transmutation",
    classes: ["Bard", "Druid", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },

  "Stoneskin": {
    level: 4,
    school: "Abjuration",
    classes: ["Druid", "Ranger", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Concentration, up to 1 hour"
  },


  /* =======================================================
     5TH LEVEL
     ======================================================= */

  "Animate Objects": {
    level: 5,
    school: "Transmutation",
    classes: ["Bard", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Concentration, up to 1 minute"
  },

  "Cone of Cold": {
    level: 5,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Flame Strike": {
    level: 5,
    school: "Evocation",
    classes: ["Cleric"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Hold Monster": {
    level: 5,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "90 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Raise Dead": {
    level: 5,
    school: "Necromancy",
    classes: ["Bard", "Cleric", "Paladin"],
    castingTime: "1 hour",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Scrying": {
    level: 5,
    school: "Divination",
    classes: ["Bard", "Cleric", "Druid", "Warlock", "Wizard"],
    castingTime: "10 minutes",
    range: "Self",
    components: "V, S, M",
    duration: "Concentration, up to 10 minutes"
  },


  /* =======================================================
     6TH LEVEL
     ======================================================= */

  "Chain Lightning": {
    level: 6,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "150 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Disintegrate": {
    level: 6,
    school: "Transmutation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S, M",
    duration: "Instantaneous"
  },

  "Heal": {
    level: 6,
    school: "Evocation",
    classes: ["Cleric", "Druid"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Sunbeam": {
    level: 6,
    school: "Evocation",
    classes: ["Cleric", "Druid", "Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },


  /* =======================================================
     7TH LEVEL
     ======================================================= */

  "Finger of Death": {
    level: 7,
    school: "Necromancy",
    classes: ["Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Fire Storm": {
    level: 7,
    school: "Evocation",
    classes: ["Cleric", "Druid", "Sorcerer"],
    castingTime: "1 action",
    range: "150 feet",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Plane Shift": {
    level: 7,
    school: "Conjuration",
    classes: ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous"
  },


  /* =======================================================
     8TH LEVEL
     ======================================================= */

  "Dominate Monster": {
    level: 8,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Concentration, up to 1 hour"
  },

  "Earthquake": {
    level: 8,
    school: "Evocation",
    classes: ["Cleric", "Druid", "Sorcerer"],
    castingTime: "1 action",
    range: "500 feet",
    components: "V, S, M",
    duration: "Concentration, up to 1 minute"
  },

  "Power Word Stun": {
    level: 8,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous"
  },


  /* =======================================================
     9TH LEVEL
     ======================================================= */

  "Foresight": {
    level: 9,
    school: "Divination",
    classes: ["Bard", "Druid", "Warlock", "Wizard"],
    castingTime: "1 minute",
    range: "Touch",
    components: "V, S, M",
    duration: "8 hours"
  },

  "Meteor Swarm": {
    level: 9,
    school: "Evocation",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "1 mile",
    components: "V, S",
    duration: "Instantaneous"
  },

  "Power Word Kill": {
    level: 9,
    school: "Enchantment",
    classes: ["Bard", "Sorcerer", "Warlock", "Wizard"],
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous"
  },

  "Wish": {
    level: 9,
    school: "Conjuration",
    classes: ["Sorcerer", "Wizard"],
    castingTime: "1 action",
    range: "Self",
    components: "V",
    duration: "Instantaneous"
  }

};


/* =========================================================
   SPELLCASTING PROGRESSION
   D&D 5E 2014
   ========================================================= */

const SPELLCASTING_TABLES = {

  full: {

    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [5, 4, 3, 3, 2, 1, 0, 0, 0],
    12: [5, 4, 3, 3, 2, 1, 0, 0, 0],
    13: [5, 4, 3, 3, 2, 1, 1, 0, 0],
    14: [5, 4, 3, 3, 2, 1, 1, 0, 0],
    15: [5, 4, 3, 3, 2, 1, 1, 1, 0],
    16: [5, 4, 3, 3, 2, 1, 1, 1, 0],
    17: [5, 4, 3, 3, 2, 1, 1, 1, 1],
    18: [5, 4, 3, 3, 3, 1, 1, 1, 1],
    19: [5, 4, 3, 3, 3, 2, 1, 1, 1],
    20: [5, 4, 3, 3, 3, 2, 1, 1, 1]

  },

  half: {

    1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    4: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    5: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    6: [0, 2, 0, 0, 0, 0, 0, 0, 0],
    7: [0, 2, 1, 0, 0, 0, 0, 0, 0],
    8: [0, 2, 2, 0, 0, 0, 0, 0, 0],
    9: [0, 2, 2, 0, 0, 0, 0, 0, 0],
    10: [0, 2, 2, 0, 0, 0, 0, 0, 0],
    11: [0, 2, 2, 1, 0, 0, 0, 0, 0],
    12: [0, 2, 2, 1, 0, 0, 0, 0, 0],
    13: [0, 2, 2, 1, 0, 0, 0, 0, 0],
    14: [0, 2, 2, 1, 0, 0, 0, 0, 0],
    15: [0, 2, 2, 2, 0, 0, 0, 0, 0],
    16: [0, 2, 2, 2, 0, 0, 0, 0, 0],
    17: [0, 2, 2, 3, 0, 0, 0, 0, 0],
    18: [0, 2, 2, 3, 0, 0, 0, 0, 0],
    19: [0, 2, 2, 3, 1, 0, 0, 0, 0],
    20: [0, 2, 2, 3, 1, 0, 0, 0, 0]

  }

};


/* =========================================================
   SPELLCASTING CLASS TYPES
   ========================================================= */

const SPELLCASTING_TYPES = {

  Bard: "full",

  Cleric: "full",

  Druid: "full",

  Sorcerer: "full",

  Wizard: "full",

  Paladin: "half",

  Ranger: "half",

  Warlock: "pact"

};


/* =========================================================
   SPELL ENGINE
   ========================================================= */

const SpellEngine = {


  getAll() {

    return SOUL_TRIAL_SPELLS;

  },


  getSpell(name) {

    return SOUL_TRIAL_SPELLS[name]
      || null;

  },


  getByLevel(level) {

    return Object.entries(
      SOUL_TRIAL_SPELLS
    )

      .filter(
        ([, spell]) =>
          spell.level === level
      )

      .map(
        ([name, spell]) => ({
          name,
          ...spell
        })
      );

  },


  getForClass(className) {

    return Object.entries(
      SOUL_TRIAL_SPELLS
    )

      .filter(
        ([, spell]) =>
          spell.classes.includes(
            className
          )
      )

      .map(
        ([name, spell]) => ({
          name,
          ...spell
        })
      );

  },


  getForClassAndLevel(
    className,
    level
  ) {

    return this.getForClass(
      className
    ).filter(
      spell =>
        spell.level === level
    );

  },


  getSpellSlots(
    className,
    characterLevel
  ) {

    const type =
      SPELLCASTING_TYPES[
        className
      ];

    if (!type) {

      return Array(9).fill(0);

    }

    const level =
      Math.max(
        1,
        Math.min(
          20,
          Number(characterLevel) || 1
        )
      );


    if (type === "pact") {

      return this.getWarlockSlots(
        level
      );

    }


    return [
      ...(SPELLCASTING_TABLES[type][
        level
      ] || Array(9).fill(0))
    ];

  },


  getWarlockSlots(level) {

    const slotsByLevel = {

      1: [1, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 2, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 2, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 2, 0, 0, 0, 0, 0, 0],
      11: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      12: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      13: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      14: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      15: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      16: [0, 0, 3, 0, 0, 0, 0, 0, 0],
      17: [0, 0, 4, 0, 0, 0, 0, 0, 0],
      18: [0, 0, 4, 0, 0, 0, 0, 0, 0],
      19: [0, 0, 4, 0, 0, 0, 0, 0, 0],
      20: [0, 0, 4, 0, 0, 0, 0, 0, 0]

    };

    return [
      ...(slotsByLevel[level] ||
        Array(9).fill(0))
    ];

  },


  getHighestSpellLevel(
    className,
    characterLevel
  ) {

    const slots =
      this.getSpellSlots(
        className,
        characterLevel
      );

    let highest = 0;

    slots.forEach(
      (amount, index) => {

        if (amount > 0) {

          highest =
            index + 1;

        }

      }
    );

    return highest;

  },


  getCantrips(
    className
  ) {

    return this
      .getForClassAndLevel(
        className,
        0
      );

  },


  getPreparedSpellLimit(
    character
  ) {

    const className =
      character.class;

    const level =
      Number(
        character.level
      ) || 1;


    const abilityMap = {

      Cleric: "WIS",
      Druid: "WIS",
      Wizard: "INT"

    };


    if (
      abilityMap[className]
    ) {

      const ability =
        abilityMap[className];

      const score =
        CharacterEngine
          ?.getFinalAbilities
          ? CharacterEngine
              .getFinalAbilities(
                character
              )[ability]
          : character.abilities[
              ability
            ];

      const modifier =
        Math.floor(
          (score - 10) / 2
        );

      return Math.max(
        1,
        modifier + level
      );

    }


    return null;

  },


  canChooseSpell(
    character,
    spellName
  ) {

    const spell =
      this.getSpell(
        spellName
      );

    if (!spell) {

      return false;

    }

    if (
      !spell.classes.includes(
        character.class
      )
    ) {

      return false;

    }

    const highest =
      this.getHighestSpellLevel(
        character.class,
        character.level
      );

    return spell.level <= highest;

  },


  addSpell(
    character,
    spellName
  ) {

    if (
      !this.canChooseSpell(
        character,
        spellName
      )
    ) {

      return false;

    }

    const spell =
      this.getSpell(
        spellName
      );

    if (
      spell.level === 0
    ) {

      if (
        !character.spells.cantrips
          .includes(
            spellName
          )
      ) {

        character.spells.cantrips
          .push(
            spellName
          );

      }

      return true;

    }


    if (
      !character.spells.known
        .includes(
          spellName
        )
    ) {

      character.spells.known
        .push(
          spellName
        );

    }

    return true;

  },


  removeSpell(
    character,
    spellName
  ) {

    character.spells.cantrips =
      character.spells.cantrips
        .filter(
          name =>
            name !== spellName
        );

    character.spells.known =
      character.spells.known
        .filter(
          name =>
            name !== spellName
        );

    character.spells.prepared =
      character.spells.prepared
        .filter(
          name =>
            name !== spellName
        );

  },


  togglePrepared(
    character,
    spellName
  ) {

    const index =
      character.spells.prepared
        .indexOf(
          spellName
        );

    if (index >= 0) {

      character.spells.prepared
        .splice(
          index,
          1
        );

      return false;

    }


    const spell =
      this.getSpell(
        spellName
      );

    if (!spell) {

      return false;

    }


    const limit =
      this.getPreparedSpellLimit(
        character
      );

    if (
      limit !== null &&
      character.spells.prepared
        .length >= limit
    ) {

      return false;

    }


    character.spells.prepared
      .push(
        spellName
      );

    return true;

  }

};


/* =========================================================
   SPELL UI
   ========================================================= */

function renderSpellDatabase() {

  const container =
    document.querySelector(
      "#spellDatabaseArea"
    );

  if (!container) {

    return;

  }

  const character =
    window.SoulTrial
      ?.getState()
      ?.character;

  if (!character) {

    return;

  }

  const spells =
    SpellEngine.getForClass(
      character.class
    );


  if (!spells.length) {

    container.innerHTML = `

      <div class="card">

        <p>
          No spellcasting options are
          available for this class.
        </p>

      </div>

    `;

    return;

  }


  const highest =
    SpellEngine.getHighestSpellLevel(
      character.class,
      character.level
    );


  container.innerHTML = `

    <div class="spell-header">

      <h3>
        Available Spells
      </h3>

      <p>
        Highest available spell level:
        <strong>
          ${
            highest === 0
              ? "Cantrips only"
              : highest
          }
        </strong>
      </p>

    </div>

    <div
      class="spell-filters"
    >

      <input
        id="spellSearch"
        type="search"
        placeholder="Search spells..."
      >

      <select
        id="spellLevelFilter"
      >

        <option value="all">
          All Levels
        </option>

        <option value="0">
          Cantrips
        </option>

        ${Array
          .from(
            {
              length:
                highest
            },
            (_, i) =>
              `<option value="${i + 1}">
                Level ${i + 1}
              </option>`
          )
          .join("")}

      </select>

    </div>

    <div
      id="spellList"
      class="choice-grid"
    ></div>

  `;


  renderSpellList(
    spells
  );


  const search =
    document.querySelector(
      "#spellSearch"
    );

  const levelFilter =
    document.querySelector(
      "#spellLevelFilter"
    );


  search?.addEventListener(
    "input",
    filterSpells
  );

  levelFilter?.addEventListener(
    "change",
    filterSpells
  );

}


function filterSpells() {

  const character =
    window.SoulTrial
      ?.getState()
      ?.character;

  if (!character) {

    return;

  }

  const search =
    (
      document.querySelector(
        "#spellSearch"
      )?.value ||
      ""
    )
    .toLowerCase();


  const level =
    document.querySelector(
      "#spellLevelFilter"
    )?.value ||
    "all";


  let spells =
    SpellEngine.getForClass(
      character.class
    );


  if (level !== "all") {

    spells =
      spells.filter(
        spell =>
          spell.level ===
          Number(level)
      );

  }


  if (search) {

    spells =
      spells.filter(
        spell =>
          spell.name
            .toLowerCase()
            .includes(
              search
            ) ||
          spell.school
            .toLowerCase()
            .includes(
              search
            )
      );

  }


  renderSpellList(
    spells
  );

}


function renderSpellList(
  spells
) {

  const container =
    document.querySelector(
      "#spellList"
    );

  if (!container) {

    return;

  }

  const character =
    window.SoulTrial
      ?.getState()
      ?.character;


  container.innerHTML = "";


  spells.forEach(
    spell => {

      const known =
        character.spells
          .known
          .includes(
            spell.name
          );

      const cantrip =
        character.spells
          .cantrips
          .includes(
            spell.name
          );

      const prepared =
        character.spells
          .prepared
          .includes(
            spell.name
          );


      const selected =
        known ||
        cantrip;


      const card =
        document.createElement(
          "div"
        );

      card.className =
        `choice spell-card ${
          selected
            ? "selected"
            : ""
        }`;


      card.innerHTML = `

        <div>

          <h3>
            ${escapeHTML(
              spell.name
            )}
          </h3>

          <span class="tag">
            ${
              spell.level === 0
                ? "Cantrip"
                : `Level ${spell.level}`
            }
          </span>

          <span class="tag">
            ${escapeHTML(
              spell.school
            )}
          </span>

        </div>

        <p>
          Casting Time:
          ${escapeHTML(
            spell.castingTime
          )}
        </p>

        <p>
          Range:
          ${escapeHTML(
            spell.range
          )}
        </p>

        <p>
          Duration:
          ${escapeHTML(
            spell.duration
          )}
        </p>

        <div>

          ${
            selected
              ? `
                <button
                  class="btn btn-secondary"
                  data-remove-spell="${escapeHTML(
                    spell.name
                  )}"
                >
                  Remove
                </button>
              `
              : `
                <button
                  class="btn btn-primary"
                  data-add-spell="${escapeHTML(
                    spell.name
                  )}"
                >
                  Choose
                </button>
              `
          }

          ${
            selected &&
            spell.level > 0 &&
            (
              character.class ===
              "Cleric" ||
              character.class ===
              "Druid" ||
              character.class ===
              "Wizard"
            )
              ? `
                <button
                  class="btn ${
                    prepared
                      ? "btn-primary"
                      : "btn-secondary"
                  }"
                  data-prepare-spell="${escapeHTML(
                    spell.name
                  )}"
                >
                  ${
                    prepared
                      ? "Prepared"
                      : "Prepare"
                  }
                </button>
              `
              : ""
          }

        </div>

      `;


      container.appendChild(
        card
      );

    }
  );


  container
    .querySelectorAll(
      "[data-add-spell]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const name =
              button.dataset
                .addSpell;

            SpellEngine.addSpell(
              character,
              name
            );

            renderSpellList(
              spells
            );

          }
        );

      }
    );


  container
    .querySelectorAll(
      "[data-remove-spell]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            SpellEngine.removeSpell(
              character,
              button.dataset
                .removeSpell
            );

            renderSpellList(
              spells
            );

          }
        );

      }
    );


  container
    .querySelectorAll(
      "[data-prepare-spell]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            SpellEngine.togglePrepared(
              character,
              button.dataset
                .prepareSpell
            );

            renderSpellList(
              spells
            );

          }
        );

      }
    );

}


/* =========================================================
   PUBLIC SPELL API
   ========================================================= */

window.SoulTrialSpells = {

  database:
    SOUL_TRIAL_SPELLS,

  engine:
    SpellEngine,

  render:
    renderSpellDatabase

};
