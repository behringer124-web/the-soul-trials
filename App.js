/* =========================================================
   THE SOUL TRIAL
   D&D 5E CHARACTER BUILDER
   APP ENGINE
   ========================================================= */

"use strict";

/* =========================================================
   CHARACTER STATE
   ========================================================= */

const soulTrial = {

  currentStep: 1,

  totalSteps: 8,

  character: {

    name: "",

    race: "",

    subrace: "",

    class: "",

    subclass: "",

    background: "",

    level: 1,

    alignment: "",

    experience: 0,

    abilities: {

      STR: 8,
      DEX: 8,
      CON: 8,
      INT: 8,
      WIS: 8,
      CHA: 8

    },

    abilityMethod: "standard",

    skills: [],

    savingThrows: [],

    languages: [],

    tools: [],

    equipment: [],

    spells: {

      cantrips: [],

      known: [],

      prepared: []

    },

    personality: {

      traits: "",

      ideals: "",

      bonds: "",

      flaws: "",

      backstory: ""

    }

  }

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initializeSoulTrial();

});


function initializeSoulTrial() {

  loadSavedCharacter();

  setupNavigation();

  setupInputs();

  setupAbilityInputs();

  renderCurrentStep();

  updateProgress();

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

  document.addEventListener("click", event => {

    const nextButton =
      event.target.closest("[data-next]");

    const previousButton =
      event.target.closest("[data-previous]");

    if (nextButton) {

      saveCurrentScreen();

      if (
        validateStep(soulTrial.currentStep)
      ) {

        nextStep();

      }

    }

    if (previousButton) {

      saveCurrentScreen();

      previousStep();

    }

  });

}


function nextStep() {

  if (
    soulTrial.currentStep <
    soulTrial.totalSteps
  ) {

    soulTrial.currentStep++;

    renderCurrentStep();

    updateProgress();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


function previousStep() {

  if (
    soulTrial.currentStep >
    1
  ) {

    soulTrial.currentStep--;

    renderCurrentStep();

    updateProgress();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


function goToStep(step) {

  if (
    step < 1 ||
    step > soulTrial.totalSteps
  ) {

    return;

  }

  soulTrial.currentStep = step;

  renderCurrentStep();

  updateProgress();

}


/* =========================================================
   RENDER SCREEN
   ========================================================= */

function renderCurrentStep() {

  const screens =
    document.querySelectorAll(".screen");

  if (!screens.length) {

    return;

  }

  screens.forEach(screen => {

    screen.classList.remove("active");

  });

  const current =
    document.querySelector(
      `.screen[data-step="${soulTrial.currentStep}"]`
    );

  if (current) {

    current.classList.add("active");

  }

  populateScreen(
    soulTrial.currentStep
  );

}


/* =========================================================
   SCREEN POPULATION
   ========================================================= */

function populateScreen(step) {

  switch (step) {

    case 1:
      populateIdentityScreen();
      break;

    case 2:
      populateRaceScreen();
      break;

    case 3:
      populateClassScreen();
      break;

    case 4:
      populateBackgroundScreen();
      break;

    case 5:
      populateAbilityScreen();
      break;

    case 6:
      populateSkillsScreen();
      break;

    case 7:
      populateSpellScreen();
      break;

    case 8:
      populateFinalScreen();
      break;

  }

}


/* =========================================================
   STEP 1 — IDENTITY
   ========================================================= */

function populateIdentityScreen() {

  setValue(
    "#characterName",
    soulTrial.character.name
  );

  setValue(
    "#alignment",
    soulTrial.character.alignment
  );

  setValue(
    "#characterLevel",
    soulTrial.character.level
  );

}


function saveIdentity() {

  soulTrial.character.name =
    getValue("#characterName");

  soulTrial.character.alignment =
    getValue("#alignment");

  const level =
    Number(
      getValue("#characterLevel")
    );

  if (
    level >= 1 &&
    level <= 20
  ) {

    soulTrial.character.level =
      level;

  }

}


/* =========================================================
   STEP 2 — RACE
   ========================================================= */

function populateRaceScreen() {

  const container =
    document.querySelector(
      "#raceChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  Object.values(
    SOUL_TRIAL_DATA.races
  ).forEach(race => {

    const selected =
      soulTrial.character.race ===
      race.name;

    const card =
      document.createElement("div");

    card.className =
      `choice ${selected ? "selected" : ""}`;

    card.dataset.race =
      race.name;

    card.innerHTML = `

      <h3>${escapeHTML(race.name)}</h3>

      <p>
        ${escapeHTML(race.description)}
      </p>

      <span class="tag">
        Speed ${race.speed} ft.
      </span>

    `;

    card.addEventListener(
      "click",
      () => {

        selectRace(
          race.name
        );

      }
    );

    container.appendChild(card);

  });

  renderSubraces();

}


function selectRace(raceName) {

  const race =
    getRaceData(raceName);

  if (!race) {

    return;

  }

  soulTrial.character.race =
    raceName;

  soulTrial.character.subrace =
    "";

  renderCurrentStep();

}


function renderSubraces() {

  const container =
    document.querySelector(
      "#subraceChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  if (
    !soulTrial.character.race
  ) {

    container.innerHTML =
      `<p class="warning">
        Choose a race first.
      </p>`;

    return;

  }

  const race =
    getRaceData(
      soulTrial.character.race
    );

  if (
    !race.subraces
  ) {

    container.innerHTML =
      `<p>
        This race has no subrace choice
        in the current ruleset.
      </p>`;

    return;

  }

  Object.values(
    race.subraces
  ).forEach(subrace => {

    const selected =
      soulTrial.character.subrace ===
      subrace.name;

    const card =
      document.createElement("div");

    card.className =
      `choice ${selected ? "selected" : ""}`;

    card.innerHTML = `

      <h3>
        ${escapeHTML(subrace.name)}
      </h3>

      <p>
        ${subrace.traits
          .map(escapeHTML)
          .join(", ")}
      </p>

    `;

    card.addEventListener(
      "click",
      () => {

        soulTrial.character.subrace =
          subrace.name;

        renderCurrentStep();

      }
    );

    container.appendChild(card);

  });

}


/* =========================================================
   STEP 3 — CLASS
   ========================================================= */

function populateClassScreen() {

  const container =
    document.querySelector(
      "#classChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  Object.values(
    SOUL_TRIAL_DATA.classes
  ).forEach(classData => {

    const selected =
      soulTrial.character.class ===
      classData.name;

    const card =
      document.createElement("div");

    card.className =
      `choice ${selected ? "selected" : ""}`;

    card.innerHTML = `

      <h3>
        ${escapeHTML(classData.name)}
      </h3>

      <p>
        ${classData.hitDie
          ? `Hit Die: d${classData.hitDie}`
          : ""}
      </p>

      <span class="tag">
        ${classData.primaryAbilities
          .map(a =>
            SOUL_TRIAL_DATA.abilities[a]
          )
          .join(" / ")}
      </span>

    `;

    card.addEventListener(
      "click",
      () => {

        selectClass(
          classData.name
        );

      }
    );

    container.appendChild(card);

  });

  renderSubclasses();

}


function selectClass(className) {

  const classData =
    getClassData(className);

  if (!classData) {

    return;

  }

  soulTrial.character.class =
    className;

  soulTrial.character.subclass =
    "";

  soulTrial.character.skills = [];

  soulTrial.character.savingThrows =
    [...classData.savingThrows];

  renderCurrentStep();

}


function renderSubclasses() {

  const container =
    document.querySelector(
      "#subclassChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  if (
    !soulTrial.character.class
  ) {

    container.innerHTML =
      `<p class="warning">
        Choose a class first.
      </p>`;

    return;

  }

  const classData =
    getClassData(
      soulTrial.character.class
    );

  const subclassLevel =
    classData.subclasses
      .map(key =>
        getSubclassData(key)
      )
      .find(Boolean)?.level || 3;

  const subclasses =
    getClassSubclasses(
      soulTrial.character.class
    );

  const currentLevel =
    Number(
      soulTrial.character.level
    ) || 1;

  const heading =
    document.createElement("p");

  heading.className =
    "warning";

  heading.textContent =
    currentLevel >= subclassLevel
      ? `Choose your subclass. This class chooses its subclass at level ${subclassLevel}.`
      : `Subclass selection unlocks at level ${subclassLevel}. You may choose it now for your planned character.`;

  container.appendChild(
    heading
  );

  subclasses.forEach(
    subclass => {

      const selected =
        soulTrial.character.subclass ===
        subclass.name;

      const card =
        document.createElement("div");

      card.className =
        `choice ${selected ? "selected" : ""}`;

      card.innerHTML = `

        <h3>
          ${escapeHTML(subclass.name)}
        </h3>

        <p>
          Subclass available at
          level ${subclass.level}.
        </p>

      `;

      card.addEventListener(
        "click",
        () => {

          soulTrial.character.subclass =
            subclass.name;

          renderCurrentStep();

        }
      );

      container.appendChild(card);

    }
  );

}


/* =========================================================
   STEP 4 — BACKGROUND
   ========================================================= */

function populateBackgroundScreen() {

  const container =
    document.querySelector(
      "#backgroundChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  Object.values(
    SOUL_TRIAL_DATA.backgrounds
  ).forEach(background => {

    const selected =
      soulTrial.character.background ===
      background.name;

    const card =
      document.createElement("div");

    card.className =
      `choice ${selected ? "selected" : ""}`;

    card.innerHTML = `

      <h3>
        ${escapeHTML(background.name)}
      </h3>

      <p>
        Skills:
        ${background.skills
          .map(skill => {

            const skillData =
              SOUL_TRIAL_DATA.skills[skill];

            return skillData?.name ||
              formatDataName(skill);

          })
          .join(", ")}
      </p>

      <span class="tag">
        ${escapeHTML(background.feature)}
      </span>

    `;

    card.addEventListener(
      "click",
      () => {

        soulTrial.character.background =
          background.name;

        soulTrial.character.skills =
          [
            ...new Set([
              ...soulTrial.character.skills,
              ...background.skills
            ])
          ];

        renderCurrentStep();

      }
    );

    container.appendChild(card);

  });

}


/* =========================================================
   STEP 5 — ABILITY SCORES
   ========================================================= */

function populateAbilityScreen() {

  const abilities =
    Object.keys(
      SOUL_TRIAL_DATA.abilities
    );

  abilities.forEach(
    ability => {

      setValue(
        `#ability-${ability}`,
        soulTrial.character.abilities[ability]
      );

      updateAbilityModifier(
        ability
      );

    }
  );

  updateAbilitySummary();

}


function setupAbilityInputs() {

  document.addEventListener(
    "input",
    event => {

      if (
        !event.target.matches(
          "[data-ability]"
        )
      ) {

        return;

      }

      const ability =
        event.target.dataset.ability;

      const value =
        Number(event.target.value);

      if (
        !Number.isNaN(value)
      ) {

        soulTrial.character.abilities[
          ability
        ] = value;

        updateAbilityModifier(
          ability
        );

        updateAbilitySummary();

      }

    }
  );

}


function updateAbilityModifier(
  ability
) {

  const score =
    Number(
      soulTrial.character.abilities[
        ability
      ]
    );

  const modifier =
    getAbilityModifier(score);

  const output =
    document.querySelector(
      `#modifier-${ability}`
    );

  if (output) {

    output.textContent =
      modifier >= 0
        ? `+${modifier}`
        : `${modifier}`;

  }

}


function updateAbilitySummary() {

  const container =
    document.querySelector(
      "#abilitySummary"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  Object.entries(
    soulTrial.character.abilities
  ).forEach(
    ([ability, score]) => {

      const item =
        document.createElement("div");

      item.className =
        "summary-item";

      const modifier =
        getAbilityModifier(score);

      item.innerHTML = `

        <span>
          ${escapeHTML(
            SOUL_TRIAL_DATA.abilities[
              ability
            ]
          )}
        </span>

        <strong>
          ${score}
          ${
            modifier >= 0
              ? `(+${modifier})`
              : `(${modifier})`
          }
        </strong>

      `;

      container.appendChild(item);

    }
  );

}


/* =========================================================
   STEP 6 — SKILLS
   ========================================================= */

function populateSkillsScreen() {

  const container =
    document.querySelector(
      "#skillChoices"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  if (
    !soulTrial.character.class
  ) {

    return;

  }

  const classData =
    getClassData(
      soulTrial.character.class
    );

  const backgroundData =
    getBackgroundData(
      soulTrial.character.background
    );

  const classSkillLimit =
    classData.skillChoices || 0;

  const classSkills =
    soulTrial.character.skills
      .filter(skill =>
        classData.skillOptions
          .includes(skill)
      );

  const info =
    document.createElement("div");

  info.className =
    "warning";

  info.textContent =
    `Class skill choices: ${classSkillLimit}. ` +
    `Background skills are automatically included.`;

  container.appendChild(info);

  classData.skillOptions
    .forEach(skill => {

      const skillData =
        SOUL_TRIAL_DATA.skills[skill];

      const checked =
        classSkills.includes(skill);

      const backgroundSkill =
        backgroundData?.skills
          ?.includes(skill);

      const wrapper =
        document.createElement("label");

      wrapper.className =
        "choice";

      wrapper.style.display =
        "block";

      wrapper.innerHTML = `

        <input
          type="checkbox"
          data-skill="${escapeHTML(skill)}"
          ${checked || backgroundSkill ? "checked" : ""}
          ${backgroundSkill ? "disabled" : ""}
        >

        <strong>
          ${escapeHTML(
            skillData?.name ||
            formatDataName(skill)
          )}
        </strong>

        <span class="tag">
          ${escapeHTML(
            SOUL_TRIAL_DATA.abilities[
              skillData?.ability
            ] || ""
          )}
        </span>

        ${
          backgroundSkill
            ? `<p>
                Granted by background
              </p>`
            : ""
        }

      `;

      const checkbox =
        wrapper.querySelector(
          "input"
        );

      checkbox.addEventListener(
        "change",
        () => {

          updateSelectedSkills();

        }
      );

      container.appendChild(
        wrapper
      );

    });

}


function updateSelectedSkills() {

  const checked =
    Array.from(
      document.querySelectorAll(
        "[data-skill]:checked:not(:disabled)"
      )
    )
    .map(
      input =>
        input.dataset.skill
    );

  const backgroundData =
    getBackgroundData(
      soulTrial.character.background
    );

  const backgroundSkills =
    backgroundData?.skills || [];

  soulTrial.character.skills =
    [
      ...new Set([
        ...backgroundSkills,
        ...checked
      ])
    ];

}


/* =========================================================
   STEP 7 — SPELLS
   ========================================================= */

function populateSpellScreen() {

  const container =
    document.querySelector(
      "#spellChoices"
    );

  if (!container) {

    return;

  }

  const spellcastingClasses = [
    "Bard",
    "Cleric",
    "Druid",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "Paladin",
    "Ranger"
  ];

  if (
    !spellcastingClasses.includes(
      soulTrial.character.class
    )
  ) {

    container.innerHTML = `

      <div class="card">

        <h3>
          Spellcasting
        </h3>

        <p>
          ${escapeHTML(
            soulTrial.character.class ||
            "This character"
          )}
          does not gain spellcasting
          through its base class at this stage.
        </p>

      </div>

    `;

    return;

  }

  container.innerHTML = `

    <div class="card">

      <h3>
        Spell Selection
      </h3>

      <p>
        Spell selection will be populated
        from the spell database.
      </p>

      <div
        id="spellDatabaseArea"
        class="choice-grid"
      ></div>

    </div>

  `;

  if (
    typeof renderSpellDatabase ===
    "function"
  ) {

    renderSpellDatabase();

  }

}


/* =========================================================
   STEP 8 — FINAL CHARACTER
   ========================================================= */

function populateFinalScreen() {

  const container =
    document.querySelector(
      "#finalCharacter"
    );

  if (!container) {

    return;

  }

  const character =
    buildCharacterSheet();

  container.innerHTML = `

    <div class="card death-card">

      <h2>
        THE SOUL TRIAL
      </h2>

      <p>
        Your character has been forged.
      </p>

    </div>

    <div class="card">

      <h2>
        ${escapeHTML(
          character.name ||
          "Unnamed Hero"
        )}
      </h2>

      <div class="summary">

        <div class="summary-item">
          <span>Race</span>
          <strong>
            ${escapeHTML(
              character.race
            )}
          </strong>
        </div>

        <div class="summary-item">
          <span>Class</span>
          <strong>
            ${escapeHTML(
              character.class
            )}
          </strong>
        </div>

        <div class="summary-item">
          <span>Subclass</span>
          <strong>
            ${escapeHTML(
              character.subclass ||
              "Not selected"
            )}
          </strong>
        </div>

        <div class="summary-item">
          <span>Background</span>
          <strong>
            ${escapeHTML(
              character.background
            )}
          </strong>
        </div>

        <div class="summary-item">
          <span>Level</span>
          <strong>
            ${character.level}
          </strong>
        </div>

        <div class="summary-item">
          <span>Hit Points</span>
          <strong>
            ${character.hitPoints}
          </strong>
        </div>

        <div class="summary-item">
          <span>Armor Class</span>
          <strong>
            ${character.armorClass}
          </strong>
        </div>

        <div class="summary-item">
          <span>Initiative</span>
          <strong>
            ${
              character.initiative >= 0
                ? `+${character.initiative}`
                : character.initiative
            }
          </strong>
        </div>

      </div>

    </div>

    <div class="card">

      <h2>
        Ability Scores
      </h2>

      <div
        id="finalAbilities"
        class="summary"
      ></div>

    </div>

    <div class="card">

      <h2>
        Proficiencies
      </h2>

      <ul class="feature-list">

        ${character.savingThrows
          .map(
            save =>
              `<li>
                Saving Throw:
                ${escapeHTML(
                  SOUL_TRIAL_DATA
                    .abilities[save]
                )}
              </li>`
          )
          .join("")}

        ${character.skills
          .map(
            skill =>
              `<li>
                Skill:
                ${escapeHTML(
                  SOUL_TRIAL_DATA
                    .skills[skill]?.name ||
                  formatDataName(skill)
                )}
              </li>`
          )
          .join("")}

      </ul>

    </div>

    <div class="card">

      <h2>
        Class Features
      </h2>

      <ul class="feature-list">

        ${character.features
          .map(
            feature =>
              `<li>
                ${escapeHTML(feature)}
              </li>`
          )
          .join("")}

      </ul>

    </div>

    <div class="navigation">

      <button
        class="btn btn-secondary"
        data-previous
      >
        Back
      </button>

      <button
        class="btn btn-primary"
        id="saveCharacterButton"
      >
        Save Character
      </button>

    </div>

  `;

  renderFinalAbilities();

  const saveButton =
    document.querySelector(
      "#saveCharacterButton"
    );

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      saveCharacter
    );

  }

}


function renderFinalAbilities() {

  const container =
    document.querySelector(
      "#finalAbilities"
    );

  if (!container) {

    return;

  }

  container.innerHTML = "";

  Object.entries(
    soulTrial.character.abilities
  ).forEach(
    ([ability, score]) => {

      const modifier =
        getAbilityModifier(score);

      const item =
        document.createElement("div");

      item.className =
        "summary-item";

      item.innerHTML = `

        <span>
          ${escapeHTML(
            SOUL_TRIAL_DATA
              .abilities[ability]
          )}
        </span>

        <strong>
          ${score}
          ${
            modifier >= 0
              ? `(+${modifier})`
              : `(${modifier})`
          }
        </strong>

      `;

      container.appendChild(item);

    }
  );

}


/* =========================================================
   CHARACTER CALCULATION
   ========================================================= */

function buildCharacterSheet() {

  const character =
    soulTrial.character;

  const classData =
    getClassData(
      character.class
    );

  const raceData =
    getRaceData(
      character.race
    );

  const subraceData =
    getSubraceData(
      character.race,
      character.subrace
    );

  const level =
    Number(character.level) || 1;

  const constitution =
    Number(
      character.abilities.CON
    ) || 10;

  const dexterity =
    Number(
      character.abilities.DEX
    ) || 10;

  const constitutionModifier =
    getAbilityModifier(
      constitution
    );

  const dexterityModifier =
    getAbilityModifier(
      dexterity
    );

  let hitPoints =
    classData
      ? classData.hitDie +
        constitutionModifier
      : 8;

  if (level > 1) {

    hitPoints +=
      (
        Math.floor(
          classData.hitDie / 2
        ) + 1 +
        constitutionModifier
      ) *
      (level - 1);

  }

  if (hitPoints < level) {

    hitPoints = level;

  }

  let armorClass =
    10 +
    dexterityModifier;

  if (
    classData?.name ===
    "Barbarian"
  ) {

    armorClass =
      10 +
      dexterityModifier +
      getAbilityModifier(
        character.abilities.CON
      );

  }

  if (
    classData?.name ===
    "Monk"
  ) {

    armorClass =
      10 +
      dexterityModifier +
      getAbilityModifier(
        character.abilities.WIS
      );

  }

  const features =
    getClassFeatures(
      character.class,
      level
    );

  return {

    ...character,

    hitPoints,

    armorClass,

    initiative:
      dexterityModifier,

    proficiencyBonus:
      getProficiencyBonus(level),

    features,

    speed:
      subraceData?.speed ||
      raceData?.speed ||
      30

  };

}


/* =========================================================
   RACE HELPERS
   ========================================================= */

function getSubraceData(
  raceName,
  subraceName
) {

  const race =
    getRaceData(raceName);

  if (
    !race ||
    !race.subraces
  ) {

    return null;

  }

  return Object.values(
    race.subraces
  ).find(
    subrace =>
      subrace.name ===
      subraceName
  ) || null;

}


/* =========================================================
   INPUT MANAGEMENT
   ========================================================= */

function setupInputs() {

  document.addEventListener(
    "input",
    event => {

      if (
        event.target.id ===
        "characterName"
      ) {

        soulTrial.character.name =
          event.target.value;

      }

      if (
        event.target.id ===
        "alignment"
      ) {

        soulTrial.character.alignment =
          event.target.value;

      }

      if (
        event.target.id ===
        "characterLevel"
      ) {

        const level =
          Number(event.target.value);

        if (
          level >= 1 &&
          level <= 20
        ) {

          soulTrial.character.level =
            level;

          renderSubclasses();

        }

      }

      if (
        event.target.dataset
          .personality
      ) {

        const key =
          event.target.dataset
            .personality;

        soulTrial.character.personality[
          key
        ] =
          event.target.value;

      }

    }
  );

}


function saveCurrentScreen() {

  saveIdentity();

  updateSelectedSkills();

}


/* =========================================================
   VALIDATION
   ========================================================= */

function validateStep(step) {

  switch (step) {

    case 1:

      if (
        !soulTrial.character.name
          .trim()
      ) {

        alert(
          "Your character needs a name."
        );

        return false;

      }

      return true;


    case 2:

      if (
        !soulTrial.character.race
      ) {

        alert(
          "Choose a race before continuing."
        );

        return false;

      }

      return true;


    case 3:

      if (
        !soulTrial.character.class
      ) {

        alert(
          "Choose a class before continuing."
        );

        return false;

      }

      return true;


    case 4:

      if (
        !soulTrial.character.background
      ) {

        alert(
          "Choose a background before continuing."
        );

        return false;

      }

      return true;


    case 5:

      return validateAbilities();


    default:

      return true;

  }

}


function validateAbilities() {

  const abilities =
    soulTrial.character.abilities;

  const valid =
    Object.values(
      abilities
    ).every(
      score =>
        Number(score) >= 1 &&
        Number(score) <= 30
    );

  if (!valid) {

    alert(
      "Ability scores must be between 1 and 30."
    );

    return false;

  }

  return true;

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function updateProgress() {

  const progress =
    document.querySelector(
      ".progress-fill"
    );

  if (progress) {

    const percent =
      (
        soulTrial.currentStep /
        soulTrial.totalSteps
      ) * 100;

    progress.style.width =
      `${percent}%`;

  }

  const steps =
    document.querySelectorAll(
      ".step"
    );

  steps.forEach(
    (step, index) => {

      step.classList.toggle(
        "active",
        index + 1 <=
        soulTrial.currentStep
      );

    }
  );

}


/* =========================================================
   SAVE / LOAD
   ========================================================= */

function saveCharacter() {

  saveCurrentScreen();

  localStorage.setItem(
    "soulTrialCharacter",
    JSON.stringify(
      soulTrial.character
    )
  );

  alert(
    "Character saved to this device."
  );

}


function loadSavedCharacter() {

  const saved =
    localStorage.getItem(
      "soulTrialCharacter"
    );

  if (!saved) {

    return;

  }

  try {

    const character =
      JSON.parse(saved);

    soulTrial.character =
      mergeObjects(
        soulTrial.character,
        character
      );

  } catch (error) {

    console.warn(
      "Unable to load saved character.",
      error
    );

  }

}


/* =========================================================
   EXPORT CHARACTER
   ========================================================= */

function exportCharacter() {

  const character =
    buildCharacterSheet();

  const json =
    JSON.stringify(
      character,
      null,
      2
    );

  const blob =
    new Blob(
      [json],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    `${
      character.name ||
      "Soul-Trial-Character"
    }.json`;

  link.click();

  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getValue(selector) {

  const element =
    document.querySelector(
      selector
    );

  return element
    ? element.value
    : "";

}


function setValue(
  selector,
  value
) {

  const element =
    document.querySelector(
      selector
    );

  if (element) {

    element.value =
      value ?? "";

  }

}


function escapeHTML(value) {

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


function mergeObjects(
  original,
  incoming
) {

  const result =
    Array.isArray(original)
      ? [...original]
      : {...original};

  Object.keys(
    incoming || {}
  ).forEach(key => {

    if (
      incoming[key] &&
      typeof incoming[key] ===
      "object" &&
      !Array.isArray(
        incoming[key]
      ) &&
      original[key] &&
      typeof original[key] ===
      "object"
    ) {

      result[key] =
        mergeObjects(
          original[key],
          incoming[key]
        );

    } else {

      result[key] =
        incoming[key];

    }

  });

  return result;

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.SoulTrial = {

  character:
    soulTrial.character,

  nextStep,

  previousStep,

  goToStep,

  saveCharacter,

  exportCharacter,

  buildCharacterSheet,

  getState() {

    return soulTrial;

  }

};
