"use strict";

const SUPABASE_URL =
"https://hcvofqqbtppycgqxzaoi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_5NMRF_b1yMCDPr4LwYa_Ow_cveLPlLI";

let supabaseSession = null;
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

if(!supabaseSession){

await initializeSupabase();

}

const headers={
"apikey":SUPABASE_KEY,
"Authorization":"Bearer "+supabaseSession.access_token,
"Content-Type":"application/json",
"Prefer":"return=representation"
};

const options={
method,
headers
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
CREATE ANONYMOUS USER
========================================================= */

async function createAnonymousSession(){

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
body:JSON.stringify({})
}
);

const data=await response.json();

if(!response.ok){

throw new Error(
data.msg||
data.message||
data.error_description||
"Unable to create anonymous session. Make sure Anonymous Sign-Ins are enabled in Supabase."
);

}

if(!data.access_token){

throw new Error(
"Supabase did not return an anonymous access token."
);

}

supabaseSession=data;

currentUser=data.user;

localStorage.setItem(
"soulTrialSupabaseSession",
JSON.stringify(data)
);

return data;

}


/* =========================================================
RESTORE OR CREATE SESSION
========================================================= */

async function initializeSupabase(){

if(supabaseSession&&currentUser){
return supabaseSession;
}

const saved=
localStorage.getItem(
"soulTrialSupabaseSession"
);

if(saved){

try{

const parsed=
JSON.parse(saved);

if(parsed.access_token){

const response=
await fetch(
SUPABASE_URL+"/auth/v1/user",
{
headers:{
"apikey":SUPABASE_KEY,
"Authorization":"Bearer "+parsed.access_token
}
}
);

if(response.ok){

const user=
await response.json();

supabaseSession=parsed;
currentUser=user;

return parsed;

}

}

}catch(error){

console.warn(
"Stored Supabase session could not be restored:",
error.message
);

}

localStorage.removeItem(
"soulTrialSupabaseSession"
);

}

return await createAnonymousSession();

}


/* =========================================================
INITIALIZE
========================================================= */

initializeSupabase().catch(function(error){

console.warn(
"Supabase anonymous session unavailable:",
error.message
);

});
