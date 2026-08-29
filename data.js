"use strict";

const questions = [

[
"You need to move something extremely heavy.",
"Your strength is tested before you have time to prepare.",
[
["Lift it yourself.",{STR:2,CON:1}],
["Find a clever way around the problem.",{INT:2}],
["Ask someone for help.",{CHA:2}],
["Study the situation first.",{WIS:2}]
]
],

[
"You notice something valuable has been left unattended.",
"Nobody would know if you took it.",
[
["Take it.",{DEX:2}],
["Leave it alone.",{WIS:2}],
["Investigate who it belongs to.",{INT:2,WIS:1}],
["Secure it somewhere safe.",{CON:1,WIS:1}]
]
],

[
"Someone challenges you to a competition.",
"The challenge is public, and everyone is watching.",
[
["Accept immediately.",{STR:2}],
["Study their strengths first.",{INT:2,WIS:1}],
["Focus on speed and technique.",{DEX:2}],
["Try to make it fun for everyone.",{CHA:2}]
]
],

[
"Your friend is making a terrible decision.",
"You know they may regret it.",
[
["Stop them.",{STR:1,CON:1}],
["Explain the consequences.",{INT:2}],
["Try to persuade them.",{CHA:2}],
["Let them make their own choice.",{WIS:2}]
]
],

[
"You suddenly find yourself lost.",
"You have no map and no familiar landmarks.",
[
["Keep moving until you find your way.",{CON:2}],
["Look for landmarks.",{WIS:2}],
["Figure out the terrain.",{INT:2}],
["Ask someone for directions.",{CHA:2}]
]
],

[
"You see someone being threatened.",
"The aggressor appears dangerous.",
[
["Step between them.",{STR:2,CON:1}],
["Look for an opening.",{DEX:2}],
["Figure out what's really happening.",{WIS:2}],
["Try talking the aggressor down.",{CHA:2}]
]
],

[
"You have failed at something important.",
"Everyone expects you to give up.",
[
["Try again immediately.",{CON:2}],
["Figure out exactly what went wrong.",{INT:2}],
["Ask someone experienced for advice.",{CHA:1,WIS:1}],
["Take time to think about it.",{WIS:2}]
]
],

[
"You discover a strange locked door.",
"Something behind it is clearly important.",
[
["Break it open.",{STR:2}],
["Search for a hidden mechanism.",{DEX:1,INT:1}],
["Look for clues.",{WIS:2}],
["Find someone who can open it.",{CHA:2}]
]
],

[
"You are given a difficult physical challenge.",
"Pain begins to set in halfway through.",
[
["Push yourself through it.",{CON:2}],
["Find the fastest technique.",{DEX:2}],
["Study how it works first.",{INT:2}],
["Ask someone to teach you.",{CHA:1,WIS:1}]
]
],

[
"Someone insults you publicly.",
"They clearly want you to lose control.",
[
["Ignore them.",{WIS:2}],
["Stand your ground.",{CON:1,CHA:1}],
["Respond with something clever.",{INT:1,CHA:1}],
["Challenge them.",{STR:2}]
]
],

[
"You have to learn something completely new.",
"You have very little time.",
[
["Practice until you master it.",{CON:2}],
["Read everything you can.",{INT:2}],
["Watch someone else do it.",{WIS:2}],
["Find a teacher.",{CHA:2}]
]
],

[
"Your group has no leader.",
"Everyone is looking toward you.",
[
["Take command.",{CHA:2}],
["Create a strategy.",{INT:2}],
["Wait and observe.",{WIS:2}],
["Volunteer to handle the dangerous part.",{STR:1,CON:1}]
]
],

[
"You hear something moving in the darkness.",
"You cannot see what is there.",
[
["Prepare to fight.",{STR:1,CON:1}],
["Move silently toward it.",{DEX:2}],
["Listen carefully.",{WIS:2}],
["Figure out what could be making the sound.",{INT:2}]
]
],

[
"Someone needs help but helping them could put you at risk.",
"No one would blame you for walking away.",
[
["Help anyway.",{CON:1,WIS:1}],
["Find a safer solution.",{INT:2}],
["Convince others to help.",{CHA:2}],
["Assess the danger first.",{WIS:2}]
]
],

[
"You are suddenly placed in a leadership position.",
"People are waiting for your first decision.",
[
["Lead from the front.",{STR:1,CHA:1}],
["Create a plan.",{INT:2}],
["Make sure everyone is heard.",{WIS:1,CHA:1}],
["Keep everyone moving.",{CHA:2}]
]
],

[
"You find yourself in a fight.",
"Your opponent is stronger than expected.",
[
["Fight head-on.",{STR:2}],
["Look for an opening.",{DEX:2}],
["Protect everyone.",{CON:1,WIS:1}],
["Look for a way to end the fight without killing.",{WIS:2}]
]
],

[
"You discover that someone has been lying to you.",
"The truth could change everything.",
[
["Confront them.",{STR:1,CHA:1}],
["Figure out why they lied.",{INT:1,WIS:1}],
["Pretend you believe them.",{DEX:1,CHA:1}],
["Give them another chance.",{WIS:2}]
]
],

[
"You are offered incredible power.",
"The source refuses to explain the cost.",
[
["Accept it.",{STR:1,CHA:1}],
["Study it first.",{INT:2}],
["Ask what it will cost.",{WIS:2}],
["Refuse if the price is too high.",{CON:1,WIS:1}]
]
],

[
"You awaken in another world.",
"Everything familiar is gone.",
[
["Find out how strong you are.",{STR:1,CON:1}],
["Learn everything about this world.",{INT:2}],
["Find people you can trust.",{CHA:2}],
["Observe before acting.",{WIS:2}]
]
],

[
"You are offered a position of great authority.",
"You could command people who once stood beside you.",
[
["Accept and lead.",{CHA:2}],
["Question whether you deserve it.",{WIS:2}],
["Learn everything required first.",{INT:2}],
["Accept only if you can protect others.",{STR:1,CON:1}]
]
],

[
"You discover an injured stranger.",
"They may be dangerous.",
[
["Help them anyway.",{WIS:2}],
["Keep your distance and observe.",{DEX:1,WIS:1}],
["Question them first.",{INT:2}],
["Protect them until they recover.",{CON:1,CHA:1}]
]
],

[
"You are trapped and there appears to be no escape.",
"The people with you are losing hope.",
[
["Break through the obstacle.",{STR:2}],
["Search for another route.",{DEX:1,WIS:1}],
["Analyze the environment.",{INT:2}],
["Keep everyone calm.",{CHA:2}]
]
],

[
"You learn that someone you trusted betrayed you.",
"You have the opportunity to retaliate.",
[
["Make them answer for it.",{STR:1,CON:1}],
["Find out their reason.",{INT:1,WIS:1}],
["Outmaneuver them.",{DEX:2}],
["Forgive them if they truly regret it.",{WIS:2}]
]
],

[
"Your new world offers you everything you ever wanted.",
"There is only one condition: you must leave your old life behind completely.",
[
["Take the opportunity.",{CHA:1,STR:1}],
["Question what you would lose.",{WIS:2}],
["Study the consequences.",{INT:2}],
["Refuse to abandon those you love.",{CON:1,CHA:1}]
]
],

[
"You find a wounded creature that others fear.",
"It watches you carefully, unsure whether you mean harm.",
[
["Approach it without fear.",{WIS:2}],
["Study its behavior first.",{INT:2}],
["Try to gain its trust.",{CHA:2}],
["Protect yourself while helping it.",{CON:1,DEX:1}]
]
],

[
"A powerful enemy offers you a chance to join them.",
"You would gain safety and power by betraying your companions.",
[
["Refuse and stand with your companions.",{CON:1,WIS:1}],
["Consider the offer carefully.",{INT:2}],
["Pretend to accept so you can learn their plans.",{DEX:2}],
["Try to convince the enemy to change sides.",{CHA:2}]
]
],

[
"You are given one chance to change a mistake from your mortal life.",
"The price is that someone else must bear its consequences.",
[
["Accept the burden yourself.",{CON:2}],
["Find another solution.",{INT:2}],
["Refuse to sacrifice another soul.",{WIS:2}],
["Convince someone to help you.",{CHA:2}]
]

]

];

const soulPaths = {

STR:{
name:"The Vanguard",
description:"Your soul responds to adversity with strength, courage and decisive action. You are most alive when something stands between you and victory.",
classes:["Fighter","Barbarian","Paladin"],
subclasses:{
Fighter:"Champion",
Barbarian:"Berserker",
Paladin:"Oath of Devotion"
},
background:"Soldier",
trait:"Unyielding",
traitDescription:"You refuse to back down when others would surrender.",
blessing:"Titan's Resolve",
blessingDescription:"Once per long rest, when reduced to 0 hit points, you may remain at 1 hit point instead."
},

DEX:{
name:"The Shadow",
description:"Your soul favors speed, precision, awareness and adaptability. You survive by recognizing the opening others overlook.",
classes:["Rogue","Ranger","Monk"],
subclasses:{
Rogue:"Thief",
Ranger:"Hunter",
Monk:"Way of the Open Hand"
},
background:"Criminal",
trait:"Quickstep",
traitDescription:"You instinctively recognize openings and react quickly.",
blessing:"Veilstep",
blessingDescription:"Once per short rest, you may move 10 feet as a reaction when targeted by an attack."
},

CON:{
name:"The Unbroken",
description:"Your defining strength is endurance. You keep moving when others fall and refuse to let hardship decide your fate.",
classes:["Barbarian","Fighter","Paladin"],
subclasses:{
Barbarian:"Berserker",
Fighter:"Champion",
Paladin:"Oath of Devotion"
},
background:"Outlander",
trait:"Iron Will",
traitDescription:"Pain and exhaustion rarely convince you to surrender.",
blessing:"Last Stand",
blessingDescription:"Once per long rest, when you fall below half your maximum hit points, gain temporary hit points equal to your level."
},

INT:{
name:"The Arcanist",
description:"Your mind is your greatest weapon. Knowledge, patterns, magic and understanding come naturally to you.",
classes:["Wizard","Artificer"],
subclasses:{
Wizard:"School of Evocation",
Artificer:"Alchemist"
},
background:"Sage",
trait:"Analytical Mind",
traitDescription:"You instinctively break complicated problems into patterns.",
blessing:"Arcane Insight",
blessingDescription:"Once per long rest, gain advantage on an Intelligence check involving Arcana, History or magical knowledge."
},

WIS:{
name:"The Seer",
description:"You notice what others miss and trust instinct, patience and judgment. You understand that knowledge is more than information.",
classes:["Cleric","Druid","Monk","Ranger"],
subclasses:{
Cleric:"Life Domain",
Druid:"Circle of the Land",
Monk:"Way of the Open Hand",
Ranger:"Hunter"
},
background:"Hermit",
trait:"Instinctive Awareness",
traitDescription:"Your instincts often notice danger before your conscious mind does.",
blessing:"Foresight",
blessingDescription:"Once per long rest, after seeing a d20 result, add your Wisdom modifier to the roll."
},

CHA:{
name:"The Sovereign",
description:"Your presence carries weight. People naturally notice, follow, remember or believe you.",
classes:["Bard","Sorcerer","Warlock","Paladin"],
subclasses:{
Bard:"College of Lore",
Sorcerer:"Draconic Bloodline",
Warlock:"The Fiend",
Paladin:"Oath of Devotion"
},
background:"Noble",
trait:"Commanding Presence",
traitDescription:"You possess a presence that is difficult for others to ignore.",
blessing:"Voice of the Soul",
blessingDescription:"Once per long rest, gain advantage on a Charisma check made to influence another creature."
}

};

const classData = {

Fighter:{
primary:"STR",
hitDie:10,
hp:10,
ac:16,
speed:30,
equipment:[
"Chain mail",
"Longsword and shield",
"Light crossbow and 20 bolts",
"Explorer's pack"
]
},

Barbarian:{
primary:"STR",
hitDie:12,
hp:12,
ac:14,
speed:30,
equipment:[
"Greataxe",
"Two handaxes",
"Explorer's pack",
"Javelins"
]
},

Paladin:{
primary:"STR",
hitDie:10,
hp:10,
ac:16,
speed:30,
equipment:[
"Longsword and shield",
"Five javelins",
"Priest's pack",
"Chain mail"
]
},

Rogue:{
primary:"DEX",
hitDie:8,
hp:8,
ac:14,
speed:30,
equipment:[
"Rapier",
"Shortbow and 20 arrows",
"Leather armor",
"Thieves' tools"
]
},

Ranger:{
primary:"DEX",
hitDie:10,
hp:10,
ac:14,
speed:30,
equipment:[
"Longbow and 20 arrows",
"Two shortswords",
"Leather armor",
"Explorer's pack"
]
},

Monk:{
primary:"DEX",
hitDie:8,
hp:8,
ac:14,
speed:30,
equipment:[
"Shortsword",
"10 darts",
"Explorer's pack",
"Monk's tools"
]
},

Wizard:{
primary:"INT",
hitDie:6,
hp:6,
ac:12,
speed:30,
equipment:[
"Quarterstaff",
"Light crossbow and 20 bolts",
"Component pouch",
"Scholar's pack"
]
},

Artificer:{
primary:"INT",
hitDie:8,
hp:8,
ac:14,
speed:30,
equipment:[
"Light hammer",
"Light crossbow and 20 bolts",
"Thieves' tools",
"Explorer's pack"
]
},

Cleric:{
primary:"WIS",
hitDie:8,
hp:8,
ac:16,
speed:30,
equipment:[
"Mace",
"Shield",
"Scale mail",
"Light crossbow and 20 bolts"
]
},

Druid:{
primary:"WIS",
hitDie:8,
hp:8,
ac:14,
speed:30,
equipment:[
"Wooden shield",
"Scimitar",
"Leather armor",
"Explorer's pack"
]
},

Bard:{
primary:"CHA",
hitDie:8,
hp:8,
ac:13,
speed:30,
equipment:[
"Rapier",
"Leather armor",
"Light crossbow and 20 bolts",
"Entertainer's pack"
]
},

Sorcerer:{
primary:"CHA",
hitDie:6,
hp:6,
ac:12,
speed:30,
equipment:[
"Light crossbow and 20 bolts",
"Component pouch",
"Explorer's pack",
"Two daggers"
]
},

Warlock:{
primary:"CHA",
hitDie:8,
hp:8,
ac:13,
speed:30,
equipment:[
"Light crossbow and 20 bolts",
"Leather armor",
"Arcane focus",
"Scholar's pack"
]
}

};

function determineRace(scores){

const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);

const primary=sorted[0][0];
const secondary=sorted[1][0];

if(primary==="STR"&&secondary==="CON")return"Half-Orc";
if(primary==="STR"&&secondary==="CHA")return"Dragonborn";
if(primary==="DEX"&&secondary==="CHA")return"Half-Elf";
if(primary==="DEX"&&secondary==="INT")return"Elf";
if(primary==="DEX"&&secondary==="CON")return"Halfling";
if(primary==="CON"&&secondary==="WIS")return"Dwarf";
if(primary==="CON"&&secondary==="STR")return"Half-Orc";
if(primary==="INT"&&secondary==="DEX")return"Gnome";
if(primary==="INT"&&secondary==="CHA")return"Tiefling";
if(primary==="WIS"&&secondary==="CON")return"Dwarf";
if(primary==="WIS"&&secondary==="CHA")return"Half-Elf";
if(primary==="CHA"&&secondary==="INT")return"Tiefling";
if(primary==="CHA"&&secondary==="STR")return"Dragonborn";

return"Human";
}
