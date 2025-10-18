// src/config/spawnCircles.js - SYSTÈME CERCLES CONCENTRIQUES

// Cercles de difficulté avec coordonnées exactes
export const DIFFICULTY_CIRCLES = {
  1: {
    coords: [[1,0], [-1,0], [0,1], [0,-1]],
    tier: 1,
    spawnMultiplier: 1.0
  },
  2: {
    coords: [[2,0], [-2,0], [0,2], [0,-2], [1,1], [1,-1], [-1,1], [-1,-1]],
    tier: 2,
    spawnMultiplier: 1.15
  },
  3: {
    coords: [[3,0], [-3,0], [0,3], [0,-3], [2,2], [2,-2], [-2,2], [-2,-2]],
    tier: 3,
    spawnMultiplier: 1.30
  },
  4: {
    coords: [[4,0], [-4,0], [0,4], [0,-4], [3,2], [3,-2], [-3,2], [-3,-2], [2,3], [2,-3], [-2,3], [-2,-3]],
    tier: 4,
    spawnMultiplier: 1.45
  },
  5: {
    coords: [[5,0], [-5,0], [0,5], [0,-5], [4,3], [4,-3], [-4,3], [-4,-3], [3,4], [3,-4], [-3,4], [-3,-4]],
    tier: 5,
    spawnMultiplier: 1.60
  },
  6: {
    coords: [[6,0], [-6,0], [0,6], [0,-6], [5,3], [5,-3], [-5,3], [-5,-3], [3,5], [3,-5], [-3,5], [-3,-5], [4,4], [-4,4], [4,-4], [-4,-4]],
    tier: 6,
    spawnMultiplier: 1.75
  },
  7: {
    coords: [[7,0], [-7,0], [0,7], [0,-7], [6,3], [6,-3], [-6,3], [-6,-3], [5,5], [-5,5], [5,-5], [-5,-5], [4,6], [-4,6], [4,-6], [-4,-6], [3,6], [-3,6], [3,-6], [-3,-6]],
    tier: 7,
    spawnMultiplier: 1.90
  },
  8: {
    coords: [[8,0], [-8,0], [0,8], [0,-8], [7,4], [-7,4], [7,-4], [-7,-4], [6,5], [-6,5], [6,-5], [-6,-5], [5,6], [-5,6], [5,-6], [-5,-6]],
    tier: 8,
    spawnMultiplier: 2.05
  },
  9: {
    coords: [[9,0], [-9,0], [0,9], [0,-9], [8,4], [-8,4], [8,-4], [-8,-4], [6,6], [-6,6], [7,5], [-7,5], [5,7], [-5,7], [9,-3], [-9,-3], [9,3], [-9,3], [3,9], [-3,9], [3,-9], [-3,-9]],
    tier: 9,
    spawnMultiplier: 2.20
  }
};

// Trouver le cercle d'une coordonnée
export function getCircleFromCoords(mapX, mapY) {
  const distance = Math.sqrt(mapX * mapX + mapY * mapY);
  
  for (const [circleNum, circle] of Object.entries(DIFFICULTY_CIRCLES)) {
    if (circle.coords.some(([x, y]) => x === mapX && y === mapY)) {
      return {
        circle: parseInt(circleNum),
        tier: circle.tier,
        multiplier: circle.spawnMultiplier
      };
    }
  }
  
  // Fallback: calcul par distance
  const approxCircle = Math.min(9, Math.max(1, Math.round(distance)));
  return {
    circle: approxCircle,
    tier: approxCircle,
    multiplier: DIFFICULTY_CIRCLES[approxCircle]?.spawnMultiplier || 1.0
  };
}

// Générer les types de zombies pour une map donnée
export function generateZombiesForMap(mapX, mapY) {
  const circleInfo = getCircleFromCoords(mapX, mapY);
  const currentTier = circleInfo.tier;
  
  const zombiePool = [];
  
  // 50% du tier actuel
  const currentTierZombies = ZOMBIE_TIERS[currentTier] || [];
  for (let i = 0; i < 5; i++) {
    zombiePool.push(...currentTierZombies);
  }
  
  // 30% du tier N-1
  if (currentTier > 1) {
    const prevTier = currentTier - 1;
    const prevTierZombies = ZOMBIE_TIERS[prevTier] || [];
    for (let i = 0; i < 3; i++) {
      zombiePool.push(...prevTierZombies);
    }
  }
  
  // 20% du tier N-2
  if (currentTier > 2) {
    const prev2Tier = currentTier - 2;
    const prev2TierZombies = ZOMBIE_TIERS[prev2Tier] || [];
    for (let i = 0; i < 2; i++) {
      zombiePool.push(...prev2TierZombies);
    }
  }
  
  return zombiePool.length > 0 ? zombiePool : ['basic'];
}

// Import du mapping depuis enemies.js
import { ZOMBIE_TIERS } from './enemies.js';

// Cercles de spawn physiques (positions dans la map)
export const SPAWN_CIRCLES = [
  { x: 400, y: 400, radius: 300, count: 3 },
  { x: 2100, y: 400, radius: 300, count: 3 },
  { x: 400, y: 2100, radius: 300, count: 3 },
  { x: 2100, y: 2100, radius: 300, count: 3 },
  { x: 1280, y: 600, radius: 250, count: 2 },
  { x: 1280, y: 1960, radius: 250, count: 2 },
  { x: 600, y: 1280, radius: 250, count: 2 },
  { x: 1960, y: 1280, radius: 250, count: 2 }
];

// Calculer nombre de spawns selon le cercle
export function getSpawnCount(mapX, mapY) {
  const circleInfo = getCircleFromCoords(mapX, mapY);
  const baseCount = 8; // Nombre de cercles de spawn
  return Math.floor(baseCount * circleInfo.multiplier);
}