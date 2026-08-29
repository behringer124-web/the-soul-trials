/* =====================================================
   THE SOUL'S TRIAL
   SPELLCASTING SYSTEM
===================================================== */

const spellcasters=[
"Bard",
"Cleric",
"Druid",
"Ranger",
"Sorcerer",
"Warlock",
"Wizard",
"Artificer"
];


/*
2014-style full-caster spell-slot progression.

Ranger and Artificer use half-caster progression.
Warlock uses Pact Magic and is handled separately.
*/

const fullCasterSlots={

1:[2],

2:[3],

3:[4,2],

4:[4,3],

5:[4,3,2],

6:[4,3,3],

7:[4,3,3,1],

8:[4,3,3,2],

9:[4,3,3,3,1],

10:[4,3,3,3,2],

11:[4,3,3,3,2,1],

12:[4,3,3,3,2,1],

13:[4,3,3,3,2,1,1],

14:[4,3,3,3,2,1,1],

15:[4,3,3,3,2,1,1,1],

16:[4,3,3,3,2,1,1,1],

17:[4,3,3,3,2,1,1,1,1],

18:[4,3,3,3,2,1,1,1,1],

19:[4,3,3,3,2,1,1,1,1,1],

20:[4,3,3,3,2,1,1,1,1,1]

};


const halfCasterSlots={

1:[],

2:[2],

3:[3],

4:[3],

5:[4,2],

6:[4,2],

7:[4,3],

8:[4,3],

9:[4,3,2],

10:[4,3,2],

11:[4,3,3],

12:[4,3,3],

13:[4,3,3,1],

14:[4,3,3,1],

15:[4,3,3,2],

16:[4,3,3,2],

17:[4,3,3,3,1],

18:[4,3,3,3,1],

19:[4,3,3,3,2],

20:[4,3,3,3,2]

};


/* =====================================================
SPELL SLOTS
===================================================== */

function getSpellSlots(className,level){

level=Math.max(
1,
Math.min(20,Number(level)||1)
);


/* WARLOCK */

if(className==="Warlock"){

const pactSlots={
1:[1,1],
2:[2,1],
3:[2,2],
4:[2,2],
5:[2,3],
6:[2,3],
7:[2,4],
8:[2,4],
9:[2,5],
10:[2,5],
11:[3,5],
12:[3,5],
13:[3,5],
14:[3,5],
15:[3,5],
16:[3,5],
17:[4,5],
18:[4,5],
19:[4,5],
20:[4,5]
};

const data=pactSlots[level];

return `
<strong>${data[0]} Pact Slot(s)</strong>
<br>
Spell Level: ${data[1]}
`;

}


/* RANGER / ARTIFICER */

if(
className==="Ranger" ||
className==="Artificer"
){

return formatSlots(
halfCasterSlots[level] || []
);

}


/* FULL CASTERS */

if(
className==="Bard" ||
className==="Cleric" ||
className==="Druid" ||
className==="Sorcerer" ||
className==="Wizard"
){

return formatSlots(
fullCasterSlots[level] || []
);

}


/* NON-SPELLCASTER */

return "This class does not normally use spell slots.";

}


/* =====================================================
FORMAT
===================================================== */

function formatSlots(slots){

if(!slots.length){

return "No spell slots at this level.";

}

return slots.map(
(slot,index)=>
`Level ${index+1}: ${slot} slot(s)`
).join("<br>");

}
