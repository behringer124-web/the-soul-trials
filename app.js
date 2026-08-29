"use strict";

/*
=========================================================
THE SOUL'S TRIAL
APP.JS
=========================================================

FLOW

HOME
 ├── BEGIN THE TRIAL
 │     └── NAME
 │          └── QUIZ
 │               └── RESULT
 │                    └── CHARACTER CREATION
 │                         └── CHARACTER SHEET
 │
 └── CAMPAIGNS
       ├── I'M A DM
       │     └── CREATE CAMPAIGN
       │          └── DM DASHBOARD
       │
       └── I'M A PLAYER
             └── SOUL'S TRIAL
                  └── CHARACTER
                       └── JOIN CAMPAIGN
                            └── CAMPAIGN
=========================================================
*/


/* =========================================================
GLOBAL STATE
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

    if (!target) {
        console.error("Screen not found:", id);
        return;
    }

    target.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
HOME
========================================================= */

function goHome() {

    showScreen("home");

}


/* =========================================================
PLAYER FLOW
========================================================= */

/*
This is the ONLY place the player begins
the Soul's Trial.
*/

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
START QUIZ
========================================================= */

function startQuestions() {

    const input = $("playerName");

    if (!input) {
        alert("Character name field could not be found.");
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

    questionIndex = 0;

    showScreen("quiz");

    displayQuestion();
}


/* =========================================================
DISPLAY QUESTION
========================================================= */

function displayQuestion() {

    if (!Array.isArray(questions) || !questions.length) {

        alert("The Soul's Trial questions could not be loaded.");

        console.error("questions array is missing or empty.");

        return;
    }

    const current = questions[questionIndex];

    if (!current) {

        console.error(
            "Question does not exist:",
            questionIndex
        );

        calculateSoul();

        return;
    }

    const questionNumber = $("questionNumber");
    const progressBar = $("progressBar");
    const question = $("question");
    const flavor = $("questionFlavor");
    const answers = $("answers");

    if (questionNumber) {

        questionNumber.textContent =
            "Question " +
            (questionIndex + 1) +
            " of " +
            questions.length;

    }

    if (progressBar) {

        progressBar.style.width =
            ((questionIndex / questions.length) * 100) + "%";

    }

    if (question) {
        question.textContent = current[0];
    }

    if (flavor) {
        flavor.textContent = current[1];
    }

    if (!answers) {
        console.error("answers container not found.");
        return;
    }

    answers.innerHTML = "";

    current[2].forEach(function(option) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "choice";

        button.textContent = option[0];

        button.addEventListener("click", function() {

            Object.entries(option[1]).forEach(function(entry) {

                const stat = entry[0];
                const points = entry[1];

                if (scores[stat] === undefined) {
                    scores[stat] = 0;
                }

                scores[stat] += points;

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
MODIFIER
========================================================= */

function modifier(score) {

    return Math.floor(
        (Number(score) - 10) / 2
    );

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

        console.error(
            "Soul path not found:",
            highest
        );

        alert("The Soul's Trial could not determine your soul.");

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

        finalScores[entry[0]] =
            standard[index];

    });

    const chosenClass =
        path.classes[0];

    const subclass =
        path.subclasses[chosenClass];

    const race =
        determineRace(scores);

    const data =
        classData[chosenClass];

    character.race = race;

    character.dominantStat = highest;

    character.soulPath =
        path.name;

    character.soulDescription =
        path.description;

    character.class =
        chosenClass;

    character.subclass =
        subclass;

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
RESULT
========================================================= */

function renderResult() {

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

        alert("No character exists.");

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

        if (status) {

            status.textContent =
                "Character saved and synced with the Soul's Trial realm.";

            status.classList.remove("error");

            status.classList.add("success");

        }

        alert(
            "Character saved successfully."
        );

    } catch (error) {

        console.error(error);

        const status =
            $("syncStatus");

        if (status) {

            status.textContent =
                "Character saved on this device. Online sync is currently unavailable.";

            status.classList.remove("success");

            status.classList.add("error");

        }

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

    if (!currentUser) {

        throw new Error(
            "No anonymous player session is available."
        );

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

        armor_class:
            character.armor_class,

        speed:
            character.speed,

        proficiency_bonus:
            character.proficiency_bonus,

        hit_dice:
            character.hit_dice,

        soul_path:
            character.soulPath,

        soul_trait:
            character.soulTrait,

        soul_blessing:
            character.blessing,

        personality:
            character.personality,

        ideal:
            character.ideal,

        bond:
            character.bond,

        flaw:
            character.flaw,

        backstory:
            character.backstory

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
        character.equipment || [];

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
CAMPAIGN ROLE SCREEN
========================================================= */

/*
We use the existing campaigns section.

The two main buttons now have clear jobs:

CREATE CAMPAIGN = DM

JOIN CAMPAIGN = PLAYER

The CHARACTER button lets an existing player
return to their character sheet.
*/

async function openCampaigns() {

    showScreen("campaigns");

    const notice =
        $("campaignAccountNotice");

    if (notice) {

        notice.textContent =
            "Connecting you to the realm...";

    }

    try {

        await initializeSupabase();

        if (notice) {

            notice.textContent =
                "Choose your role: create a campaign as a DM, or enter the Soul's Trial as a player.";

        }

        await loadCampaigns();

    } catch (error) {

        console.error(error);

        if (notice) {

            notice.textContent =
                "Campaign connection failed: " +
                error.message;

        }

    }

}


/* =========================================================
DM BUTTON
========================================================= */

function showCreateCampaign() {

    const createBox =
        $("campaignCreate");

    const joinBox =
        $("campaignJoin");

    if (!createBox) {

        console.error(
            "campaignCreate element not found."
        );

        return;
    }

    if (joinBox) {
        joinBox.classList.add("hidden");
    }

    createBox.classList.remove("hidden");

    const nameInput =
        $("campaignName");

    if (nameInput) {

        setTimeout(function() {

            nameInput.focus();

        }, 100);

    }

}


/* =========================================================
PLAYER BUTTON
========================================================= */

/*
A player should NOT create a campaign.

This button starts the player path.
If they already have a character, they can
go directly to the character sheet instead.
*/

function startPlayerFlow() {

    $("campaignCreate").classList.add("hidden");

    $("campaignJoin").classList.add("hidden");

    if (character) {

        viewSheet();

        return;
    }

    beginTrial();

}


/* =========================================================
JOIN BOX
========================================================= */

function showJoinCampaign() {

    const joinBox =
        $("campaignJoin");

    const createBox =
        $("campaignCreate");

    if (!joinBox) {

        console.error(
            "campaignJoin element not found."
        );

        return;
    }

    if (createBox) {
        createBox.classList.add("hidden");
    }

    joinBox.classList.remove("hidden");

    const codeInput =
        $("campaignCode");

    if (codeInput) {

        setTimeout(function() {

            codeInput.focus();

        }, 100);

    }

}


/* =========================================================
CREATE CAMPAIGN
========================================================= */

async function createCampaign() {

    console.log(
        "CREATE CAMPAIGN BUTTON PRESSED"
    );

    const nameInput =
        $("campaignName");

    const descriptionInput =
        $("campaignDescription");

    if (!nameInput) {

        alert(
            "Campaign name input was not found."
        );

        return;
    }

    const name =
        nameInput.value.trim();

    const description =
        descriptionInput
            ? descriptionInput.value.trim()
            : "";

    if (!name) {

        alert(
            "Please enter a campaign name."
        );

        nameInput.focus();

        return;
    }

    try {

        await initializeSupabase();

        if (!currentUser) {

            throw new Error(
                "Anonymous player session was not created."
            );

        }

        /*
        DM creates the campaign.
        */

        const campaignResult =
            await supabaseRequest(
                "campaigns",
                "POST",
                {
                    name: name,
                    description: description,
                    dm_id: currentUser.id
                }
            );

        if (
            !campaignResult ||
            !Array.isArray(campaignResult) ||
            !campaignResult.length
        ) {

            throw new Error(
                "Supabase did not return the new campaign."
            );

        }

        const campaign =
            campaignResult[0];

        /*
        Add the DM to campaign_members.
        */

        await supabaseRequest(
            "campaign_members",
            "POST",
            {
                campaign_id: campaign.id,
                player_id: currentUser.id,
                role: "dm"
            }
        );

        nameInput.value = "";

        if (descriptionInput) {
            descriptionInput.value = "";
        }

        $("campaignCreate").classList.add("hidden");

        showCampaignMessage(
            "Campaign created successfully.",
            true
        );

        /*
        Immediately open the DM dashboard.
        */

        await openCampaign(campaign);

    } catch (error) {

        console.error(
            "CAMPAIGN CREATION ERROR:",
            error
        );

        showCampaignMessage(
            "Unable to create campaign: " +
            (error.message || error),
            false
        );

    }

}


/* =========================================================
LOAD CAMPAIGNS
========================================================= */

async function loadCampaigns() {

    const container =
        $("campaignList");

    if (!container) {
        return;
    }

    container.innerHTML =
        '<div class="card">Loading campaigns...</div>';

    try {

        /*
        Only load campaigns the current anonymous
        user is actually a member of.

        This prevents every player from seeing
        every campaign in the database.
        */

        if (!currentUser) {
            await initializeSupabase();
        }

        if (!currentUser) {
            throw new Error(
                "No anonymous session available."
            );
        }

        const memberships =
            await supabaseRequest(
                "campaign_members",
                "GET",
                null,
                "?player_id=eq." +
                encodeURIComponent(currentUser.id) +
                "&select=campaign_id"
            );

        container.innerHTML = "";

        if (
            !memberships ||
            memberships.length === 0
        ) {

            container.innerHTML =
                `
                <div class="info">
                    <h2>No Campaigns Yet</h2>
                    <p>
                        If you are a DM, create a campaign above.
                        If you are a player, ask your DM for a campaign ID or join code.
                    </p>
                </div>
                `;

            return;
        }

        for (
            let i = 0;
            i < memberships.length;
            i++
        ) {

            const membership =
                memberships[i];

            const campaigns =
                await supabaseRequest(
                    "campaigns",
                    "GET",
                    null,
                    "?id=eq." +
                    encodeURIComponent(
                        membership.campaign_id
                    ) +
                    "&select=*"
                );

            if (
                !campaigns ||
                !campaigns.length
            ) {
                continue;
            }

            const campaign =
                campaigns[0];

            renderCampaignCard(
                campaign,
                container
            );

        }

    } catch (error) {

        console.error(error);

        container.innerHTML =
            '<div class="notice error">' +
            escapeHtml(error.message) +
            '</div>';

    }

}


/* =========================================================
CAMPAIGN CARD
========================================================= */

function renderCampaignCard(
    campaign,
    container
) {

    const card =
        document.createElement("div");

    card.className = "card";

    const title =
        document.createElement("h3");

    title.textContent =
        campaign.name ||
        "Unnamed Campaign";

    const description =
        document.createElement("p");

    description.textContent =
        campaign.description ||
        "No description.";

    const idText =
        document.createElement("p");

    const strong =
        document.createElement("strong");

    strong.textContent =
        "Campaign ID: ";

    const idSpan =
        document.createElement("span");

    idSpan.textContent =
        campaign.id;

    idText.appendChild(strong);
    idText.appendChild(idSpan);

    const button =
        document.createElement("button");

    button.type = "button";

    button.textContent =
        "OPEN CAMPAIGN";

    button.addEventListener(
        "click",
        function() {

            openCampaign(campaign);

        }
    );

    card.appendChild(title);

    card.appendChild(description);

    card.appendChild(idText);

    if (campaign.join_code) {

        const join =
            document.createElement("p");

        const joinStrong =
            document.createElement("strong");

        joinStrong.textContent =
            "Join Code: ";

        const joinValue =
            document.createElement("span");

        joinValue.textContent =
            campaign.join_code;

        join.appendChild(joinStrong);

        join.appendChild(joinValue);

        card.appendChild(join);

    }

    card.appendChild(button);

    container.appendChild(card);

}


/* =========================================================
JOIN CAMPAIGN
========================================================= */

async function joinCampaign() {

    try {

        await initializeSupabase();

        if (!currentUser) {

            throw new Error(
                "Anonymous player session is unavailable."
            );

        }

        const input =
            $("campaignCode");

        if (!input) {

            throw new Error(
                "Campaign code field was not found."
            );

        }

        const code =
            input.value.trim();

        if (!code) {

            showCampaignMessage(
                "Enter a campaign ID or join code."
            );

            input.focus();

            return;
        }

        /*
        First try campaign ID.
        */

        let campaigns =
            await supabaseRequest(
                "campaigns",
                "GET",
                null,
                "?id=eq." +
                encodeURIComponent(code) +
                "&select=*"
            );

        /*
        If ID didn't work, try join code.
        */

        if (
            !campaigns ||
            campaigns.length === 0
        ) {

            campaigns =
                await supabaseRequest(
                    "campaigns",
                    "GET",
                    null,
                    "?join_code=eq." +
                    encodeURIComponent(code) +
                    "&select=*"
                );

        }

        if (
            !campaigns ||
            campaigns.length === 0
        ) {

            showCampaignMessage(
                "Campaign not found."
            );

            return;
        }

        const campaign =
            campaigns[0];

        /*
        Check whether this anonymous player
        is already a member.
        */

        const members =
            await supabaseRequest(
                "campaign_members",
                "GET",
                null,
                "?campaign_id=eq." +
                encodeURIComponent(campaign.id) +
                "&player_id=eq." +
                encodeURIComponent(currentUser.id) +
                "&select=id"
            );

        if (
            !members ||
            members.length === 0
        ) {

            await supabaseRequest(
                "campaign_members",
                "POST",
                {
                    campaign_id: campaign.id,
                    player_id: currentUser.id,
                    role: "player"
                }
            );

        }

        /*
        Attach player's character if one exists.
        */

        if (character) {

            await attachCharacterToCampaign(
                campaign.id
            );

        }

        input.value = "";

        showCampaignMessage(
            "You joined " +
            campaign.name +
            ".",
            true
        );

        await openCampaign(campaign);

    } catch (error) {

        console.error(error);

        showCampaignMessage(
            error.message ||
            "Unable to join campaign."
        );

    }

}


/* =========================================================
ATTACH CHARACTER TO CAMPAIGN
========================================================= */

async function attachCharacterToCampaign(
    campaignId
) {

    if (!character) {
        return;
    }

    await initializeSupabase();

    let characterId =
        character.supabaseId;

    /*
    Find existing character if necessary.
    */

    if (!characterId) {

        const rows =
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

        if (
            rows &&
            rows.length
        ) {

            characterId =
                rows[0].id;

        }

    }

    /*
    If the character hasn't been uploaded,
    upload it first.
    */

    if (!characterId) {

        await saveCharacterToSupabase();

        characterId =
            character.supabaseId;

    }

    if (characterId) {

        await supabaseRequest(
            "characters",
            "PATCH",
            {
                campaign_id: campaignId
            },
            "?id=eq." +
            encodeURIComponent(characterId)
        );

        character.campaignId =
            campaignId;

        saveLocalCharacter();

    }

}


/* =========================================================
OPEN CAMPAIGN
========================================================= */

async function openCampaign(
    campaign
) {

    currentCampaign =
        campaign;

    $("campaignTitle").textContent =
        campaign.name ||
        "Campaign";

    $("campaignDescription").textContent =
        campaign.description ||
        "No campaign description.";

    showScreen(
        "campaignDashboard"
    );

    await loadCampaignMembers();

}


/* =========================================================
CAMPAIGN MEMBERS
========================================================= */

async function loadCampaignMembers() {

    if (!currentCampaign) {
        return;
    }

    const container =
        $("campaignDashboardContent");

    if (!container) {
        return;
    }

    container.innerHTML =
        '<div class="card">Loading campaign roster...</div>';

    try {

        const characters =
            await supabaseRequest(
                "characters",
                "GET",
                null,
                "?campaign_id=eq." +
                encodeURIComponent(
                    currentCampaign.id
                ) +
                "&select=*" +
                "&order=created_at.asc"
            );

        container.innerHTML = "";

        /*
        Campaign information at the top.
        */

        const header =
            document.createElement("div");

        header.className =
            "info";

        const heading =
            document.createElement("h2");

        heading.textContent =
            "Campaign Roster";

        const id =
            document.createElement("p");

        id.innerHTML =
            "<strong>Campaign ID:</strong> " +
            escapeHtml(
                currentCampaign.id
            );

        header.appendChild(heading);

        header.appendChild(id);

        if (currentCampaign.join_code) {

            const join =
                document.createElement("p");

            join.innerHTML =
                "<strong>Join Code:</strong> " +
                escapeHtml(
                    currentCampaign.join_code
                );

            header.appendChild(join);

        }

        container.appendChild(header);

        if (
            !characters ||
            characters.length === 0
        ) {

            const empty =
                document.createElement("div");

            empty.className =
                "card";

            empty.innerHTML =
                "<p>No characters have joined this campaign yet.</p>";

            container.appendChild(empty);

            return;
        }

        characters.forEach(
            function(char) {

                const card =
                    document.createElement("div");

                card.className =
                    "card";

                const title =
                    document.createElement("h3");

                title.textContent =
                    char.name ||
                    "Unnamed Character";

                const identity =
                    document.createElement("p");

                identity.textContent =
                    [
                        char.race,
                        char.class,
                        char.subclass,
                        "Level " +
                        char.level
                    ]
                    .filter(Boolean)
                    .join(" • ");

                const soul =
                    document.createElement("p");

                soul.innerHTML =
                    "<strong>Soul:</strong> " +
                    escapeHtml(
                        char.soul_path ||
                        "Unknown"
                    );

                const background =
                    document.createElement("p");

                background.innerHTML =
                    "<strong>Background:</strong> " +
                    escapeHtml(
                        char.background ||
                        "Unknown"
                    );

                card.appendChild(title);

                card.appendChild(identity);

                card.appendChild(soul);

                card.appendChild(background);

                container.appendChild(card);

            }
        );

    } catch (error) {

        console.error(error);

        container.innerHTML =
            '<div class="notice error">' +
            escapeHtml(error.message) +
            '</div>';

    }

}


/* =========================================================
CAMPAIGN INFO
========================================================= */

function showCampaignInfo() {

    if (!currentCampaign) {
        return;
    }

    const container =
        $("campaignDashboardContent");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const info =
        document.createElement("div");

    info.className =
        "info";

    const title =
        document.createElement("h2");

    title.textContent =
        currentCampaign.name;

    const description =
        document.createElement("p");

    description.textContent =
        currentCampaign.description ||
        "No description.";

    const id =
        document.createElement("div");

    id.className =
        "notice";

    id.innerHTML =
        "<strong>Campaign ID:</strong> " +
        escapeHtml(
            currentCampaign.id
        );

    info.appendChild(title);

    info.appendChild(description);

    info.appendChild(id);

    if (currentCampaign.join_code) {

        const joinCode =
            document.createElement("div");

        joinCode.className =
            "notice";

        joinCode.innerHTML =
            "<strong>Join Code:</strong> " +
            escapeHtml(
                currentCampaign.join_code
            );

        info.appendChild(joinCode);

    }

    container.appendChild(info);

}


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
        "hidden"
    );

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
STATS
========================================================= */

function renderStats(
    statScores
) {

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

    /*
    HOME
    */

    const beginButton =
        $("beginButton");

    if (beginButton) {

        beginButton.addEventListener(
            "click",
            beginTrial
        );

    }


    const campaignHomeButton =
        $("campaignHomeButton");

    if (campaignHomeButton) {

        campaignHomeButton.addEventListener(
            "click",
            openCampaigns
        );

    }


    /*
    NAME
    */

    const continueName =
        $("continueName");

    if (continueName) {

        continueName.addEventListener(
            "click",
            startQuestions
        );

    }


    const backFromName =
        $("backFromName");

    if (backFromName) {

        backFromName.addEventListener(
            "click",
            function() {

                showScreen("home");

            }
        );

    }


    /*
    RESULT
    */

    const continueToCreator =
        $("continueToCreator");

    if (continueToCreator) {

        continueToCreator.addEventListener(
            "click",
            openCharacterCreator
        );

    }


    /*
    CHARACTER CREATOR
    */

    const saveCharacterButton =
        $("saveCharacterButton");

    if (saveCharacterButton) {

        saveCharacterButton.addEventListener(
            "click",
            saveCharacter
        );

    }


    const viewSheetButton =
        $("viewSheetButton");

    if (viewSheetButton) {

        viewSheetButton.addEventListener(
            "click",
            viewSheet
        );

    }


    /*
    CHARACTER SHEET
    */

    const editCharacterButton =
        $("editCharacterButton");

    if (editCharacterButton) {

        editCharacterButton.addEventListener(
            "click",
            openCharacterCreator
        );

    }


    const campaignsButton =
        $("campaignsButton");

    if (campaignsButton) {

        campaignsButton.addEventListener(
            "click",
            openCampaigns
        );

    }


    const sheetHomeButton =
        $("sheetHomeButton");

    if (sheetHomeButton) {

        sheetHomeButton.addEventListener(
            "click",
            goHome
        );

    }


    /*
    CAMPAIGN SCREEN

    CREATE CAMPAIGN = DM
    JOIN CAMPAIGN = PLAYER JOIN
    CHARACTER = PLAYER CHARACTER
    */

    const createCampaignButton =
        $("createCampaignButton");

    if (createCampaignButton) {

        createCampaignButton.addEventListener(
            "click",
            showCreateCampaign
        );

    }


    const joinCampaignButton =
        $("joinCampaignButton");

    if (joinCampaignButton) {

        joinCampaignButton.addEventListener(
            "click",
            showJoinCampaign
        );

    }


    const campaignCharacterButton =
        $("campaignCharacterButton");

    if (campaignCharacterButton) {

        campaignCharacterButton.addEventListener(
            "click",
            startPlayerFlow
        );

    }


    const campaignHomeButton2 =
        $("campaignHomeButton2");

    if (campaignHomeButton2) {

        campaignHomeButton2.addEventListener(
            "click",
            goHome
        );

    }


    /*
    CAMPAIGN CREATE FORM
    */

    const confirmCreateCampaign =
        $("confirmCreateCampaign");

    if (confirmCreateCampaign) {

        confirmCreateCampaign.addEventListener(
            "click",
            createCampaign
        );

    }


    /*
    CAMPAIGN JOIN FORM
    */

    const confirmJoinCampaign =
        $("confirmJoinCampaign");

    if (confirmJoinCampaign) {

        confirmJoinCampaign.addEventListener(
            "click",
            joinCampaign
        );

    }


    /*
    CAMPAIGN DASHBOARD
    */

    const playersButton =
        $("playersButton");

    if (playersButton) {

        playersButton.addEventListener(
            "click",
            loadCampaignMembers
        );

    }


    const campaignInfoButton =
        $("campaignInfoButton");

    if (campaignInfoButton) {

        campaignInfoButton.addEventListener(
            "click",
            showCampaignInfo
        );

    }


    const backCampaignsButton =
        $("backCampaignsButton");

    if (backCampaignsButton) {

        backCampaignsButton.addEventListener(
            "click",
            openCampaigns
        );

    }

}


/* =========================================================
START APP
========================================================= */

function initialize() {

    console.log(
        "The Soul's Trial initializing..."
    );

    loadLocalCharacter();

    wireButtons();

    showScreen("home");

    /*
    Start anonymous Supabase connection
    in the background.

    The quiz itself does NOT depend on Supabase.
    */

    if (
        typeof initializeSupabase ===
        "function"
    ) {

        initializeSupabase()
            .then(function() {

                console.log(
                    "Anonymous Supabase session ready."
                );

            })
            .catch(function(error) {

                console.warn(
                    "Supabase connection unavailable:",
                    error.message
                );

            });

    } else {

        console.warn(
            "initializeSupabase() was not found."
        );

    }

}


/* =========================================================
DOM READY
========================================================= */

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
