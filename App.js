/* =========================================================
   THE SOUL TRIAL
   app.js
   Isekai D&D Character Awakening System
   2014 D&D Rules Foundation
   ========================================================= */

"use strict";

/* =========================================================
   SOUL TRIAL QUESTIONS
   THESE QUESTIONS ARE LOCKED
   ========================================================= */

const questions = [

[
"You need to move something extremely heavy.",
[
["Lift it yourself.",{STR:2}],
["Find a clever way around the problem.",{INT:2}],
["Ask someone for help.",{CHA:2}],
["Study the situation first.",{WIS:2}]
]
],

[
"You notice something valuable has been left unattended.",
[
["Take it.",{DEX:1,CHA:1}],
["Leave it alone.",{WIS:2}],
["Investigate who it belongs to.",{INT:2}],
["Secure it somewhere safe.",{CON:1,WIS:1}]
]
],

[
"Someone challenges you to a competition.",
[
["Accept immediately.",{STR:2}],
["Study their strengths first.",{INT:2}],
["Focus on speed and technique.",{DEX:2}],
["Try to make it fun for everyone.",{CHA:2}]
]
],

[
"Your friend is making a terrible decision.",
[
["Stop them.",{STR:1,CON:1}],
["Explain the consequences.",{INT:2}],
["Try to persuade them.",{CHA:2}],
["Let them make their own choice.",{WIS:2}]
]
],

[
"You suddenly find yourself lost.",
[
["Keep moving until you find your way.",{CON:2}],
["Look for landmarks.",{WIS:2}],
["Figure out the map.",{INT:2}],
["Ask someone for directions.",{CHA:2}]
]
],

[
"You see someone being threatened.",
[
["Step between them.",{STR:2}],
["Look for an opening.",{DEX:2}],
["Figure out what's really happening.",{WIS:2}],
["Try talking the aggressor down.",{CHA:2}]
]
],

[
"You have failed at something important.",
[
["Try again immediately.",{CON:2}],
["Figure out exactly what went wrong.",{INT:2}],
["Ask someone experienced for advice.",{CHA:1,WIS:1}],
["Take time to think about it.",{WIS:2}]
]
],

[
"You discover a strange locked door.",
[
["Break it open.",{STR:2}],
["Search for a hidden mechanism.",{DEX:1,INT:1}],
["Look for clues.",{WIS:2}],
["Try to find someone who can open it.",{CHA:2}]
]
],

[
"You are given a difficult physical challenge.",
[
["Push yourself through it.",{CON:2}],
["Find the fastest technique.",{DEX:2}],
["Study how it works first.",{INT:2}],
["Ask someone to teach you.",{CHA:1,WIS:1}]
]
],

[
"Someone insults you publicly.",
[
["Ignore them.",{WIS:2}],
["Stand your ground.",{CON:1,CHA:1}],
["Respond with something clever.",{INT:1,CHA:1}],
["Challenge them.",{STR:2}]
]
],

[
"You have to learn something completely new.",
[
["Practice until you master it.",{CON:2}],
["Read everything you can.",{INT:2}],
["Watch someone else do it.",{WIS:2}],
["Find a teacher.",{CHA:2}]
]
],

[
"Your group has no leader.",
[
["Take command.",{CHA:2}],
["Create a strategy.",{INT:2}],
["Wait and observe.",{WIS:2}],
["Volunteer to handle the dangerous part.",{STR:1,CON:1}]
]
],

[
"You suddenly hear something moving in the darkness.",
[
["Prepare to fight.",{STR:1,CON:1}],
["Move silently toward it.",{DEX:2}],
["Listen carefully.",{WIS:2}],
["Figure out what could be making the sound.",{INT:2}]
]
],

[
"Someone needs help but helping them could put you at risk.",
[
["Help anyway.",{CON:1,WIS:1}],
["Find a safer solution.",{INT:2}],
["Convince others to help.",{CHA:2}],
["Assess the danger first.",{WIS:2}]
]
],

[
"You are suddenly placed in a leadership position.",
[
["Lead from the front.",{STR:1,CHA:1}],
["Create a plan.",{INT:2}],
["Make sure everyone is heard.",{WIS:1,CHA:1}],
["Keep everyone moving.",{CHA:2}]
]
],

[
"You find yourself in a fight.",
[
["Fight head-on.",{STR:2}],
["Look for an opening.",{DEX:2}],
["Protect everyone.",{CON:1,WIS:1}],
["Look for a way to end the fight without killing.",{WIS:2}]
]
],

[
"You discover that someone has been lying to you.",
[
["Confront them.",{STR:1,CHA:1}],
["Figure out why they lied.",{INT:1,WIS:1}],
["Pretend you believe them.",{DEX:1,CHA:1}],
["Give them another chance.",{WIS:2}]
]
],

[
"You are offered incredible power.",
[
["Accept it.",{STR:1,CHA:1}],
["Study it first.",{INT:2}],
["Ask what it will cost.",{WIS:2}],
["Refuse if the price is too high.",{CON:1,WIS:1}]
]
],

[
"You awaken in another world.",
[
["Find out how strong you are.",{STR:1,CON:1}],
["Learn everything about this world.",{INT:2}],
["Find people you can trust.",{CHA:2}],
["Observe before acting.",{WIS:2}]
]
]

];


/* =========================================================
   D&D 2014 CLASS DEFINITIONS
   ========================================================= */

const classes = {

Barbarian:{
primary:["STR","CON"],
secondary:["DEX"],
subclasses:{
default:"Path of the Berserker",
alternatives:[
"Path of the Totem Warrior"
]
},
skills:[
"Athletics",
"Intimidation",
"Survival",
"Perception"
]
},

Bard:{
primary:["CHA"],
secondary:["DEX","WIS"],
subclasses:{
default:"College of Lore",
alternatives:[
"College of Valor"
]
},
skills:[
"Persuasion",
"Performance",
"Insight",
"Deception"
]
},

Cleric:{
primary:["WIS"],
secondary:["CON","CHA"],
subclasses:{
default:"Life Domain",
alternatives:[
"Light Domain",
"Tempest Domain",
"War Domain"
]
},
skills:[
"Insight",
"Medicine",
"Religion",
"Persuasion"
]
},

Druid:{
primary:["WIS"],
secondary:["CON","INT"],
subclasses:{
default:"Circle of the Land",
alternatives:[
"Circle of the Moon"
]
},
skills:[
"Nature",
"Animal Handling",
"Perception",
"Survival"
]
},

Fighter:{
primary:["STR","CON"],
secondary:["DEX","WIS"],
subclasses:{
default:"Champion",
alternatives:[
"Battle Master",
"Eldritch Knight"
]
},
skills:[
"Athletics",
"Perception",
"Survival",
"Intimidation"
]
},

Monk:{
primary:["DEX","WIS"],
secondary:["CON"],
subclasses:{
default:"Way of the Open Hand",
alternatives:[
"Way of Shadow",
"Way of the Four Elements"
]
},
skills:[
"Acrobatics",
"Stealth",
"Insight",
"Perception"
]
},

Paladin:{
primary:["STR","CHA"],
secondary:["CON","WIS"],
subclasses:{
default:"Oath of Devotion",
alternatives:[
"Oath of the Ancients",
"Oath of Vengeance"
]
},
skills:[
"Athletics",
"Insight",
"Persuasion",
"Intimidation"
]
},

Ranger:{
primary:["DEX","WIS"],
secondary:["CON"],
subclasses:{
default:"Hunter",
alternatives:[
"Beast Master"
]
},
skills:[
"Survival",
"Perception",
"Stealth",
"Animal Handling"
]
},

Rogue:{
primary:["DEX"],
secondary:["INT","CHA"],
subclasses:{
default:"Thief",
alternatives:[
"Assassin",
"Arcane Trickster"
]
},
skills:[
"Stealth",
"Acrobatics",
"Investigation",
"Deception"
]
},

Sorcerer:{
primary:["CHA"],
secondary:["CON"],
subclasses:{
default:"Draconic Bloodline",
alternatives:[
"Wild Magic"
]
},
skills:[
"Persuasion",
"Arcana",
"Deception",
"Insight"
]
},

Warlock:{
primary:["CHA"],
secondary:["CON","DEX"],
subclasses:{
default:"The Fiend",
alternatives:[
"The Archfey",
"The Great Old One"
]
},
skills:[
"Arcana",
"Deception",
"Intimidation",
"Investigation"
]
},

Wizard:{
primary:["INT"],
secondary:["DEX","WIS"],
subclasses:{
default:"School of Evocation",
alternatives:[
"School of Abjuration",
"School of Divination",
"School of Illusion"
]
},
skills:[
"Arcana",
"Investigation",
"History",
"Religion"
]
}

};


/* =========================================================
   BACKGROUNDS
   ========================================================= */

const backgrounds = {

Acolyte:{
skills:["Insight","Religion"],
feature:"Shelter of the Faithful"
},

Charlatan:{
skills:["Deception","Sleight of Hand"],
feature:"False Identity"
},

Criminal:{
skills:["Deception","Stealth"],
feature:"Criminal Contact"
},

Entertainer:{
skills:["Acrobatics","Performance"],
feature:"By Popular Demand"
},

FolkHero:{
skills:["Animal Handling","Survival"],
feature:"Rustic Hospitality"
},

GuildArtisan:{
skills:["Insight","Persuasion"],
feature:"Guild Membership"
},

Hermit:{
skills:["Medicine","Religion"],
feature:"Discovery"
},

Noble:{
skills:["History","Persuasion"],
feature:"Position of Privilege"
},

Outlander:{
skills:["Athletics","Survival"],
feature:"Wanderer"
},

Sage:{
skills:["Arcana","History"],
feature:"Researcher"
},

Sailor:{
skills:["Athletics","Perception"],
feature:"Ship's Passage"
},

Soldier:{
skills:["Athletics","Intimidation"],
feature:"Military Rank"
},

Urchin:{
skills:["Sleight of Hand","Stealth"],
feature:"City Secrets"
}

};


/* =========================================================
   SOUL SKILLS
   ORIGINAL HOME BREW SYSTEM
   ========================================================= */

const soulSkills = {

STR:{
name:"Unbreakable Will",
description:
"When you would be reduced to 0 hit points, your soul refuses to yield. Once per long rest, you may remain at 1 hit point instead."
},

DEX:{
name:"Instinctive Evasion",
description:
"Your body sometimes moves before your mind understands the danger. Once per long rest, you may use your reaction to gain advantage on a Dexterity saving throw."
},

CON:{
name:"Second Wind of the Soul",
description:
"Your determination manifests as unnatural endurance. Once per long rest, as a bonus action, regain hit points equal to your proficiency bonus + Constitution modifier."
},

INT:{
name:"Worldborn Insight",
description:
"Your knowledge from another world occasionally reveals an unexpected solution. Once per long rest, you may gain advantage on one Intelligence check after seeing the result of the roll."
},

WIS:{
name:"Soul's Warning",
description:
"Something within you senses danger before you consciously recognize it. Once per long rest, you may gain advantage on one Wisdom saving throw or Wisdom ability check."
},

CHA:{
name:"Heroic Presence",
description:
"Something about your soul commands attention. Once per long rest, you may gain advantage on one Charisma ability check or saving throw."
}

};


/* =========================================================
   GAME STATE
   ========================================================= */

const soulTrial = {

question:0,

scores:{
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
},

answers:[],

character:null,

started:false

};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(id){

return document.getElementById(id);

}


function create(tag,className,text){

const element=document.createElement(tag);

if(className)
element.className=className;

if(text!==undefined)
element.textContent=text;

return element;

}


/* =========================================================
   START SCREEN
   ========================================================= */

function startSoulTrial(){

soulTrial.question=0;

soulTrial.answers=[];

Object.keys(soulTrial.scores).forEach(
stat=>{
soulTrial.scores[stat]=0;
}
);

soulTrial.character=null;

soulTrial.started=true;

renderQuestion();

}


/* =========================================================
   QUESTION SCREEN
   ========================================================= */

function renderQuestion(){

const app=$("app");

if(!app)
return;

app.innerHTML="";

const screen=create(
"section",
"soul-trial-screen"
);

const content=create(
"div",
"soul-trial-content"
);

const label=create(
"span",
"eyebrow",
`SOUL TRIAL — ${soulTrial.question+1} / ${questions.length}`
);

const progress=create(
"div",
"soul-progress"
);

const progressBar=create(
"div",
"soul-progress-bar"
);

progressBar.style.width=
`${(soulTrial.question/questions.length)*100}%`;

progress.appendChild(progressBar);

const question=create(
"h1",
"trial-question",
questions[soulTrial.question][0]
);

const answers=create(
"div",
"trial-answers"
);

questions[soulTrial.question][1]
.forEach((answer,index)=>{

const button=create(
"button",
"trial-answer"
);

const letter=create(
"span",
"trial-letter",
String.fromCharCode(65+index)
);

const text=create(
"span",
"trial-answer-text",
answer[0]
);

button.appendChild(letter);

button.appendChild(text);

button.onclick=()=>{
chooseAnswer(index);
};

answers.appendChild(button);

});

content.appendChild(label);

content.appendChild(progress);

content.appendChild(question);

content.appendChild(answers);

screen.appendChild(content);

app.appendChild(screen);

}


/* =========================================================
   ANSWER
   ========================================================= */

function chooseAnswer(index){

const question=
questions[soulTrial.question];

const answer=
question[1][index];

soulTrial.answers.push(index);

Object.entries(answer[1]).forEach(
([stat,value])=>{
soulTrial.scores[stat]+=value;
}
);

soulTrial.question++;

if(
soulTrial.question>=questions.length
){

finishTrial();

}else{

renderQuestion();

}

}


/* =========================================================
   DETERMINE ABILITY SCORES
   ========================================================= */

function generateAbilityScores(){

const raw=
Object.values(
soulTrial.scores
);

const sorted=[...raw].sort(
(a,b)=>b-a
);

/*
Standard array:
15,14,13,12,10,8

The strongest trial traits receive
the strongest D&D scores.
*/

const standard=[
15,
14,
13,
12,
10,
8
];

const result={};

const stats=[
"STR",
"DEX",
"CON",
"INT",
"WIS",
"CHA"
];

const ranked=stats
.map(stat=>({
stat,
score:soulTrial.scores[stat]
}))
.sort(
(a,b)=>b.score-a.score
);

ranked.forEach(
(item,index)=>{
result[item.stat]=standard[index];
}
);

return result;

}


/* =========================================================
   DETERMINE CLASS
   ========================================================= */

function determineClass(scores){

let bestClass="Fighter";

let bestScore=-Infinity;

Object.entries(classes)
.forEach(
([className,data])=>{

let score=0;

data.primary.forEach(
stat=>{
score+=scores[stat]*3;
}
);

data.secondary.forEach(
stat=>{
score+=scores[stat];
}
);

/*
Small personality bonus from original answers.
*/

if(
className==="Paladin" &&
soulTrial.scores.CHA>=
soulTrial.scores.STR
){

score+=3;

}

if(
className==="Rogue" &&
soulTrial.scores.DEX>=
soulTrial.scores.INT
){

score+=2;

}

if(
className==="Wizard" &&
soulTrial.scores.INT>=
soulTrial.scores.WIS
){

score+=3;

}

if(
className==="Cleric" &&
soulTrial.scores.WIS>=
soulTrial.scores.INT
){

score+=2;

}

if(
className==="Barbarian" &&
soulTrial.scores.STR>=
soulTrial.scores.DEX
){

score+=2;

}

if(score>bestScore){

bestScore=score;

bestClass=className;

}

});

return bestClass;

}


/* =========================================================
   DETERMINE SUBCLASS
   ========================================================= */

function determineSubclass(
className,
scores
){

const data=classes[className];

if(!data)
return null;

const options=data.subclasses.alternatives;

if(!options.length)
return data.subclasses.default;

/*
Subclass choice is influenced by the
secondary stat.
*/

const highestSecondary=
data.secondary
.map(stat=>({
stat,
score:scores[stat]
}))
.sort(
(a,b)=>b.score-a.score
)[0];

if(
highestSecondary &&
highestSecondary.stat==="DEX" &&
options.includes("Assassin")
){

return "Assassin";

}

if(
highestSecondary &&
highestSecondary.stat==="WIS" &&
options.includes("Oath of the Ancients")
){

return "Oath of the Ancients";

}

if(
highestSecondary &&
highestSecondary.stat==="INT" &&
options.includes("Eldritch Knight")
){

return "Eldritch Knight";

}

return data.subclasses.default;

}


/* =========================================================
   DETERMINE BACKGROUND
   ========================================================= */

function determineBackground(){

const scores=soulTrial.scores;

if(
scores.CHA>=scores.STR &&
scores.CHA>=scores.INT
){

return "Noble";

}

if(
scores.INT>=scores.WIS &&
scores.INT>=scores.CHA
){

return "Sage";

}

if(
scores.DEX>=scores.STR &&
scores.DEX>=scores.CON
){

return "Criminal";

}

if(
scores.WIS>=scores.INT &&
scores.WIS>=scores.CHA
){

return "Hermit";

}

if(
scores.STR>=scores.DEX
){

return "Soldier";

}

return "FolkHero";

}


/* =========================================================
   DETERMINE SKILLS
   ========================================================= */

function determineSkills(
className,
background
){

const classData=
classes[className];

const backgroundData=
backgrounds[background];

const skills=[];

classData.skills.forEach(
skill=>{
if(!skills.includes(skill))
skills.push(skill);
}
);

backgroundData.skills.forEach(
skill=>{
if(!skills.includes(skill))
skills.push(skill);
}
);

return skills;

}


/* =========================================================
   SOUL ARCHETYPE
   ========================================================= */

function determineSoulArchetype(){

const scores=
soulTrial.scores;

const highest=
Object.entries(scores)
.sort(
(a,b)=>b[1]-a[1]
)[0][0];

const names={

STR:"The Warrior",

DEX:"The Shadow",

CON:"The Survivor",

INT:"The Scholar",

WIS:"The Seer",

CHA:"The Leader"

};

return names[highest];

}


/* =========================================================
   SOUL SKILL
   ========================================================= */

function determineSoulSkill(){

const scores=
soulTrial.scores;

const highest=
Object.entries(scores)
.sort(
(a,b)=>b[1]-a[1]
)[0][0];

return soulSkills[highest];

}


/* =========================================================
   GENERATE CHARACTER
   ========================================================= */

function generateCharacter(){

const scores=
generateAbilityScores();

const className=
determineClass(scores);

const subclass=
determineSubclass(
className,
scores
);

const background=
determineBackground();

const skills=
determineSkills(
className,
background
);

const soulSkill=
determineSoulSkill();

const archetype=
determineSoulArchetype();

const character={

name:"New Soul",

player:"",

level:1,

race:"Human",

class:className,

subclass:subclass,

background:background,

archetype:archetype,

abilityScores:scores,

skills:skills,

soulSkill:soulSkill,

savingThrows:
classes[className].primary,

features:[],

equipment:[],

spells:[]

};

soulTrial.character=character;

return character;

}


/* =========================================================
   FINISH TRIAL
   ========================================================= */

function finishTrial(){

const character=
generateCharacter();

showAwakening(character);

}


/* =========================================================
   AWAKENING SCREEN
   ========================================================= */

function showAwakening(character){

const app=$("app");

if(!app)
return;

app.innerHTML="";

const screen=create(
"section",
"soul-trial-screen awakening-screen"
);

const content=create(
"div",
"soul-trial-content"
);

const warning=create(
"span",
"eyebrow",
"THE TRIAL IS COMPLETE"
);

const title=create(
"h1",
"awakening-title",
"YOUR SOUL HAS BEEN JUDGED"
);

const subtitle=create(
"h2",
"awakening-subtitle",
character.archetype
);

const message=create(
"p",
"awakening-text",
"Your old life is over. A new world awaits you."
);

const reveal=create(
"div",
"awakening-result"
);

addResult(
reveal,
"CLASS",
character.class
);

addResult(
reveal,
"SUBCLASS",
character.subclass
);

addResult(
reveal,
"BACKGROUND",
character.background
);

addResult(
reveal,
"SOUL SKILL",
character.soulSkill.name
);

const skillDescription=create(
"p",
"soul-skill-description",
character.soulSkill.description
);

const continueButton=create(
"button",
"btn btn-primary btn-large",
"OPEN YOUR STATUS"
);

continueButton.onclick=()=>{
showStatus(character);
};

content.appendChild(warning);

content.appendChild(title);

content.appendChild(subtitle);

content.appendChild(message);

content.appendChild(reveal);

content.appendChild(skillDescription);

content.appendChild(continueButton);

screen.appendChild(content);

app.appendChild(screen);

}


/* =========================================================
   RESULT CARD
   ========================================================= */

function addResult(
container,
label,
value
){

const card=create(
"div",
"awakening-card"
);

const title=create(
"span",
"",
label
);

const result=create(
"strong",
"",
value
);

card.appendChild(title);

card.appendChild(result);

container.appendChild(card);

}


/* =========================================================
   STATUS SCREEN
   ========================================================= */

function showStatus(character){

const app=$("app");

if(!app)
return;

app.innerHTML="";

const screen=create(
"section",
"status-screen"
);

const header=create(
"div",
"status-header"
);

const title=create(
"h1",
"",
"SOUL STATUS"
);

const name=create(
"h2",
"",
character.name
);

header.appendChild(title);

header.appendChild(name);

const identity=create(
"div",
"status-identity"
);

addStatus(
identity,
"RACE",
character.race
);

addStatus(
identity,
"CLASS",
character.class
);

addStatus(
identity,
"SUBCLASS",
character.subclass
);

addStatus(
identity,
"BACKGROUND",
character.background
);

const abilitySection=create(
"div",
"status-section"
);

abilitySection.appendChild(
create(
"h3",
"",
"ABILITY SCORES"
)
);

const abilities=create(
"div",
"ability-grid"
);

Object.entries(
character.abilityScores
)
.forEach(
([stat,value])=>{

const card=create(
"div",
"ability-card"
);

const name=create(
"span",
"",
stat
);

const score=create(
"strong",
"",
value
);

const modifier=
Math.floor((value-10)/2);

const mod=create(
"small",
"",
modifier>=0
?`+${modifier}`
:`${modifier}`
);

card.appendChild(name);

card.appendChild(score);

card.appendChild(mod);

abilities.appendChild(card);

}
);

abilitySection.appendChild(abilities);

const soul=create(
"div",
"soul-skill-panel"
);

soul.appendChild(
create(
"h3",
"",
"✦ SOUL SKILL"
)
);

soul.appendChild(
create(
"h2",
"",
character.soulSkill.name
)
);

soul.appendChild(
create(
"p",
"",
character.soulSkill.description
)
);

const skills=create(
"div",
"status-section"
);

skills.appendChild(
create(
"h3",
"",
"SKILLS"
)
);

const skillList=create(
"div",
"skill-list"
);

character.skills.forEach(
skill=>{
skillList.appendChild(
create(
"span",
"skill-tag",
skill
)
);
}
);

skills.appendChild(skillList);

const button=create(
"button",
"btn btn-primary btn-large",
"VIEW CHARACTER SHEET"
);

button.onclick=()=>{
showCharacterSheet(character);
};

screen.appendChild(header);

screen.appendChild(identity);

screen.appendChild(abilitySection);

screen.appendChild(soul);

screen.appendChild(skills);

screen.appendChild(button);

app.appendChild(screen);

}


/* =========================================================
   STATUS CARD
   ========================================================= */

function addStatus(
container,
label,
value
){

const card=create(
"div",
"status-card"
);

card.appendChild(
create(
"span",
"",
label
)
);

card.appendChild(
create(
"strong",
"",
value
)
);

container.appendChild(card);

}


/* =========================================================
   CHARACTER SHEET
   ========================================================= */

function showCharacterSheet(character){

const app=$("app");

if(!app)
return;

app.innerHTML="";

const sheet=create(
"main",
"character-sheet-page"
);

const header=create(
"header",
"sheet-header"
);

header.appendChild(
create(
"span",
"eyebrow",
"THE SOUL TRIAL"
)
);

const nameInput=create(
"input",
"character-name-input"
);

nameInput.value=
character.name;

nameInput.placeholder=
"Character Name";

nameInput.oninput=()=>{
character.name=
nameInput.value;

saveCharacter();
};

header.appendChild(
nameInput
);

header.appendChild(
create(
"p",
"",
"Human · 2014 D&D Character"
)
);

const identity=create(
"section",
"sheet-section"
);

identity.innerHTML=`
<h2>Identity</h2>
<div class="sheet-grid">
<div><span>Class</span><strong>${character.class}</strong></div>
<div><span>Subclass</span><strong>${character.subclass}</strong></div>
<div><span>Background</span><strong>${character.background}</strong></div>
<div><span>Level</span><strong>${character.level}</strong></div>
<div><span>Soul Archetype</span><strong>${character.archetype}</strong></div>
</div>
`;

const abilities=create(
"section",
"sheet-section"
);

abilities.appendChild(
create(
"h2",
"",
"Ability Scores"
)
);

const grid=create(
"div",
"sheet-ability-grid"
);

Object.entries(
character.abilityScores
)
.forEach(
([stat,value])=>{

const mod=
Math.floor((value-10)/2);

const card=create(
"div",
"sheet-ability"
);

card.appendChild(
create(
"span",
"",
stat
)
);

card.appendChild(
create(
"strong",
"",
value
)
);

card.appendChild(
create(
"small",
"",
mod>=0
?`+${mod}`
:`${mod}`
)
);

grid.appendChild(card);

}
);

abilities.appendChild(grid);

const combat=create(
"section",
"sheet-section"
);

combat.innerHTML=`
<h2>Combat</h2>
<div class="sheet-grid">
<div><span>Armor Class</span><strong>${10+Math.floor((character.abilityScores.DEX-10)/2)}</strong></div>
<div><span>Hit Points</span><strong>${10+Math.floor((character.abilityScores.CON-10)/2)}</strong></div>
<div><span>Initiative</span><strong>${formatModifier(Math.floor((character.abilityScores.DEX-10)/2))}</strong></div>
<div><span>Speed</span><strong>30 ft.</strong></div>
<div><span>Proficiency</span><strong>+2</strong></div>
<div><span>Hit Dice</span><strong>d${hitDie(character.class)}</strong></div>
</div>
`;

const skills=create(
"section",
"sheet-section"
);

skills.innerHTML=
`<h2>Proficiencies</h2>`;

const skillList=create(
"div",
"sheet-skill-list"
);

character.skills.forEach(
skill=>{
skillList.appendChild(
create(
"span",
"skill-tag",
skill
)
);
}
);

skills.appendChild(skillList);

const soul=create(
"section",
"soul-skill-final"
);

soul.appendChild(
create(
"span",
"eyebrow",
"UNIQUE SOUL ABILITY"
)
);

soul.appendChild(
create(
"h2",
"",
character.soulSkill.name
)
);

soul.appendChild(
create(
"p",
"",
character.soulSkill.description
)
);

const actions=create(
"div",
"sheet-actions"
);

const save=create(
"button",
"btn btn-primary",
"SAVE CHARACTER"
);

save.onclick=()=>{
saveCharacter();
};

const restart=create(
"button",
"btn btn-secondary",
"BEGIN AGAIN"
);

restart.onclick=()=>{
if(
confirm(
"Start a new Soul Trial?"
)
){

startSoulTrial();

}
};

actions.appendChild(save);

actions.appendChild(restart);

sheet.appendChild(header);

sheet.appendChild(identity);

sheet.appendChild(abilities);

sheet.appendChild(combat);

sheet.appendChild(skills);

sheet.appendChild(soul);

sheet.appendChild(actions);

app.appendChild(sheet);

}


/* =========================================================
   HELPERS
   ========================================================= */

function formatModifier(value){

return value>=0
?`+${value}`
:String(value);

}


function hitDie(className){

const dice={
Barbarian:12,
Fighter:10,
Paladin:10,
Ranger:10,
Monk:8,
Rogue:8,
Bard:8,
Cleric:8,
Druid:8,
Warlock:8,
Sorcerer:6,
Wizard:6
};

return dice[className]||8;

}


/* =========================================================
   SAVE CHARACTER
   ========================================================= */

function saveCharacter(){

if(!soulTrial.character)
return;

try{

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(
soulTrial.character
)
);

}catch(error){

console.error(
"Could not save character",
error
);

}

}


/* =========================================================
   LOAD CHARACTER
   ========================================================= */

function loadCharacter(){

try{

const saved=
localStorage.getItem(
"soulTrialCharacter"
);

if(!saved)
return null;

return JSON.parse(saved);

}catch(error){

console.error(
"Could not load character",
error
);

return null;

}

}


/* =========================================================
   BOOT SCREEN
   ========================================================= */

function bootSoulTrial(){

const app=$("app");

if(!app)
return;

const saved=
loadCharacter();

if(saved){

const screen=create(
"section",
"soul-trial-screen"
);

const content=create(
"div",
"soul-trial-content"
);

content.appendChild(
create(
"span",
"eyebrow",
"THE SOUL TRIAL"
)
);

content.appendChild(
create(
"h1",
"",
"Your Soul Awaits"
)
);

content.appendChild(
create(
"p",
"",
"A previous soul has been recorded."
)
);

const continueButton=create(
"button",
"btn btn-primary btn-large",
"Continue Character"
);

continueButton.onclick=()=>{
soulTrial.character=saved;
showCharacterSheet(saved);
};

const newButton=create(
"button",
"btn btn-secondary",
"Begin A New Trial"
);

newButton.onclick=()=>{
localStorage.removeItem(
"soulTrialCharacter"
);
startSoulTrial();
};

content.appendChild(
continueButton
);

content.appendChild(
newButton
);

screen.appendChild(content);

app.appendChild(screen);

}else{

showOpening();

}

}


/* =========================================================
   OPENING
   ========================================================= */

function showOpening(){

const app=$("app");

if(!app)
return;

app.innerHTML="";

const screen=create(
"section",
"soul-trial-screen opening-screen"
);

const content=create(
"div",
"soul-trial-content"
);

content.appendChild(
create(
"span",
"eyebrow",
"THE SOUL TRIAL"
)
);

content.appendChild(
create(
"h1",
"",
"Your Old Life Has Ended."
)
);

content.appendChild(
create(
"h2",
"",
"Your Second Life Begins Now."
)
);

content.appendChild(
create(
"p",
"",
"You were an ordinary human living an ordinary life. Then everything changed."
)
);

content.appendChild(
create(
"p",
"",
"Beyond this moment lies a world of magic, monsters, kingdoms and adventure."
)
);

content.appendChild(
create(
"p",
"",
"But before you can enter that world, something must determine what kind of soul you possess."
)
);

const button=create(
"button",
"btn btn-primary btn-large",
"ENTER THE SOUL TRIAL"
);

button.onclick=
startSoulTrial;

content.appendChild(button);

screen.appendChild(content);

app.appendChild(screen);

}


/* =========================================================
   START APPLICATION
   ========================================================= */

if(
document.readyState==="loading"
){

document.addEventListener(
"DOMContentLoaded",
bootSoulTrial
);

}else{

bootSoulTrial();

}


/* =========================================================
   GLOBAL API
   ========================================================= */

window.SoulTrial={

questions,

classes,

backgrounds,

soulSkills,

state:soulTrial,

start:startSoulTrial,

reset:()=>{
localStorage.removeItem(
"soulTrialCharacter"
);
startSoulTrial();
},

generateCharacter,

showCharacterSheet

};
