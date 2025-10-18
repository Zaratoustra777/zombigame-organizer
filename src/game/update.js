// src/game/update.js - VERSION COMPLÈTE

import { updatePlayerMovement, updatePlayerDash, updatePlayerCooldowns } from '../entities/playerLogic.js';
import { fireWeapon, updateProjectiles } from '../entities/projectiles.js';
import { detectPlayer, updateHowler, updateJumper, moveTowardsPlayer, attackPlayer, handleEnemyDeath } from '../entities/enemyAI.js';
import { updateGerant, updateConsommatrice, updatePecheur, updateColonel, updateScientifique, updateFermier, updateMachine } from '../entities/bossAI.js';
import { updateSurvivalNeeds, updateStarvation, checkKO, updateKOTimer, resetAfterDeath } from '../systems/survival.js';
import { updateEffects, updateDeadBodies } from '../systems/effects.js';
import { updateLoot, checkLootProximity, checkLootDistance, isInvocation, generateZombieLoot, createLootContainer } from '../systems/loot.js';
import { checkMapTransition, executeTransition } from '../systems/mapTransition.js';
import { DUNGEON_ENTRANCE_ZONE } from '../config/map.js';
import { getDungeonType, startNextWave } from '../systems/dungeon.js';
import { checkRoomTrigger, checkRoomClear, moveZombieWithObstacles } from '../systems/dungeonLayout.js';
import { checkExitPortalProximity, checkNextRoomDoorProximity, enterNextRoom } from '../rendering/renderDungeonLayout.js';
import { WEAPONS } from '../config/weapons.js';
import { LOOT } from '../utils/constants.js';

export default function update(dt, state) {
  const { player, input, projectiles, entities, props, boss } = state;
  
  state.time += dt;
  
  updateSurvivalNeeds(player, dt);
  updateStarvation(player, dt);
  
  if (checkKO(player, state.time)) {
    console.log('Player went K.O.!');
  }
  
  if (updateKOTimer(player, dt)) {
    alert('💀 MORT DÉFINITIVE ! Tu n\'as pas été réanimé à temps.\n\nLe jeu redémarre...');
    resetAfterDeath(player, state);
    respawnZombies(state);
  }
  
  if (!player.isKO) {
    const moveX = input.left ? -1 : input.right ? 1 : 0;
    const moveY = input.up ? -1 : input.down ? 1 : 0;
    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    
    updatePlayerMovement(player, input, props, dt, 2560, state.dungeon);
    state.lastDashState = updatePlayerDash(player, input, state.lastDashState, magnitude);
    updatePlayerCooldowns(player, dt, state.time);
    
    const transition = checkMapTransition(player, state.camera);
    if (transition) {
      const success = executeTransition(player, state.camera, transition, state);
      if (!success) {
        player.x = player.lastValidX || player.x;
        player.y = player.lastValidY || player.y;
      } else {
        return;
      }
    }
    
    player.lastValidX = player.x;
    player.lastValidY = player.y;
    
    checkDungeonProximity(state);
  }
  
  if (state.dungeon && state.dungeon.layoutType === 'procedural') {
    checkRoomTrigger(state.dungeon, state.player, state);
    checkRoomClear(state.dungeon, state);
    
    if (checkExitPortalProximity(state.player, state.dungeon)) {
      state.dungeonProximity = {
        type: 'exit',
        action: 'exit_layout'
      };
    } else if (checkNextRoomDoorProximity(state.player, state.dungeon)) {
      state.dungeonProximity = {
        type: 'next_room',
        action: 'enter_next'
      };
    } else {
      state.dungeonProximity = null;
    }
  }
  
  if (!player.isKO && !input.shoot && state.lastShootState === true) {
    const aimWorld = state.camera.screenToWorld(input.mouseX, input.mouseY);
    const weapon = WEAPONS[player.weapon];
    
    if (weapon && weapon.type) {
      const result = fireWeapon(player, weapon, aimWorld.x, aimWorld.y, projectiles);
      
      if (result && result.type === 'melee') {
        entities.forEach(entity => {
          const edx = entity.x - player.x;
          const edy = entity.y - player.y;
          const dist = Math.sqrt(edx * edx + edy * edy);
          const entityAngle = Math.atan2(edy, edx);
          const angleDiff = Math.abs(((entityAngle - result.angle + Math.PI) % (2 * Math.PI)) - Math.PI);
          
          if (dist < result.range && angleDiff < Math.PI / 3) {
            entity.hp -= result.damage;
            const knockback = result.knockback || 200;
            entity.x += (edx / dist) * knockback;
            entity.y += (edy / dist) * knockback;
          }
        });
        
        if (boss) {
          const bdx = boss.x - player.x;
          const bdy = boss.y - player.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
          const bossAngle = Math.atan2(bdy, bdx);
          const angleDiff = Math.abs(((bossAngle - result.angle + Math.PI) % (2 * Math.PI)) - Math.PI);
          
          if (bdist < result.range && angleDiff < Math.PI / 3) {
            boss.hp -= result.damage;
          }
        }
      }
    }
  }
  state.lastShootState = input.shoot;
  
  updateProjectiles(projectiles, dt);
  
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    
    if (state.dungeon && state.dungeon.layoutType === 'procedural') {
      const currentRoom = state.dungeon.rooms[state.dungeon.currentRoom];
      if (currentRoom && currentRoom.props) {
        let hitProp = false;
        
        for (const prop of currentRoom.props) {
          if (!prop.blocking) continue;
          
          const dx = Math.abs(proj.x - prop.x);
          const dy = Math.abs(proj.y - prop.y);
          
          if (dx < prop.width / 2 && dy < prop.height / 2) {
            projectiles.splice(i, 1);
            hitProp = true;
            
            state.effects.push({
              type: 'spark',
              x: proj.x,
              y: proj.y,
              life: 0.2,
              maxLife: 0.2
            });
            
            break;
          }
        }
        
        if (hitProp) continue;
      }
    }
    
    if (proj.owner === 'player') {
      if (boss) {
        const dx = proj.x - boss.x;
        const dy = proj.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < boss.size / 2) {
          const projWeapon = WEAPONS[proj.weaponType];
          
          if (projWeapon && projWeapon.type === 'explosive') {
            boss.hp -= proj.damage;
            state.effects.push({
              type: 'explosion',
              x: proj.x,
              y: proj.y,
              radius: projWeapon.explosionRadius || 120,
              life: 0.3,
              maxLife: 0.3
            });
          } else if (projWeapon && projWeapon.type === 'poison') {
            boss.hp -= proj.damage;
            boss.poisoned = {
              damage: projWeapon.damageOverTime || 3,
              endTime: state.time + (projWeapon.duration || 5000) / 1000,
              interval: 1
            };
            boss.lastPoisonTick = state.time;
          } else {
            boss.hp -= proj.damage;
          }
          
          projectiles.splice(i, 1);
          continue;
        }
      }
      
      for (let j = entities.length - 1; j >= 0; j--) {
        const entity = entities[j];
        const dx = proj.x - entity.x;
        const dy = proj.y - entity.y;
        if (Math.sqrt(dx * dx + dy * dy) < 12) {
          const projWeapon = WEAPONS[proj.weaponType];
          
          if (projWeapon && projWeapon.type === 'explosive') {
            const explosionRadius = projWeapon.explosionRadius || 120;
            entities.forEach(e => {
              const edx = proj.x - e.x;
              const edy = proj.y - e.y;
              const dist = Math.sqrt(edx * edx + edy * edy);
              if (dist < explosionRadius) {
                e.hp -= proj.damage * (1 - dist / explosionRadius);
              }
            });
            state.effects.push({
              type: 'explosion',
              x: proj.x,
              y: proj.y,
              radius: explosionRadius,
              life: 0.3,
              maxLife: 0.3
            });
          } else if (projWeapon && projWeapon.type === 'poison') {
            entity.poisoned = {
              damage: projWeapon.damageOverTime || 3,
              endTime: state.time + (projWeapon.duration || 5000) / 1000,
              interval: 1
            };
            entity.lastPoisonTick = state.time;
          } else {
            entity.hp -= proj.damage;
          }
          
          projectiles.splice(i, 1);
          break;
        }
      }
    }
    
    if (proj.owner === 'boss' && !player.isKO) {
      const dx = proj.x - player.x;
      const dy = proj.y - player.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 24) {
        player.hp -= proj.damage;
        projectiles.splice(i, 1);
      }
    }
  }
  
  for (let i = entities.length - 1; i >= 0; i--) {
    const entity = entities[i];
    
    const dist = detectPlayer(entity, player, state.time);
    
    if (entity.alerted) {
      if (entity.special === 'howl') {
        updateHowler(entity, entities, state.effects, state.time, dt);
      } else if (entity.special === 'jump') {
        updateJumper(entity, player, state.time, dt);
      }
      
      if (!entity.jumping) {
        if (state.dungeon && state.dungeon.layoutType === 'procedural') {
          const currentRoom = state.dungeon.rooms[state.dungeon.currentRoom];
          if (currentRoom && currentRoom.props && entity.roomId === currentRoom.id) {
            moveZombieWithObstacles(entity, player, currentRoom.props, dt);
            
            const moveThreshold = 5;
            const dx = entity.x - entity.lastPosX;
            const dy = entity.y - entity.lastPosY;
            const movedDist = Math.sqrt(dx * dx + dy * dy);
            
            if (movedDist < moveThreshold && state.time - entity.lastMoveTime > 2) {
              const randomAngle = Math.random() * Math.PI * 2;
              entity.x += Math.cos(randomAngle) * 60;
              entity.y += Math.sin(randomAngle) * 60;
              entity.lastMoveTime = state.time;
            }
            
            if (state.time - entity.lastMoveTime > 0.5) {
              entity.lastPosX = entity.x;
              entity.lastPosY = entity.y;
              entity.lastMoveTime = state.time;
            }
          } else {
            const movedDist = moveTowardsPlayer(entity, player, props, dt);
            attackPlayer(entity, player, movedDist, state.time);
          }
        } else {
          const movedDist = moveTowardsPlayer(entity, player, props, dt);
          attackPlayer(entity, player, movedDist, state.time);
        }
      }
    }
    
    if (handleEnemyDeath(entity, entities, state.effects, state.deadBodies, state.loot, i)) {
      if (!isInvocation(entity.name)) {
        const lootItems = generateZombieLoot();
        if (lootItems) {
          state.loot.push(createLootContainer(entity.x, entity.y, lootItems, LOOT.ZOMBIE_LIFETIME));
        }
      }
    }
  }
  
  entities.forEach(entity => {
    if (entity.poisoned && state.time < entity.poisoned.endTime) {
      if (state.time - entity.lastPoisonTick >= entity.poisoned.interval) {
        entity.hp -= entity.poisoned.damage;
        entity.lastPoisonTick = state.time;
      }
    } else if (entity.poisoned) {
      delete entity.poisoned;
    }
  });
  
  if (boss && !player.isKO) {
    if (boss.poisoned && state.time < boss.poisoned.endTime) {
      if (state.time - boss.lastPoisonTick >= boss.poisoned.interval) {
        boss.hp -= boss.poisoned.damage;
        boss.lastPoisonTick = state.time;
      }
    } else if (boss.poisoned) {
      delete boss.poisoned;
    }
    
    if (boss.name === 'Le Gérant du Fast-Food') {
      updateGerant(boss, player, projectiles, entities, state.time, dt);
    } else if (boss.name === 'La Consommatrice') {
      updateConsommatrice(boss, player, state.effects, state.time, dt);
    } else if (boss.name === 'Le Pêcheur Putride') {
      updatePecheur(boss, player, state.effects, state.time, dt);
    } else if (boss.name === 'Le Colonel') {
      updateColonel(boss, player, projectiles, state.effects, state.time, dt);
    } else if (boss.name === 'Le Scientifique Fou') {
      updateScientifique(boss, player, state.effects, state.time, dt);
    } else if (boss.name === 'Le Fermier Dévoré') {
      updateFermier(boss, player, entities, state.time, dt);
    } else if (boss.name === 'La Machine-Usine') {
      updateMachine(boss, player, projectiles, state.effects, state.time, dt);
    }
    
    if (boss.hp <= 0) {
      const { generateBossLoot } = require('../systems/loot.js');
      const bossLoot = generateBossLoot();
      state.loot.push(createLootContainer(boss.x, boss.y, bossLoot, 300));
      state.boss = null;
    }
  }
  
  updateEffects(state.effects, player, state.deadBodies, entities, dt, state.time);
  updateDeadBodies(state.deadBodies, dt);
  
  const lootUpdate = updateLoot(state.loot, dt, state.lootInventory);
  if (lootUpdate && lootUpdate.shouldClose) {
    state.lootInventory = null;
  }
  
  if (!state.lootInventory && !player.isKO) {
    const lootProx = checkLootProximity(player, state.loot);
    if (lootProx && lootProx.shouldOpen) {
      state.lootInventory = {
        x: lootProx.container.x,
        y: lootProx.container.y,
        items: lootProx.container.items,
        lootIndex: lootProx.index
      };
    }
  }
  
  if (state.lootInventory && checkLootDistance(player, state.lootInventory)) {
    state.lootInventory = null;
  }
  
  state.camera.update(player);
}

function checkDungeonProximity(state) {
  const { player, dungeon } = state;
  
  if (dungeon && dungeon.layoutType === 'arena') {
    if (dungeon.canExit && !dungeon.waveInProgress) {
      startNextWave(dungeon, state);
    }
    state.dungeonProximity = null;
    return;
  }
  
  if (dungeon && dungeon.layoutType === 'procedural') {
    return;
  }
  
  const dungeonInfo = getDungeonType(player.mapX, player.mapY);
  
  if (!dungeonInfo) {
    state.dungeonProximity = null;
    return;
  }
  
  const zone = DUNGEON_ENTRANCE_ZONE;
  const dx = (zone.x + zone.width / 2) - player.x;
  const dy = (zone.y + zone.height / 2) - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 250) {
    state.dungeonProximity = {
      type: dungeonInfo.type,
      layoutType: dungeonInfo.layoutType,
      distance: Math.floor(distance)
    };
  } else {
    state.dungeonProximity = null;
  }
}

function respawnZombies(state) {
  const enemyTypes = ['basic', 'basic', 'hurleur', 'gonfle', 'sauterelle', 'parasite', 'vaporeux'];
  const { ENEMY_TYPES } = require('../config/enemies.js');
  
  for (let i = 0; i < 7; i++) {
    const typeKey = enemyTypes[i];
    const enemyDef = ENEMY_TYPES[typeKey];
    state.entities.push({
      name: enemyDef.name,
      x: 200 + Math.random() * 2160,
      y: 200 + Math.random() * 2160,
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
      aggroed: false
    });
  }
}