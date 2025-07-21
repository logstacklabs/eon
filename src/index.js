/**
 * @file index.js
 * @module EonColors
 * @description
 *      Defines the core Eon color palette, Eon grouped color collections, and utility functions
 *      for accessing and validating color data. Designed for UI theming and design systems.
 * @version 1.0.0
 * @license MIT
 * @authors
 *      Muhammed A. <logstacklabs@gmail.com>
 */

/**
 * @constant {Object} EonColors
 * @description The full Eon color palette. Each key (color name) mapped to its corresponding hex value.
 */
export const EonColors = {
    black: "#000000",
    pitch: "#090909",
    night: "#121212",
    coal: "#2b2b2b",
    graphite: "#4a4a4a",
    storm: "#4a5759",
    steel: "#5a646e",
    olive: "#4f5851",
    sigil: "#4D4153",
    khaki: "#6a5e52",
    moss: "#7b8165",
    mauve: "#9a8c98",
    taupe: "#a59e8c",
    latte: "#d4a373",
    cream: "#eaddca",
    mint: "#ecffdc",
    sand: "#f1eee4",
    petal: "#ffe4ee",
    blush: "#fff0fb",
    smoke: "#f5f5f5",
    powder: "#faf9f6",
    white: "#ffffff",
    coral: "#e76f51",
    terra: "#d65a3a",
    peach: "#ffa69e",
    candy: "#ffc4d6",
    mustard: "#ffde5c",
    teal: "#2a9d8f"
};

/**
 * @constant {Object} EonGroups
 * @description Named groupings of related Eon colors for theme building or UI grouping.
 * Each group contains a subset of `EonColors`.
 */
export const EonGroups = {
    deepAnchors: {
        black: EonColors.black,
        pitch: EonColors.pitch,
        night: EonColors.night,
        coal: EonColors.coal
    },
    stoneNeutrals: {
        graphite: EonColors.graphite,
        storm: EonColors.storm,
        steel: EonColors.steel
    },
    earthyTones: {
        olive: EonColors.olive,
        khaki: EonColors.khaki,
        moss: EonColors.moss,
        taupe: EonColors.taupe,
        latte: EonColors.latte
    },
    dustyChromatics: {
        sigil: EonColors.sigil,
        mauve: EonColors.mauve
    },
    softNeutrals: {
        cream: EonColors.cream,
        sand: EonColors.sand,
        smoke: EonColors.smoke,
        powder: EonColors.powder,
        white: EonColors.white
    },
    etherealPastels: {
        mint: EonColors.mint,
        petal: EonColors.petal,
        blush: EonColors.blush,
        candy: EonColors.candy,
        peach: EonColors.peach
    },
    vibrantAccents: {
        coral: EonColors.coral,
        terra: EonColors.terra,
        mustard: EonColors.mustard,
        teal: EonColors.teal
    }
};

/**
 * @function getEonColor
 * @description Retrieves a color value by its name from the palette.
 * @param {string} name - The name of the color.
 * @returns {string|null} The hex color string if found, otherwise `null`.
 */
export const getEonColor = (name) => {
    if (typeof name !== 'string') return null;
    return EonColors[name] || null;
};

/**
 * @function getEonGroup
 * @description Retrieves a group of colors by its name.
 * @param {string} name - The name of the group.
 * @returns {Object|null} An object of color names and values in the group, or `null` if not found.
 */
export const getEonGroup = (name) => {
    if (typeof name !== 'string') return null;
    return EonGroups[name] || null;
};

/**
 * @function getAllColorNames
 * @description Returns all available color names in the palette.
 * @returns {string[]} An array of all color keys in `EonColors`.
 */
export const getAllColorNames = () => Object.keys(EonColors);

/**
 * @function getAllGroupNames
 * @description Returns all available group names in the palette.
 * @returns {string[]} An array of all group keys in `EonGroups`.
 */
export const getAllGroupNames = () => Object.keys(EonGroups);

/**
 * @function getColorsByGroup
 * @description Retrieves the names of all colors in a specific group.
 * @param {string} groupName - The group name.
 * @returns {string[]} An array of color names, or an empty array if the group is not found.
 */
export const getColorsByGroup = (groupName) => {
    const group = getEonGroup(groupName);
    return group ? Object.keys(group) : [];
};

/**
 * @function isValidEonColor
 * @description Checks whether a given hex color is part of the Eon palette.
 * @param {string} color - The hex color value to check.
 * @returns {boolean} `true` if the color exists in `EonColors`, otherwise `false`.
 */
export const isValidEonColor = (color) => {
    return Object.values(EonColors).includes(color);
};
