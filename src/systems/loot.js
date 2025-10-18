// src/systems/loot.js

import { ITEMS } from '../config/items/index.js';
import { LOOT } from '../utils/constants.js';

export function createLootContainer(x, y, items, lifetime) {
  return {
    x,
    y,
    items,
    lifetime,
    age: 0,
    open: false
  };
}

export function updateLoot(loot, dt, lootInventory) {
  for (let i = loot.length - 1; i >= 0; i--) {
    const container = loot[i];
    
    container.age += dt;
    
    if (container.age >= container.lifetime) {
      loot.splice(i, 1);
      
      if (lootInventory && lootInventory.lootIndex === i) {
        return { shouldClose: true };
      }
    }
  }
  
  return null;
}

export function checkLootProximity(player, loot) {
  for (let i = 0; i < loot.length; i++) {
    const container = loot[i];
    const dx = player.x - container.x;
    const dy = player.y - container.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < LOOT.PICKUP_RADIUS) {
      return { shouldOpen: true, container, index: i };
    }
  }
  
  return null;
}

export function checkLootDistance(player, lootInventory) {
  const dx = player.x - lootInventory.x;
  const dy = player.y - lootInventory.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  return dist > LOOT.PICKUP_RADIUS * 1.5;
}

export function isInvocation(name) {
  return name === 'Invocation';
}

export function generateZombieLoot() {
  const roll = Math.random();
  
  if (roll < 0.3) {
    return [{ type: 'food_bread', count: 1 }];
  } else if (roll < 0.5) {
    return [{ type: 'drink_water', count: 1 }];
  } else if (roll < 0.65) {
    return [{ type: 'medical_bandage', count: 1 }];
  }
  
  return null;
}

export function generateBossLoot() {
  const items = [];
  
  items.push({ type: 'medical_medkit', count: 2 });
  items.push({ type: 'food_meat', count: 3 });
  items.push({ type: 'drink_soda', count: 2 });
  
  const rareDrop = Math.random();
  if (rareDrop < 0.3) {
    items.push({ type: 'boost_speed', count: 1 });
  }
  
  return items;
}