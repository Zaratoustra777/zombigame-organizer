// src/systems/dungeonLayout.js - VERSION COMPLÈTE

import { LAYOUT_DUNGEON_CONFIGS, generateDungeonLayout } from '../config/dungeonLayouts.js';
import { ENEMY_TYPES } from '../config/enemies.js';
import { BOSS_TYPES } from '../config/bosses.js';
import { ITEMS } from '../config/items/index.js';
import { generateZombiesForMap } from '../config/spawnCircles.js';
import { createLootContainer } from './loot.js';

export function createLayoutDungeon(type, player, state) {
  const config = LAYOUT_DUNGEON_CONFIGS[type];
  
  if (!config) {
    console.error(`Donjon layout inconnu: ${type}`);
    return null;
  }
  
  const entryPosition = {
    x: player.x,
    y: player.y,
    mapX: player.mapX,
    mapY: player.mapY
  };
  
  const layout = generateDungeonLayout(config);
  
  const firstRoom = layout.rooms[0];
  player.x = firstRoom.x;
  player.y = firstRoom.y + (firstRoom.height / 2) - 100;
  player.mapX = config.arenaCoords.mapX;
  player.mapY = config.arenaCoords.mapY;
  
  state.entities = [];
  state.boss = null;
  state.loot = [];
  
  console.log(`🏗️ Donjon layout créé: ${config.name} (${layout.totalRooms} salles)`);
  
  return {
    type,
    layoutType: 'procedural',
    name: config.name,
    config,
    entryPosition,
    currentRoom: 0,
    totalRooms: layout.totalRooms,
    rooms: layout.rooms,
    exitPortal: {
      x: firstRoom.x,
      y: firstRoom.y + (firstRoom.height / 2) - 100,
      active: false,
      width: 100,
      height: 80
    },
    completed: false
  };
}

export function checkRoomTrigger(dungeon, player, state) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return;
  
  const currentRoom = dungeon.rooms[dungeon.currentRoom];
  
  if (currentRoom.triggered || currentRoom.cleared) return;
  
  const roomBottom = currentRoom.y + currentRoom.height / 2;
  
  if (player.y < roomBottom - 300) {
    triggerRoom(currentRoom, dungeon, state);
  }
}

function triggerRoom(room, dungeon, state) {
  room.triggered = true;
  room.locked = true;
  
  console.log(`🚪 Salle ${room.id + 1} déclenchée - ${room.zombieCount} zombies`);
  
  const zombieTypes = generateZombiesForMap(state.player.mapX, state.player.mapY);
  
  for (let i = 0; i < room.zombieCount; i++) {
    const typeIndex = Math.floor(Math.random() * zombieTypes.length);
    const enemyDef = ENEMY_TYPES[zombieTypes[typeIndex]];
    
    if (!enemyDef) continue;
    
    let spawnX, spawnY, validSpawn = false, attempts = 0;
    
    while (!validSpawn && attempts < 100) {
      spawnX = room.x + (Math.random() - 0.5) * (room.width * 0.8);
      spawnY = room.y + (Math.random() - 0.5) * (room.height * 0.8);
      
      validSpawn = !room.props.some(prop => {
        const dx = Math.abs(prop.x - spawnX);
        const dy = Math.abs(prop.y - spawnY);
        return dx < (prop.width / 2 + 80) && dy < (prop.height / 2 + 80);
      });
      
      attempts++;
    }
    
    if (!validSpawn) {
      spawnX = room.x;
      spawnY = room.y;
      console.warn(`⚠️ Zombie ${i+1} spawn forcé au centre`);
    }
    
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
      aggroed: true,
      roomId: room.id,
      lastMoveTime: state.time,
      lastPosX: spawnX,
      lastPosY: spawnY
    });
  }
  
  room.zombiesAlive = room.zombieCount;
  
  if (room.boss) {
    const bossDef = BOSS_TYPES[room.boss];
    
    state.boss = {
      name: bossDef.name,
      x: room.x,
      y: room.y,
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
      lastSpecialAttack: 0,
      roomId: room.id
    };
    
    console.log(`👹 Boss spawné: ${bossDef.name}`);
  }
}

export function checkRoomClear(dungeon, state) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return;
  
  const currentRoom = dungeon.rooms[dungeon.currentRoom];
  
  if (!currentRoom.triggered || currentRoom.cleared) return;
  
  const aliveInRoom = state.entities.filter(e => e.roomId === currentRoom.id).length;
  const bossAlive = state.boss && state.boss.roomId === currentRoom.id;
  
  if (aliveInRoom === 0 && !bossAlive) {
    clearRoom(currentRoom, dungeon, state);
  }
}

function clearRoom(room, dungeon, state) {
  room.cleared = true;
  room.locked = false;
  
  console.log(`✅ Salle ${room.id + 1} terminée !`);
  
  if (room.id === 0) {
    dungeon.exitPortal.active = true;
    console.log('🚪 Porte de sortie activée !');
  }
  
  spawnChest(room, dungeon, state);
  
  if (room.id === dungeon.totalRooms - 1) {
    dungeon.completed = true;
    console.log('🎉 DONJON TERMINÉ !');
  }
}

function spawnChest(room, dungeon, state) {
  const lootItems = [];
  
  const hasT1 = Math.random() < 0.4;
  
  if (hasT1) {
    const t1Items = Object.entries(ITEMS).filter(([key, item]) => 
      item.category && item.category.startsWith(dungeon.config.lootCategory) && item.tier === 1
    );
    
    if (t1Items.length > 0) {
      const randomItem = t1Items[Math.floor(Math.random() * t1Items.length)];
      lootItems.push({ type: randomItem[0], count: 1 });
      console.log(`💎 Coffre T1: ${randomItem[1].name}`);
    }
  }
  
  if (room.boss) {
    const hasT2 = Math.random() < 0.1;
    
    if (hasT2) {
      const t2Items = Object.entries(ITEMS).filter(([key, item]) => 
        item.category && item.category.startsWith(dungeon.config.lootCategory) && item.tier === 2
      );
      
      if (t2Items.length > 0) {
        const randomItem = t2Items[Math.floor(Math.random() * t2Items.length)];
        lootItems.push({ type: randomItem[0], count: 1 });
        console.log(`💎 Coffre T2: ${randomItem[1].name}`);
      }
    }
  }
  
  if (lootItems.length > 0) {
    room.chest = createLootContainer(room.x, room.y, lootItems, 300);
    state.loot.push(room.chest);
  }
}

export function exitLayoutDungeon(dungeon, player, state) {
  player.x = dungeon.entryPosition.x;
  player.y = dungeon.entryPosition.y;
  player.mapX = dungeon.entryPosition.mapX;
  player.mapY = dungeon.entryPosition.mapY;
  
  state.entities = [];
  state.boss = null;
  state.dungeon = null;
  
  console.log(`✅ Sortie donjon layout`);
}

export function moveZombieWithObstacles(zombie, player, props, dt) {
  const dirX = player.x - zombie.x;
  const dirY = player.y - zombie.y;
  const dist = Math.sqrt(dirX * dirX + dirY * dirY);
  
  if (dist === 0) return;
  
  const normX = dirX / dist;
  const normY = dirY / dist;
  
  const desiredX = zombie.x + normX * zombie.speed * dt;
  const desiredY = zombie.y + normY * zombie.speed * dt;
  
  const blockedByProp = checkPropCollisionAtPosition(desiredX, desiredY, props, zombie.size / 2);
  
  if (!blockedByProp) {
    zombie.x = desiredX;
    zombie.y = desiredY;
    return;
  }
  
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 0.7, y: 0.7 },
    { x: -0.7, y: 0.7 },
    { x: 0.7, y: -0.7 },
    { x: -0.7, y: -0.7 }
  ];
  
  let bestDir = null;
  let bestScore = -Infinity;
  
  for (const dir of directions) {
    const testX = zombie.x + dir.x * zombie.speed * dt * 2;
    const testY = zombie.y + dir.y * zombie.speed * dt * 2;
    
    if (!checkPropCollisionAtPosition(testX, testY, props, zombie.size / 2)) {
      const score = dir.x * normX + dir.y * normY;
      
      if (score > bestScore) {
        bestScore = score;
        bestDir = dir;
      }
    }
  }
  
  if (bestDir) {
    zombie.x += bestDir.x * zombie.speed * dt;
    zombie.y += bestDir.y * zombie.speed * dt;
  } else {
    const randomAngle = Math.random() * Math.PI * 2;
    zombie.x += Math.cos(randomAngle) * zombie.speed * dt * 0.5;
    zombie.y += Math.sin(randomAngle) * zombie.speed * dt * 0.5;
  }
}

function checkPropCollisionAtPosition(x, y, props, margin) {
  for (const prop of props) {
    const dx = Math.abs(prop.x - x);
    const dy = Math.abs(prop.y - y);
    
    if (dx < (prop.width / 2 + margin) && dy < (prop.height / 2 + margin)) {
      return true;
    }
  }
  return false;
}