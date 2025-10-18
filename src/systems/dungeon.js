// src/systems/dungeon.js - SYSTÈME ARÈNES

import { ARENA_DUNGEON_CONFIGS } from '../config/dungeonArenas.js';
import { LAYOUT_DUNGEON_CONFIGS } from '../config/dungeonLayouts.js';
import { ENEMY_TYPES } from '../config/enemies.js';
import { BOSS_TYPES } from '../config/bosses.js';
import { generateZombiesForMap } from '../config/spawnCircles.js';

export function getDungeonType(mapX, mapY) {
  const key = `${mapX},${mapY}`;
  
  const arenaTypes = {
    '0,-3': { type: 'fastfood', layoutType: 'arena' },
    '0,3': { type: 'chantier', layoutType: 'arena' },
    '-3,0': { type: 'boutique', layoutType: 'arena' },
    '3,0': { type: 'oasis', layoutType: 'arena' }
  };
  
  const layoutTypes = {
    '4,-4': { type: 'militaire', layoutType: 'procedural' },
    '-4,4': { type: 'labo', layoutType: 'procedural' },
    '4,4': { type: 'ferme', layoutType: 'procedural' },
    '-4,-4': { type: 'usine', layoutType: 'procedural' }
  };
  
  return arenaTypes[key] || layoutTypes[key] || null;
}

export function createArenaDungeon(type, player, state) {
  const config = ARENA_DUNGEON_CONFIGS[type];
  
  if (!config) {
    console.error(`Donjon arène inconnu: ${type}`);
    return null;
  }
  
  const entryPosition = {
    x: player.x,
    y: player.y,
    mapX: player.mapX,
    mapY: player.mapY
  };
  
  player.x = config.arenaCoords.x;
  player.y = config.arenaCoords.y;
  player.mapX = config.arenaCoords.mapX;
  player.mapY = config.arenaCoords.mapY;
  
  state.entities = [];
  state.boss = null;
  state.loot = [];
  
  console.log(`🏟️ Arène créée: ${config.name}`);
  
  return {
    type,
    layoutType: 'arena',
    name: config.name,
    config,
    entryPosition,
    currentWave: 0,
    totalWaves: config.waves,
    waveInProgress: false,
    canExit: false,
    completed: false,
    exitPortal: {
      x: config.arenaCoords.x,
      y: config.arenaCoords.y,
      active: false,
      width: 100,
      height: 80
    }
  };
}

export function startNextWave(dungeon, state) {
  if (dungeon.waveInProgress || dungeon.completed) return;
  
  dungeon.currentWave++;
  dungeon.waveInProgress = true;
  dungeon.canExit = false;
  
  const config = dungeon.config;
  const wave = dungeon.currentWave;
  
  console.log(`🌊 Vague ${wave}/${dungeon.totalWaves} commence !`);
  
  const isBossWave = wave === dungeon.totalWaves;
  
  if (isBossWave) {
    const bossDef = BOSS_TYPES[config.bossType];
    
    state.boss = {
      name: bossDef.name,
      x: config.arenaCoords.x,
      y: config.arenaCoords.y - 300,
      hp: bossDef.hp,
      maxHp: bossDef.hp,
      speed: bossDef.speed,
      damage: bossDef.damage,
      color: bossDef.color,
      size: bossDef.size,
      attackRange: bossDef.attackRange,
      attackRate: bossDef.attackRate,
      lastAttack: 0,
      phase: 1,
      lastPhaseChange: state.time,
      lastSpecialAttack: 0
    };
    
    console.log(`👹 Boss spawné: ${bossDef.name}`);
  } else {
    const zombieTypes = generateZombiesForMap(state.player.mapX, state.player.mapY);
    const zombieCount = config.baseZombies + (wave - 1) * config.zombieIncrement;
    
    for (let i = 0; i < zombieCount; i++) {
      const typeKey = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
      const enemyDef = ENEMY_TYPES[typeKey];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 400 + Math.random() * 200;
      
      const spawnX = config.arenaCoords.x + Math.cos(angle) * distance;
      const spawnY = config.arenaCoords.y + Math.sin(angle) * distance;
      
      state.entities.push({
        name: enemyDef.name,
        x: spawnX,
        y: spawnY,
        hp: enemyDef.hp,
        maxHp: enemyDef.hp,
        speed: enemyDef.speed,
        damage: enemyDef.damage,
        color: enemyDef.color,
        size: enemyDef.size,
        attackRange: enemyDef.attackRange,
        attackRate: enemyDef.attackRate,
        lastAttack: 0,
        special: enemyDef.special,
        alerted: true,
        aggroed: true
      });
    }
  }
}

export function checkWaveComplete(dungeon, state) {
  if (!dungeon.waveInProgress) return;
  
  const allDead = state.entities.length === 0 && state.boss === null;
  
  if (allDead) {
    dungeon.waveInProgress = false;
    dungeon.canExit = true;
    
    console.log(`✅ Vague ${dungeon.currentWave} terminée !`);
    
    if (dungeon.currentWave >= dungeon.totalWaves) {
      dungeon.completed = true;
      dungeon.exitPortal.active = true;
      console.log('🎉 ARÈNE TERMINÉE !');
    }
  }
}

export function exitArenaDungeon(dungeon, player, state) {
  player.x = dungeon.entryPosition.x;
  player.y = dungeon.entryPosition.y;
  player.mapX = dungeon.entryPosition.mapX;
  player.mapY = dungeon.entryPosition.mapY;
  
  state.entities = [];
  state.boss = null;
  state.dungeon = null;
  
  console.log(`✅ Sortie arène - Retour en (${dungeon.entryPosition.mapX},${dungeon.entryPosition.mapY})`);
}