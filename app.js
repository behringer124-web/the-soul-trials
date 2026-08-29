"use strict";

/* =========================================================
THE SOUL'S TRIAL — APP.JS
========================================================= */

let character = null;
let currentCampaign = null;

let questionIndex = 0;

let scores = {
STR: 0,
DEX: 0,
CON: 0,
INT: 0,
WIS: 0,
CHA: 0
};

let selectedEquipment = [];

/* =========================================================
DOM HELPER
========================================================= */

function $(id) {
return document.getElementById(id);
}

/* =========================================================
SCREEN CONTROL
========================================================= */

function showScreen(id) {

document.querySelectorAll("section").forEach(function(section) {
    section.classList.add("hidden");
});

const target = $(id);

if (target) {
    target.classList.remove("hidden");
}

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

/* =========================================================
BEGIN TRIAL
========================================================= */

function beginTrial() {

scores = {
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0
};

questionIndex = 0;
selectedEquipment = [];
character = null;

const nameInput = $("playerName");

if (nameInput) {
    nameInput.value = "";
}

showScreen("name");

}

/* =========================================================
START QUESTIONS
========================================================= */

function startQuestions() {

const input = $("playerName");

if (!input) {
    console.error("playerName input not found.");
    return;
}

const name = input.value.trim();

if (!name) {

    alert("Your soul must have a name.");

    input.focus();

    return;
}

character = {
    name: name,
    level: 1
};

showScreen("quiz");

displayQuestion();

}

/* =========================================================
DISPLAY QUESTION
========================================================= */

function displayQuestion() {

if (!questions || !questions.length) {

    alert("No quiz questions were loaded.");

    console.error("questions array is missing or empty.");

    return;
}

const current = questions[questionIndex];

if (!current) {
    calculateSoul();
    return;
}

const number = $("questionNumber");
const progress = $("progressBar");
const question = $("question");
const flavor = $("questionFlavor");
const answers = $("answers");

if (!number || !progress || !question || !flavor || !answers) {

    console.error("Quiz elements are missing from index.html.");

    return;
}

number.textContent =
    "Question " +
    (questionIndex + 1) +
    " of " +
    questions.length;

progress.style.width =
    ((questionIndex / questions.length) * 100) + "%";

question.textContent = current[0];

flavor.textContent = current[1];

answers.innerHTML = "";

current[2].forEach(function(option) {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "choice";
    button.textContent = option[0];

    button.addEventListener("click", function() {

        Object.entries(option[1]).forEach(function(entry) {

            const stat = entry[0];
            const amount = entry[1];

            if (scores[stat] === undefined) {
                scores[stat] = 0;
            }

            scores[stat] += amount;

        });

        questionIndex++;

        if (questionIndex < questions.length) {

            displayQuestion();

        } else {

            calculateSoul();

        }

    });

    answers.appendChild(button);

});

}

/* =========================================================
ABILITY MODIFIER
========================================================= */

function modifier(score) {

return Math.floor((Number(score) - 10) / 2);

}

/* =========================================================
CALCULATE SOUL
========================================================= */

function calculateSoul() {

const sorted =
    Object.entries(scores).sort(function(a, b) {

        if (b[1] !== a[1]) {
            return b[1] - a[1];
        }

        return a[0].localeCompare(b[0]);

    });

const highest = sorted[0][0];

const path = soulPaths[highest];

if (!path) {

    console.error("No soul path found for:", highest);

    alert("Unable to determine your soul path.");

    return;
}

const standard = [
    16,
    14,
    13,
    12,
    10,
    8
];

const finalScores = {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10
};

sorted.forEach(function(entry, index) {

    finalScores[entry[0]] = standard[index];

});

const chosenClass = path.classes[0];

const subclass =
    path.subclasses[chosenClass];

const race =
    determineRace(scores);

const data =
    classData[chosenClass];

if (!data) {

    console.error("Class data missing:", chosenClass);

    alert("Unable to create your character.");

    return;
}

character.race = race;

character.dominantStat = highest;

character.soulPath = path.name;

character.soulDescription =
    path.description;

character.class = chosenClass;

character.subclass = subclass;

character.background =
    path.background;

character.soulTrait =
    path.trait;

character.traitDescription =
    path.traitDescription;

character.blessing =
    path.blessing;

character.blessingDescription =
    path.blessingDescription;

character.scores =
    finalScores;

character.max_hp =
    data.hp +
    modifier(finalScores.CON);

character.current_hp =
    character.max_hp;

character.armor_class =
    data.ac;

character.speed =
    data.speed;

character.hit_dice =
    "1d" + data.hitDie;

character.proficiency_bonus = 2;

character.experience_points = 0;

character.inspiration = false;

character.equipment = [];

saveLocalCharacter();

renderResult();

}

/* =========================================================
RESULT SCREEN
========================================================= */

function renderResult() {

if (!character) {
    return;
}

$("resultName").textContent =
    character.name;

$("soulPath").textContent =
    character.soulPath;

$("soulDescription").textContent =
    character.soulDescription;

$("resultRace").textContent =
    character.race;

$("resultClass").textContent =
    character.class;

$("resultSubclass").textContent =
    character.subclass;

$("resultBackground").textContent =
    character.background;

$("resultStats").innerHTML =
    renderStats(character.scores);

$("soulTrait").textContent =
    character.soulTrait;

$("traitDescription").textContent =
    character.traitDescription;

$("awakeningBlessing").textContent =
    character.blessing;

$("blessingDescription").textContent =
    character.blessingDescription;

showScreen("result");

}

/* =========================================================
CHARACTER CREATOR
========================================================= */

function openCharacterCreator() {

if (!character) {

    alert("No character exists yet.");

    return;
}

$("characterName").textContent =
    character.name;

$("creatorRace").textContent =
    character.race;

$("creatorClass").textContent =
    character.class;

$("creatorSubclass").textContent =
    character.subclass;

$("creatorBackground").textContent =
    character.background;

$("creatorLevel").textContent =
    character.level;

$("abilityScores").innerHTML =
    renderStats(character.scores);

$("creatorHP").textContent =
    character.max_hp;

$("creatorAC").textContent =
    character.armor_class;

$("creatorSpeed").textContent =
    character.speed + " ft";

$("personality").value =
    character.personality || "";

$("ideal").value =
    character.ideal || "";

$("bond").value =
    character.bond || "";

$("flaw").value =
    character.flaw || "";

$("backstory").value =
    character.backstory || "";

selectedEquipment =
    Array.isArray(character.equipment)
        ? character.equipment.slice()
        : [];

renderEquipmentOptions();

showScreen("creator");

}

/* =========================================================
EQUIPMENT
========================================================= */

function renderEquipmentOptions() {

if (!character) {
    return;
}

const data =
    classData[character.class];

const container =
    $("equipmentOptions");

if (!container || !data) {
    return;
}

container.innerHTML = "";

data.equipment.forEach(function(item) {

    const wrapper =
        document.createElement("label");

    wrapper.className = "card";

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.value = item;

    checkbox.checked =
        selectedEquipment.includes(item);

    checkbox.style.width = "auto";

    wrapper.appendChild(checkbox);

    wrapper.appendChild(
        document.createTextNode(" " + item)
    );

    checkbox.addEventListener(
        "change",
        function() {

            if (checkbox.checked) {

                if (!selectedEquipment.includes(item)) {
                    selectedEquipment.push(item);
                }

            } else {

                selectedEquipment =
                    selectedEquipment.filter(
                        function(x) {
                            return x !== item;
                        }
                    );

            }

        }
    );

    container.appendChild(wrapper);

});

}

/* =========================================================
SAVE LOCAL CHARACTER
========================================================= */

function saveLocalCharacter() {

if (!character) {
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

async function saveCharacter() {

if (!character) {

    alert("Create a character first.");

    return;
}

character.personality =
    $("personality").value.trim();

character.ideal =
    $("ideal").value.trim();

character.bond =
    $("bond").value.trim();

character.flaw =
    $("flaw").value.trim();

character.backstory =
    $("backstory").value.trim();

character.equipment =
    Array.from(
        new Set(selectedEquipment)
    );

saveLocalCharacter();

try {

    await initializeSupabase();

    await saveCharacterToSupabase();

    const status =
        $("syncStatus");

    status.textContent =
        "Character saved and synced with the Soul's Trial realm.";

    status.classList.remove("error");

    status.classList.add("success");

    alert("Character saved successfully.");

} catch (error) {

    console.error(error);

    const status =
        $("syncStatus");

    status.textContent =
        "Character saved on this device. Online sync is currently unavailable.";

    status.classList.remove("success");

    status.classList.add("error");

    alert(
        "Character saved locally, but online synchronization failed:\n\n" +
        error.message
    );

}

}

/* =========================================================
SAVE CHARACTER TO SUPABASE
========================================================= */

async function saveCharacterToSupabase() {

if (!character) {
    return;
}

await initializeSupabase();

if (!currentUser) {
    throw new Error("Anonymous session is unavailable.");
}

const payload = {

    player_id: currentUser.id,

    name: character.name,

    race: character.race,

    class: character.class,

    subclass: character.subclass,

    background: character.background,

    level: character.level,

    strength: character.scores.STR,

    dexterity: character.scores.DEX,

    constitution: character.scores.CON,

    intelligence: character.scores.INT,

    wisdom: character.scores.WIS,

    charisma: character.scores.CHA,

    max_hp: character.max_hp,

    current_hp:
        character.current_hp ||
        character.max_hp,

    armor_class: character.armor_class,

    speed: character.speed,

    proficiency_bonus:
        character.proficiency_bonus,

    hit_dice: character.hit_dice,

    soul_path: character.soulPath,

    soul_trait: character.soulTrait,

    soul_blessing: character.blessing,

    personality:
        character.personality || "",

    ideal:
        character.ideal || "",

    bond:
        character.bond || "",

    flaw:
        character.flaw || "",

    backstory:
        character.backstory || ""

};

const existing =
    await supabaseRequest(
        "characters",
        "GET",
        null,
        "?player_id=eq." +
        encodeURIComponent(currentUser.id) +
        "&select=id" +
        "&order=updated_at.desc" +
        "&limit=1"
    );

if (existing && existing.length) {

    await supabaseRequest(
        "characters",
        "PATCH",
        payload,
        "?id=eq." +
        encodeURIComponent(existing[0].id)
    );

    character.supabaseId =
        existing[0].id;

} else {

    const created =
        await supabaseRequest(
            "characters",
            "POST",
            payload
        );

    if (created && created.length) {

        character.supabaseId =
            created[0].id;

    }

}

saveLocalCharacter();

}

/* =========================================================
CHARACTER SHEET
========================================================= */

function viewSheet() {

if (!character) {

    alert("Create a character first.");

    return;
}

$("sheetName").textContent =
    character.name;

$("sheetIdentity").textContent =
    character.race +
    " • " +
    character.class +
    " • " +
    character.subclass +
    " • Level " +
    character.level +
    " • " +
    character.background;

$("sheetHP").textContent =
    character.current_hp ||
    character.max_hp;

$("sheetAC").textContent =
    character.armor_class;

$("sheetSpeed").textContent =
    character.speed + " ft";

$("sheetLevel").textContent =
    character.level;

$("sheetProficiency").textContent =
    "+" +
    character.proficiency_bonus;

$("sheetHitDice").textContent =
    character.hit_dice;

$("sheetStats").innerHTML =
    renderStats(character.scores);

$("sheetPath").textContent =
    character.soulPath;

$("sheetPathDescription").textContent =
    character.soulDescription;

$("sheetTrait").textContent =
    character.soulTrait;

$("sheetTraitDescription").textContent =
    character.traitDescription;

$("sheetBlessing").textContent =
    character.blessing;

$("sheetBlessingDescription").textContent =
    character.blessingDescription;

$("sheetPersonality").textContent =
    character.personality || "—";

$("sheetIdeal").textContent =
    character.ideal || "—";

$("sheetBond").textContent =
    character.bond || "—";

$("sheetFlaw").textContent =
    character.flaw || "—";

$("sheetBackstory").textContent =
    character.backstory || "—";

renderSheetEquipment();

showScreen("sheet");

}

/* =========================================================
SHEET EQUIPMENT
========================================================= */

function renderSheetEquipment() {

const container =
    $("sheetEquipment");

if (!container) {
    return;
}

container.innerHTML = "";

const equipment =
    character &&
    Array.isArray(character.equipment)
        ? character.equipment
        : [];

if (!equipment.length) {

    container.innerHTML =
        '<div class="card">No equipment selected.</div>';

    return;
}

equipment.forEach(function(item) {

    const span =
        document.createElement("span");

    span.className = "tag";

    span.textContent = item;

    container.appendChild(span);

});

}
    
/* =========================================================
CAMPAIGNS - COMPLETE SYSTEM
========================================================= */

async function openCampaigns(){

showScreen("campaigns");

const notice=$("campaignAccountNotice");

if(notice){
notice.textContent=
"Connecting your Soul to the campaign realm...";
}

try{

await initializeSupabase();

if(!currentUser){

throw new Error(
"Anonymous session unavailable."
);

}

if(notice){

notice.textContent=
"You are connected anonymously. No login is required.";

}

await loadCampaigns();

}catch(error){

console.error("CAMPAIGN CONNECTION ERROR:",error);

if(notice){

notice.textContent=
"Campaign connection failed: "+
(error.message||error);

}

}

}


/* =========================================================
SHOW CREATE FORM
========================================================= */

function showCreateCampaign(){

const createBox=$("campaignCreate");
const joinBox=$("campaignJoin");

if(!createBox){

console.error(
"campaignCreate element not found."
);

return;

}

if(joinBox){

joinBox.classList.add("hidden");

}

createBox.classList.remove("hidden");

const input=$("campaignName");

if(input){

setTimeout(function(){

input.focus();

},100);

}

}


/* =========================================================
SHOW JOIN FORM
========================================================= */

function showJoinCampaign(){

const joinBox=$("campaignJoin");
const createBox=$("campaignCreate");

if(!joinBox){

console.error(
"campaignJoin element not found."
);

return;

}

if(createBox){

createBox.classList.add("hidden");

}

joinBox.classList.remove("hidden");

const input=$("campaignCode");

if(input){

setTimeout(function(){

input.focus();

},100);

}

}


/* =========================================================
CREATE CAMPAIGN
========================================================= */

async function createCampaign(){

console.log(
"CREATE CAMPAIGN BUTTON PRESSED"
);

const nameInput=$("campaignName");
const descriptionInput=$("campaignDescription");

if(!nameInput){

alert(
"Campaign name input was not found."
);

return;

}

const name=
nameInput.value.trim();

const description=
descriptionInput
?descriptionInput.value.trim()
:"";

if(!name){

alert(
"Please enter a campaign name."
);

nameInput.focus();

return;

}

try{

await initializeSupabase();

if(!currentUser){

throw new Error(
"Anonymous session unavailable."
);

}

console.log(
"Creating campaign for:",
currentUser.id
);


/* CREATE CAMPAIGN */

const result=
await supabaseRequest(
"campaigns",
"POST",
{
name:name,
description:description,
dm_id:currentUser.id
}
);

if(
!result||
!Array.isArray(result)||
!result.length
){

throw new Error(
"Supabase did not return the campaign."
);

}

const campaign=result[0];

console.log(
"Campaign created:",
campaign
);


/* ADD DM AS MEMBER */

await supabaseRequest(
"campaign_members",
"POST",
{
campaign_id:campaign.id,
player_id:currentUser.id,
role:"dm"
}
);


/* CLEAR FORM */

nameInput.value="";

if(descriptionInput){

descriptionInput.value="";

}


/* HIDE CREATE FORM */

$("campaignCreate").classList.add(
"hidden"
);


/* SHOW CAMPAIGN */

showCampaignMessage(
"Campaign created successfully! Your Campaign ID is: "+
campaign.id,
true
);

await openCampaign(campaign);

}catch(error){

console.error(
"CREATE CAMPAIGN ERROR:",
error
);

showCampaignMessage(
"Unable to create campaign: "+
(error.message||error),
false
);

alert(
"Campaign creation failed:\n\n"+
(error.message||error)
);

}

}


/* =========================================================
JOIN CAMPAIGN
========================================================= */

async function joinCampaign(){

console.log(
"JOIN CAMPAIGN BUTTON PRESSED"
);

const codeInput=$("campaignCode");

if(!codeInput){

alert(
"Campaign code input was not found."
);

return;

}

const code=
codeInput.value.trim();

if(!code){

alert(
"Please enter a Campaign ID or Join Code."
);

codeInput.focus();

return;

}

try{

await initializeSupabase();

if(!currentUser){

throw new Error(
"Anonymous session unavailable."
);

}


/* FIND BY CAMPAIGN ID */

let campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?id=eq."+
encodeURIComponent(code)+
"&select=*"
);


/* FIND BY JOIN CODE */

if(
!campaigns||
campaigns.length===0
){

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


if(
!campaigns||
campaigns.length===0
){

throw new Error(
"Campaign not found."
);

}

const campaign=
campaigns[0];

console.log(
"Campaign found:",
campaign
);


/* CHECK MEMBERSHIP */

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


/* ADD PLAYER */

if(
!members||
members.length===0
){

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


/* ATTACH CHARACTER */

if(character){

await attachCharacterToCampaign(
campaign.id
);

}


/* CLEAR INPUT */

codeInput.value="";

showCampaignMessage(
"You joined "+campaign.name+"!",
true
);


/* OPEN CAMPAIGN */

await openCampaign(campaign);

}catch(error){

console.error(
"JOIN CAMPAIGN ERROR:",
error
);

showCampaignMessage(
"Unable to join campaign: "+
(error.message||error),
false
);

alert(
"Unable to join campaign:\n\n"+
(error.message||error)
);

}

}


/* =========================================================
LOAD CAMPAIGNS
========================================================= */

async function loadCampaigns(){

const container=$("campaignList");

if(!container){
return;
}

container.innerHTML=
'<div class="card">Loading campaigns...</div>';

try{

await initializeSupabase();

const campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?select=*&order=created_at.desc"
);

container.innerHTML="";

if(
!campaigns||
campaigns.length===0
){

container.innerHTML=
`
<div class="info">
<h2>No Campaigns Yet</h2>
<p>
Create a campaign as a DM or join one using the Campaign ID provided by your DM.
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
campaign.name||
"Unnamed Campaign";


const description=
document.createElement("p");

description.textContent=
campaign.description||
"No description.";


const id=
document.createElement("p");

id.textContent=
"Campaign ID: "+
campaign.id;


const button=
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

card.appendChild(id);

card.appendChild(button);

container.appendChild(card);

});

}catch(error){

console.error(
"LOAD CAMPAIGNS ERROR:",
error
);

container.innerHTML=
'<div class="notice error">'+
escapeHtml(error.message)+
'</div>';

}

}


/* =========================================================
ATTACH CHARACTER TO CAMPAIGN
========================================================= */

async function attachCharacterToCampaign(
campaignId
){

if(!character){
return;
}

await initializeSupabase();

let characterId=
character.supabaseId;


/* FIND EXISTING CHARACTER */

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

if(
rows&&
rows.length
){

characterId=
rows[0].id;

}

}


/* SAVE CHARACTER IF NEEDED */

if(!characterId){

await saveCharacterToSupabase();

characterId=
character.supabaseId;

}


/* CONNECT CHARACTER */

if(characterId){

await supabaseRequest(
"characters",
"PATCH",
{
campaign_id:campaignId
},
"?id=eq."+
encodeURIComponent(characterId)
);

character.campaignId=
campaignId;

saveLocalCharacter();

}

}


/* =========================================================
OPEN CAMPAIGN
========================================================= */

async function openCampaign(
campaign
){

if(!campaign){
return;
}

currentCampaign=
campaign;

$("campaignTitle").textContent=
campaign.name||
"Campaign";

$("campaignDescription").textContent=
campaign.description||
"No campaign description.";

showScreen(
"campaignDashboard"
);

await loadCampaignMembers();

}


/* =========================================================
LOAD CAMPAIGN MEMBERS
========================================================= */

async function loadCampaignMembers(){

if(!currentCampaign){
return;
}

const container=
$("campaignDashboardContent");

if(!container){
return;
}

container.innerHTML=
'<div class="card">Loading campaign roster...</div>';

try{

await initializeSupabase();


const members=
await supabaseRequest(
"campaign_members",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(
currentCampaign.id
)+
"&select=*"+
"&order=joined_at.asc"
);


const characters=
await supabaseRequest(
"characters",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(
currentCampaign.id
)+
"&select=*"+
"&order=created_at.asc"
);


container.innerHTML="";


/* HEADER */

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
escapeHtml(
currentCampaign.id
);


header.appendChild(heading);

header.appendChild(id);

container.appendChild(header);


/* EMPTY */

if(
!characters||
characters.length===0
){

const empty=
document.createElement("div");

empty.className="card";

empty.innerHTML=
"<p>No characters have joined this campaign yet.</p>";

container.appendChild(empty);

return;

}


/* CHARACTERS */

characters.forEach(function(char){

const card=
document.createElement("div");

card.className="card";


const title=
document.createElement("h3");

title.textContent=
char.name||
"Unnamed Character";


const identity=
document.createElement("p");

identity.textContent=
[
char.race,
char.class,
char.subclass,
char.level
?
"Level "+char.level
:null
]
.filter(Boolean)
.join(" • ");


const soul=
document.createElement("p");

soul.innerHTML=
"<strong>Soul:</strong> "+
escapeHtml(
char.soul_path||
"Unknown"
);


const background=
document.createElement("p");

background.innerHTML=
"<strong>Background:</strong> "+
escapeHtml(
char.background||
"Unknown"
);


card.appendChild(title);

card.appendChild(identity);

card.appendChild(soul);

card.appendChild(background);

container.appendChild(card);

});

}catch(error){

console.error(
"LOAD CAMPAIGN MEMBERS ERROR:",
error
);

container.innerHTML=
'<div class="notice error">'+
escapeHtml(
error.message
)+
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
escapeHtml(
currentCampaign.id
);


info.appendChild(title);

info.appendChild(description);

info.appendChild(id);


if(currentCampaign.join_code){

const joinCode=
document.createElement("div");

joinCode.className="notice";

joinCode.innerHTML=
"<strong>Join Code:</strong> "+
escapeHtml(
currentCampaign.join_code
);

info.appendChild(joinCode);

}


container.appendChild(info);

}

/* =========================================================
INITIALIZE CAMPAIGN BUTTONS
========================================================= */

wireCampaignButtons();  
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
...
}
);

$("campaignHomeButton2").addEventListener(
"click",
function(){
...
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


/* =========================================================
CAMPAIGN MESSAGE
========================================================= */

function showCampaignMessage(
message,
success = false
) {

const box =
    $("campaignMessage");

if (!box) {
    return;
}

box.textContent =
    message;

box.classList.remove(
    "hidden",
    "success",
    "error"
);

box.classList.add(
    success
        ? "success"
        : "error"
);

}

/* =========================================================
RENDER STATS
========================================================= */

function renderStats(statScores) {

if (!statScores) {
    return "";
}

return Object.entries(
    statScores
)
.map(function(entry) {

    const stat =
        entry[0];

    const value =
        entry[1];

    const mod =
        modifier(value);

    return `
        <div class="stat">
            <strong>${escapeHtml(value)}</strong>
            ${escapeHtml(stat)}
            <br>
            <span class="small">
                ${mod >= 0 ? "+" : ""}${mod}
            </span>
        </div>
    `;

})
.join("");

}

/* =========================================================
ESCAPE HTML
========================================================= */

function escapeHtml(value) {

return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* =========================================================
LOAD LOCAL CHARACTER
========================================================= */

function loadLocalCharacter() {

const saved =
    localStorage.getItem(
        "soulTrialCharacter"
    );

if (!saved) {
    return;
}

try {

    character =
        JSON.parse(saved);

} catch (error) {

    console.warn(
        "Saved character could not be loaded."
    );

    character = null;

}

}

/* =========================================================
BUTTONS
========================================================= */

function wireButtons() {

const begin =
    $("beginButton");

if (begin) {
    begin.addEventListener(
        "click",
        beginTrial
    );
}


const campaignHome =
    $("campaignHomeButton");

if (campaignHome) {
    campaignHome.addEventListener(
        "click",
        openCampaigns
    );
}


const continueName =
    $("continueName");

if (continueName) {
    continueName.addEventListener(
        "click",
        startQuestions
    );
}


const backName =
    $("backFromName");

if (backName) {
    backName.addEventListener(
        "click",
        function() {
            showScreen("home");
        }
    );
}


const continueCreator =
    $("continueToCreator");

if (continueCreator) {
    continueCreator.addEventListener(
        "click",
        openCharacterCreator
    );
}


const saveCharacter =
    $("saveCharacterButton");

if (saveCharacter) {
    saveCharacter.addEventListener(
        "click",
        saveCharacter
    );
}


const viewSheet =
    $("viewSheetButton");

if (viewSheet) {
    viewSheet.addEventListener(
        "click",
        viewSheet
    );
}


const editCharacter =
    $("editCharacterButton");

if (editCharacter) {
    editCharacter.addEventListener(
        "click",
        openCharacterCreator
    );
}


const campaigns =
    $("campaignsButton");

if (campaigns) {
    campaigns.addEventListener(
        "click",
        openCampaigns
    );
}


const sheetHome =
    $("sheetHomeButton");

if (sheetHome) {
    sheetHome.addEventListener(
        "click",
        function() {
            showScreen("home");
        }
    );
}


/* =====================================================
   CAMPAIGN BUTTONS
   ===================================================== */

const createCampaign =
    $("createCampaignButton");

if (createCampaign) {

    createCampaign.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showCreateCampaign();

        }
    );

}


const joinCampaign =
    $("joinCampaignButton");

if (joinCampaign) {

    joinCampaign.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showJoinCampaign();

        }
    );

}


const campaignCharacter =
    $("campaignCharacterButton");

if (campaignCharacter) {

    campaignCharacter.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            if (character) {

                viewSheet();

            } else {

                beginTrial();

            }

        }
    );

}


const campaignHome2 =
    $("campaignHomeButton2");

if (campaignHome2) {

    campaignHome2.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showScreen("home");

        }
    );

}


/* =====================================================
   ACTUAL CREATE CAMPAIGN BUTTON
   ===================================================== */

const confirmCreate =
    $("confirmCreateCampaign");

if (confirmCreate) {

    confirmCreate.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            createCampaign();

        }
    );

}


/* =====================================================
   ACTUAL JOIN CAMPAIGN BUTTON
   ===================================================== */

const confirmJoin =
    $("confirmJoinCampaign");

if (confirmJoin) {

    confirmJoin.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            joinCampaign();

        }
    );

}


/* =====================================================
   CAMPAIGN DASHBOARD
   ===================================================== */

const players =
    $("playersButton");

if (players) {

    players.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            loadCampaignMembers();

        }
    );

}


const info =
    $("campaignInfoButton");

if (info) {

    info.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showCampaignInfo();

        }
    );

}


const backCampaigns =
    $("backCampaignsButton");

if (backCampaigns) {

    backCampaigns.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            openCampaigns();

        }
    );

}

}

/* =========================================================
KEYBOARD SUPPORT
========================================================= */

function wireKeyboardSupport() {

const nameInput =
    $("playerName");

if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                startQuestions();

            }

        }
    );

}


const campaignName =
    $("campaignName");

if (campaignName) {

    campaignName.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                createCampaign();

            }

        }
    );

}


const campaignCode =
    $("campaignCode");

if (campaignCode) {

    campaignCode.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                joinCampaign();

            }

        }
    );

}

}

/* =========================================================
APP INITIALIZATION
========================================================= */

function initialize() {

console.log(
    "The Soul's Trial initializing..."
);

loadLocalCharacter();

wireButtons();

wireKeyboardSupport();

showScreen("home");

console.log(
    "The Soul's Trial initialized successfully."
);

}

if (
document.readyState ===
"loading"
) {

document.addEventListener(
    "DOMContentLoaded",
    initialize
);

} else {

initialize();

        }
