// ========================================
// 💾 SYSTÈME DE SAUVEGARDE (avec persistance)
// ========================================

import { SURVIVAL } from '../utils/constants.js';

/**
 * Sauvegarde l'état du jeu
 */
export function saveGameState(state) {
  try {
    const saveData = {
      player: {
        hp: state.player.hp,
        maxHp: state.player.maxHp,
        hunger: state.player.hunger,
        thirst: state.player.thirst,
        isKO: state.player.isKO,
        koTimer: state.player.koTimer,
        x: state.player.x,
        y: state.player.y,
        weapon: state.player.weapon,
        equippedWeaponSlot: state.player.equippedWeaponSlot
      },
      timestamp: Date.now(),
      inventory: state.inventory
    };
    
    localStorage.setItem('zombieGame_save', JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.log('Save failed (localStorage not available):', e);
    return false;
  }
}

/**
 * Charge l'état du jeu
 */
export function loadGameState() {
  try {
    const saved = localStorage.getItem('zombieGame_save');
    if (!saved) return null;
    
    const data = JSON.parse(saved);
    const now = Date.now();
    const elapsedMs = now - data.timestamp;
    const elapsedSeconds = elapsedMs / 1000;
    const elapsedHours = elapsedSeconds / 3600;
    const elapsedDays = elapsedHours / 24;
    
    // Calcul dégradation
    let newHunger = Math.max(0, data.player.hunger - (SURVIVAL.HUNGER_RATE * elapsedSeconds));
    let newThirst = Math.max(0, data.player.thirst - (SURVIVAL.THIRST_RATE * elapsedSeconds));
    let newHp = data.player.hp;
    let newIsKO = data.player.isKO;
    let newKoTimer = data.player.koTimer;
    let isDead = false;
    
    // Si faim OU soif = 0 → perte HP
    if (newHunger <= 0 || newThirst <= 0) {
      const starvationTime = elapsedSeconds;
      newHp = Math.max(0, newHp - (SURVIVAL.STARVATION_RATE * starvationTime));
    }
    
    // Si HP = 0 → K.O.
    if (newHp <= 0 && !data.player.isKO) {
      newIsKO = true;
      newKoTimer = SURVIVAL.KO_DURATION;
    }
    
    // Si déjà K.O. → countdown
    if (data.player.isKO) {
      newKoTimer = Math.max(0, data.player.koTimer - elapsedSeconds);
      if (newKoTimer <= 0) {
        isDead = true;
      }
    }
    
    // Rapport
    const report = {
      elapsedHours,
      elapsedDays,
      hungerLost: data.player.hunger - newHunger,
      thirstLost: data.player.thirst - newThirst,
      hpLost: data.player.hp - newHp,
      wentKO: !data.player.isKO && newIsKO,
      died: isDead,
      wasKO: data.player.isKO
    };
    
    return {
      player: {
        ...data.player,
        hp: isDead ? 100 : newHp,
        hunger: isDead ? 100 : newHunger,
        thirst: isDead ? 100 : newThirst,
        isKO: isDead ? false : newIsKO,
        koTimer: isDead ? 0 : newKoTimer
      },
      inventory: isDead ? Array(10).fill(null) : data.inventory,
      report
    };
  } catch (e) {
    console.log('Load failed:', e);
    return null;
  }
}

/**
 * Supprime la sauvegarde
 */
export function deleteSave() {
  try {
    localStorage.removeItem('zombieGame_save');
    return true;
  } catch (e) {
    return false;
  }
}