// src/input/keyboard.js
import { ITEMS } from '../config/items/index.js';

export function initKeyboard(input, state) {
  const handleKeyDown = (e) => {
    if (e.key === 'z' || e.key === 'w') input.up = true;
    if (e.key === 's') input.down = true;
    if (e.key === 'q' || e.key === 'a') input.left = true;
    if (e.key === 'd') input.right = true;
    
    if (e.key === ' ') {
      e.preventDefault();
      input.dash = true;
    }
    
    if (e.key === 'g' || e.key === 'G') {
      e.preventDefault();
      input.godMode = !input.godMode;
    }
    
    const azertyMap = {
      '&': 0, '1': 0,
      'é': 1, '2': 1,
      '"': 2, '3': 2,
      "'": 3, '4': 3,
      '(': 4, '5': 4,
      '§': 5, '6': 5,
      'è': 6, '7': 6,
      '!': 7, '8': 7,
      'ç': 8, '9': 8,
      'à': 9, '0': 9
    };
    
    if (azertyMap[e.key] !== undefined) {
      e.preventDefault();
      equipWeapon(state, azertyMap[e.key]);
    }
  };
  
  const handleKeyUp = (e) => {
    if (e.key === 'z' || e.key === 'w') input.up = false;
    if (e.key === 's') input.down = false;
    if (e.key === 'q' || e.key === 'a') input.left = false;
    if (e.key === 'd') input.right = false;
    if (e.key === ' ') input.dash = false;
  };
  
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}

function equipWeapon(state, slot) {
  const item = state.inventory[slot];
  if (!item) return;
  
  const itemDef = ITEMS[item.type];
  
  // ✅ CORRECTION : Utilise item.type (la clé complète) au lieu de itemDef.weaponType
  if (itemDef && itemDef.weaponType) {
    state.player.weapon = item.type; // ⬅️ CHANGÉ ICI
    state.player.equippedWeaponSlot = slot;
    console.log(`✅ Arme équipée: ${itemDef.name} (${item.type})`);
  } else {
    console.warn(`Impossible d'équiper ${item.type}: pas une arme`);
  }
}