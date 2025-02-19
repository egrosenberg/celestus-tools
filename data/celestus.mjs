
export default {
    // Set up data types
    /**
     * Damage Types
     * 
     * label: text for display
     * text: text code corresponding to label
     * style: magical/physical/healing, how to apply damage
     * skill: combat skill used for damage type
     * color: background color for damage rolls
     * glyph: glyphter icon to use for display
     */
    damageTypes: {
        physical: { label: "Physical", text: "physical", style: "physical", skill: "warlord", color: "#b3c0cc", glyph: "icon-spinning-sword" },
        fire: { label: "Fire", text: "fire", style: "magical", skill: "flamespeaker", color: "#db8b70", glyph: "icon-flamer" },
        water: { label: "Water", text: "water", style: "magical", skill: "tidecaller", color: "#86c0df", glyph: "icon-drop" },
        air: { label: "Air", text: "air", style: "magical", skill: "stormseeker", color: "#9c86df", glyph: "icon-lightning-helix" },
        earth: { label: "Earth", text: "earth", style: "magical", skill: "duneshaper", color: "#dba670", glyph: "icon-rock" },
        poison: { label: "Poison", text: "poison", style: "magical", skill: "duneshaper", color: "#c9df86", glyph: "icon-chemical-bolt" },
        psychic: { label: "Psychic", text: "psychic", style: "magical", skill: "voidcantor", color: "#df86df", glyph: "icon-croissants-pupil" },
        shadow: { label: "Shadow", text: "shadow", style: "direct", skill: "shroudstalker", color: "#90a1d5", glyph: "icon-bloody-stash" },
        piercing: { label: "Piercing", text: "piercing", style: "direct", skill: "warlord", color: "#df8686", glyph: "icon-bloody-stash" },
        healing: { label: "Healing", text: "healing", style: "healing", skill: "tidecaller", color: "#92e298", glyph: "icon-nested-hearts" },
        phys_armor: { label: "Physical Armor", text: "phys_armor", style: "healing", skill: "duneshaper", color: "#ebccad", glyph: "icon-edged-shield" },
        mag_armor: { label: "Magic Armor", text: "mag_armor", style: "healing", skill: "tidecaller", color: "#86dfdf", glyph: "icon-magic-shield" },
        t_phys_armor: { label: "Temp Physical Armor", text: "t_phys_armor", style: "healing", skill: "duneshaper", color: "#ebccad", glyph: "icon-edged-shield" },
        t_mag_armor: { label: "Temp Magic Armor", text: "t_mag_armor", style: "healing", skill: "tidecaller", color: "#86dfdf", glyph: "icon-magic-shield" },
        none: { label: "None", text: "none", style: "none", skill: "none", color: "black", glyph: "" },
    },
    /**
     * combat skills
     * 
     * label: text for display
     * text: text code corresponding to label
     * damage: primary damage type associated with skill
     * glyph: glyphter icon to use for display
     */
    combatSkills: {
        onehand: { label: "Dueling", text: "onehand", damage: "physical", glyph: "icon-gladius", type: "weapon" },
        dualwield: { label: "Dual Wielding", text: "dualwield", damage: "physical", glyph: "icon-crossed-swords", type: "weapon", modOverride: 0.01 },
        twohand: { label: "Heavy-Handed", text: "twohand", damage: "physical", glyph: "icon-sharp-axe", type: "weapon" },
        ranged: { label: "Marksman", text: "ranged", damage: "physical", glyph: "icon-crossbow", type: "weapon", modOverride: 0.01 },
        retributive: { label: "Retributive", text: "retributive", damage: "physical", glyph: "icon-spiked-shoulder-armor", type: "weapon" },
        flamespeaker: { label: "Flamespeaker", text: "flamespeaker", damage: "fire", glyph: "icon-fireflake", type: "skill" },
        tidecaller: { label: "Tidecaller", text: "tidecaller", damage: "water", glyph: "icon-waves", type: "skill" },
        stormseeker: { label: "Stormseeker", text: "stormseeker", damage: "air", glyph: "icon-fluffy-cloud", type: "skill" },
        duneshaper: { label: "Duneshaper", text: "duneshaper", damage: "earth", glyph: "icon-stone-sphere", type: "skill" },
        voidcantor: { label: "Voidcantor", text: "voidcantor", damage: "psychic", glyph: "icon-psionics", type: "skill" },
        deathbringer: { label: "Deathbringer", text: "deathbringer", damage: "piercing", glyph: "icon-death-zone", type: "skill", modOverride: 0.1 },
        shroudstalker: { label: "Shroudstalker", text: "shroudstalker", damage: "shadow", glyph: "icon-nested-eclipses", type: "skill" },
        formshifter: { label: "Formshifter", text: "formshifter", damage: "phys_armor", glyph: "icon-wolf-howl", type: "skill" },
        huntmaster: { label: "Huntmaster", text: "huntmaster", damage: "poison", glyph: "icon-pocket-bow", type: "skill" },
        warlord: { label: "Warlord", text: "warlord", damage: "physical", glyph: "icon-axe-sword", type: "skill" },
    },
    /**
     * civil skills
     * 
     * label: text for display
     * text: text code corresponding to label
     * color: html color for background of civil skill
     * glyph: glyphter icon to use for display
     */
    civilSkills: {
        scoundrel: { label: "Scoundrel", text: "scoundrel", color: "#f0f0f4", glyph: "icon-pay-money" },
        lore: { label: "Lore", text: "lore", color: "#ff9999", glyph: "icon-book-cover" },
        nature: { label: "Nature", text: "nature", color: "#b0e8b0", glyph: "icon-linden-leaf" },
        influence: { label: "Influence", text: "influence", color: "#ffccf1", glyph: "icon-lyre" },
        religion: { label: "Religion", text: "religion", color: "#fffbcd", glyph: "icon-angel-outfit" },
    },
    /**
     * bonuses
     * 
     * label: text for display
     * text: text code corresponding to label
     * symbol: symbol to append when displaying
     */
    bonuses: {
        crit_chance: { label: "Crit Chance", text: "crit_chance", symbol: "" },
        crit_bonus: { label: "Crit Damage", text: "crit_bonus", symbol: '\u00D7' },
        accuracy: { label: "Accuracy", text: "accuracy", symbol: "" },
        evasion: { label: "Evasion", text: "evasion", symbol: "" },
        lifesteal: { label: "Lifesteal", text: "lifesteal" },
        damage: { label: "Damage Increase", text: "damage", symbol: '\u00D7' },
    },
    // character stats
    abilities: {
        str: { label: "Strength", text: "str", percent: true },
        dex: { label: "Dexterity", text: "dex", percent: true },
        int: { label: "Intellect", text: "int", percent: true },
        con: { label: "Constitution", text: "con", percent: true },
        mind: { label: "Mind", text: "mind", percent: false },
        wit: { label: "Wits", text: "wit", percent: true },
        none: { label: "None", text: "none" },
    },
    targetTypes: {
        none: { label: "None", options: [] },
        self: { label: "Self", options: [] },
        creature: { label: "Creatures", options: ["count"] },
        point: { label: "Point", options: [] },
        sphere: { label: "Sphere", measure: "circle", options: ["size"] },
        radius: { label: "Radius", measure: "circle", options: ["size"] },
        cylinder: { label: "Cylinder", measure: "circle", options: ["size"] },
        cone: { label: "Cone", measure: "cone", options: ["size"], angle: 60 },
        cube: { label: "Cube", measure: "ray", options: ["size"] },
        line: { label: "Line", measure: "ray", options: ["size"] },
    },
    auraTargets: {
        any: "All Creatures",
        ally: "Allies",
        enemy: "Enemies",
        type: "Creature Type",
    },
    creatureTypes: {
        humanoid: "Humanoid",
        undead: "Undead",
        animal: "Animal",
        monstrosity: "Monstrosity",
        fiend: "Fiend",
        fey: "Fey",
        elemental: "Elemental",
        aberration: "Aberration",
        ooze: "Ooze",
        dragon: "Dragon",
        construct: "Construct",
        splinter: "Splinter",
    },
    languages: {
        common: "Common",
        abyssal: "Abyssal",
        celestial: "Celestial",
        derelict: "Derelict",
        draconic: "Draconic",
        infernal: "Infernal",
        primal: "Primal",
        snaketongue: "Snaketongue",
        verdant: "Verdant",
    },
    effectResists: {
        none: "None",
        mag: "Magic Armor",
        phys: "Physical Armor",
        any: "Any Armor",
    },
    skillTiers: {
        0: "Apprentice",
        1: "Novice",
        2: "Adept",
        3: "Expert",
        4: "Master"
    },
    skillLevels: {
        0: 1,
        1: 4,
        2: 9,
        3: 13,
        4: 16
    },
    // item generation related constants
    itemRarities: {
        "Common": "Common",
        "Uncommon": "Uncommon",
        "Rare": "Rare",
        "Epic": "Epic",
        "Legendary": "Legendary",
        "Angelic": "Angelic",
        "Custom": "Custom",
    },
}