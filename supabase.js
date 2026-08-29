"use strict";

/* =========================================================
THE SOUL'S TRIAL — SUPABASE
========================================================= */

const SUPABASE_URL =
"https://hcvofqqbtppycgqxzaoi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_5NMRF_b1yMCDPr4LwYa_Ow_cveLPlLI";


/* =========================================================
SUPABASE REQUEST
========================================================= */

async function supabaseRequest(
table,
method="GET",
body=null,
query=""
){

const token=
localStorage.getItem("soulTrialAccessToken");

const headers={
"apikey":SUPABASE_KEY,
"Content-Type":"application/json",
"Prefer":"return=representation"
};

if(token){
headers["Authorization"]="Bearer "+token;
}else{
headers["Authorization"]="Bearer "+SUPABASE_KEY;
}

const options={
method:method,
headers:headers
};

if(body!==null){
options.body=JSON.stringify(body);
}

const response=
await fetch(
SUPABASE_URL+
"/rest/v1/"+
table+
query,
options
);

const text=await response.text();

let data=null;

if(text){

try{
data=JSON.parse(text);
}catch{
data=text;
}

}

if(!response.ok){

let message="Supabase request failed.";

if(data){

if(typeof data==="object"){

message=
data.message||
data.msg||
data.hint||
data.error_description||
JSON.stringify(data);

}else{

message=String(data);

}

}

throw new Error(message);

}

return data;

}


/* =========================================================
SIGN UP
========================================================= */

async function signup(){

const email=$("loginEmail").value.trim();
const password=$("loginPassword").value;

if(!email){

showAuthMessage("Enter an email address.");

return;

}

if(password.length<6){

showAuthMessage(
"Password must be at least 6 characters."
);

return;

}

try{

const response=
await fetch(
SUPABASE_URL+
"/auth/v1/signup",
{
method:"POST",
headers:{
"apikey":SUPABASE_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.msg||
data.message||
data.error_description||
"Unable to create account."
);

}

if(data.access_token){

localStorage.setItem(
"soulTrialAccessToken",
data.access_token
);

currentUser=data.user||null;

await ensureProfile();

showAuthMessage(
"Account created successfully. You are signed in.",
true
);

setTimeout(function(){

showScreen("home");

},800);

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
LOGIN
========================================================= */

async function login(){

const email=$("loginEmail").value.trim();
const password=$("loginPassword").value;

if(!email){

showAuthMessage("Enter your email.");

return;

}

if(!password){

showAuthMessage("Enter your password.");

return;

}

try{

const response=
await fetch(
SUPABASE_URL+
"/auth/v1/token?grant_type=password",
{
method:"POST",
headers:{
"apikey":SUPABASE_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.error_description||
data.msg||
data.message||
"Login failed."
);

}

if(!data.access_token){

throw new Error(
"Supabase did not return a login token."
);

}

localStorage.setItem(
"soulTrialAccessToken",
data.access_token
);

currentUser=data.user||null;

await ensureProfile();

showAuthMessage(
"Signed in successfully.",
true
);

setTimeout(function(){

if(character){
viewSheet();
}else{
showScreen("home");
}

},500);

}catch(error){

console.error(error);

showAuthMessage(
error.message||
"Login failed."
);

}

}


/* =========================================================
PROFILE
========================================================= */

async function ensureProfile(){

if(!currentUser)return;

try{

const existing=
await supabaseRequest(
"profiles",
"GET",
null,
"?id=eq."+
encodeURIComponent(currentUser.id)+
"&select=*"
);

if(!existing||existing.length===0){

const email=
currentUser.email||
"player";

const username=
email.split("@")[0];

await supabaseRequest(
"profiles",
"POST",
{
id:currentUser.id,
username:username,
display_name:username
}
);

}

}catch(error){

console.warn(
"Profile setup warning:",
error.message
);

}

}


/* =========================================================
RESTORE SESSION
========================================================= */

async function restoreSession(){

const token=
localStorage.getItem("soulTrialAccessToken");

if(!token)return;

try{

const response=
await fetch(
SUPABASE_URL+"/auth/v1/user",
{
method:"GET",
headers:{
"apikey":SUPABASE_KEY,
"Authorization":"Bearer "+token
}
}
);

if(!response.ok){

localStorage.removeItem(
"soulTrialAccessToken"
);

currentUser=null;

return;

}

currentUser=await response.json();

await ensureProfile();

}catch(error){

console.warn(
"Supabase session restoration failed:",
error.message
);

}

}


/* =========================================================
SAVE CHARACTER
========================================================= */

async function saveCharacterToSupabase(){

if(!currentUser||!character){
return;
}

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
armor_class:character.armor_class,
speed:character.speed,
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
"&campaign_id=is.null"+
"&select=id"+
"&limit=1"
);

if(existing&&existing.length){

await supabaseRequest(
"characters",
"PATCH",
payload,
"?id=eq."+
encodeURIComponent(existing[0].id)
);

}else{

await supabaseRequest(
"characters",
"POST",
payload
);

}

}


/* =========================================================
CAMPAIGNS
========================================================= */

async function createCampaign(){

if(!currentUser){

showCampaignMessage(
"Please sign in first."
);

return;

}

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

const created=
await supabaseRequest(
"campaigns",
"POST",
{
name:name,
description:description
}
);

const campaign=
created&&created.length
?created[0]
:null;

if(campaign){

try{

await supabaseRequest(
"campaign_members",
"POST",
{
player_id:currentUser.id,
campaign_id:campaign.id,
role:"dm"
}
);

}catch(memberError){

console.warn(
"Campaign membership warning:",
memberError.message
);

}

}

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

const container=$("campaignList");

container.innerHTML=
'<div class="card">Loading campaigns...</div>';

try{

const campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?select=*&order=id.desc"
);

if(!campaigns||campaigns.length===0){

container.innerHTML=
`
<div class="info">
<h2>No Campaigns Yet</h2>
<p>Create a campaign as a DM or join one using a campaign ID.</p>
</div>
`;

return;

}

container.innerHTML="";

campaigns.forEach(function(campaign){

const card=document.createElement("div");

card.className="card";

const title=document.createElement("h3");

title.textContent=
campaign.name||"Unnamed Campaign";

const description=document.createElement("p");

description.textContent=
campaign.description||
"No description.";

const idText=document.createElement("p");

idText.innerHTML="<strong>Campaign ID:</strong> ";

const idSpan=document.createElement("span");

idSpan.textContent=String(campaign.id);

idText.appendChild(idSpan);

const button=document.createElement("button");

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
'<div class="notice error">Unable to load campaigns: '+
escapeHtml(error.message)+
'</div>';

}

}


/* =========================================================
JOIN
========================================================= */

async function joinCampaign(){

if(!currentUser){

showCampaignMessage(
"Please sign in first."
);

return;

}

const code=
$("campaignCode").value.trim();

if(!code){

showCampaignMessage(
"Enter a campaign ID."
);

return;

}

try{

const campaigns=
await supabaseRequest(
"campaigns",
"GET",
null,
"?id=eq."+
encodeURIComponent(code)+
"&select=*"
);

if(!campaigns||campaigns.length===0){

showCampaignMessage(
"Campaign not found."
);

return;

}

const campaign=campaigns[0];

try{

await supabaseRequest(
"campaign_members",
"POST",
{
player_id:currentUser.id,
campaign_id:campaign.id,
role:"player"
}
);

}catch(memberError){

const message=
(memberError.message||"").toLowerCase();

if(
!message.includes("duplicate")&&
!message.includes("unique")
){

throw memberError;

}

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

if(!currentUser||!character)return;

try{

const rows=
await supabaseRequest(
"characters",
"GET",
null,
"?player_id=eq."+
encodeURIComponent(currentUser.id)+
"&campaign_id=is.null"+
"&select=id"+
"&limit=1"
);

if(rows&&rows.length){

await supabaseRequest(
"characters",
"PATCH",
{
campaign_id:campaignId
},
"?id=eq."+
encodeURIComponent(rows[0].id)
);

}

}catch(error){

console.warn(
"Unable to attach character:",
error.message
);

}

}


/* =========================================================
OPEN CAMPAIGN
========================================================= */

async function openCampaign(campaign){

if(!campaign)return;

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
MEMBERS
========================================================= */

async function loadCampaignMembers(){

if(!currentCampaign)return;

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
"&select=*"
);

container.innerHTML="";

const header=document.createElement("div");

header.className="info";

const heading=document.createElement("h2");

heading.textContent="Campaign Roster";

const campaignId=document.createElement("p");

campaignId.innerHTML=
"<strong>Campaign ID:</strong> "+
escapeHtml(currentCampaign.id);

header.appendChild(heading);
header.appendChild(campaignId);

container.appendChild(header);

if(!members||members.length===0){

const empty=document.createElement("div");

empty.className="card";

empty.textContent=
"No players have joined this campaign yet.";

container.appendChild(empty);

return;

}

members.forEach(function(member,index){

const card=document.createElement("div");

card.className="card";

const title=document.createElement("h3");

title.textContent="Member "+(index+1);

const player=document.createElement("p");

player.innerHTML=
"<strong>Player ID:</strong> "+
escapeHtml(member.player_id);

const role=document.createElement("p");

role.innerHTML=
"<strong>Role:</strong> "+
escapeHtml(member.role||"player");

card.appendChild(title);
card.appendChild(player);
card.appendChild(role);

container.appendChild(card);

});

}catch(error){

console.error(error);

container.innerHTML=
'<div class="notice error">Unable to load players: '+
escapeHtml(error.message)+
'</div>';

}

}


/* =========================================================
CAMPAIGN INFO
========================================================= */

function showCampaignInfo(){

if(!currentCampaign)return;

const container=
$("campaignDashboardContent");

container.innerHTML="";

const info=document.createElement("div");

info.className="info";

const title=document.createElement("h2");

title.textContent=
currentCampaign.name||"Campaign";

const description=document.createElement("p");

description.textContent=
currentCampaign.description||
"No description.";

const id=document.createElement("div");

id.className="notice";

id.innerHTML=
"<strong>Campaign ID:</strong> "+
escapeHtml(currentCampaign.id);

info.appendChild(title);
info.appendChild(description);
info.appendChild(id);

container.appendChild(info);

}


/* =========================================================
START SUPABASE
========================================================= */

function initializeSupabase(){

restoreSession().catch(function(error){

console.warn(
"Supabase initialization failed:",
error.message
);

});

}

if(document.readyState==="loading"){

document.addEventListener(
"DOMContentLoaded",
initializeSupabase
);

}else{

initializeSupabase();

}