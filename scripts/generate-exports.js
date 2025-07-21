import fs from 'fs';
import path from 'path';
import { EonGroups, EonColors } from '../src/index.js';

const pkg = JSON.parse(fs.readFileSync('package.json'), 'utf-8');

/**
 * @function validateData
 * @description Validates the structure and format of EonColors and EonGroups before build.
 * @throws Will throw an error if data is not well-formed or contains invalid hex codes.
 */
function validateData() {
    if (!EonColors || typeof EonColors !== 'object') {
        throw new Error('EonColors is not properly defined');
    }
    
    if (!EonGroups || typeof EonGroups !== 'object') {
        throw new Error('EonGroups is not properly defined');
    }
    
    Object.entries(EonColors).forEach(([name, hex]) => {
        if (!hex.match(/^#[0-9a-fA-F]{6}$/)) {
            throw new Error(`Invalid hex color for ${name}: ${hex}`);
        }
    });
    
    console.log('✅ Data validation passed');
}

/**
 * @function ensureDistDirectory
 * @description Ensures the dist directory exists and creates one if it doesn't exist.
 * @returns {string} The path to the created or existing `dist` directory.
 */
function ensureDistDirectory() {
    const distDir = './dist';
    try {
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
            console.log('📁 Created dist directory');
        }
        return distDir;
    } catch (error) {
        throw new Error(`Failed to create dist directory: ${error.message}`);
    }
}

/**
 * @function generateSCSS
 * @description Generates SCSS content with proper formatting
 * @returns {string} The SCSS content including maps, mixins, functions, and variables.
 */
function generateSCSS() {
    const header = `// EON COLOR PALETTE <${pkg.name}> - v${pkg.version}
// ©️ 2025 by Logstack Labs, licensed under ${pkg.license}
// ${pkg.description}
//
// Generated: ${new Date().toISOString()}
//
// AUTHOR: ${pkg.author.name} <${pkg.author.email}>
// LINKS:
//    - ${pkg.author.url}
//    - https://logstack.dev/
//    - https://github.com/logstacklabs/
//
// REFERENCES/ACKNOWLEDGEMENTS:
//    - https://coolors.co/
//    - https://sass-lang.com
//    - https://opensource.org/license/mit
//    - https://sass-lang.com/documentation/variables/
//    - https://www.w3schools.com/sass/sass_variables.php`;
    
    const scssPalette = Object.entries(EonColors)
        .map(([name, value]) => `    '${name}': ${value}`)
        .join(',\n');
    
    const scssGroups = Object.entries(EonGroups)
        .map(([groupName, colors]) => {
            const colorList = Object.entries(colors)
                .map(([colorName, hexValue]) => `\n        '${colorName}': ${hexValue}`).join(',');
            return `    '${groupName}': (${colorList}\n\t)`;
        })
        .join(',\n');

    return `${header}
@use 'sass:map';
@use 'sass:meta';

$eon-color-palette: (
${scssPalette}
);

// EON Color groups: <map>
$eon-groups: (
${scssGroups}
);

// @description A mixin for generating CSS custom properties for all colors
// @param {String} $selector - Selector to apply properties to (default: ':root')
@mixin eon-colors($selector: ':root') {
    #{$selector} {
        @each $name, $color in $eon-color-palette {
            --eo-#{$name}: #{$color};
        }
    }
}

// @description Get a color as a CSS custom property
// @param {String} $name - Color name
// @return {String} CSS custom property
@function eon-color($name) {
    @if not map.has-key($eon-color-palette, $name) {
        @error "Invalid color: '#{$name}'. Available colors: #{map.keys($eon-color-palette)}";
    }
    @return var(--eo-#{$name});
}

// @description Get a color's hex value directly
// @param {String} $name - Color name
// @return {Color} Hex color value
@function eon-color-value($name) {
    @if not map.has-key($eon-color-palette, $name) {
        @error "Invalid color: '#{$name}'. Available colors: #{map.keys($eon-color-palette)}";
    }
    @return map.get($eon-color-palette, $name);
}

// @description Get colors from a specific group
// @param {String} $group-name - Group name
// @param {String} $type - Return type, default 'null'
// @return {map} A map of color name and their values
// @return {List} A list of hex values of colors in the group if the type parameter is specified.
@function eon-group($group-name, $type: null) {
    @if not map.has-key($eon-groups, $group-name) {
        @error "Invalid group: '#{$group-name}'. Available groups: #{map.keys($eon-groups)}";
    }
    $group: map.get($eon-groups, $group-name);
    @if $type and ($type == values) {
        @return  map.values($group);
    }
    @return $group;
}
`.trim();
}

/**
 * @function generateCSS
 * @returns {string} CSS custom properties representing EON colors.
 */
function generateCSS() {
    const header = `/*
* EON COLOR PALETTE <${pkg.name}> - v${pkg.version}
* ©️ 2025 by Logstack Labs, licensed under ${pkg.license}
* ${pkg.description}
*
* Generated: ${new Date().toISOString()}
*
* AUTHOR: ${pkg.author.name} <${pkg.author.email}>
* LINKS:
*    - ${pkg.author.url}
*    - https://logstack.dev/
*    - https://github.com/logstacklabs/
*
* REFERENCES/ACKNOWLEDGEMENTS:
*    - https://coolors.co/
*    - https://opensource.org/license/mit
*    - https://www.w3.org/TR/css-variables
*    - https://www.w3.org/TR/selectors/#root-pseudo
*    - https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
*/`;
    const cssVars = Object.entries(EonColors)
        .map(([name, value]) => `    --eo-${name}: ${value};`)
        .join('\n');

    return `${header}
:root {
${cssVars}
}
`.trim();
}

/**
 * @function generateJSON
 * @returns {string} A JSON representation of the EON color palette and metadata.
 */
function generateJSON() {
    return JSON.stringify({
        version: pkg.version || '0.0.0',
        name: pkg.name,
        description: pkg.description,
        license: pkg.license,
        author: pkg.author,
        EonColors: EonColors,
        EonGroups: EonGroups,
        metadata: {
            totalColors: Object.keys(EonColors).length,
            totalGroups: Object.keys(EonGroups).length,
            generatedAt: new Date().toISOString()
        }
    }, null, 4);
}

/**
 * @function generateTypeDefinitions
 * @returns {string} TypeScript definitions for EonColors and EonGroups.
 */
function generateTypeDefinitions() {
    const header = `/*
* EON COLOR PALETTE <${pkg.name}> - v${pkg.version}
* ©️ 2025 by Logstack Labs, licensed under ${pkg.license}
* ${pkg.description}
*
* Generated: ${new Date().toISOString()}
*
* AUTHOR: ${pkg.author.name} <${pkg.author.email}>
* LINKS:
*    - ${pkg.author.url}
*    - https://logstack.dev/
*    - https://github.com/logstacklabs/
*
* References/Acknowledgements:
*    - https://coolors.co/
*    - https://opensource.org/license/mit
*    - https://www.typescriptlang.org/docs/
*/`;
    const colorNames = Object.keys(EonColors).map(name => `'${name}'`).join(' | ');
    const groupNames = Object.keys(EonGroups).map(name => `'${name}'`).join(' | ');

    return `${header}
export type EonColorName = ${colorNames};

export type EonGroupName = ${groupNames};

export interface EonColorPalette {
    ${Object.entries(EonColors).map(([name, hex]) => `${name}: '${hex}';`).join('\n    ')}
}

export interface EonColorGroups {
    ${Object.entries(EonGroups).map(([groupName, colors]) =>
        `${groupName}: { ${Object.keys(colors).map(colorName => `${colorName}: string;`).join(' ')} };`
    ).join('\n    ')}
}

export declare const EonColors: EonColorPalette;
export declare const EonGroups: EonColorGroups;

export declare function getEonColor(name: EonColorName): string | null;
export declare function getEonGroup(name: EonGroupName): Record<string, string> | null;

export declare function injectEonColors(): boolean;
export declare function removeEonColors(): boolean;
`.trim();
}

/**
 * @function buildExports
 * @description Orchestrates the full build: validation, generation, file writing and logging.
 */
async function buildExports() {
    try {
        console.log('🎨 Building Eon Colors distribution files...\n');
        validateData();
        const distDir = ensureDistDirectory();
        const files = [
            { name: 'eon.scss', content: generateSCSS(), description: 'SCSS variables and mixins' },
            { name: 'eon.css', content: generateCSS(), description: 'CSS custom properties' },
            { name: 'eon.json', content: generateJSON(), description: 'JSON color data' },
            { name: 'eon.d.ts', content: generateTypeDefinitions(), description: 'TypeScript definitions' }
        ];

        const results = await Promise.allSettled(
            files.map(async ({ name, content, description }) => {
                const filePath = path.join(distDir, name);
                await fs.promises.writeFile(filePath, content, 'utf-8');
                return { name, description, size: content.length };
            })
        );

        console.log('📦 Generated files:');
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const { name, description, size } = result.value;
                console.log(`   ✅ ${name} - ${description} (${size} bytes)`);
            } else {
                const { name } = files[index];
                console.error(`   ❌ ${name} - Failed: ${result.reason.message}`);
            }
        });

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        console.log(`\n🎉 Build complete! ${successCount}/${files.length} files generated successfully.`);
        console.log(`📁 Output directory: ${path.resolve(distDir)}`);

    } catch (error) {
        console.error('💥 Build failed:', error.message);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    buildExports().then(r => {});
}

export { buildExports, validateData, generateSCSS, generateCSS, generateJSON };
