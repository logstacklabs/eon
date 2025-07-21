/**
 * @file inject.js
 * @module inject
 * @description
 *      Provides utility functions to inject, remove, and check the presence of Eon color palette
 *      CSS variables in the DOM. This allows themes to be applied dynamically via the `:root` scope.
 * @version 1.0.0
 * @license MIT
 * @authors
 *      Muhammed A. <logstacklabs@gmail.com>
 */
import { EonColors } from './index.js';

/**
 * @function injectEonColors
 * @description
 *      Injects the Eon color palette into the DOM as CSS custom properties under the `:root` scope.
 *      Each color is prefixed (default: `--eo-`) and appended to a `<style>` tag inside `<head>`.
 *
 * @param {Object} [options={}] - Configuration options.
 * @param {string} [options.styleId='eon-styles'] - ID to assign to the injected `<style>` tag.
 * @param {boolean} [options.replace=true] - Whether to replace an existing style block with the same ID.
 *
 * @returns {boolean} `true` if styles were injected successfully, `false` otherwise.
 *
 * @example
 * injectEonColors({ styleId: 'custom-theme', replace: false });
 */
export function injectEonColors(options = {}) {
    if (typeof document === 'undefined') {
        console.warn('Document is not available. Cannot inject CSS variables.');
        return false;
    }
    
    const {
        styleId = 'eon-styles',
        replace = true
    } = options;
    
    if (replace) {
        removeEonColors(styleId);
    }
    
    const existingStyle = document.getElementById(styleId);
    if (existingStyle && !replace) {
        console.warn(`Styles with id "${styleId}" already exist. Use replace: true to override.`);
        return false;
    }
    
    try {
        const style = document.createElement('style');
        style.id = styleId;
        
        const prefix = 'eo';
        const cssVars = Object.entries(EonColors)
            .map(([name, value]) => `  --${prefix}-${name}: ${value};`)
            .join('\n');
        
        style.textContent = `:root {\n${cssVars}\n}`;
        document.head.appendChild(style);
        
        return true;
    } catch (error) {
        console.error('Failed to inject Eon colors:', error);
        return false;
    }
}

/**
 * @function removeEonColors
 * @description Removes the Eon color `<style>` element from the DOM by its ID.
 *
 * @param {string} [styleId='eon-styles'] - The ID of the `<style>` element to remove.
 * @returns {boolean} `true` if the style was found and removed, otherwise `false`.
 *
 * @example
 * removeEonColors(); // Removes style with ID 'eon-styles'
 */
export function removeEonColors(styleId = 'eon-styles') {
    if (typeof document === 'undefined') return false;
    
    const style = document.getElementById(styleId);
    if (style) {
        style.remove();
        return true;
    }
    return false;
}

/**
 * @function isEonColorsInjected
 * @description Checks whether a style tag with the specified ID exists in the DOM.
 *
 * @param {string} [styleId='eon-styles'] - The ID of the style tag to look for.
 * @returns {boolean} `true` if the style is present in the DOM, otherwise `false`.
 *
 * @example
 * const active = isEonColorsInjected(); // true or false
 */
export function isEonColorsInjected(styleId = 'eon-styles') {
    if (typeof document === 'undefined') return false;
    return document.getElementById(styleId) !== null;
}
