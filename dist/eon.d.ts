/*
* EON COLOR PALETTE <@logstack/eon> - v1.0.2
* ©️ 2025 by Logstack Labs, licensed under MIT
* A refined collection of neutral tones with subtle accents for modern UI design.
*
* Generated: 2025-08-07T19:51:41.889Z
*
* AUTHOR: Muhammed A. Senghore <logstacklabs@gmail.com>
* LINKS:
*    - https://www.msio.me
*    - https://logstack.dev/
*    - https://github.com/logstacklabs/
*
* References/Acknowledgements:
*    - https://coolors.co/
*    - https://opensource.org/license/mit
*    - https://www.typescriptlang.org/docs/
*/
export type EonColorName = 'black' | 'pitch' | 'night' | 'coal' | 'graphite' | 'storm' | 'steel' | 'olive' | 'sigil' | 'khaki' | 'moss' | 'mauve' | 'taupe' | 'latte' | 'cream' | 'mint' | 'sand' | 'petal' | 'blush' | 'smoke' | 'powder' | 'white' | 'coral' | 'terra' | 'peach' | 'candy' | 'mustard' | 'teal';

export type EonGroupName = 'deepAnchors' | 'stoneNeutrals' | 'earthyTones' | 'dustyChromatics' | 'softNeutrals' | 'etherealPastels' | 'vibrantAccents';

export interface EonColorPalette {
    black: '#000000';
    pitch: '#090909';
    night: '#121212';
    coal: '#2b2b2b';
    graphite: '#4a4a4a';
    storm: '#4a5759';
    steel: '#5a646e';
    olive: '#4f5851';
    sigil: '#4D4153';
    khaki: '#6a5e52';
    moss: '#7b8165';
    mauve: '#9a8c98';
    taupe: '#a59e8c';
    latte: '#d4a373';
    cream: '#eaddca';
    mint: '#ecffdc';
    sand: '#f1eee4';
    petal: '#ffe4ee';
    blush: '#fff0fb';
    smoke: '#f5f5f5';
    powder: '#faf9f6';
    white: '#ffffff';
    coral: '#e76f51';
    terra: '#d65a3a';
    peach: '#ffa69e';
    candy: '#ffc4d6';
    mustard: '#ffde5c';
    teal: '#2a9d8f';
}

export interface EonColorGroups {
    deepAnchors: { black: string; pitch: string; night: string; coal: string; };
    stoneNeutrals: { graphite: string; storm: string; steel: string; };
    earthyTones: { olive: string; khaki: string; moss: string; taupe: string; latte: string; };
    dustyChromatics: { sigil: string; mauve: string; };
    softNeutrals: { cream: string; sand: string; smoke: string; powder: string; white: string; };
    etherealPastels: { mint: string; petal: string; blush: string; candy: string; peach: string; };
    vibrantAccents: { coral: string; terra: string; mustard: string; teal: string; };
}

export declare const EonColors: EonColorPalette;
export declare const EonGroups: EonColorGroups;

export declare function getEonColor(name: EonColorName): string | null;
export declare function getEonGroup(name: EonGroupName): Record<string, string> | null;

export declare function injectEonColors(): boolean;
export declare function removeEonColors(): boolean;