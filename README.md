<div align="center">
<img src="https://socialify.git.ci/logstacklabs/eon/image?custom_language=JavaScript&description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Light" alt="eon" width="640" height="320" />
  <h1>EON Color Palette</h1>

[![npm version](https://img.shields.io/npm/v/@logstack/eon.svg?style=flat-square)](https://www.npmjs.com/package/@logstack/eon)
[![License](https://img.shields.io/github/license/logstacklabs/eon.svg?style=flat-square)](https://github.com/logstacklabs/eon/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@logstack/eon.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@logstack/eon)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@logstack/eon?style=flat-square)](https://bundlephobia.com/package/@logstack/eon)
</div>

## 🌌 Introduction
**EON** is a carefully curated color palette inspired by natural elements and timeless design principles for modern interface designs. It features 28 carefully selected colors organized into 7 semantic groups.

## 📦 Installation
```bash
# npm
npm install @logstack/eon
```

## 🚀 Usage
- ### Basic Color Access
```javascript
import { EonColors, getEonColor } from '@logstack/eon';

// Direct access
const black = EonColors.black; // "#000000"
const teal = EonColors.teal;   // "#2a9d8f"

// Function access with validation
const color = getEonColor('coral'); // "#e76f51"
const invalid = getEonColor('red'); // null
```

- ### Color Groups
```javascript
import { EonGroups, getEonGroup } from '@logstack/eon';

// Get entire color groups
const darkColors = EonGroups.deepAnchors;
// { black: "#000000", pitch: "#090909", night: "#121212", coal: "#2b2b2b" }

const accents = getEonGroup('vibrantAccents');
// { coral: "#e76f51", terra: "#d65a3a", mustard: "#ffde5c", teal: "#2a9d8f" }
```
- ### CSS Variable Injection
```javascript
import { injectEonColors, removeEonColors } from '@logstack/eon/inject';

// Inject CSS custom properties
injectEonColors(); 
// Creates :root { --eo-black: #000000; --eo-teal: #2a9d8f; ... }

// Custom configuration
injectEonColors({
  styleId: 'my-colors',   // Custom style element ID
  replace: false          // Don't replace existing styles
});

// React component example
function Button() {
    return (
        <button style={{
            color: 'var(--eo-white)',
            backgroundColor: 'var(--eo-coral)'
        }}>
            Click Me
        </button>
    );
}

// Remove injected styles
removeEonColors();
```

- ### CSS Variables
```css
@import '@logstack/eon/css';

button {
    background: var(--eo-sigil);
    border: 2px solid var(--eo-coal);
}
```

- ### SCSS Variables
```scss
/*
@mixin eon-colors($selector: ':root') {}    // Generate CSS variables

@function eon-color($colorName) {}          // Returns CSS styled variable, Eg: var(--eo-sigil)
@function eon-color-value($colorName) {}    // Returns Hex value of color, Eg: #4D4153
@function eon-color-group($groupName) {}    // Returns an array of colors values from specified group.
*/
@use 'sass:color';
@use '@logstack/eon/scss' as eon;

@include eon.eon-colors();

.button {
    background: eon.eon-color('teal'); //? var(--eo-teal);
    border: 2px solid eon.eon-color-value('coal'); //? #2B2B2B

    &:hover {
        background: color.scale(eon.eon-color-value('teal'), $green: 44%);
    }
}

@use 'sass:map';

.tmp { 
    color: map.get($eon-color-palette, 'sigil');
}
```

- ### Utility Functions
```javascript
import { 
  getAllColorNames, 
  getAllGroupNames, 
  getColorsByGroup,
  isValidEonColor 
} from '@logstack/eon';

const allColors = getAllColorNames(); 
// ['black', 'pitch', 'night', ...]

const groups = getAllGroupNames(); 
// ['deepAnchors', 'stoneNeutrals', ...]

const earthyColors = getColorsByGroup('earthyTones'); 
// ['olive', 'khaki', 'moss', 'taupe', 'latte']

const isEonColor = isValidEonColor('#2a9d8f'); // true
```

- ### JSON
```json
{
  "version": "1.0.0",
  "colors": {
    "black": "#000000",
    "pitch": "#090909",
    // ...
  },
  "groups": {
    "deepAnchors": {
      "black": "#000000",
      "pitch": "#090909",
      // ...
    }
    // ...
  }
}
```

<details>
<summary>📚 API Reference</summary>

```javascript
// Core functions
getEonColor(colorName: string): string | null
getEonGroup(groupName: string): Record<string, string> | null

getAllColorNames(): string[]
getAllGroupNames(): string[]
getColorsByGroup(groupName: string): string[] | []

isValidEonColor(colorName: string): boolean
isEonColorsInjected(styleId: string): boolean
removeEonColors(styleId: string): boolean;  // Removes CSS variables
injectEonColors(options: Record<string, string>): boolean;  // Injects CSS variables

// Core objects
EonColors: Record<string, string>
EonGroups: Record<string, Record<string, string>>
```
</details>

## 🎨 Color Palette
### Color Groups
| Group              | Colors                                | Usage Examples               |
|--------------------|---------------------------------------|------------------------------|
| Deep Anchors       | black, pitch, night, coal             | Text, dark backgrounds       |
| Stone Neutrals     | graphite, storm, steel                | Borders, disabled states     |
| Earthy Tones       | olive, khaki, moss, taupe, latte      | Natural UI elements          |
| Dusty Chromatics   | plum, mauve                           | Secondary accents            |
| Soft Neutrals      | cream, sand, smoke, powder, white     | Backgrounds, light surfaces  |
| Ethereal Pastels   | mint, petal, blush, candy, peach      | Highlights, delicate accents |
| Vibrant Accents    | coral, terra, mustard, teal           | CTAs, important elements     |

### Full Color Reference
[![EON Color Grid](./docs/swatches.png)](https://logstacklabs.github.io/eon-swatches/)

## 🤝 Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
- Check out this guide [link](https://daily.dev/blog/how-to-contribute-to-open-source-github-repositories)
- Also makesure to record your changes in the [changelog](CHANGELOG.md) file.

## 📜 License
MIT License © 2025 [Logstack Labs](https://logstack.dev). See [LICENSE](https://github.com/logstacklabs/eon/blob/main/LICENSE) for details.

## 🙏 Acknowledgements
EON was made possible with help from:
- [Canva](https://www.canva.com/colors/color-wheel/)
- [Shields.io](https://shields.io)
- [Coolors.co](https://coolors.co)
- [SASS/SCSS](https://sass-lang.com)
- [Vitest Docs](https://vitest.dev/guide/)
- [MIT](https://opensource.org/license/mit)
- [TS Docs](https://www.typescriptlang.org/docs/)
---

> "Colors are the smiles of nature." - Leigh Hunt
