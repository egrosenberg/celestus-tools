
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
        radiant: { label: "Radiant", text: "radiant", style: "magical", skill: "lightbringer", color: "#ffe44d", glyph: "icon-sundial" },
        piercing: { label: "Piercing", text: "piercing", style: "direct", skill: "warlord", color: "#df8686", glyph: "icon-bloody-stash" },
        healing: { label: "Healing", text: "healing", style: "healing", skill: "tidecaller", color: "#92e298", glyph: "icon-nested-hearts" },
        phys_armor: { label: "Physical Armor", text: "phys_armor", style: "healing", skill: "duneshaper", color: "#ebccad", glyph: "icon-edged-shield" },
        mag_armor: { label: "Magic Armor", text: "mag_armor", style: "healing", skill: "tidecaller", color: "#86dfdf", glyph: "icon-magic-shield" },
        t_phys_armor: { label: "Temp Physical Armor", text: "t_phys_armor", style: "healing", skill: "duneshaper", color: "#ebccad", glyph: "icon-edged-shield" },
        t_mag_armor: { label: "Temp Magic Armor", text: "t_mag_armor", style: "healing", skill: "tidecaller", color: "#86dfdf", glyph: "icon-magic-shield" },
        none: { label: "None", text: "none", style: "none", skill: "none", color: "black", glyph: "", ignore: true },
        special: { label: "Special", text: "none", style: "none", skill: "none", color: "#fccb00", glyph: "", ignore: true },
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
        lightbringer: { label: "Lightbringer", text: "lightbringer", damage: "radiant", glyph: "icon-barbed-sun", type: "skill" },
        formshifter: { label: "Formshifter", text: "formshifter", damage: "phys_armor", glyph: "icon-wolf-howl", type: "skill" },
        huntmaster: { label: "Huntmaster", text: "huntmaster", damage: "poison", glyph: "icon-pocket-bow", type: "skill" },
        warlord: { label: "Warlord", text: "warlord", damage: "physical", glyph: "icon-axe-sword", type: "skill" },
        special: { label: "Special", text: "special", damage: "special", glyph: "icon-flower-twirl", type: "skill", ignore: true }
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
        scoundrel: { label: "Scoundrel", text: "scoundrel", color: "#f0f0f4", color_dark: "#2D2D30", glyph: "icon-pay-money" },
        lore: { label: "Lore", text: "lore", color: "#FFCACA", color_dark: "#640000", glyph: "icon-book-cover" },
        nature: { label: "Nature", text: "nature", color: "#b0e8b0", color_dark: "#053405", glyph: "icon-linden-leaf" },
        influence: { label: "Influence", text: "influence", color: "#ffccf1", color_dark: "#80005D", glyph: "icon-lyre" },
        religion: { label: "Religion", text: "religion", color: "#fffbcd", color_dark: "#6A6100", glyph: "icon-angel-outfit" },
        special: { label: "Special", text: "special", damage: "special", glyph: "icon-flower-twirl", type: "skill", ignore: true }
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
        "Mundane": 0,
        "Common": 1,
        "Uncommon": 1,
        "Rare": 2,
        "Epic": 3,
        "Legendary": 4,
        "Angelic": 5,
        "Custom": -1,
    },
    // categories of skills
    skillTypes: {
        weapon: "Weapon (combat)",
        magic: "Magic (combat)",
        civil: "Civil",
    },
    equipmentSlots: {
        helmet: "Helmet",
        chest: "Chest",
        gloves: "Gloves",
        leggings: "Leggings",
        boots: "Boots",
        amulet: "Amulet",
        ring: "Ring",
        ring1: "Ring",
        ring2: "Ring",
        belt: "Belt",
        left: "Mainhand",
        right: "Offhand",
        none: "None",
    },
    armor: {
        spreads: {
            none: { label: "Custom", phys: 0, mag: 0 },
            mage: { label: "Robes", phys: 15, mag: 90 },
            heavy: { label: "Heavy", phys: 90, mag: 15 },
            light: { label: "Light", phys: 50, mag: 30 },
            amulet: { label: "Amulet", phys: 0, mag: 100 },
            ring: { label: "Ring", phys: 0, mag: 100 },
            belt: { label: "Belt", phys: 100, mag: 0 },
        },
        types: [
            "nospread",
            "mage",
            "heavy",
            "light",
        ],
        slots: {
            helmet: { label: "Helmet", text: "helmet", jewel: false },
            chest: { label: "Chestplate", text: "chest", jewel: false },
            gloves: { label: "Gloves", text: "gloves", jewel: false },
            leggings: { label: "Leggings", text: "leggings", jewel: false },
            boots: { label: "Boots", text: "boots", jewel: false },
            amulet: { label: "Amulet", text: "amulet", jewel: true },
            ring: { label: "Ring", text: "ring", jewel: true },
            belt: { label: "Belt", text: "belt", jewel: true },
        },
        scalars: {
            helmet: 2.9,
            chest: 5.8,
            leggings: 3.9,
            gloves: 2.9,
            boots: 2.9,
            belt: 1.9,
            amulet: 2.3,
            ring: 1.6,
            none: 0,
        },
    },
    offhand: {
        spreads: {
            none: { label: "Custom", phys: 0, mag: 0 },
            shield: { label: "Shield", phys: 90, mag: 60 },
            focus: { label: "Focus", phys: 0, mag: 90 }
        },
        scalar: 9.68,
    },
    itemTypes: [
        "armor",
        "weapon",
        "offhand",
        "consumable",
        "rune",
        "loot"
    ],
    itemSubtypes: [
        "helmet",
        "chest",
        "gloves",
        "leggings",
        "boots",
        "amulet",
        "ring",
        "belt",
        "onehanded",
        "twohanded",
        "melee",
        "ranged"
    ],
}