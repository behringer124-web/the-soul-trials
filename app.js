"use strict";

/* =========================================================
THE SOUL'S TRIAL — APPLICATION
========================================================= */

let currentUser = null;
let currentCampaign = null;
let character = null;

let questionIndex = 0;

let scores = {
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
};

let selectedEquipment = [];


/* =========================================================
DOM
========================================================= */

function $(id){
return document.getElementById(id);
}


/* =========================================================
SCREEN
========================================================= */

function showScreen(id){

document.querySelectorAll("section").forEach(function(section){
section.classList.add("hidden");
});

const target=$(id);

if(!target){
console.error("Screen not found:",id);
return;
}

target.classList.remove("hidden");

window.scrollTo({
top:0,
behavior:"smooth"
});

}


/* =========================================================
MESSAGES
========================================================= */

function showAuthMessage(message,success=false){

const box=$("authMessage");

if(!box)return;

box.textContent=message;
box.classList.remove("hidden");
box.classList.toggle("success",success);
box.classList.toggle("error",!success);

}


function showCampaignMessage(message,success=false){

const box=$("campaignMessage");

if(!box)return;

box.textContent=message;
box.classList.remove("hidden");
box.classList.toggle("success",success);
box.classList.toggle("error",!success);

}


/* =========================================================
BEGIN
========================================================= */

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
selectedEquipment=[];

$("playerName").value="";

showScreen("name");

}


/* =========================================================
LOGIN SCREEN
========================================================= */

function showLogin(){
showScreen("login");
}


/* =========================================================
START QUESTIONS
========================================================= */

function startQuestions(){

const name=$("playerName").value.trim();

if(!name){
alert("Your soul must have a name.");
return;
}

character={
name:name,
level:1
};

questionIndex=0;

showScreen("quiz");

displayQuestion();

}


/* =========================================================
QUESTIONS
========================================================= */

function displayQuestion(){

if(questionIndex<0||questionIndex>=questions.length){
return;
}

const current=questions[questionIndex];

$("questionNumber").textContent=
"Question "+(questionIndex+1)+" of "+questions.length;

$("progressBar").style.width=
((questionIndex/questions.length)*100)+"%";

$("question").textContent=current[0];

$("questionFlavor").textContent=current[1];

const answers=$("answers");

answers.innerHTML="";

current[2].forEach(function(option){

const button=document.createElement("button");

button.type="button";
button.className="choice";
button.textContent=option[0];

button.addEventListener("click",function(){

Object.entries(option[1]).forEach(function(entry){

scores[entry[0]]+=entry[1];

});

questionIndex++;

if(questionIndex<questions.length){
displayQuestion();
}else{
calculateSoul();
}

});

answers.appendChild(button);

});

}


/* =========================================================
CALCULATE SOUL
========================================================= */

function calculateSoul(){

const sorted=Object.entries(scores).sort(function(a,b){

if(b[1]!==a[1]){
return b[1]-a[1];
}

return a[0].localeCompare(b[0]);

});

const highest=sorted[0][0];

const path=soulPaths[highest];

const standard=[16,14,13,12,10,8];

const finalScores={
STR:10,
DEX:10,
CON:10,
INT:10,
WIS:10,
CHA:10
};

sorted.forEach(function(entry,index){
finalScores[entry[0]]=standard[index];
});

const chosenClass=path.classes[0];
const subclass=path.subclasses[chosenClass];
const race=determineRace(scores);
const data=classData[chosenClass];

character.race=race;
character.dominantStat=highest;
character.soulPath=path.name;
character.soulDescription=path.description;
character.class=chosenClass;
character.subclass=subclass;
character.background=path.background;
character.soulTrait=path.trait;
character.traitDescription=path.traitDescription;
character.blessing=path.blessing;
character.blessingDescription=path.blessingDescription;
character.scores=finalScores;

character.max_hp=
data.hp+modifier(finalScores.CON);

character.armor_class=data.ac;
character.speed=data.speed;
character.hit_dice="1d"+data.hitDie;
character.proficiency_bonus=2;
character.equipment=[];

renderResult();

}


/* =========================================================
RACE
========================================================= */

function determineRace(scores){

const sorted=Object.entries(scores).sort(function(a,b){
return b[1]-a[1];
});

const primary=sorted[0][0];
const secondary=sorted[1][0];

if(primary==="STR"&&secondary==="CON")return "Half-Orc";
if(primary==="STR"&&secondary==="CHA")return "Dragonborn";
if(primary==="DEX"&&secondary==="CHA")return "Half-Elf";
if(primary==="DEX"&&secondary==="INT")return "Elf";
if(primary==="DEX"&&secondary==="CON")return "Halfling";
if(primary==="CON"&&secondary==="WIS")return "Dwarf";
if(primary==="CON"&&secondary==="STR")return "Half-Orc";
if(primary==="INT"&&secondary==="DEX")return "Gnome";
if(primary==="INT"&&secondary==="CHA")return "Tiefling";
if(primary==="WIS"&&secondary==="CON")return "Dwarf";
if(primary==="WIS"&&secondary==="CHA")return "Half-Elf";
if(primary==="CHA"&&secondary==="INT")return "Tiefling";
if(primary==="CHA"&&secondary==="STR")return "Dragonborn";

return "Human";

}


/* =========================================================
RESULT
========================================================= */

function renderResult(){

$("resultName").textContent=character.name;
$("soulPath").textContent=character.soulPath;
$("soulDescription").textContent=character.soulDescription;
$("resultRace").textContent=character.race;
$("resultClass").textContent=character.class;
$("resultSubclass").textContent=character.subclass;
$("resultBackground").textContent=character.background;

$("resultStats").innerHTML=
renderStats(character.scores);

$("soulTrait").textContent=character.soulTrait;
$("traitDescription").textContent=character.traitDescription;
$("awakeningBlessing").textContent=character.blessing;
$("blessingDescription").textContent=character.blessingDescription;

showScreen("result");

}


/* =========================================================
CREATOR
========================================================= */

function openCharacterCreator(){

if(!character){
alert("No character exists yet.");
return;
}

$("characterName").textContent=character.name;
$("creatorRace").textContent=character.race;
$("creatorClass").textContent=character.class;
$("creatorSubclass").textContent=character.subclass;
$("creatorBackground").textContent=character.background;
$("creatorLevel").textContent=character.level;

$("abilityScores").innerHTML=
renderStats(character.scores);

$("creatorHP").textContent=character.max_hp;
$("creatorAC").textContent=character.armor_class;
$("creatorSpeed").textContent=character.speed+" ft";

$("personality").value=character.personality||"";
$("ideal").value=character.ideal||"";
$("bond").value=character.bond||"";
$("flaw").value=character.flaw||"";
$("backstory").value=character.backstory||"";

selectedEquipment=
Array.isArray(character.equipment)
?character.equipment.slice()
:[];

renderEquipmentOptions();

showScreen("creator");

}


/* =========================================================
EQUIPMENT
========================================================= */

function renderEquipmentOptions(){

const data=classData[character.class];

const container=$("equipmentOptions");

container.innerHTML="";

data.equipment.forEach(function(item){

const wrapper=document.createElement("label");

wrapper.className="card";
wrapper.style.cursor="pointer";

const checkbox=document.createElement("input");

checkbox.type="checkbox";
checkbox.value=item;
checkbox.checked=selectedEquipment.includes(item);
checkbox.style.width="auto";

wrapper.appendChild(checkbox);
wrapper.appendChild(document.createTextNode(" "+item));

checkbox.addEventListener("change",function(){

if(this.checked){

if(!selectedEquipment.includes(item)){
selectedEquipment.push(item);
}

}else{

selectedEquipment=
selectedEquipment.filter(function(x){
return x!==item;
});

}

});

container.appendChild(wrapper);

});

}


/* =========================================================
SAVE CHARACTER
========================================================= */

async function saveCharacter(){

if(!character)return;

character.personality=$("personality").value.trim();
character.ideal=$("ideal").value.trim();
character.bond=$("bond").value.trim();
character.flaw=$("flaw").value.trim();
character.backstory=$("backstory").value.trim();

character.equipment=
Array.from(new Set(selectedEquipment));

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

if(typeof saveCharacterToSupabase==="function"&&currentUser){

try{

await saveCharacterToSupabase();

alert("Character saved successfully to your account.");

}catch(error){

console.error(error);

alert(
"Character saved on this device, but cloud sync failed.\n\n"+
error.message
);

}

}else{

alert(
"Character saved on this device."
);

}

}


/* =========================================================
CHARACTER SHEET
========================================================= */

function viewSheet(){

if(!character){
alert("Create a character first.");
return;
}

$("sheetName").textContent=character.name;

$("sheetIdentity").textContent=
character.race+
" • "+
character.class+
" • "+
character.subclass+
" • Level "+
character.level+
" • "+
character.background;

$("sheetHP").textContent=character.max_hp;
$("sheetAC").textContent=character.armor_class;
$("sheetSpeed").textContent=character.speed+" ft";
$("sheetLevel").textContent=character.level;
$("sheetProficiency").textContent="+"+character.proficiency_bonus;
$("sheetHitDice").textContent=character.hit_dice;

$("sheetStats").innerHTML=
renderStats(character.scores);

$("sheetPath").textContent=character.soulPath;
$("sheetPathDescription").textContent=character.soulDescription;

$("sheetTrait").textContent=character.soulTrait;
$("sheetTraitDescription").textContent=character.traitDescription;

$("sheetBlessing").textContent=character.blessing;
$("sheetBlessingDescription").textContent=character.blessingDescription;

$("sheetPersonality").textContent=character.personality||"—";
$("sheetIdeal").textContent=character.ideal||"—";
$("sheetBond").textContent=character.bond||"—";
$("sheetFlaw").textContent=character.flaw||"—";
$("sheetBackstory").textContent=character.backstory||"—";

renderSheetEquipment();

showScreen("sheet");

}


/* =========================================================
SHEET EQUIPMENT
========================================================= */

function renderSheetEquipment(){

const container=$("sheetEquipment");
const equipment=character.equipment||[];

container.innerHTML="";

if(!equipment.length){

container.innerHTML=
'<div class="card">No equipment selected.</div>';

return;

}

equipment.forEach(function(item){

const span=document.createElement("span");

span.className="tag";
span.textContent=item;

container.appendChild(span);

});

}


/* =========================================================
CAMPAIGNS
========================================================= */

async function openCampaigns(){

if(!currentUser){

showScreen("login");

showAuthMessage(
"Sign in before using campaign features."
);

return;

}

$("campaignAccountNotice").textContent=
"Signed in as "+(currentUser.email||"player");

showScreen("campaigns");

if(typeof loadCampaigns==="function"){
await loadCampaigns();
}

}


function showCreateCampaign(){

$("campaignCreate").classList.remove("hidden");
$("campaignJoin").classList.add("hidden");

}


function showJoinCampaign(){

$("campaignJoin").classList.remove("hidden");
$("campaignCreate").classList.add("hidden");

}


/* =========================================================
UTILITIES
========================================================= */

function modifier(score){

return Math.floor((Number(score)-10)/2);

}


function renderStats(statScores){

return Object.entries(statScores).map(function(entry){

const stat=entry[0];
const value=entry[1];
const mod=modifier(value);

return `
<div class="stat">
<strong>${escapeHtml(value)}</strong>
${escapeHtml(stat)}
<br>
<span class="small">
${mod>=0?"+":""}${mod}
</span>
</div>
`;

}).join("");

}


function escapeHtml(value){

return String(value??"")
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;");

}


/* =========================================================
LOCAL SAVE
========================================================= */

function loadLocalCharacter(){

const saved=
localStorage.getItem("soulTrialCharacter");

if(!saved)return;

try{

character=JSON.parse(saved);

}catch(error){

console.warn("Saved character could not be loaded.");

localStorage.removeItem("soulTrialCharacter");

}

}


/* =========================================================
BUTTONS
========================================================= */

function wireButtons(){

const bindings={

beginButton:beginTrial,
loginButton:showLogin,

backFromLogin:function(){
showScreen("home");
},

signInButton:function(){
if(typeof login==="function")login();
},

signUpButton:function(){
if(typeof signup==="function")signup();
},

continueName:startQuestions,

backFromName:function(){
showScreen("home");
},

continueToCreator:openCharacterCreator,

saveCharacterButton:saveCharacter,

viewSheetButton:viewSheet,

editCharacterButton:openCharacterCreator,

campaignsButton:openCampaigns,

sheetHomeButton:function(){
showScreen("home");
},

createCampaignButton:showCreateCampaign,

joinCampaignButton:showJoinCampaign,

campaignCharacterButton:viewSheet,

confirmCreateCampaign:function(){
if(typeof createCampaign==="function")createCampaign();
},

confirmJoinCampaign:function(){
if(typeof joinCampaign==="function")joinCampaign();
},

playersButton:function(){
if(typeof loadCampaignMembers==="function")loadCampaignMembers();
},

campaignInfoButton:function(){
if(typeof showCampaignInfo==="function")showCampaignInfo();
},

backCampaignsButton:openCampaigns

};

Object.entries(bindings).forEach(function(entry){

const element=$(entry[0]);

if(!element){
console.error("Missing button:",entry[0]);
return;
}

element.addEventListener("click",entry[1]);

});

}


/* =========================================================
INITIALIZATION
========================================================= */

function initializeApp(){

console.log("The Soul's Trial starting...");

loadLocalCharacter();

wireButtons();

showScreen("home");

console.log("The Soul's Trial ready.");

}


/* =========================================================
START
========================================================= */

if(document.readyState==="loading"){

document.addEventListener(
"DOMContentLoaded",
initializeApp
);

}else{

initializeApp();

}