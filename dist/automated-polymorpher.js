/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */
// Import JavaScript modules
// Import TypeScript modules
import { getGame, registerSettings } from "./module/settings.js";
import { preloadTemplates } from "./module/preloadTemplates.js";
import { initHooks, readyHooks, setupHooks } from "./module/Hooks.js";
import { APCONSTS } from "./module/config.js";
export let debugEnabled = 0;
// 0 = none, warnings = 1, debug = 2, all = 3
export const debug = (...args) => {
    if (debugEnabled > 1)
        console.log(`DEBUG:${APCONSTS.MN} | `, ...args);
};
export const log = (...args) => console.log(`${APCONSTS.MN} | `, ...args);
export const warn = (...args) => {
    if (debugEnabled > 0)
        console.warn(`${APCONSTS.MN} | `, ...args);
};
export const error = (...args) => console.error(`${APCONSTS.MN} | `, ...args);
export const timelog = (...args) => warn(`${APCONSTS.MN} | `, Date.now(), ...args);
export const i18n = (key) => {
    return getGame().i18n.localize(key);
};
export const i18nFormat = (key, data = {}) => {
    return getGame().i18n.format(key, data);
};
export const setDebugLevel = (debugText) => {
    debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
    // 0 = none, warnings = 1, debug = 2, all = 3
    if (debugEnabled >= 3)
        CONFIG.debug.hooks = true;
};
/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async () => {
    console.log(`${APCONSTS.MN} | Initializing ${APCONSTS.MN}`);
    // Register custom module settings
    registerSettings();
    // Assign custom classes and constants here
    initHooks();
    // Preload Handlebars templates
    await preloadTemplates();
    // Register custom sheets (if any)
});
/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
    // Do anything after initialization but before ready
    // setupModules();
    //registerSettings();
    setupHooks();
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', () => {
    // Do anything once the module is ready
    if (!getGame().modules.get('lib-wrapper')?.active && getGame().user?.isGM) {
        ui.notifications?.error(`The '${APCONSTS.MN}' module requires to install and activate the 'libWrapper' module.`);
        return;
    }
    if (!getGame().modules.get('sequencer')?.active && getGame().user?.isGM) {
        ui.notifications?.error(`The '${APCONSTS.MN}' module requires to install and activate the 'sequencer' module.`);
        return;
    }
    readyHooks();
});
// Add any additional hooks if necessary
