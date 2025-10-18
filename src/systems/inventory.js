// src/systems/inventory.js

// ========================================
// 🎒 SYSTÈME INVENTAIRE
// ========================================

import { ITEMS } from '../config/items/index.js';

/**
 * Ajoute un item à l'inventaire
 */
export function addToInventory(inventory, itemType, count = 1) {
  const itemDef = ITEMS[itemType];
  
  // ✅ VÉRIFICATION SI L'ITEM EXISTE
  if (!itemDef) {
    console.error(`Impossible d'ajouter l'item inconnu: ${itemType}`);
    return false;
  }
  
  // Try to stack
  if (itemDef.stackable) {
    for (let i = 0; i < inventory.length; i++) {
      const slot = inventory[i];
      if (slot && slot.type === itemType && slot.count < itemDef.maxStack) {
        const spaceLeft = itemDef.maxStack - slot.count;
        const toAdd = Math.min(count, spaceLeft);
        slot.count += toAdd;
        count -= toAdd;
        if (count === 0) return true;
      }
    }
  }
  
  // Find empty slots
  while (count > 0) {
    const emptySlot = inventory.findIndex(slot => slot === null);
    if (emptySlot === -1) {
      console.warn('Inventaire plein !');
      return false;
    }
    
    const toAdd = itemDef.stackable ? Math.min(count, itemDef.maxStack) : 1;
    inventory[emptySlot] = { type: itemType, count: toAdd };
    count -= toAdd;
  }
  
  return true;
}

/**
 * Utilise un item
 */
export function useItem(state, slotIndex) {
  const item = state.inventory[slotIndex];
  if (!item) return false;
  
  const itemDef = ITEMS[item.type];
  
  // ✅ VÉRIFICATION SI L'ITEM EXISTE
  if (!itemDef) {
    console.error(`Item inconnu: ${item.type}`);
    return false;
  }
  
  const { player } = state;
  
  // Si arme, équiper
  if (itemDef.weaponType) {
  player.weapon = itemDef.weaponType; 
  player.equippedWeaponSlot = slotIndex;
  console.log(`✅ Arme équipée: ${itemDef.name}`);
  return true;
}
  
  // Effets consommables
  if (itemDef.effect) {
    const effect = itemDef.effect;
    
    switch (effect.type) {
      case 'heal':
        player.hp = Math.min(player.maxHp, player.hp + effect.value);
        break;
        
      case 'speed':
        player.speedBoost = effect.value;
        player.speedBoostEnd = state.time + effect.duration;
        break;
        
      case 'hunger':
        player.hunger = Math.min(100, player.hunger + effect.value);
        break;
        
      case 'thirst':
        player.thirst = Math.min(100, player.thirst + effect.value);
        break;
    }
    
    // Consommer
    item.count--;
    if (item.count <= 0) {
      state.inventory[slotIndex] = null;
      
      // Si arme équipée détruite, reset
      if (player.equippedWeaponSlot === slotIndex) {
        player.equippedWeaponSlot = null;
        player.weapon = null;
      }
    }
    return true;
  }
  
  return false;
}

/**
 * Swap deux items
 */
export function swapItems(inventory, slot1, slot2) {
  const temp = inventory[slot1];
  inventory[slot1] = inventory[slot2];
  inventory[slot2] = temp;
}

/**
 * Transfère item entre inventaires
 */
export function transferItem(fromInv, fromIndex, toInv, toIndex) {
  const item = fromInv[fromIndex];
  if (!item) return false;
  
  if (toInv[toIndex]) {
    // Swap
    const temp = toInv[toIndex];
    toInv[toIndex] = item;
    fromInv[fromIndex] = temp;
  } else {
    // Move
    toInv[toIndex] = item;
    fromInv[fromIndex] = null;
  }
  
  return true;
}