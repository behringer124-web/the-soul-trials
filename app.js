"use strict";

/* =========================================================
THE SOUL'S TRIAL
MAIN APPLICATION
========================================================= */

let character = null;
let currentCampaign = null;

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
DOM HELPER
========================================================= */

function $(id){
return document.getElementById(id);
}


/* =========================================================
SCREEN CONTROL
========================================================= */

function showScreen(id){

document.querySelectorAll("section").forEach(
function(section){
section.classList.add("hidden");
}
);

const target=$(id);

if(!target){

console.error(
"Screen not found:",
id
);

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

function showAuthMessage(
message,
success=false
){

const box=$("authMessage");

if(!box){
return;
}

box.textContent=message;

box.classList.remove("hidden");

box.classList.toggle(
"success",
success
);

box.classList.toggle(
"error",
!success
);

}


function showCampaignMessage(
message,
success=false
){

const box=$("campaignMessage");

if(!box){
return;
}

box.textContent=message;

box.classList.remove("hidden");

box.classList.toggle(
"success",
success
);

box.classList.toggle(
"error",
!success
);

}


/* =========================================================
BEGIN TRIAL
========================================================= */

function beginTrial(){

console.log(
"The Soul's Trial: Beginning trial."
);

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

console.log(
"The Soul's Trial: Starting questions."
);

const name =
$("playerName").value.trim();

if(!name){

alert(
"Your soul must have a name."
);

return;

}

character={
name:name,
level:1
};

questionIndex=0;

scores={
STR:0,
DEX:0,
CON:0,
INT:0,
WIS:0,
CHA:0
};

showScreen("quiz");

displayQuestion();

}


/* =========================================================
DISPLAY QUESTION
========================================================= */

function displayQuestion(){

console.log(
"Displaying question:",
questionIndex+1
);

if(
typeof questions==="undefined"
){

console.error(
"questions is undefined. Check data.js."
);

alert(
"The quiz data could not be loaded. Make sure data.js is uploaded to GitHub and is spelled exactly: data.js"
);

return;

}

if(
!Array.isArray(questions) ||
questions.length===0
){

console.error(
"questions is empty."
);

alert(
"No quiz questions were loaded."
);

return;

}

if(
questionIndex<0 ||
questionIndex>=questions.length
){

console.error(
"Invalid question index:",
questionIndex
);

return;

}

const current =
questions[questionIndex];

$("questionNumber").textContent =
"Question "+
(questionIndex+1)+
" of "+
questions.length;

$("progressBar").style.width =
(
(questionIndex/questions.length)*100
)+"%";

$("question").textContent =
current[0];

$("questionFlavor").textContent =
current[1];

const answers =
$("answers");

answers.innerHTML="";

current[2].forEach(
function(option){

const button =
document.createElement("button");

button.type="button";

button.className="choice";

button.textContent=
option[0];

button.addEventListener(
"click",
function(){

selectAnswer(option[1]);

}
);

answers.appendChild(button);

}
);

}


/* =========================================================
SELECT ANSWER
========================================================= */

function selectAnswer(answerScores){

Object.entries(answerScores)
.forEach(
function(entry){

const stat=entry[0];
const value=entry[1];

if(
Object.prototype.hasOwnProperty.call(
scores,
stat
)
){

scores[stat]+=value;

}

}
);

questionIndex++;

if(
questionIndex<questions.length
){

displayQuestion();

}else{

calculateSoul();

}

}


/* =========================================================
CALCULATE SOUL
========================================================= */

function calculateSoul(){

console.log(
"Calculating soul path.",
scores
);

const sorted =
Object.entries(scores)
.sort(
function(a,b){

if(b[1]!==a[1]){
return b[1]-a[1];
}

return a[0].localeCompare(b[0]);

}
);

const highest =
sorted[0][0];

const path =
soulPaths[highest];

if(!path){

console.error(
"Soul path missing:",
highest
);

alert(
"Unable to determine your soul path."
);

return;

}

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

sorted.forEach(
function(entry,index){

finalScores[entry[0]] =
standard[index];

}
);

const chosenClass =
path.classes[0];

const subclass =
path.subclasses[chosenClass];

const race =
determineRace(scores);

const data =
classData[chosenClass];

character.race=race;

character.dominantStat=highest;

character.soulPath=path.name;

character.soulDescription=
path.description;

character.class=
chosenClass;

character.subclass=
subclass;

character.background=
path.background;

character.soulTrait=
path.trait;

character.traitDescription=
path.traitDescription;

character.blessing=
path.blessing;

character.blessingDescription=
path.blessingDescription;

character.scores=
finalScores;

character.max_hp=
data.hp+
modifier(finalScores.CON);

character.armor_class=
data.ac;

character.speed=
data.speed;

character.hit_dice=
"1d"+
data.hitDie;

character.proficiency_bonus=2;

character.equipment=[];

renderResult();

}


/* =========================================================
RACE
========================================================= */

function determineRace(scores){

const sorted =
Object.entries(scores)
.sort(
function(a,b){
return b[1]-a[1];
}
);

const primary=sorted[0][0];

const secondary=sorted[1][0];

if(primary==="STR" && secondary==="CON"){
return "Half-Orc";
}

if(primary==="STR" && secondary==="CHA"){
return "Dragonborn";
}

if(primary==="DEX" && secondary==="CHA"){
return "Half-Elf";
}

if(primary==="DEX" && secondary==="INT"){
return "Elf";
}

if(primary==="DEX" && secondary==="CON"){
return "Halfling";
}

if(primary==="CON" && secondary==="WIS"){
return "Dwarf";
}

if(primary==="CON" && secondary==="STR"){
return "Half-Orc";
}

if(primary==="INT" && secondary==="DEX"){
return "Gnome";
}

if(primary==="INT" && secondary==="CHA"){
return "Tiefling";
}

if(primary==="WIS" && secondary==="CON"){
return "Dwarf";
}

if(primary==="WIS" && secondary==="CHA"){
return "Half-Elf";
}

if(primary==="CHA" && secondary==="INT"){
return "Tiefling";
}

if(primary==="CHA" && secondary==="STR"){
return "Dragonborn";
}

return "Human";

}


/* =========================================================
RESULT
========================================================= */

function renderResult(){

$("resultName").textContent=
character.name;

$("soulPath").textContent=
character.soulPath;

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

alert(
"No character exists yet."
);

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

const data =
classData[character.class];

if(!data){
return;
}

const container =
$("equipmentOptions");

container.innerHTML="";

data.equipment.forEach(
function(item){

const wrapper =
document.createElement("label");

wrapper.className="card";

wrapper.style.cursor="pointer";

const checkbox =
document.createElement("input");

checkbox.type="checkbox";

checkbox.value=item;

checkbox.checked=
selectedEquipment.includes(item);

checkbox.style.width="auto";

checkbox.style.marginRight="8px";

wrapper.appendChild(checkbox);

wrapper.appendChild(
document.createTextNode(item)
);

checkbox.addEventListener(
"change",
function(){

if(checkbox.checked){

if(
!selectedEquipment.includes(item)
){

selectedEquipment.push(item);

}

}else{

selectedEquipment =
selectedEquipment.filter(
function(x){
return x!==item;
}
);

}

}
);

container.appendChild(wrapper);

}
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
Array.from(
new Set(selectedEquipment)
);

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

if(currentUser){

try{

await saveCharacterToSupabase(
character
);

alert(
"Character saved successfully to your account."
);

}catch(error){

console.error(error);

alert(
"Character saved on this device, but account synchronization failed.\n\n"+
error.message
);

}

}else{

alert(
"Character saved on this device.\n\n"+
"Sign in later to sync it with your account."
);

}

}


/* =========================================================
CHARACTER SHEET
========================================================= */

function viewSheet(){

if(!character){

alert(
"Create a character first."
);

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
character.max_hp;

$("sheetAC").textContent=
character.armor_class;

$("sheetSpeed").textContent=
character.speed+" ft";

$("sheetLevel").textContent=
character.level;

$("sheetProficiency").textContent=
"+"+
character.proficiency_bonus;

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

const equipment=
character.equipment||[];

if(!equipment.length){

container.innerHTML=
'<div class="card">No equipment selected.</div>';

return;

}

container.innerHTML="";

equipment.forEach(
function(item){

const span =
document.createElement("span");

span.className="tag";

span.textContent=item;

container.appendChild(span);

}
);

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
"Signed in as "+
(currentUser.email||"player");

showScreen("campaigns");

await loadCampaigns();

}


/* =========================================================
CAMPAIGN UI
========================================================= */

function showCreateCampaign(){

$("campaignCreate")
.classList.remove("hidden");

$("campaignJoin")
.classList.add("hidden");

}


function showJoinCampaign(){

$("campaignJoin")
.classList.remove("hidden");

$("campaignCreate")
.classList.add("hidden");

}


/* =========================================================
CREATE CAMPAIGN
========================================================= */

async function createCampaign(){

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

try{

const campaign =
await createCampaignInSupabase(
name,
description
);

$("campaignName").value="";

$("campaignDescription").value="";

showCampaignMessage(
"Campaign created successfully.",
true
);

await loadCampaigns();

if(campaign){
await openCampaign(campaign);
}

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

const campaigns =
await getCampaigns();

if(
!campaigns||
campaigns.length===0
){

container.innerHTML=
`
<div class="info">
<h2>No Campaigns Yet</h2>
<p>
Create a campaign as a DM or join one using a campaign ID.
</p>
</div>
`;

return;

}

container.innerHTML="";

campaigns.forEach(
function(campaign){

const card =
document.createElement("div");

card.className="card";

const title =
document.createElement("h3");

title.textContent=
campaign.name||
"Unnamed Campaign";

const description =
document.createElement("p");

description.textContent=
campaign.description||
"No description.";

const idText =
document.createElement("p");

idText.innerHTML=
"<strong>Campaign ID:</strong> ";

const idSpan =
document.createElement("span");

idSpan.textContent=
String(campaign.id);

idText.appendChild(idSpan);

const button =
document.createElement("button");

button.type="button";

button.textContent=
"OPEN CAMPAIGN";

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

}
);

}catch(error){

console.error(error);

container.innerHTML=
'<div class="notice error"></div>';

container.firstElementChild.textContent=
"Unable to load campaigns: "+
error.message;

}

}


/* =========================================================
JOIN CAMPAIGN
========================================================= */

async function joinCampaign(){

const code=
$("campaignCode").value.trim();

if(!code){

showCampaignMessage(
"Enter a campaign ID."
);

return;

}

try{

const campaign =
await joinCampaignInSupabase(
code
);

if(character){

try{

await attachCharacterToCampaignInSupabase(
campaign.id
);

}catch(error){

console.warn(
"Character attachment failed:",
error
);

}

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
OPEN CAMPAIGN
========================================================= */

async function openCampaign(campaign){

if(!campaign){
return;
}

currentCampaign=campaign;

$("campaignTitle").textContent=
campaign.name||
"Campaign";

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

const members =
await getCampaignMembers(
currentCampaign.id
);

container.innerHTML="";

const header =
document.createElement("div");

header.className="info";

const heading =
document.createElement("h2");

heading.textContent=
"Campaign Roster";

const campaignId =
document.createElement("p");

campaignId.innerHTML=
"<strong>Campaign ID:</strong> ";

const idSpan =
document.createElement("span");

idSpan.textContent=
String(currentCampaign.id);

campaignId.appendChild(idSpan);

header.appendChild(heading);

header.appendChild(campaignId);

container.appendChild(header);

if(
!members||
members.length===0
){

const empty =
document.createElement("div");

empty.className="card";

empty.textContent=
"No players have joined this campaign yet.";

container.appendChild(empty);

return;

}

members.forEach(
function(member,index){

const card =
document.createElement("div");

card.className="card";

const title =
document.createElement("h3");

title.textContent=
"Member "+(index+1);

const player =
document.createElement("p");

player.innerHTML=
"<strong>Player ID:</strong> ";

const playerId =
document.createElement("span");

playerId.textContent=
String(member.player_id);

player.appendChild(playerId);

const role =
document.createElement("p");

role.innerHTML=
"<strong>Role:</strong> ";

const roleText =
document.createElement("span");

roleText.textContent=
member.role||"player";

role.appendChild(roleText);

card.appendChild(title);

card.appendChild(player);

card.appendChild(role);

container.appendChild(card);

}
);

}catch(error){

console.error(error);

container.innerHTML=
'<div class="notice error"></div>';

container.firstElementChild.textContent=
"Unable to load players: "+
error.message;

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

const info =
document.createElement("div");

info.className="info";

const title =
document.createElement("h2");

title.textContent=
currentCampaign.name||
"Campaign";

const description =
document.createElement("p");

description.textContent=
currentCampaign.description||
"No description.";

const id =
document.createElement("div");

id.className="notice";

id.innerHTML=
"<strong>Campaign ID:</strong> ";

const idText =
document.createElement("span");

idText.textContent=
String(currentCampaign.id);

id.appendChild(idText);

info.appendChild(title);

info.appendChild(description);

info.appendChild(id);

container.appendChild(info);

}


/* =========================================================
UTILITIES
========================================================= */

function modifier(score){

return Math.floor(
(Number(score)-10)/2
);

}


function renderStats(statScores){

return Object.entries(
statScores
).map(
function(entry){

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

}
).join("");

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
LOCAL CHARACTER
========================================================= */

function loadLocalCharacter(){

const saved =
localStorage.getItem(
"soulTrialCharacter"
);

if(!saved){
return;
}

try{

character =
JSON.parse(saved);

console.log(
"Local character loaded:",
character.name
);

}catch(error){

console.warn(
"Saved character could not be loaded.",
error
);

character=null;

}

}


/* =========================================================
LOGIN
========================================================= */

async function login(){

const email =
$("loginEmail").value.trim();

const password =
$("loginPassword").value;

if(!email){

showAuthMessage(
"Enter your email."
);

return;

}

if(!password){

showAuthMessage(
"Enter your password."
);

return;

}

try{

await loginUser(
email,
password
);

await ensureProfile();

showAuthMessage(
"Signed in successfully.",
true
);

const cloudCharacter =
await loadCharacterFromSupabase();

if(cloudCharacter){

character=cloudCharacter;

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

}

setTimeout(
function(){

if(character){

viewSheet();

}else{

showScreen("home");

}

},
500
);

}catch(error){

console.error(error);

showAuthMessage(
error.message||
"Login failed."
);

}

}


/* =========================================================
SIGN UP
========================================================= */

async function signup(){

const email =
$("loginEmail").value.trim();

const password =
$("loginPassword").value;

if(!email){

showAuthMessage(
"Enter an email address."
);

return;

}

if(password.length<6){

showAuthMessage(
"Password must be at least 6 characters."
);

return;

}

try{

await signupUser(
email,
password
);

if(currentUser){

await ensureProfile();

showAuthMessage(
"Account created successfully. You are signed in.",
true
);

setTimeout(
function(){
showScreen("home");
},
800
);

}else{

showAuthMessage(
"Account created. Check your email if confirmation is enabled.",
true
);

}

}catch(error){

console.error(error);

showAuthMessage(
error.message||
"Unable to create account."
);

}

}


/* =========================================================
BUTTON WIRING
========================================================= */

function wireButtons(){

console.log(
"The Soul's Trial: Wiring buttons."
);

const requiredButtons=[

"beginButton",
"loginButton",
"backFromLogin",
"signInButton",
"signUpButton",
"continueName",
"backFromName",
"continueToCreator",
"saveCharacterButton",
"viewSheetButton",
"editCharacterButton",
"campaignsButton",
"sheetHomeButton",
"createCampaignButton",
"joinCampaignButton",
"campaignCharacterButton",
"confirmCreateCampaign",
"confirmJoinCampaign",
"playersButton",
"campaignInfoButton",
"backCampaignsButton"

];

for(
const id of requiredButtons
){

if(!$(`${id}`)){

console.error(
"Missing button:",
id
);

}

}


/* HOME */

$("beginButton")
.addEventListener(
"click",
beginTrial
);

$("loginButton")
.addEventListener(
"click",
showLogin
);


/* LOGIN */

$("backFromLogin")
.addEventListener(
"click",
function(){
showScreen("home");
}
);

$("signInButton")
.addEventListener(
"click",
login
);

$("signUpButton")
.addEventListener(
"click",
signup
);


/* NAME */

$("continueName")
.addEventListener(
"click",
startQuestions
);

$("backFromName")
.addEventListener(
"click",
function(){
showScreen("home");
}
);


/* RESULT */

$("continueToCreator")
.addEventListener(
"click",
openCharacterCreator
);


/* CREATOR */

$("saveCharacterButton")
.addEventListener(
"click",
saveCharacter
);

$("viewSheetButton")
.addEventListener(
"click",
viewSheet
);


/* SHEET */

$("editCharacterButton")
.addEventListener(
"click",
openCharacterCreator
);

$("campaignsButton")
.addEventListener(
"click",
openCampaigns
);

$("sheetHomeButton")
.addEventListener(
"click",
function(){
showScreen("home");
}
);


/* CAMPAIGNS */

$("createCampaignButton")
.addEventListener(
"click",
showCreateCampaign
);

$("joinCampaignButton")
.addEventListener(
"click",
showJoinCampaign
);

$("campaignCharacterButton")
.addEventListener(
"click",
viewSheet
);

$("confirmCreateCampaign")
.addEventListener(
"click",
createCampaign
);

$("confirmJoinCampaign")
.addEventListener(
"click",
joinCampaign
);


/* CAMPAIGN DASHBOARD */

$("playersButton")
.addEventListener(
"click",
loadCampaignMembers
);

$("campaignInfoButton")
.addEventListener(
"click",
showCampaignInfo
);

$("backCampaignsButton")
.addEventListener(
"click",
openCampaigns
);

}


/* =========================================================
INITIALIZE
========================================================= */

async function initialize(){

console.log(
"The Soul's Trial: Initializing."
);

loadLocalCharacter();

wireButtons();

showScreen("home");

/*
Supabase loads AFTER the application is already working.
A database failure therefore cannot stop the quiz.
*/

try{

await restoreSupabaseSession();

if(currentUser){

await ensureProfile();

const cloudCharacter =
await loadCharacterFromSupabase();

if(cloudCharacter){

character=cloudCharacter;

localStorage.setItem(
"soulTrialCharacter",
JSON.stringify(character)
);

}

}

}catch(error){

console.warn(
"Supabase initialization warning:",
error
);

}

console.log(
"The Soul's Trial: Ready."
);

}


/* =========================================================
START APPLICATION
========================================================= */

if(
document.readyState==="loading"
){

document.addEventListener(
"DOMContentLoaded",
initialize
);

}else{

initialize();

}