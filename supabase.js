"use strict";

/* =========================================================
SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
"https://hcvofqqbtppycgqxzaoi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_5NMRF_b1yMCDPr4LwYa_Ow_cveLPlLI";


/* =========================================================
CURRENT USER
========================================================= */

let currentUser = null;


/* =========================================================
SUPABASE REQUEST
========================================================= */

async function supabaseRequest(
table,
method="GET",
body=null,
query=""
){

const token =
localStorage.getItem("soulTrialAccessToken");

const headers = {
"apikey":SUPABASE_KEY,
"Content-Type":"application/json",
"Prefer":"return=representation"
};

if(token){
headers["Authorization"]="Bearer "+token;
}else{
headers["Authorization"]="Bearer "+SUPABASE_KEY;
}

const options = {
method:method,
headers:headers
};

if(body !== null){
options.body=JSON.stringify(body);
}

const response =
await fetch(
SUPABASE_URL+
"/rest/v1/"+
table+
query,
options
);

const text =
await response.text();

let data=null;

if(text){

try{
data=JSON.parse(text);
}catch{
data=text;
}

}

if(!response.ok){

let message =
"Supabase request failed.";

if(data){

if(typeof data==="object"){

message =
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

async function signupUser(email,password){

const response =
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

const data =
await response.json();

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

currentUser =
data.user||null;

}

return data;

}


/* =========================================================
LOGIN
========================================================= */

async function loginUser(email,password){

const response =
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

const data =
await response.json();

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

currentUser =
data.user||null;

return data;

}


/* =========================================================
RESTORE SESSION
========================================================= */

async function restoreSupabaseSession(){

const token =
localStorage.getItem(
"soulTrialAccessToken"
);

if(!token){
return null;
}

try{

const response =
await fetch(
SUPABASE_URL+
"/auth/v1/user",
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

return null;

}

currentUser =
await response.json();

return currentUser;

}catch(error){

console.warn(
"Session restore failed:",
error
);

return null;

}

}


/* =========================================================
PROFILE
========================================================= */

async function ensureProfile(){

if(!currentUser){
return;
}

try{

const existing =
await supabaseRequest(
"profiles",
"GET",
null,
"?id=eq."+
encodeURIComponent(currentUser.id)+
"&select=*"
);

if(!existing || existing.length===0){

const email =
currentUser.email||
"player@example.com";

const username =
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
SAVE CHARACTER
========================================================= */

async function saveCharacterToSupabase(character){

if(!currentUser || !character){
throw new Error(
"You must be signed in to sync a character."
);
}

const payload = {

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

personality:character.personality||"",

ideal:character.ideal||"",

bond:character.bond||"",

flaw:character.flaw||"",

backstory:character.backstory||""

};

const existing =
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

if(existing && existing.length){

return await supabaseRequest(
"characters",
"PATCH",
payload,
"?id=eq."+
encodeURIComponent(existing[0].id)
);

}

return await supabaseRequest(
"characters",
"POST",
payload
);

}


/* =========================================================
LOAD CHARACTER
========================================================= */

async function loadCharacterFromSupabase(){

if(!currentUser){
return null;
}

try{

const rows =
await supabaseRequest(
"characters",
"GET",
null,
"?player_id=eq."+
encodeURIComponent(currentUser.id)+
"&campaign_id=is.null"+
"&select=*"+
"&order=id.desc"+
"&limit=1"
);

if(!rows || !rows.length){
return null;
}

const row=rows[0];

return {

id:row.id,

name:row.name,

race:row.race,

class:row.class,

subclass:row.subclass,

background:row.background,

level:row.level||1,

scores:{
STR:row.strength||10,
DEX:row.dexterity||10,
CON:row.constitution||10,
INT:row.intelligence||10,
WIS:row.wisdom||10,
CHA:row.charisma||10
},

max_hp:row.max_hp,

armor_class:row.armor_class,

speed:row.speed,

hit_dice:row.hit_dice,

soulPath:row.soul_path,

soulTrait:row.soul_trait,

blessing:row.soul_blessing,

personality:row.personality||"",

ideal:row.ideal||"",

bond:row.bond||"",

flaw:row.flaw||"",

backstory:row.backstory||"",

equipment:[]

};

}catch(error){

console.warn(
"Unable to load character:",
error.message
);

return null;

}

}


/* =========================================================
CREATE CAMPAIGN
========================================================= */

async function createCampaignInSupabase(
name,
description
){

if(!currentUser){

throw new Error(
"You must be signed in."
);

}

const created =
await supabaseRequest(
"campaigns",
"POST",
{
name:name,
description:description
}
);

if(!created || !created.length){

throw new Error(
"Campaign was not created."
);

}

const campaign=created[0];

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

}catch(error){

console.warn(
"Campaign owner membership warning:",
error.message
);

}

return campaign;

}


/* =========================================================
GET CAMPAIGNS
========================================================= */

async function getCampaigns(){

return await supabaseRequest(
"campaigns",
"GET",
null,
"?select=*&order=id.desc"
);

}


/* =========================================================
JOIN CAMPAIGN
========================================================= */

async function joinCampaignInSupabase(
campaignId
){

if(!currentUser){

throw new Error(
"You must be signed in."
);

}

const campaigns =
await supabaseRequest(
"campaigns",
"GET",
null,
"?id=eq."+
encodeURIComponent(campaignId)+
"&select=*"
);

if(!campaigns || !campaigns.length){

throw new Error(
"Campaign not found."
);

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

}catch(error){

const message =
(error.message||"").toLowerCase();

if(
!message.includes("duplicate") &&
!message.includes("unique")
){

throw error;

}

}

return campaign;

}


/* =========================================================
GET CAMPAIGN MEMBERS
========================================================= */

async function getCampaignMembers(
campaignId
){

return await supabaseRequest(
"campaign_members",
"GET",
null,
"?campaign_id=eq."+
encodeURIComponent(campaignId)+
"&select=*"
);

}


/* =========================================================
ATTACH CHARACTER TO CAMPAIGN
========================================================= */

async function attachCharacterToCampaignInSupabase(
campaignId
){

if(!currentUser){
return;
}

const rows =
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

if(rows && rows.length){

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

}