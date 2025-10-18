// src/config/dungeonArenas.js - CONFIGURATION ARÈNES

export const ARENA_DUNGEON_CONFIGS = {
  fastfood: {
    id: 'fastfood',
    name: '🍔 Arène Fast-Food',
    type: 'arena',
    lootCategory: 'ff',
    bossType: 'gerant',
    mapCoords: { x: 0, y: -3 },
    arenaCoords: { x: 1280, y: 1280, mapX: -100, mapY: 0 },
    waves: 7,
    baseZombies: 5,
    zombieIncrement: 2,
    cooldown: 7200
  },
  
  chantier: {
    id: 'chantier',
    name: '🧱 Arène Chantier',
    type: 'arena',
    lootCategory: 'ch',
    bossType: 'macon',
    mapCoords: { x: 0, y: 3 },
    arenaCoords: { x: 1280, y: 1280, mapX: -101, mapY: 0 },
    waves: 7,
    baseZombies: 5,
    zombieIncrement: 2,
    cooldown: 7200
  },
  
  boutique: {
    id: 'boutique',
    name: '🧵 Arène Boutique',
    type: 'arena',
    lootCategory: 'bc',
    bossType: 'consommatrice',
    mapCoords: { x: -3, y: 0 },
    arenaCoords: { x: 1280, y: 1280, mapX: -102, mapY: 0 },
    waves: 7,
    baseZombies: 5,
    zombieIncrement: 2,
    cooldown: 7200
  },
  
  oasis: {
    id: 'oasis',
    name: '🏝️ Arène Oasis',
    type: 'arena',
    lootCategory: 'oa',
    bossType: 'pecheur',
    mapCoords: { x: 3, y: 0 },
    arenaCoords: { x: 1280, y: 1280, mapX: -103, mapY: 0 },
    waves: 7,
    baseZombies: 5,
    zombieIncrement: 2,
    cooldown: 7200
  }
};