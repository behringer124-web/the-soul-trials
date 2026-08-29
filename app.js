"use strict";

/* =========================================================
   THE SOUL'S TRIAL
   COMPLETE APPLICATION SCRIPT
   ========================================================= */

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

let currentMode = null;


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
   PLAYER FLOW
   ========================================================= */

function beginPlayerFlow() {

    console.log("BEGIN AS PLAYER");

    currentMode = "player";

    questionIndex = 0;

    scores = {
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0
    };

    selectedEquipment = [];

    character = null;

    const nameInput = $("playerName");

    if (nameInput) {
        nameInput.value = "";
    }

    showScreen("name");
}


/* =========================================================
   DM FLOW
   ========================================================= */

async function beginDMFlow() {

    console.log("BEGIN AS DM");

    currentMode = "dm";

    showScreen("campaigns");

    const notice = $("campaignAccountNotice");

    if (notice) {
        notice.textContent =
            "Connecting you to the campaign realm...";
    }

    try {

        await initializeSupabase();

        if (!currentUser) {
            throw new Error(
                "Anonymous session could not be created."
            );
        }

        if (notice) {
            notice.textContent =
                "You are connected anonymously. No login is required.";
        }

        await loadCampaigns();

    } catch (error) {

        console.error("DM connection error:", error);

        if (notice) {
            notice.textContent =
                "Campaign connection failed: " +
                (error.message || error);
        }

    }
}


/* =========================================================
   OLD BEGIN TRIAL SUPPORT
   ========================================================= */

function beginTrial() {

    beginPlayerFlow();

}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuestions() {

    const nameInput = $("playerName");

    if (!nameInput) {
        alert("Character name input could not be found.");
        return;
    }

    const name = nameInput.value.trim();

    if (!name) {

        alert(
            "Your soul must have a name."
        );

        nameInput.focus();

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

    if (!questions || !questions.length) {

        console.error("No questions found in data.js.");

        alert(
            "The Soul's Trial questions could not be loaded."
        );

        return;
    }

    const current = questions[questionIndex];

    if (!current) {
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
            ((questionIndex / questions.length) * 100) +
            "%";

    }

    if (question) {
        question.textContent = current[0];
    }

    if (flavor) {
        flavor.textContent = current[1];
    }

    if (!answers) {
        console.error("Answers container not found.");
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

            Object.entries(option[1]).forEach(
                function(entry) {

                    const stat = entry[0];
                    const amount = entry[1];

                    if (
                        Object.prototype.hasOwnProperty.call(
                            scores,
                            stat
                        )
                    ) {

                        scores[stat] += amount;

                    }

                }
            );

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

    return Math.floor(
        (Number(score) - 10) / 2
    );

}


/* =========================================================
   CALCULATE SOUL
   ========================================================= */

function calculateSoul() {

    const sorted =
        Object.entries(scores).sort(
            function(a, b) {

                if (b[1] !== a[1]) {
                    return b[1] - a[1];
                }

                return a[0].localeCompare(b[0]);

            }
        );

    const highest =
        sorted[0][0];

    const path =
        soulPaths[highest];

    if (!path) {

        console.error(
            "Soul path not found:",
            highest
        );

        alert(
            "The Soul's Trial could not determine your path."
        );

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

    sorted.forEach(
        function(entry, index) {

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

    if (!data) {

        console.error(
            "Class data not found:",
            chosenClass
        );

        alert(
            "Character class data could not be loaded."
        );

        return;
    }

    character.race = race;

    character.dominantStat =
        highest;

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
   RESULT SCREEN
   ========================================================= */

function renderResult() {

    if (!character) {
        return;
    }

    if ($("resultName")) {
        $("resultName").textContent =
            character.name;
    }

    if ($("soulPath")) {
        $("soulPath").textContent =
            character.soulPath;
    }

    if ($("soulDescription")) {
        $("soulDescription").textContent =
            character.soulDescription;
    }

    if ($("resultRace")) {
        $("resultRace").textContent =
            character.race;
    }

    if ($("resultClass")) {
        $("resultClass").textContent =
            character.class;
    }

    if ($("resultSubclass")) {
        $("resultSubclass").textContent =
            character.subclass;
    }

    if ($("resultBackground")) {
        $("resultBackground").textContent =
            character.background;
    }

    if ($("resultStats")) {
        $("resultStats").innerHTML =
            renderStats(character.scores);
    }

    if ($("soulTrait")) {
        $("soulTrait").textContent =
            character.soulTrait;
    }

    if ($("traitDescription")) {
        $("traitDescription").textContent =
            character.traitDescription;
    }

    if ($("awakeningBlessing")) {
        $("awakeningBlessing").textContent =
            character.blessing;
    }

    if ($("blessingDescription")) {
        $("blessingDescription").textContent =
            character.blessingDescription;
    }

    showScreen("result");
}


/* =========================================================
   CHARACTER CREATOR
   ========================================================= */

function openCharacterCreator() {

    if (!character) {

        alert(
            "No character exists yet."
        );

        return;
    }

    if ($("characterName")) {
        $("characterName").textContent =
            character.name;
    }

    if ($("creatorRace")) {
        $("creatorRace").textContent =
            character.race;
    }

    if ($("creatorClass")) {
        $("creatorClass").textContent =
            character.class;
    }

    if ($("creatorSubclass")) {
        $("creatorSubclass").textContent =
            character.subclass;
    }

    if ($("creatorBackground")) {
        $("creatorBackground").textContent =
            character.background;
    }

    if ($("creatorLevel")) {
        $("creatorLevel").textContent =
            character.level;
    }

    if ($("abilityScores")) {
        $("abilityScores").innerHTML =
            renderStats(character.scores);
    }

    if ($("creatorHP")) {
        $("creatorHP").textContent =
            character.max_hp;
    }

    if ($("creatorAC")) {
        $("creatorAC").textContent =
            character.armor_class;
    }

    if ($("creatorSpeed")) {
        $("creatorSpeed").textContent =
            character.speed + " ft";
    }

    if ($("personality")) {
        $("personality").value =
            character.personality || "";
    }

    if ($("ideal")) {
        $("ideal").value =
            character.ideal || "";
    }

    if ($("bond")) {
        $("bond").value =
            character.bond || "";
    }

    if ($("flaw")) {
        $("flaw").value =
            character.flaw || "";
    }

    if ($("backstory")) {
        $("backstory").value =
            character.backstory || "";
    }

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
            document.createTextNode(
                " " + item
            )
        );

        checkbox.addEventListener(
            "change",
            function() {

                if (checkbox.checked) {

                    if (
                        !selectedEquipment.includes(item)
                    ) {

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
   LOCAL CHARACTER SAVE
   ========================================================= */

function saveLocalCharacter() {

    if (!character) {
        return;
    }

    try {

        localStorage.setItem(
            "soulTrialCharacter",
            JSON.stringify(character)
        );

    } catch (error) {

        console.error(
            "Unable to save character locally:",
            error
        );

    }

}


/* =========================================================
   SAVE CHARACTER
   ========================================================= */

async function saveCharacter() {

    if (!character) {

        alert(
            "Create a character first."
        );

        return;
    }

    if ($("personality")) {
        character.personality =
            $("personality").value.trim();
    }

    if ($("ideal")) {
        character.ideal =
            $("ideal").value.trim();
    }

    if ($("bond")) {
        character.bond =
            $("bond").value.trim();
    }

    if ($("flaw")) {
        character.flaw =
            $("flaw").value.trim();
    }

    if ($("backstory")) {
        character.backstory =
            $("backstory").value.trim();
    }

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

        console.error(
            "Character sync failed:",
            error
        );

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
            (error.message || error)
        );

    }

}


/* =========================================================
   SAVE CHARACTER TO SUPABASE
   ========================================================= */

async function saveCharacterToSupabase() {

    if (!character) {
        throw new Error(
            "No character exists."
        );
    }

    await initializeSupabase();

    if (!currentUser) {
        throw new Error(
            "Anonymous session unavailable."
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

    if (
        existing &&
        existing.length
    ) {

        await supabaseRequest(
            "characters",
            "PATCH",
            payload,
            "?id=eq." +
            encodeURIComponent(
                existing[0].id
            )
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

        if (
            created &&
            created.length
        ) {

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

        alert(
            "Create a character first."
        );

        return;
    }

    if ($("sheetName")) {
        $("sheetName").textContent =
            character.name;
    }

    if ($("sheetIdentity")) {

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

    }

    if ($("sheetHP")) {
        $("sheetHP").textContent =
            character.current_hp ||
            character.max_hp;
    }

    if ($("sheetAC")) {
        $("sheetAC").textContent =
            character.armor_class;
    }

    if ($("sheetSpeed")) {
        $("sheetSpeed").textContent =
            character.speed + " ft";
    }

    if ($("sheetLevel")) {
        $("sheetLevel").textContent =
            character.level;
    }

    if ($("sheetProficiency")) {
        $("sheetProficiency").textContent =
            "+" +
            character.proficiency_bonus;
    }

    if ($("sheetHitDice")) {
        $("sheetHitDice").textContent =
            character.hit_dice;
    }

    if ($("sheetStats")) {
        $("sheetStats").innerHTML =
            renderStats(character.scores);
    }

    if ($("sheetPath")) {
        $("sheetPath").textContent =
            character.soulPath;
    }

    if ($("sheetPathDescription")) {
        $("sheetPathDescription").textContent =
            character.soulDescription;
    }

    if ($("sheetTrait")) {
        $("sheetTrait").textContent =
            character.soulTrait;
    }

    if ($("sheetTraitDescription")) {
        $("sheetTraitDescription").textContent =
            character.traitDescription;
    }

    if ($("sheetBlessing")) {
        $("sheetBlessing").textContent =
            character.blessing;
    }

    if ($("sheetBlessingDescription")) {
        $("sheetBlessingDescription").textContent =
            character.blessingDescription;
    }

    if ($("sheetPersonality")) {
        $("sheetPersonality").textContent =
            character.personality || "—";
    }

    if ($("sheetIdeal")) {
        $("sheetIdeal").textContent =
            character.ideal || "—";
    }

    if ($("sheetBond")) {
        $("sheetBond").textContent =
            character.bond || "—";
    }

    if ($("sheetFlaw")) {
        $("sheetFlaw").textContent =
            character.flaw || "—";
    }

    if ($("sheetBackstory")) {
        $("sheetBackstory").textContent =
            character.backstory || "—";
    }

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
   CAMPAIGN SCREEN
   ========================================================= */

async function openCampaigns() {

    showScreen("campaigns");

    const notice =
        $("campaignAccountNotice");

    if (notice) {

        notice.textContent =
            "Connecting your Soul to the campaign realm...";

    }

    try {

        await initializeSupabase();

        if (!currentUser) {

            throw new Error(
                "Anonymous session unavailable."
            );

        }

        if (notice) {

            notice.textContent =
                "You are connected anonymously. No login is required.";

        }

        await loadCampaigns();

    } catch (error) {

        console.error(
            "Campaign connection failed:",
            error
        );

        if (notice) {

            notice.textContent =
                "Campaign connection failed: " +
                (error.message || error);

        }

    }

}


/* =========================================================
   SHOW CREATE CAMPAIGN
   ========================================================= */

function showCreateCampaign() {

    console.log(
        "CREATE CAMPAIGN MENU OPENED"
    );

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

        setTimeout(
            function() {
                nameInput.focus();
            },
            100
        );

    }

}


/* =========================================================
   SHOW JOIN CAMPAIGN
   ========================================================= */

function showJoinCampaign() {

    console.log(
        "JOIN CAMPAIGN MENU OPENED"
    );

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

        setTimeout(
            function() {
                codeInput.focus();
            },
            100
        );

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

        console.error(
            "campaignName element missing."
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

        console.log(
            "Authenticated as:",
            currentUser.id
        );

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

        console.log(
            "Campaign creation result:",
            campaignResult
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

        const createBox =
            $("campaignCreate");

        if (createBox) {
            createBox.classList.add("hidden");
        }

        showCampaignMessage(
            "Campaign created successfully! Campaign ID: " +
            campaign.id,
            true
        );

        await openCampaign(
            campaign
        );

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

        alert(
            "Campaign creation failed:\n\n" +
            (error.message || error)
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

        const campaigns =
            await supabaseRequest(
                "campaigns",
                "GET",
                null,
                "?select=*&order=created_at.desc"
            );

        container.innerHTML = "";

        if (
            !campaigns ||
            campaigns.length === 0
        ) {

            container.innerHTML = `
                <div class="info">
                    <h2>No Campaigns Yet</h2>
                    <p>
                        Create a campaign as a DM or join one using the ID provided by your DM.
                    </p>
                </div>
            `;

            return;
        }

        campaigns.forEach(
            function(campaign) {

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

                        openCampaign(
                            campaign
                        );

                    }
                );

                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(idText);
                card.appendChild(button);

                container.appendChild(card);

            }
        );

    } catch (error) {

        console.error(
            "LOAD CAMPAIGNS ERROR:",
            error
        );

        container.innerHTML =
            '<div class="notice error">' +
            escapeHtml(
                error.message || error
            ) +
            '</div>';

    }

}


/* =========================================================
   JOIN CAMPAIGN
   ========================================================= */

async function joinCampaign() {

    console.log(
        "JOIN CAMPAIGN BUTTON PRESSED"
    );

    try {

        await initializeSupabase();

        if (!currentUser) {

            throw new Error(
                "Anonymous session unavailable."
            );

        }

        const codeInput =
            $("campaignCode");

        if (!codeInput) {

            throw new Error(
                "Campaign code input was not found."
            );

        }

        const code =
            codeInput.value.trim();

        if (!code) {

            showCampaignMessage(
                "Enter a campaign ID or join code."
            );

            codeInput.focus();

            return;
        }

        let campaigns =
            await supabaseRequest(
                "campaigns",
                "GET",
                null,
                "?id=eq." +
                encodeURIComponent(code) +
                "&select=*"
            );

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

        const members =
            await supabaseRequest(
                "campaign_members",
                "GET",
                null,
                "?campaign_id=eq." +
                encodeURIComponent(
                    campaign.id
                ) +
                "&player_id=eq." +
                encodeURIComponent(
                    currentUser.id
                ) +
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
                    campaign_id:
                        campaign.id,

                    player_id:
                        currentUser.id,

                    role:
                        "player"
                }
            );

        }

        if (character) {

            await attachCharacterToCampaign(
                campaign.id
            );

        }

        codeInput.value = "";

        showCampaignMessage(
            "You joined " +
            campaign.name +
            ".",
            true
        );

        await openCampaign(
            campaign
        );

    } catch (error) {

        console.error(
            "JOIN CAMPAIGN ERROR:",
            error
        );

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

    if (!currentUser) {

        throw new Error(
            "Anonymous session unavailable."
        );

    }

    let characterId =
        character.supabaseId;

    if (!characterId) {

        const rows =
            await supabaseRequest(
                "characters",
                "GET",
                null,
                "?player_id=eq." +
                encodeURIComponent(
                    currentUser.id
                ) +
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
                campaign_id:
                    campaignId
            },
            "?id=eq." +
            encodeURIComponent(
                characterId
            )
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

    if (!campaign) {
        return;
    }

    currentCampaign =
        campaign;

    if ($("campaignTitle")) {

        $("campaignTitle").textContent =
            campaign.name ||
            "Campaign";

    }

    if ($("campaignDescription")) {

        $("campaignDescription").textContent =
            campaign.description ||
            "No campaign description.";

    }

    showScreen(
        "campaignDashboard"
    );

    await loadCampaignMembers();

}


/* =========================================================
   LOAD CAMPAIGN MEMBERS
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

        const members =
            await supabaseRequest(
                "campaign_members",
                "GET",
                null,
                "?campaign_id=eq." +
                encodeURIComponent(
                    currentCampaign.id
                ) +
                "&select=*" +
                "&order=joined_at.asc"
            );

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

        const strong =
            document.createElement("strong");

        strong.textContent =
            "Campaign ID: ";

        const idValue =
            document.createElement("span");

        idValue.textContent =
            currentCampaign.id;

        id.appendChild(strong);
        id.appendChild(idValue);

        header.appendChild(heading);
        header.appendChild(id);

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

            container.appendChild(
                empty
            );

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

                const soulStrong =
                    document.createElement("strong");

                soulStrong.textContent =
                    "Soul: ";

                soul.appendChild(
                    soulStrong
                );

                soul.appendChild(
                    document.createTextNode(
                        char.soul_path ||
                        "Unknown"
                    )
                );

                const background =
                    document.createElement("p");

                const backgroundStrong =
                    document.createElement("strong");

                backgroundStrong.textContent =
                    "Background: ";

                background.appendChild(
                    backgroundStrong
                );

                background.appendChild(
                    document.createTextNode(
                        char.background ||
                        "Unknown"
                    )
                );

                card.appendChild(title);
                card.appendChild(identity);
                card.appendChild(soul);
                card.appendChild(background);

                container.appendChild(card);

            }
        );

    } catch (error) {

        console.error(
            "LOAD CAMPAIGN MEMBERS ERROR:",
            error
        );

        container.innerHTML =
            '<div class="notice error">' +
            escapeHtml(
                error.message || error
            ) +
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

    const idStrong =
        document.createElement("strong");

    idStrong.textContent =
        "Campaign ID: ";

    id.appendChild(idStrong);

    id.appendChild(
        document.createTextNode(
            currentCampaign.id
        )
    );

    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(id);

    if (currentCampaign.join_code) {

        const joinCode =
            document.createElement("div");

        joinCode.className =
            "notice";

        const codeStrong =
            document.createElement("strong");

        codeStrong.textContent =
            "Join Code: ";

        joinCode.appendChild(
            codeStrong
        );

        joinCode.appendChild(
            document.createTextNode(
                currentCampaign.join_code
            )
        );

        info.appendChild(
            joinCode
        );

    }

    container.appendChild(
        info
    );

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
        console.warn(
            "campaignMessage element not found:",
            message
        );
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
   RENDER STATS
   ========================================================= */

function renderStats(
    statScores
) {

    if (!statScores) {
        return "";
    }

    return Object.entries(
        statScores
    )
    .map(
        function(entry) {

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

        }
    )
    .join("");

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

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
   SAFE BUTTON WIRING
   ========================================================= */

function addButtonListener(
    id,
    handler
) {

    const button =
        $(id);

    if (!button) {

        console.warn(
            "Button not found:",
            id
        );

        return;
    }

    button.addEventListener(
        "click",
        handler
    );

    console.log(
        "Button wired:",
        id
    );

}


/* =========================================================
   WIRE ALL BUTTONS
   ========================================================= */

function wireButtons() {

    console.log(
        "Wiring Soul's Trial buttons..."
    );


    /* PLAYER / DM */

    addButtonListener(
        "playerButton",
        beginPlayerFlow
    );

    addButtonListener(
        "dmButton",
        beginDMFlow
    );


    /* OLD BEGIN BUTTON SUPPORT */

    addButtonListener(
        "beginButton",
        beginPlayerFlow
    );


    /* NAME */

    addButtonListener(
        "continueName",
        startQuestions
    );

    addButtonListener(
        "backFromName",
        function() {

            showScreen("home");

        }
    );


    /* RESULT */

    addButtonListener(
        "continueToCreator",
        openCharacterCreator
    );


    /* CHARACTER CREATOR */

    addButtonListener(
        "saveCharacterButton",
        saveCharacter
    );

    addButtonListener(
        "viewSheetButton",
        viewSheet
    );


    /* SHEET */

    addButtonListener(
        "editCharacterButton",
        openCharacterCreator
    );

    addButtonListener(
        "campaignsButton",
        openCampaigns
    );

    addButtonListener(
        "sheetHomeButton",
        function() {

            showScreen("home");

        }
    );


    /* CAMPAIGNS */

    addButtonListener(
        "campaignHomeButton",
        openCampaigns
    );

    addButtonListener(
        "createCampaignButton",
        showCreateCampaign
    );

    addButtonListener(
        "joinCampaignButton",
        showJoinCampaign
    );

    addButtonListener(
        "campaignCharacterButton",
        function() {

            if (character) {

                viewSheet();

            } else {

                beginPlayerFlow();

            }

        }
    );

    addButtonListener(
        "campaignHomeButton2",
        function() {

            showScreen("home");

        }
    );


    /* CREATE / JOIN */

    addButtonListener(
        "confirmCreateCampaign",
        createCampaign
    );

    addButtonListener(
        "confirmJoinCampaign",
        joinCampaign
    );


    /* CAMPAIGN DASHBOARD */

    addButtonListener(
        "playersButton",
        loadCampaignMembers
    );

    addButtonListener(
        "campaignInfoButton",
        showCampaignInfo
    );

    addButtonListener(
        "backCampaignsButton",
        openCampaigns
    );

}


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

function initialize() {

    console.log(
        "Initializing The Soul's Trial..."
    );

    loadLocalCharacter();

    wireButtons();

    showScreen("home");

    console.log(
        "The Soul's Trial initialized."
    );

}


/* =========================================================
   START
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
