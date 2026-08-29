/* =====================================================
   THE SOUL'S TRIAL
   MAIN APPLICATION
===================================================== */


/* =====================================================
   SOUL TRIAL QUESTIONS
===================================================== */

const questions=[

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
["Make it fun for everyone.",{CHA:2}]
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
["Keep moving.",{CON:2}],
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
["Figure out what's happening.",{WIS:2}],
["Talk the aggressor down.",{CHA:2}]
]
],

[
"You have failed at something important.",
[
["Try again immediately.",{CON:2}],
["Figure out what went wrong.",{INT:2}],
["Ask someone experienced.",{CHA:1,WIS:1}],
["Take time to think.",{WIS:2}]
]
],

[
"You discover a strange locked door.",
[
["Break it open.",{STR:2}],
["Search for a mechanism.",{DEX:1,INT:1}],
["Look for clues.",{WIS:2}],
["Find someone who can open it.",{CHA:2}]
]
],

[
"You are given a difficult physical challenge.",
[
["Push yourself through it.",{CON:2}],
["Find the fastest technique.",{DEX:2}],
["Study it first.",{INT:2}],
["Ask someone to teach you.",{CHA:1,WIS:1}]
]
],

[
"Someone insults you publicly.",
[
["Ignore them.",{WIS:2}],
["Stand your ground.",{CON:1,CHA:1}],
["Respond cleverly.",{INT:1,CHA:1}],
["Challenge them.",{STR:2}]
]
],

[
"You have to learn something completely new.",
[
["Practice until you master it.",{CON:2}],
["Read everything.",{INT:2}],
["Watch someone else.",{WIS:2}],
["Find a teacher.",{CHA:2}]
]
],

[
"Your group has no leader.",
[
["Take command.",{CHA:2}],
["Create a strategy.",{INT:2}],
["Wait and observe.",{WIS:2}],
["Handle the dangerous part.",{STR:1,CON:1}]
]
],

[
"You hear something moving in darkness.",
[
["Prepare to fight.",{STR:1,CON:1}],
["Move silently.",{DEX:2}],
["Listen carefully.",{WIS:2}],
["Figure out what it is.",{INT:2}]
]
],

[
"Someone needs help but helping them is dangerous.",
[
["Help anyway.",{CON:1,WIS:1}],
["Find a safer solution.",{INT:2}],
["Convince others to help.",{CHA:2}],
["Assess the danger.",{WIS:2}]
]
],

[
"You are suddenly placed in leadership.",
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
["End it without killing.",{WIS:2}]
]
],

[
"Someone has been lying to you.",
[
["Confront them.",{STR:1,CHA:1}],
["Figure out why.",{INT:1,WIS:1}],
["Pretend you believe them.",{DEX:1,CHA:1}],
["Give them another chance.",{WIS:2}]
]
],

[
"You are offered incredible power.",
[
["Accept it.",{STR:1,CHA:1}],
["Study it.",{INT:2}],
["Ask what it will cost.",{WIS:2}],
["Refuse if the price is too high.",{CON:1,WIS:1}]
]
],

[
"You awaken in another world.",
[
["Find out how strong you are.",{STR:1,CON:1}],
["Learn everything.",{INT:2}],
["Find people you trust.",{CHA:2}],
["Observe before acting.",{WIS:2}]
]
]

];


/* =====================================================
   SOUL PATHS
===================================================== */

const soulPaths={

STR:{
name:"The Vanguard",
description:
"A soul forged through courage, strength, and decisive action.",
classes:["Fighter","Barbarian","Paladin"],
trait:"Unyielding",
traitDescription:
"You refuse to back down when others would surrender.",
blessing:"Titan's Resolve",
blessingDescription:
"Once per long rest, when reduced to 0 HP, remain at 1 HP instead."
},

DEX:{
name:"The Shadow",
description:
"A soul of speed, precision, awareness, and adaptability.",
classes:["Rogue","Ranger","Monk"],
trait:"Quickstep",
traitDescription:
"You instinctively recognize openings and react quickly.",
blessing:"Veilstep",
blessingDescription:
"Once per short rest, when targeted by an attack, move 10 feet as a reaction without provoking opportunity attacks."
},

CON:{
name:"The Unbroken",
description:
"A soul that refuses to fall. Hardship only strengthens your determination.",
classes:["Barbarian","Fighter"],
trait:"Iron Will",
traitDescription:
"Pain and exhaustion rarely convince you to surrender.",
blessing:"Last Stand",
blessingDescription:
"Once per long rest, when you fall below half HP, gain temporary HP equal to your Constitution modifier plus proficiency bonus."
},

INT:{
name:"The Arcanist",
description:
"Your mind is your greatest weapon.",
classes:["Wizard","Artificer"],
trait:"Analytical Mind",
traitDescription:
"You naturally break complicated problems into patterns.",
blessing:"Arcane Insight",
blessingDescription:
"Once per long rest, gain advantage on an Intelligence check involving magic, history, investigation, or arcana."
},

WIS:{
name:"The Seer",
description:
"You notice what others miss and trust instinct, patience, and judgment.",
classes:["Cleric","Druid","Monk","Ranger"],
trait:"Instinctive Awareness",
traitDescription:
"Your instincts often notice danger before your conscious mind does.",
blessing:"Foresight",
blessingDescription:
"Once per long rest, after seeing a d20 result, add your Wisdom modifier to the roll."
},

CHA:{
name:"The Sovereign",
description:
"Your presence carries weight. People naturally notice, follow, or remember you.",
classes:["Bard","Sorcerer","Warlock","Paladin"],
trait:"Commanding Presence",
traitDescription:
"You possess a presence that is difficult for others to ignore.",
blessing:"Voice of the Soul",
blessingDescription:
"Once per long rest, gain advantage on a Charisma check made to influence another creature."
}

};


/* =====================================================
   VARIABLES
===================================================== */

let scores={
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
};

let questionIndex=0;

let character=null;


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(id){

document.querySelectorAll("section")
.forEach(section=>{
section.classList.add("hidden");
});

const target=document.getElementById(id);

if(target){
target.classList.remove("hidden");
}

window.scrollTo(0,0);

}


/* =====================================================
   BEGIN
===================================================== */

function beginTrial(){

scores={
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
};

questionIndex=0;

character=null;

document.getElementById("playerName").value="";

showScreen("name");

}


/* =====================================================
   START QUESTIONS
===================================================== */

function startQuestions(){

const name=
document.getElementById("playerName")
.value
.trim();

if(!name){

alert("Your soul must have a name.");

return;

}

character={
name:name,
race:"Human"
};

showScreen("quiz");

displayQuestion();

}


/* =====================================================
   DISPLAY QUESTION
===================================================== */

function displayQuestion(){

const question=
questions[questionIndex];

document.getElementById("questionNumber")
.textContent=
`Question ${questionIndex+1} of ${questions.length}`;

document.getElementById("progressBar")
.style.width=
`${((questionIndex+1)/questions.length)*100}%`;

document.getElementById("question")
.textContent=
question[0];

const answers=
document.getElementById("answers");

answers.innerHTML="";

question[1].forEach(option=>{

const button=
document.createElement("button");

button.className="choice";

button.textContent=
option[0];

button.onclick=()=>{

Object.entries(option[1])
.forEach(([stat,value])=>{

scores[stat]+=value;

});

questionIndex++;

if(questionIndex<questions.length){

displayQuestion();

}else{

calculateSoul();

}

};

answers.appendChild(button);

});

}


/* =====================================================
   CALCULATE SOUL
===================================================== */

function calculateSoul(){

const order=
Object.keys(scores)
.sort((a,b)=>scores[b]-scores[a]);

const dominant=
order[0];

const path=
soulPaths[dominant];


/*
The Trial determines the soul's natural
ability priority.

It does NOT force those values permanently.

The player can manually distribute/change
their final ability scores in the creator.
*/

character.dominantStat=dominant;

character.soulPath=path.name;

character.soulDescription=
path.description;

character.recommendedClasses=
[...path.classes];

character.soulTrait=
path.trait;

character.traitDescription=
path.traitDescription;

character.blessing=
path.blessing;

character.blessingDescription=
path.blessingDescription;


/*
Initial suggested ability scores.

These are editable later.
*/

character.scores={
STR:15,
DEX:14,
CON:13,
INT:12,
WIS:10,
CHA:8
};


document.getElementById("resultName")
.textContent=
character.name;

document.getElementById("soulPath")
.textContent=
path.name;

document.getElementById("soulDescription")
.textContent=
path.description;

document.getElementById("recommendedClasses")
.innerHTML=
path.classes
.map(className=>
`<span class="tag">${className}</span>`
)
.join("");

document.getElementById("soulTrait")
.textContent=
path.trait;

document.getElementById("traitDescription")
.textContent=
path.traitDescription;

document.getElementById("awakeningBlessing")
.textContent=
path.blessing;

document.getElementById("blessingDescription")
.textContent=
path.blessingDescription;

showScreen("result");

}


/* =====================================================
   OPEN CREATOR
===================================================== */

function openCreator(){

if(!character){

return;

}

document.getElementById("creatorName")
.textContent=
character.name;


/* CLASS */

const classSelect=
document.getElementById("classSelect");

classSelect.innerHTML="";


Object.keys(classData)
.forEach(className=>{

const option=
document.createElement("option");

option.value=className;

option.textContent=className;

classSelect.appendChild(option);

});


/*
Prefer the first class determined by
the Soul Trial.
*/

if(character.class &&
classData[character.class]){

classSelect.value=
character.class;

}else{

classSelect.value=
character.recommendedClasses[0];

}


/* BACKGROUNDS */

const backgroundSelect=
document.getElementById("backgroundSelect");

backgroundSelect.innerHTML="";

backgrounds.forEach(background=>{

const option=
document.createElement("option");

option.value=background;

option.textContent=background;

backgroundSelect.appendChild(option);

});


/*
Restore saved values.
*/

if(character.background){

backgroundSelect.value=
character.background;

}


/* LEVEL */

document.getElementById("level").value=
character.level || 1;


/* COMBAT */

document.getElementById("armorClass").value=
character.ac || 10;

document.getElementById("currentHP").value=
character.hp || 1;

document.getElementById("tempHP").value=
character.tempHP || 0;

document.getElementById("speed").value=
character.speed || "30 ft";


/* TEXT */

document.getElementById("attacks").value=
character.attacks || "";

document.getElementById("equipment").value=
character.equipment || "";

document.getElementById("personality").value=
character.personality || "";

document.getElementById("ideal").value=
character.ideal || "";

document.getElementById("bond").value=
character.bond || "";

document.getElementById("flaw").value=
character.flaw || "";

document.getElementById("backstory").value=
character.backstory || "";


updateClass();

refreshCreator();

showScreen("creator");

}


/* =====================================================
   UPDATE CLASS
===================================================== */

function updateClass(){

const className=
document.getElementById("classSelect").value;

const data=
classData[className];

if(!data){

return;

}


/* SUBCLASS */

const subclassSelect=
document.getElementById("subclassSelect");

subclassSelect.innerHTML="";


data.subclasses.forEach(subclass=>{

const option=
document.createElement("option");

option.value=subclass;

option.textContent=subclass;

subclassSelect.appendChild(option);

});


if(character &&
character.subclass &&
data.subclasses.includes(character.subclass)){

subclassSelect.value=
character.subclass;

}


/* CLASS INFO */

document.getElementById("classInfo")
.innerHTML=`

<h3>${className}</h3>

<p>
<strong>Primary Ability:</strong>
${data.ability}
</p>

<p>
<strong>Hit Die:</strong>
d${data.hitDie}
</p>

<p>
<strong>Saving Throws:</strong>
${data.saves.join(", ")}
</p>

<p>
<strong>Recommended by Soul:</strong>
${
character.recommendedClasses.includes(className)
? "Yes"
: "No"
}
</p>

`;


refreshCreator();

}


/* =====================================================
   ABILITY SCORE EDITOR
===================================================== */

function renderAbilityEditor(){

if(!character){

return;

}

const container=
document.getElementById("abilityScores");

container.innerHTML="";


Object.keys(character.scores)
.forEach(stat=>{

const value=
character.scores[stat];

const box=
document.createElement("div");

box.className="stat";

box.innerHTML=`

<strong>${stat}</strong>

<input
class="ability-input"
type="number"
min="1"
max="30"
value="${value}"
onchange="changeAbility('${stat}',this.value)"
>

<div>
Modifier:
<span id="modifier-${stat}">
${modifier(value)>=0?"+":""}${modifier(value)}
</span>
</div>

`;

container.appendChild(box);

});

}


/* =====================================================
   CHANGE ABILITY
===================================================== */

function changeAbility(stat,value){

let number=
Number(value);

if(!Number.isFinite(number)){

number=10;

}

number=
Math.max(1,Math.min(30,number));

character.scores[stat]=number;

renderAbilityEditor();

}


/* =====================================================
   CREATOR REFRESH
===================================================== */

function refreshCreator(){

if(!character){

return;

}

let level=
Number(document.getElementById("level").value)||1;

level=
Math.max(1,Math.min(20,level));

document.getElementById("level").value=
level;


/*
Do not automatically overwrite the
player's HP or AC.

Those are intentionally manual.
*/

renderAbilityEditor();

}


/* =====================================================
   SAVE CHARACTER
===================================================== */

function saveCharacter(alertUser=true){

if(!character){

return;

}


/* MANUAL VALUES */

character.class=
document.getElementById("classSelect").value;

character.subclass=
document.getElementById("subclassSelect").value;

character.background=
document.getElementById("backgroundSelect").value;

character.level=
Number(document.getElementById("level").value)||1;

character.ac=
Number(document.getElementById("armorClass").value)||10;

character.hp=
Number(document.getElementById("currentHP").value)||1;

character.tempHP=
Number(document.getElementById("tempHP").value)||0;

character.speed=
document.getElementById("speed").value;

character.attacks=
document.getElementById("attacks").value;

character.equipment=
document.getElementById("equipment").value;

character.personality=
document.getElementById("personality").value;

character.ideal=
document.getElementById("ideal").value;

character.bond=
document.getElementById("bond").value;

character.flaw=
document.getElementById("flaw").value;

character.backstory=
document.getElementById("backstory").value;


localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);


if(alertUser){

alert(
"Character saved on this device."
);

}

}


/* =====================================================
   CREATE CHARACTER
===================================================== */

function createCharacter(){

saveCharacter(false);

character.created=true;

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

buildSheet();

showScreen("sheet");

}


/* =====================================================
   BUILD CHARACTER SHEET
===================================================== */

function buildSheet(){

if(!character){

return;

}

const data=
classData[character.class];

if(!data){

return;

}

const level=
character.level || 1;

const prof=
proficiencyBonus(level);


/* HEADER */

document.getElementById("sheetName")
.textContent=
character.name;

document.getElementById("sheetIdentity")
.textContent=
`${character.race} • ${character.class} • ${character.subclass || "No Subclass"} • ${character.background || "No Background"}`;


/* CORE */

document.getElementById("sheetLevel")
.textContent=level;

document.getElementById("sheetProf")
.textContent=
"+"+prof;

document.getElementById("sheetHP")
.textContent=
character.hp;

document.getElementById("sheetAC")
.textContent=
character.ac;

document.getElementById("sheetSpeed")
.textContent=
character.speed;

document.getElementById("sheetTempHP")
.textContent=
character.tempHP || 0;


/* INITIATIVE */

const initiative=
modifier(character.scores.DEX);

document.getElementById("sheetInitiative")
.textContent=
initiative>=0
? "+"+initiative
: initiative;


/* HIT DICE */

document.getElementById("sheetHitDice")
.textContent=
`${level}d${data.hitDie}`;


/* =====================================================
   ABILITY SCORES
===================================================== */

document.getElementById("sheetStats")
.innerHTML=
Object.entries(character.scores)
.map(([stat,value])=>{

const mod=
modifier(value);

return `

<div class="stat">

<strong>${value}</strong>

${stat}

<br>

${mod>=0?"+":""}${mod}

</div>

`;

})
.join("");


/* =====================================================
   SAVING THROWS
===================================================== */

document.getElementById("sheetSaves")
.innerHTML=
Object.entries(character.scores)
.map(([stat,value])=>{

let save=
modifier(value);

if(data.saves.includes(stat)){

save+=prof;

}

return `

<div class="row">

<span>${stat}</span>

<strong>
${save>=0?"+":""}${save}
</strong>

</div>

`;

})
.join("");


/* =====================================================
   SKILLS
===================================================== */

document.getElementById("sheetSkills")
.innerHTML=
data.skills
.filter(skill=>skillAbility[skill])
.map(skill=>{

const ability=
skillAbility[skill];

const value=
modifier(character.scores[ability])
+
prof;

return `

<div class="row">

<span>
${skill} (${ability})
</span>

<strong>
${value>=0?"+":""}${value}
</strong>

</div>

`;

})
.join("");


/* =====================================================
   PASSIVE SKILLS
===================================================== */

const passivePerception=
10+
modifier(character.scores.WIS)+
(data.skills.includes("Perception")?prof:0);

const passiveInvestigation=
10+
modifier(character.scores.INT)+
(data.skills.includes("Investigation")?prof:0);

const passiveInsight=
10+
modifier(character.scores.WIS)+
(data.skills.includes("Insight")?prof:0);


document.getElementById("passivePerception")
.textContent=
passivePerception;

document.getElementById("passiveInvestigation")
.textContent=
passiveInvestigation;

document.getElementById("passiveInsight")
.textContent=
passiveInsight;


/* =====================================================
   SOUL
===================================================== */

document.getElementById("sheetPath")
.textContent=
character.soulPath;

document.getElementById("sheetPathDescription")
.textContent=
character.soulDescription;

document.getElementById("sheetTrait")
.textContent=
character.soulTrait;

document.getElementById("sheetTraitDescription")
.textContent=
character.traitDescription;

document.getElementById("sheetBlessing")
.textContent=
character.blessing;

document.getElementById("sheetBlessingDescription")
.textContent=
character.blessingDescription;


/* =====================================================
   UNIQUE AWAKENING
===================================================== */

const awakeningLevelValue=
awakeningLevel(level);

document.getElementById("sheetAwakeningName")
.textContent=
data.awakening.name;

document.getElementById("sheetAwakening")
.textContent=
data.awakening.levels[awakeningLevelValue];


/* =====================================================
   CLASS
===================================================== */

document.getElementById("sheetClass")
.textContent=
character.class;

document.getElementById("sheetSubclass")
.textContent=
character.subclass || "—";

document.getElementById("sheetBackground")
.textContent=
character.background || "—";


/* =====================================================
   FEATURES
===================================================== */

document.getElementById("sheetFeatures")
.innerHTML=
featuresFor(data,level)
.map(feature=>
`<div>• ${feature}</div>`
)
.join("");


/* =====================================================
   ATTACKS
===================================================== */

document.getElementById("sheetAttacks")
.textContent=
character.attacks ||
"No attacks recorded.";


/* =====================================================
   EQUIPMENT
===================================================== */

document.getElementById("sheetEquipment")
.textContent=
character.equipment ||
"—";


/* =====================================================
   SPELLCASTING
===================================================== */

const spellAbility=
data.ability;

const spellModifier=
modifier(
character.scores[spellAbility]
);

document.getElementById("spellAbility")
.textContent=
spellAbility;


if(spellcasters.includes(character.class)){

document.getElementById("spellDC")
.textContent=
8+
prof+
spellModifier;

document.getElementById("spellAttack")
.textContent=
(spellModifier+prof)>=0
? "+"+(spellModifier+prof)
: spellModifier+prof;

document.getElementById("spellSlots")
.innerHTML=
getSpellSlots(
character.class,
level
);

}else{

document.getElementById("spellDC")
.textContent="—";

document.getElementById("spellAttack")
.textContent="—";

document.getElementById("spellSlots")
.textContent=
"This character class does not normally use spell slots.";

}


document.getElementById("spells")
.textContent=
"Spell management will be available here as the Soul's Trial expands.";


/* =====================================================
   CHARACTER DETAILS
===================================================== */

document.getElementById("sheetPersonality")
.textContent=
character.personality || "—";

document.getElementById("sheetIdeal")
.textContent=
character.ideal || "—";

document.getElementById("sheetBond")
.textContent=
character.bond || "—";

document.getElementById("sheetFlaw")
.textContent=
character.flaw || "—";

document.getElementById("sheetBackstory")
.textContent=
character.backstory || "—";

}


/* =====================================================
   RETURN HOME
===================================================== */

function returnHome(){

showScreen("home");

}


/* =====================================================
   LOAD SAVED CHARACTER
===================================================== */

const savedCharacter=
localStorage.getItem(
"soulTrialCharacter"
);

if(savedCharacter){

try{

const loaded=
JSON.parse(savedCharacter);

if(
loaded &&
loaded.name &&
loaded.soulPath
){

character=loaded;

}

}catch(error){

character=null;

}

}
