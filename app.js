"use strict";

let character=null;
let currentCampaign=null;

let questionIndex=0;

let scores={
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
};

let selectedEquipment=[];


/* =========================================================
DOM
========================================================= */

function $(id){
return document.getElementById(id);
}


/* =========================================================
SCREEN CONTROL
========================================================= */

function showScreen(id){

document.querySelectorAll("section").forEach(function(section){
section.classList.add("hidden");
});

const target=$(id);

if(target){
target.classList.remove("hidden");
}

window.scrollTo({
top:0,
behavior:"smooth"
});

}


/* =========================================================
BEGIN TRIAL
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
selectedEquipment=[];
character=null;

$("playerName").value="";

showScreen("name");

}


/* =========================================================
START QUESTIONS
========================================================= */

function startQuestions(){

const name=
$("playerName").value.trim();

if(!name){

alert("Your soul must have a name.");

return;

}

character={
name:name,
level:1
};

showScreen("quiz");

displayQuestion();

}


/* =========================================================
DISPLAY QUESTION
========================================================= */

function displayQuestion(){

const current=
questions[questionIndex];

$("questionNumber").textContent=
"Question "+
(questionIndex+1)+
" of "+
questions.length;

$("progressBar").style.width=
((questionIndex/questions.length)*100)+"%";

$("question").textContent=current[0];

$("questionFlavor").textContent=current[1];

const answers=$("answers");

answers.innerHTML="";

current[2].forEach(function(option){

const button=
document.createElement("button");

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
MODIFIER
========================================================= */

function modifier(score){

return Math.floor((Number(score)-10)/2);

}


/* =========================================================
CALCULATE SOUL
========================================================= */

function calculateSoul(){

const sorted=
Object.entries(scores).sort(function(a,b){

if(b[1]!==a[1]){
return b[1]-a[1];
}

return a[0].localeCompare(b[0]);

});

const highest=sorted[0][0];

const path=soulPaths[highest];

const standard=[
16,
14,
13,
12,
10,
8
];

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

const chosenClass=
path.classes[0];

const subclass=
path.subclasses[chosenClass];

const race=
determineRace(scores);

const data=
classData[chosenClass];

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
data.hp+
modifier(finalScores.CON);

character.current_hp=
character.max_hp;

character.armor_class=
data.ac;

character.speed=
data.speed;

character.hit_dice=
"1d"+data.hitDie;

character.proficiency_bonus=2;

character.experience_points=0;
character.inspiration=false;

character.equipment=[];

saveLocalCharacter();

renderResult();

}


/* =========================================================
RESULT
========================================================= */

function renderResult(){

$("resultName").textContent=character.name;

$("soulPath").textContent=character.soulPath;

$("soulDescription").textContent=
character.soulDescription;

$("resultRace").textContent=
character.race;

$("resultClass").textContent=
character.class;

$("resultSubclass").textContent=
character.subclass;

$("resultBackground").textContent=
character.background;

$("resultStats").innerHTML=
renderStats(character.scores);

$("soulTrait").textContent=
character.soulTrait;

$("traitDescription").textContent=
character.traitDescription;

$("awakeningBlessing").textContent=
character.blessing;

$("blessingDescription").textContent=
character.blessingDescription;

showScreen("result");

}


/* =========================================================
CHARACTER CREATOR
========================================================= */

function openCharacterCreator(){

if(!character){

alert("No character exists yet.");

return;

}

$("characterName").textContent=
character.name;

$("creatorRace").textContent=
character.race;

$("creatorClass").textContent=
character.class;

$("creatorSubclass").textContent=
character.subclass;

$("creatorBackground").textContent=
character.background;

$("creatorLevel").textContent=
character.level;

$("abilityScores").innerHTML=
renderStats(character.scores);

$("creatorHP").textContent=
character.max_hp;

$("creatorAC").textContent=
character.armor_class;

$("creatorSpeed").textContent=
character.speed+" ft";

$("personality").value=
character.personality||"";

$("ideal").value=
character.ideal||"";

$("bond").value=
character.bond||"";

$("flaw").value=
character.flaw||"";

$("backstory").value=
character.backstory||"";

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

const data=
classData[character.class];

const container=
$("equipmentOptions");

container.innerHTML="";

data.equipment.forEach(function(item){

const wrapper=
document.createElement("label");

wrapper.className="card";

const checkbox=
document.createElement("input");

checkbox.type="checkbox";
checkbox.value=item;

checkbox.checked=
selectedEquipment.includes(item);

checkbox.style.width="auto";

wrapper.appendChild(checkbox);

wrapper.appendChild(
document.createTextNode(" "+item)
);

checkbox.addEventListener("change",function(){

if(checkbox.checked){

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
SAVE LOCAL
========================================================= */

function saveLocalCharacter(){

if(!character){
return;
}

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

}


/* =========================================================
SAVE CHARACTER
========================================================= */

async function saveCharacter(){

if(!character){
return;
}

character.personality=
$("personality").value.trim();

character.ideal=
$("ideal").value.trim();

character.bond=
$("bond").value.trim();

character.flaw=
$("flaw").value.trim();

character.backstory=
$("backstory").value.trim();

character.equipment=
Array.from(new Set(selectedEquipment));

saveLocalCharacter();

try{

await initializeSupabase();

await saveCharacterToSupabase();

$("syncStatus").textContent=
"Character saved and synced with the Soul's Trial realm.";

$("syncStatus").classList.add("success");

alert(
"Character saved successfully."
);

}catch(error){

console.error(error);

$("syncStatus").textContent=
"Character saved on this device. Online sync is currently unavailable.";

$("syncStatus").classList.add("error");

alert(
"Character saved locally, but online synchronization failed:\n\n"+
error.message
);

}

}


/* =========================================================
SAVE CHARACTER TO SUPABASE
========================================================= */

async function saveCharacterToSupabase(){

const payload={

player_id:currentUser.id,

name:character.name,

race:character.race,

class:character.class,

subclass:character.subclass,

background:character.background,

level:character.level,

strength:character.scores.STR,

dexterity:character.scores.DEX,

constitution:character.scores.CON,

intelligence:character.scores.INT,

wisdom:character.scores.WIS,

charisma:character.scores.CHA,

max_hp:character.max_hp,

current_hp:character.current_hp||character.max_hp,

armor_class:character.armor_class,

speed:character.speed,

proficiency_bonus:character.proficiency_bonus,

hit_dice:character.hit_dice,

soul_path:character.soulPath,

soul_trait:character.soulTrait,

soul_blessing:character.blessing,

personality:character.personality,

ideal:character.ideal,

bond:character.bond,

flaw:character.flaw,

backstory:character.backstory

};

const existing=
await supabaseRequest(
"characters",
"GET",
null,
"?player_id=eq."+
encodeURIComponent(currentUser.id)+
"&select=id"+
"&order=updated_at.desc"+
"&limit=1"
);

if(existing&&existing.length){

await supabaseRequest(
"characters",
"PATCH",
payload,
"?id=eq."+encodeURIComponent(existing[0].id)
);

character.supabaseId=
existing[0].id;

}else{

const created=
await supabaseRequest(
"characters",
"POST",
payload
);

if(created&&created.length){

character.supabaseId=
created[0].id;

}

}

saveLocalCharacter();

}


/* =========================================================
CHARACTER SHEET
========================================================= */

function viewSheet(){

if(!character){

alert("Create a character first.");

return;

}

$("sheetName").textContent=
character.name;

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

$("sheetHP").textContent=
character.current_hp||character.max_hp;

$("sheetAC").textContent=
character.armor_class;

$("sheetSpeed").textContent=
character.speed+" ft";

$("sheetLevel").textContent=
character.level;

$("sheetProficiency").textContent=
"+"+character.proficiency_bonus;

$("sheetHitDice").textContent=
character.hit_dice;

$("sheetStats").innerHTML=
renderStats(character.scores);

$("sheetPath").textContent=
character.soulPath;

$("sheetPathDescription").textContent=
character.soulDescription;

$("sheetTrait").textContent=
character.soulTrait;

$("sheetTraitDescription").textContent=
character.traitDescription;

$("sheetBlessing").textContent=
character.blessing;

$("sheetBlessingDescription").textContent=
character.blessingDescription;

$("sheetPersonality").textContent=
character.personality||"—";

$("sheetIdeal").textContent=
character.ideal||"—";

$("sheetBond").textContent=
character.bond||"—";

$("sheetFlaw").textContent=
character.flaw||"—";

$("sheetBackstory").textContent=
character.backstory||"—";

renderSheetEquipment();

showScreen("sheet");

}


/* =========================================================
SHEET EQUIPMENT
========================================================= */

function renderSheetEquipment(){

const container=
$("sheetEquipment");

container.innerHTML="";

const equipment=
character.equipment||[];

if(!equipment.length){

container.innerHTML=
'<div class="card">No equipment selected.</div>';

return;

}

equipment.forEach(function(item){

const span=
document.createElement("span");

span.className="tag";

span.textContent=item;

container.appendChild(span);

});

}


/* =========================================================
CAMPAIGNS
========================================================= */

async function openCampaigns(){

showScreen("campaigns");

$("campaignAccountNotice").textContent=
"Connecting your Soul to the campaign realm...";

try{

await initializeSupabase();

$("campaignAccountNotice").textContent=
"You are connected anonymously. No login is required.";

await loadCampaigns();

}catch(error){

console.error(error);

$("campaignAccountNotice").textContent=
"Campaign connection failed: "+error.message;

}

}


/* =========================================================
CREATE CAMPAIGN UI
========================================================= */

function showCreateCampaign(){

$("campaignCreate").classList.remove("hidden");

$("campaignJoin").classList.add("hidden");

}


/* =========================================================
JOIN CAMPAIGN UI
========================================================= */

function showJoinCampaign(){

$("campaignJoin").classList.remove("hidden");

$("campaignCreate").classList.add("hidden");

}


/* =========================================================
CREATE CAMPAIGN
========================================================= */

async function createCampaign(){

try{

await initializeSupabase();

const name=
$("campaignName").value.trim();

const description=
$("campaignDescription").value.trim();

if(!name){

showCampaignMessage(
"Enter a campaign name."
);

return;

}

const created=
await supabaseRequest(
"campaigns",
"POST",
{
name:name,
description:description,
dm_id:currentUser.id
}
);

if(!created||!created.length){

throw new Error(
"Campaign was not created."
);

}

const campaign=
created[0];

await supabaseRequest(
"campaign_members",
"POST",
{
campaign_id:campaign.id,
player_id:currentUser.id,
role:"dm"
}
);

$("campaignName").value="";
$("campaignDescription").value="";

showCampaignMessage(
"Campaign created successfully.",
true
);

await loadCampaigns();

}catch(error){

console.error(error);

showCampaignMessage(
error.message||
"Unable to create campaign."
);

}

}


/* =========================================================
LOAD CAMPAIGNS
========================================================= */

async function loadCampaigns(){

const container=
$("campaignList");

container.innerHTML=
'<div class="card">Loading campaigns...</div>';

try{

const campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?select=*&order=created_at.desc"
);

container.innerHTML="";

if(!campaigns||campaigns.length===0){

container.innerHTML=
`
<div class="info">
<h2>No Campaigns Yet</h2>
<p>
Create a campaign as a DM or join one using the ID provided by your DM.
</p>
</div>
`;

return;

}

campaigns.forEach(function(campaign){

const card=
document.createElement("div");

card.className="card";

const title=
document.createElement("h3");

title.textContent=
campaign.name||"Unnamed Campaign";

const description=
document.createElement("p");

description.textContent=
campaign.description||
"No description.";

const idText=
document.createElement("p");

idText.innerHTML=
"<strong>Campaign ID:</strong> ";

const idSpan=
document.createElement("span");

idSpan.textContent=
campaign.id;

idText.appendChild(idSpan);

const button=
document.createElement("button");

button.type="button";
button.textContent="OPEN CAMPAIGN";

button.addEventListener(
"click",
function(){
openCampaign(campaign);
}
);

card.appendChild(title);
card.appendChild(description);
card.appendChild(idText);
card.appendChild(button);

container.appendChild(card);

});

}catch(error){

console.error(error);

container.innerHTML=
'<div class="notice error">'+
escapeHtml(error.message)+
'</div>';

}

}


/* =========================================================
JOIN CAMPAIGN
========================================================= */

async function joinCampaign(){

try{

await initializeSupabase();

const code=
$("campaignCode").value.trim();

if(!code){

showCampaignMessage(
"Enter a campaign ID or join code."
);

return;

}

let campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?id=eq."+
encodeURIComponent(code)+
"&select=*"
);

if(!campaigns||campaigns.length===0){

campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?join_code=eq."+
encodeURIComponent(code)+
"&select=*"
);

}

if(!campaigns||campaigns.length===0){

showCampaignMessage(
"Campaign not found."
);

return;

}

const campaign=
campaigns[0];

const members=
await supabaseRequest(
"campaign_members",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(campaign.id)+
"&player_id=eq."+
encodeURIComponent(currentUser.id)+
"&select=id"
);

if(!members||members.length===0){

await supabaseRequest(
"campaign_members",
"POST",
{
campaign_id:campaign.id,
player_id:currentUser.id,
role:"player"
}
);

}

if(character){

await attachCharacterToCampaign(
campaign.id
);

}

$("campaignCode").value="";

showCampaignMessage(
"You joined "+campaign.name+".",
true
);

await openCampaign(campaign);

}catch(error){

console.error(error);

showCampaignMessage(
error.message||
"Unable to join campaign."
);

}

}


/* =========================================================
ATTACH CHARACTER
========================================================= */

async function attachCharacterToCampaign(campaignId){

if(!character){
return;
}

await initializeSupabase();

let characterId=
character.supabaseId;

if(!characterId){

const rows=
await supabaseRequest(
"characters",
"GET",
null,
"?player_id=eq."+
encodeURIComponent(currentUser.id)+
"&select=id"+
"&order=updated_at.desc"+
"&limit=1"
);

if(rows&&rows.length){
characterId=rows[0].id;
}

}

if(!characterId){

await saveCharacterToSupabase();

characterId=
character.supabaseId;

}

if(characterId){

await supabaseRequest(
"characters",
"PATCH",
{
campaign_id:campaignId
},
"?id=eq."+encodeURIComponent(characterId)
);

character.campaignId=
campaignId;

saveLocalCharacter();

}

}


/* =========================================================
OPEN CAMPAIGN
========================================================= */

async function openCampaign(campaign){

currentCampaign=campaign;

$("campaignTitle").textContent=
campaign.name||"Campaign";

$("campaignDescription").textContent=
campaign.description||
"No campaign description.";

showScreen("campaignDashboard");

await loadCampaignMembers();

}


/* =========================================================
CAMPAIGN MEMBERS
========================================================= */

async function loadCampaignMembers(){

if(!currentCampaign){
return;
}

const container=
$("campaignDashboardContent");

container.innerHTML=
'<div class="card">Loading campaign roster...</div>';

try{

const members=
await supabaseRequest(
"campaign_members",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(currentCampaign.id)+
"&select=*"+
"&order=joined_at.asc"
);

const characters=
await supabaseRequest(
"characters",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(currentCampaign.id)+
"&select=*"+
"&order=created_at.asc"
);

container.innerHTML="";

const header=
document.createElement("div");

header.className="info";

const heading=
document.createElement("h2");

heading.textContent=
"Campaign Roster";

const id=
document.createElement("p");

id.innerHTML=
"<strong>Campaign ID:</strong> "+
escapeHtml(currentCampaign.id);

header.appendChild(heading);
header.appendChild(id);

container.appendChild(header);

if(!characters||characters.length===0){

const empty=
document.createElement("div");

empty.className="card";

empty.innerHTML=
"<p>No characters have joined this campaign yet.</p>";

container.appendChild(empty);

return;

}

characters.forEach(function(char){

const card=
document.createElement("div");

card.className="card";

const title=
document.createElement("h3");

title.textContent=
char.name||"Unnamed Character";

const identity=
document.createElement("p");

identity.textContent=
[
char.race,
char.class,
char.subclass,
"Level "+char.level
].filter(Boolean).join(" • ");

const soul=
document.createElement("p");

soul.innerHTML=
"<strong>Soul:</strong> "+
escapeHtml(char.soul_path||"Unknown");

const background=
document.createElement("p");

background.innerHTML=
"<strong>Background:</strong> "+
escapeHtml(char.background||"Unknown");

card.appendChild(title);
card.appendChild(identity);
card.appendChild(soul);
card.appendChild(background);

container.appendChild(card);

});

}catch(error){

console.error(error);

container.innerHTML=
'<div class="notice error">'+
escapeHtml(error.message)+
'</div>';

}

}


/* =========================================================
CAMPAIGN INFO
========================================================= */

function showCampaignInfo(){

if(!currentCampaign){
return;
}

const container=
$("campaignDashboardContent");

container.innerHTML="";

const info=
document.createElement("div");

info.className="info";

const title=
document.createElement("h2");

title.textContent=
currentCampaign.name;

const description=
document.createElement("p");

description.textContent=
currentCampaign.description||
"No description.";

const id=
document.createElement("div");

id.className="notice";

id.innerHTML=
"<strong>Campaign ID:</strong> "+
escapeHtml(currentCampaign.id);

info.appendChild(title);
info.appendChild(description);
info.appendChild(id);

if(currentCampaign.join_code){

const joinCode=
document.createElement("div");

joinCode.className="notice";

joinCode.innerHTML=
"<strong>Join Code:</strong> "+
escapeHtml(currentCampaign.join_code);

info.appendChild(joinCode);

}

container.appendChild(info);

}


/* =========================================================
MESSAGES
========================================================= */

function showCampaignMessage(message,success=false){

const box=
$("campaignMessage");

box.textContent=message;

box.classList.remove("hidden");

box.classList.toggle("success",success);
box.classList.toggle("error",!success);

}


/* =========================================================
STATS
========================================================= */

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


/* =========================================================
ESCAPE HTML
========================================================= */

function escapeHtml(value){

return String(value??"")
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;");

}


/* =========================================================
LOCAL CHARACTER
========================================================= */

function loadLocalCharacter(){

const saved=
localStorage.getItem(
"soulTrialCharacter"
);

if(!saved){
return;
}

try{

character=
JSON.parse(saved);

}catch(error){

console.warn(
"Saved character could not be loaded."
);

character=null;

}

}


/* =========================================================
BUTTONS
========================================================= */

function wireButtons(){

$("beginButton").addEventListener(
"click",
beginTrial
);

$("campaignHomeButton").addEventListener(
"click",
openCampaigns
);

$("continueName").addEventListener(
"click",
startQuestions
);

$("backFromName").addEventListener(
"click",
function(){
showScreen("home");
}
);

$("continueToCreator").addEventListener(
"click",
openCharacterCreator
);

$("saveCharacterButton").addEventListener(
"click",
saveCharacter
);

$("viewSheetButton").addEventListener(
"click",
viewSheet
);

$("editCharacterButton").addEventListener(
"click",
openCharacterCreator
);

$("campaignsButton").addEventListener(
"click",
openCampaigns
);

$("sheetHomeButton").addEventListener(
"click",
function(){
showScreen("home");
}
);

$("createCampaignButton").addEventListener(
"click",
showCreateCampaign
);

$("joinCampaignButton").addEventListener(
"click",
showJoinCampaign
);

$("campaignCharacterButton").addEventListener(
"click",
function(){

if(character){
viewSheet();
}else{
beginTrial();
}

}
);

$("campaignHomeButton2").addEventListener(
"click",
function(){
showScreen("home");
}
);

$("confirmCreateCampaign").addEventListener(
"click",
createCampaign
);

$("confirmJoinCampaign").addEventListener(
"click",
joinCampaign
);

$("playersButton").addEventListener(
"click",
loadCampaignMembers
);

$("campaignInfoButton").addEventListener(
"click",
showCampaignInfo
);

$("backCampaignsButton").addEventListener(
"click",
openCampaigns
);

}


/* =========================================================
START APP
========================================================= */

function initialize(){

loadLocalCharacter();

wireButtons();

showScreen("home");

}

if(document.readyState==="loading"){

document.addEventListener(
"DOMContentLoaded",
initialize
);

}else{

initialize();

  }
