// src/systems/mapTransition.js

import { MAP_SIZE } from '../config/map.js';
import { getSpawnCount, generateZombiesForMap, SPAWN_CIRCLES } from '../config/spawnCircles.js';
import { ENEMY_TYPES } from '../config/enemies.js';

export function checkMapTransition(player, camera) {
  const margin = 50;
  
  if (player.x < margin) {
    return { direction: 'left', newMapX: player.mapX - 1, newMapY: player.mapY };
  }
  
  if (player.x > MAP_SIZE - margin) {
    return { direction: 'right', newMapX: player.mapX + 1, newMapY: player.mapY };
  }
  
  if (player.y < margin) {
    return { direction: 'up', newMapX: player.mapX, newMapY: player.mapY - 1 };
  }
  
  if (player.y > MAP_SIZE - margin) {
    return { direction: 'down', newMapX: player.mapX, newMapY: player.mapY + 1 };
  }
  
  return null;
}

export function executeTransition(player, camera, transition, state) {
  player.mapX = transition.newMapX;
  player.mapY = transition.newMapY;
  
  switch (transition.direction) {
    case 'left':
      player.x = MAP_SIZE - 100;
      break;
    case 'right':
      player.x = 100;
      break;
    case 'up':
      player.y = MAP_SIZE - 100;
      break;
    case 'down':
      player.y = 100;
      break;
  }
  
  state.entities = [];
  state.boss = null;
  state.loot = [];
  state.projectiles = [];
  
  // PAS DE SPAWN sur le hub (0,0)
  if (player.mapX === 0 && player.mapY === 0) {
    console.log('🏠 Hub - Zone sûre, pas de spawn');
    return true;
  }
  
  spawnZombiesForMap(player.mapX, player.mapY, state);
  
  return true;
}

function spawnZombiesForMap(mapX, mapY, state) {
  const zombieTypes = generateZombiesForMap(mapX, mapY);
  const spawnCount = getSpawnCount(mapX, mapY);
  
  console.log(`🧟 Spawn ${spawnCount} zombies sur map (${mapX}, ${mapY})`);
  
  let spawned = 0;
  
  SPAWN_CIRCLES.forEach(circle => {
    if (spawned >= spawnCount) return;
    
    const count = Math.min(circle.count, spawnCount - spawned);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * circle.radius;
      
      const spawnX = circle.x + Math.cos(angle) * distance;
      const spawnY = circle.y + Math.sin(angle) * distance;
      
      const typeKey = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
      const enemyDef = ENEMY_TYPES[typeKey];
      
      if (!enemyDef) continue;
      
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
        alerted: false,
        aggroed: false,
        tier: enemyDef.tier,
        xp: enemyDef.xp
      });
      
      spawned++;
    }
  });
}