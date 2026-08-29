/* =====================================================
   THE SOUL'S TRIAL
   CHARACTER DATA
===================================================== */

const classData = {

Barbarian:{
ability:"STR",
hitDie:12,
saves:["STR","CON"],
skills:[
"Animal Handling",
"Athletics",
"Intimidation",
"Nature",
"Perception",
"Survival"
],
subclasses:[
"Berserker",
"Totem Warrior"
],
features:{
1:["Rage","Unarmored Defense"],
2:["Reckless Attack","Danger Sense"],
3:["Primal Path"],
5:["Extra Attack","Fast Movement"],
7:["Feral Instinct"],
9:["Brutal Critical"],
11:["Relentless Rage"],
15:["Persistent Rage"],
20:["Primal Champion"]
},
awakening:{
name:"Soul-Forged Fury",
levels:{
1:"Once per long rest, when you enter Rage, your first melee hit deals +1d6 psychic damage.",
5:"The bonus becomes +2d6.",
11:"The bonus becomes +3d6.",
17:"The bonus becomes +4d6."
}
}
},

Bard:{
ability:"CHA",
hitDie:8,
saves:["DEX","CHA"],
skills:[
"Acrobatics","Animal Handling","Arcana","Athletics",
"History","Insight","Intimidation","Investigation",
"Medicine","Nature","Perception","Performance",
"Persuasion","Religion","Sleight of Hand",
"Stealth","Survival"
],
subclasses:[
"Lore",
"Valor"
],
features:{
1:["Spellcasting","Bardic Inspiration"],
2:["Jack of All Trades","Song of Rest"],
3:["Bard College","Expertise"],
5:["Font of Inspiration"],
6:["Countercharm"],
10:["Expertise","Magical Secrets"],
20:["Superior Inspiration"]
},
awakening:{
name:"Resonance of the Soul",
levels:{
1:"When you grant Bardic Inspiration, that creature also gains temporary HP equal to your Charisma modifier once per long rest.",
5:"You may use this twice per long rest.",
11:"Temporary HP becomes Charisma modifier + proficiency bonus.",
17:"You may use this three times per long rest."
}
}
},

Cleric:{
ability:"WIS",
hitDie:8,
saves:["WIS","CHA"],
skills:[
"History",
"Insight",
"Medicine",
"Persuasion",
"Religion"
],
subclasses:[
"Knowledge",
"Life",
"Light",
"Nature",
"Tempest",
"Trickery",
"War"
],
features:{
1:["Spellcasting","Divine Domain"],
2:["Channel Divinity"],
5:["Destroy Undead"],
8:["Divine Strike / Potent Spellcasting"],
10:["Divine Intervention"],
17:["Domain Feature"]
},
awakening:{
name:"Divine Echo",
levels:{
1:"Once per long rest, healing another creature restores +Wisdom modifier HP.",
5:"The bonus becomes 1d6 + Wisdom modifier.",
11:"The bonus becomes 2d6 + Wisdom modifier.",
17:"The bonus becomes 3d6 + Wisdom modifier."
}
}
},

Druid:{
ability:"WIS",
hitDie:8,
saves:["INT","WIS"],
skills:[
"Arcana",
"Animal Handling",
"Insight",
"Medicine",
"Nature",
"Perception",
"Religion",
"Survival"
],
subclasses:[
"Land",
"Moon"
],
features:{
1:["Druidic","Spellcasting"],
2:["Wild Shape","Druid Circle"],
4:["Wild Shape Improvement"],
5:["Wild Shape Improvement"],
8:["Wild Shape Improvement"],
18:["Timeless Body","Beast Spells"],
20:["Archdruid"]
},
awakening:{
name:"Primal Awakening",
levels:{
1:"Once per long rest, entering Wild Shape empowers your first successful attack for +Wisdom modifier damage.",
5:"The bonus becomes +1d6.",
11:"The bonus becomes +2d6.",
17:"The bonus becomes +3d6."
}
}
},

Fighter:{
ability:"STR",
hitDie:10,
saves:["STR","CON"],
skills:[
"Acrobatics",
"Animal Handling",
"Athletics",
"History",
"Insight",
"Intimidation",
"Perception",
"Survival"
],
subclasses:[
"Champion",
"Battle Master",
"Eldritch Knight"
],
features:{
1:["Fighting Style","Second Wind"],
2:["Action Surge"],
3:["Martial Archetype"],
5:["Extra Attack"],
9:["Indomitable"],
11:["Extra Attack"],
20:["Extra Attack"]
},
awakening:{
name:"War Soul",
levels:{
1:"Once per long rest, when you use Action Surge, your next weapon hit deals +2d6 force damage.",
5:"The bonus becomes +3d6.",
11:"The bonus becomes +4d6.",
17:"The bonus becomes +5d6."
}
}
},

Monk:{
ability:"DEX",
hitDie:8,
saves:["STR","DEX"],
skills:[
"Acrobatics",
"Athletics",
"History",
"Insight",
"Religion",
"Stealth"
],
subclasses:[
"Open Hand",
"Shadow",
"Four Elements"
],
features:{
1:["Unarmored Defense","Martial Arts"],
2:["Ki","Unarmored Movement"],
3:["Monastic Tradition"],
5:["Extra Attack","Stunning Strike"],
7:["Evasion","Stillness of Mind"],
10:["Purity of Body"],
18:["Empty Body"],
20:["Perfect Self"]
},
awakening:{
name:"Soul Step",
levels:{
1:"Once per short rest after Flurry of Blows, teleport 15 feet.",
5:"Teleport 20 feet.",
11:"Teleport 30 feet.",
17:"Teleport after any successful unarmed strike."
}
}
},

Paladin:{
ability:"STR",
hitDie:10,
saves:["WIS","CHA"],
skills:[
"Athletics",
"Insight",
"Intimidation",
"Medicine",
"Persuasion",
"Religion"
],
subclasses:[
"Devotion",
"Ancients",
"Vengeance"
],
features:{
1:["Divine Sense","Lay on Hands"],
2:["Fighting Style","Divine Smite"],
3:["Divine Health","Sacred Oath"],
5:["Extra Attack"],
6:["Aura of Protection"],
10:["Aura of Courage"],
11:["Improved Divine Smite"],
18:["Aura Improvement"],
20:["Sacred Oath Feature"]
},
awakening:{
name:"Soul Smite",
levels:{
1:"Once per long rest, a melee hit deals +2d8 radiant damage.",
5:"The bonus becomes +3d8.",
11:"The bonus becomes +4d8.",
17:"The bonus becomes +5d8."
}
}
},

Ranger:{
ability:"DEX",
hitDie:10,
saves:["STR","DEX"],
skills:[
"Animal Handling",
"Athletics",
"Insight",
"Investigation",
"Nature",
"Perception",
"Stealth",
"Survival"
],
subclasses:[
"Hunter",
"Beast Master"
],
features:{
1:["Favored Enemy","Natural Explorer"],
2:["Fighting Style","Spellcasting"],
3:["Ranger Archetype"],
5:["Extra Attack"],
8:["Land's Stride"],
10:["Hide in Plain Sight"],
14:["Vanish"],
18:["Feral Senses"],
20:["Foe Slayer"]
},
awakening:{
name:"Predator's Instinct",
levels:{
1:"Once per short rest, mark one creature as prey. Your next attack against it has advantage.",
5:"The mark lasts 10 minutes.",
11:"Your first two attacks each turn gain advantage.",
17:"The mark lasts 1 hour."
}
}
},

Rogue:{
ability:"DEX",
hitDie:8,
saves:["DEX","INT"],
skills:[
"Acrobatics",
"Athletics",
"Deception",
"Insight",
"Intimidation",
"Investigation",
"Perception",
"Performance",
"Persuasion",
"Sleight of Hand",
"Stealth"
],
subclasses:[
"Thief",
"Assassin",
"Arcane Trickster"
],
features:{
1:["Expertise","Sneak Attack","Thieves' Cant"],
2:["Cunning Action"],
3:["Roguish Archetype"],
5:["Uncanny Dodge"],
7:["Evasion"],
11:["Reliable Talent"],
14:["Blindsense"],
18:["Elusive"],
20:["Stroke of Luck"]
},
awakening:{
name:"Phantom Strike",
levels:{
1:"Once per short rest after Sneak Attack, become invisible until the start of your next turn.",
5:"Invisibility lasts until the end of your next turn.",
11:"Teleport 15 feet when becoming invisible.",
17:"Teleport 30 feet."
}
}
},

Sorcerer:{
ability:"CHA",
hitDie:6,
saves:["CON","CHA"],
skills:[
"Arcana",
"Deception",
"Insight",
"Intimidation",
"Persuasion",
"Religion"
],
subclasses:[
"Draconic Bloodline",
"Wild Magic"
],
features:{
1:["Spellcasting","Sorcerous Origin"],
2:["Font of Magic"],
3:["Metamagic"],
6:["Origin Feature"],
10:["Metamagic"],
18:["Origin Feature"],
20:["Sorcerous Restoration"]
},
awakening:{
name:"Soul Surge",
levels:{
1:"Once per long rest, add Charisma modifier to one spell damage or healing roll.",
5:"Use twice per long rest.",
11:"Add twice your Charisma modifier.",
17:"Use three times per long rest."
}
}
},

Warlock:{
ability:"CHA",
hitDie:8,
saves:["WIS","CHA"],
skills:[
"Arcana",
"Deception",
"History",
"Intimidation",
"Investigation",
"Nature",
"Religion"
],
subclasses:[
"Archfey",
"Fiend",
"Great Old One"
],
features:{
1:["Otherworldly Patron","Pact Magic"],
2:["Eldritch Invocations"],
3:["Pact Boon"],
5:["Eldritch Invocation"],
11:["Mystic Arcanum"],
20:["Eldritch Master"]
},
awakening:{
name:"Forbidden Resonance",
levels:{
1:"Once per long rest when you reduce a hostile creature to 0 HP, regain one Warlock spell slot.",
5:"Use twice per long rest.",
11:"Also gain temporary HP equal to Charisma modifier + proficiency bonus.",
17:"Use three times per long rest."
}
}
},

Wizard:{
ability:"INT",
hitDie:6,
saves:["INT","WIS"],
skills:[
"Arcana",
"History",
"Insight",
"Investigation",
"Medicine",
"Religion"
],
subclasses:[
"Abjuration",
"Conjuration",
"Divination",
"Enchantment",
"Evocation",
"Illusion",
"Necromancy",
"Transmutation"
],
features:{
1:["Spellcasting","Arcane Recovery"],
2:["Arcane Tradition"],
4:["Ability Score Improvement"],
5:["3rd-level Spells"],
10:["Arcane Tradition Feature"],
18:["Spell Mastery"],
20:["Signature Spells"]
},
awakening:{
name:"Perfect Calculation",
levels:{
1:"Once per long rest after seeing a d20 result, add Intelligence modifier.",
5:"Use twice per long rest.",
11:"Add twice Intelligence modifier.",
17:"Use three times per long rest."
}
}
},

Artificer:{
ability:"INT",
hitDie:8,
saves:["CON","INT"],
skills:[
"Arcana",
"History",
"Investigation",
"Medicine",
"Nature",
"Perception",
"Sleight of Hand"
],
subclasses:[
"Alchemist",
"Artillerist",
"Battle Smith"
],
features:{
1:["Magical Tinkering","Spellcasting"],
2:["Infuse Item"],
3:["Artificer Specialist"],
5:["Specialist Feature"],
6:["Tool Expertise"],
10:["Magic Item Adept"],
14:["Magic Item Savant"],
18:["Magic Item Master"],
20:["Soul of Artifice"]
},
awakening:{
name:"Soul Mechanism",
levels:{
1:"Once per long rest when an infused item would be destroyed, it instead survives with 1 HP.",
5:"It survives with HP equal to Intelligence modifier + proficiency bonus.",
11:"Use twice per long rest.",
17:"Use three times per long rest."
}
}
}

};


/* =====================================================
BACKGROUNDS
===================================================== */

const backgrounds=[
"Acolyte",
"Charlatan",
"Criminal",
"Entertainer",
"Folk Hero",
"Guild Artisan",
"Hermit",
"Noble",
"Outlander",
"Sage",
"Sailor",
"Soldier",
"Urchin"
];


/* =====================================================
SKILL → ABILITY
===================================================== */

const skillAbility={

Athletics:"STR",

Acrobatics:"DEX",
"Sleight of Hand":"DEX",
Stealth:"DEX",

Arcana:"INT",
History:"INT",
Investigation:"INT",
Nature:"INT",
Religion:"INT",

"Animal Handling":"WIS",
Insight:"WIS",
Medicine:"WIS",
Perception:"WIS",
Survival:"WIS",

Deception:"CHA",
Intimidation:"CHA",
Performance:"CHA",
Persuasion:"CHA"

};


/* =====================================================
PROFICIENCY
===================================================== */

function proficiencyBonus(level){

return Math.ceil(level / 4) + 1;

}


/* =====================================================
ABILITY MODIFIER
===================================================== */

function modifier(score){

return Math.floor((Number(score) - 10) / 2);

}


/* =====================================================
FEATURES
===================================================== */

function featuresFor(data,level){

let output=[];

Object.keys(data.features)
.map(Number)
.sort((a,b)=>a-b)
.forEach(requiredLevel=>{

if(requiredLevel<=level){

data.features[requiredLevel].forEach(feature=>{

output.push(
`Level ${requiredLevel}: ${feature}`
);

});

}

});

return output;

}


/* =====================================================
AWAKENING LEVEL
===================================================== */

function awakeningLevel(level){

if(level>=17)return 17;

if(level>=11)return 11;

if(level>=5)return 5;

return 1;

}
