// src/systems/survival.js

import { PLAYER } from '../utils/constants.js';

export function updateSurvivalNeeds(player, dt) {
  if (player.isKO) return;
  
  player.hunger -= PLAYER.HUNGER_DRAIN_RATE * dt;
  player.thirst -= PLAYER.THIRST_DRAIN_RATE * dt;
  
  player.hunger = Math.max(0, player.hunger);
  player.thirst = Math.max(0, player.thirst);
}

export function updateStarvation(player, dt) {
  if (player.isKO) return;
  
  if (player.hunger <= 0) {
    player.hp -= PLAYER.STARVATION_DAMAGE * dt;
  }
  
  if (player.thirst <= 0) {
    player.hp -= PLAYER.DEHYDRATION_DAMAGE * dt;
  }
  
  player.hp = Math.max(0, player.hp);
}

export function checkKO(player, time) {
  if (player.hp <= 0 && !player.isKO) {
    player.isKO = true;
    player.koTimer = PLAYER.KO_DURATION;
    player.koStartTime = time;
    return true;
  }
  return false;
}

export function updateKOTimer(player, dt) {
  if (!player.isKO) return false;
  
  player.koTimer -= dt;
  
  if (player.koTimer <= 0) {
    return true;
  }
  
  return false;
}

export function resetAfterDeath(player, state) {
  player.hp = PLAYER.MAX_HP;
  player.hunger = PLAYER.MAX_HUNGER;
  player.thirst = PLAYER.MAX_THIRST;
  player.isKO = false;
  player.koTimer = 0;
  player.x = 1280;
  player.y = 1280;
  player.mapX = 0;
  player.mapY = 0;
  
  state.inventory = Array(10).fill(null);
  state.inventory[0] = { type: 'weapon_melee', count: 1 };
  
  state.entities = [];
  state.boss = null;
  state.projectiles = [];
  state.loot = [];
  state.effects = [];
  state.deadBodies = [];
}

export function revivePlayer(player) {
  if (!player.isKO) return false;
  
  player.hp = 50;
  player.hunger = 50;
  player.thirst = 50;
  player.isKO = false;
  player.koTimer = 0;
  
  return true;
}