// src/config/weapons.js

// ========================================
// 🔫 ARMES - STATS DE COMBAT DU JEU
// Ce fichier définit les statistiques de combat de toutes les armes
// ========================================

export const WEAPONS = {
  
  // ========================================
  // 🗡️ ARMES DE MÊLÉE (LOOT)
  // ========================================
  
  weapon_melee: {
    name: 'Couteau',
    type: 'melee',
    damage: 20,
    range: 40,
    attackRate: 500,
    knockback: 200,
    color: '#888888'
  },

  weapon_baseball: {
    name: 'Batte de Baseball',
    type: 'melee',
    damage: 30,
    range: 45,
    attackRate: 600,
    knockback: 250,
    color: '#885533'
  },

  weapon_machete: {
    name: 'Machette',
    type: 'melee',
    damage: 35,
    range: 50,
    attackRate: 700,
    knockback: 220,
    color: '#aa8866'
  },

  weapon_axe: {
    name: 'Hache',
    type: 'melee',
    damage: 50,
    range: 55,
    attackRate: 900,
    knockback: 300,
    color: '#664422'
  },

  weapon_crowbar: {
    name: 'Pied de Biche',
    type: 'melee',
    damage: 40,
    range: 48,
    attackRate: 750,
    knockback: 270,
    color: '#555555'
  },

  // ========================================
  // 🔫 ARME DE BASE (DÉPART)
  // ========================================
  
  weapon_pistol_basic: {
    name: 'Pistolet de Base',
    type: 'projectile',
    damage: 25,
    fireRate: 400,
    range: 300,
    projectileSpeed: 800,
    ammo: 10,
    reloadTime: 1500,
    color: '#666666'
  },

  // ========================================
  // 🔫 BASE MILITAIRE - TIER 1 (ARMES DE BASE)
  // ========================================

  // FUSILS À POMPE
  bm_pompe_lourd: {
    name: 'Pompe Lourd',
    type: 'projectile',
    damage: 80,
    fireRate: 800,
    range: 150,
    projectileSpeed: 600,
    ammo: 6,
    reloadTime: 2000,
    pellets: 8,
    spread: 0.3,
    color: '#885544'
  },

  bm_pompe_tactique: {
    name: 'Pompe Tactique',
    type: 'projectile',
    damage: 65,
    fireRate: 600,
    range: 180,
    projectileSpeed: 650,
    ammo: 8,
    reloadTime: 1600,
    pellets: 6,
    spread: 0.25,
    color: '#776655'
  },

  // FUSILS D'ASSAUT
  bm_assault_standard: {
    name: 'Assault Standard',
    type: 'projectile',
    damage: 35,
    fireRate: 150,
    range: 400,
    projectileSpeed: 900,
    ammo: 30,
    reloadTime: 2000,
    spread: 0.05,
    color: '#555555'
  },

  bm_assault_rapide: {
    name: 'Assault Rapide',
    type: 'projectile',
    damage: 28,
    fireRate: 100,
    range: 350,
    projectileSpeed: 850,
    ammo: 40,
    reloadTime: 2200,
    spread: 0.08,
    color: '#444444'
  },

  // SNIPERS
  bm_sniper_lourd: {
    name: 'Sniper Lourd',
    type: 'projectile',
    damage: 120,
    fireRate: 1500,
    range: 800,
    projectileSpeed: 1200,
    ammo: 5,
    reloadTime: 3000,
    spread: 0,
    color: '#333333'
  },

  bm_sniper_tacticien: {
    name: 'Sniper Tacticien',
    type: 'projectile',
    damage: 95,
    fireRate: 1200,
    range: 750,
    projectileSpeed: 1100,
    ammo: 8,
    reloadTime: 2500,
    spread: 0,
    silenced: true,
    color: '#444433'
  },

  // SMG
  bm_smg_compact: {
    name: 'SMG Compact',
    type: 'projectile',
    damage: 22,
    fireRate: 100,
    range: 250,
    projectileSpeed: 700,
    ammo: 35,
    reloadTime: 1800,
    spread: 0.1,
    color: '#666666'
  },

  bm_smg_controle: {
    name: 'SMG Contrôle',
    type: 'projectile',
    damage: 26,
    fireRate: 120,
    range: 280,
    projectileSpeed: 720,
    ammo: 28,
    reloadTime: 1700,
    spread: 0.06,
    color: '#777777'
  },

  // PISTOLETS
  bm_pistol_lourd: {
    name: 'Pistolet Lourd',
    type: 'projectile',
    damage: 45,
    fireRate: 500,
    range: 300,
    projectileSpeed: 850,
    ammo: 12,
    reloadTime: 1500,
    spread: 0.03,
    color: '#555544'
  },

  bm_pistol_rapide: {
    name: 'Pistolet Rapide',
    type: 'projectile',
    damage: 32,
    fireRate: 250,
    range: 280,
    projectileSpeed: 800,
    ammo: 18,
    reloadTime: 1200,
    spread: 0.05,
    color: '#666655'
  },

  bm_pompe_improved: {
    name: 'Pompe Amélioré',
    type: 'projectile',
    damage: 75,
    fireRate: 700,
    range: 180,
    projectileSpeed: 650,
    ammo: 9,
    reloadTime: 1800,
    pellets: 7,
    spread: 0.28,
    color: '#997766'
  },

  bm_assault_improved: {
    name: 'Assault Amélioré',
    type: 'projectile',
    damage: 38,
    fireRate: 140,
    range: 450,
    projectileSpeed: 950,
    ammo: 35,
    reloadTime: 1900,
    spread: 0.04,
    color: '#666666'
  },

  bm_sniper_improved: {
    name: 'Sniper Amélioré',
    type: 'projectile',
    damage: 110,
    fireRate: 1300,
    range: 850,
    projectileSpeed: 1250,
    ammo: 7,
    reloadTime: 2700,
    spread: 0,
    color: '#444444'
  },

  bm_smg_improved: {
    name: 'SMG Amélioré',
    type: 'projectile',
    damage: 25,
    fireRate: 90,
    range: 280,
    projectileSpeed: 750,
    ammo: 32,
    reloadTime: 1700,
    spread: 0.08,
    color: '#888888'
  },

  bm_pistol_improved: {
    name: 'Pistolet Amélioré',
    type: 'projectile',
    damage: 40,
    fireRate: 350,
    range: 320,
    projectileSpeed: 870,
    ammo: 16,
    reloadTime: 1400,
    spread: 0.02,
    color: '#777777'
  },

  // ========================================
  // ⭐ BASE MILITAIRE - TIER 3 (ARMES ELITE - STATS ALÉATOIRES)
  // Ces armes ont des stats de base + bonus RNG générés au craft
  // ========================================

  bm_pompe_elite: {
    name: 'Pompe Elite',
    type: 'projectile',
    // STATS DE BASE (seront modifiées par les bonus RNG)
    baseDamage: 90,
    baseFireRate: 650,
    baseRange: 200,
    baseProjectileSpeed: 700,
    baseAmmo: 10,
    baseReloadTime: 1700,
    pellets: 8,
    spread: 0.25,
    color: '#aa6644',
    
    // SYSTÈME RNG
    hasRandomStats: true,
    rarity: null,        // Sera défini au craft: 'common' / 'rare' / 'epic'
    bonuses: [],         // Sera rempli au craft avec les bonus générés
    
    // Stats actuelles (copiées depuis base au craft)
    damage: 90,
    fireRate: 650,
    range: 200,
    projectileSpeed: 700,
    ammo: 10,
    reloadTime: 1700
  },

  bm_assault_pro: {
    name: 'Assault Pro',
    type: 'projectile',
    baseDamage: 42,
    baseFireRate: 130,
    baseRange: 500,
    baseProjectileSpeed: 1000,
    baseAmmo: 38,
    baseReloadTime: 1800,
    spread: 0.03,
    color: '#666666',
    hasRandomStats: true,
    rarity: null,
    bonuses: [],
    damage: 42,
    fireRate: 130,
    range: 500,
    projectileSpeed: 1000,
    ammo: 38,
    reloadTime: 1800
  },

  bm_sniper_maitre: {
    name: 'Sniper Maître',
    type: 'projectile',
    baseDamage: 135,
    baseFireRate: 1200,
    baseRange: 900,
    baseProjectileSpeed: 1300,
    baseAmmo: 8,
    baseReloadTime: 2500,
    spread: 0,
    color: '#222222',
    hasRandomStats: true,
    rarity: null,
    bonuses: [],
    damage: 135,
    fireRate: 1200,
    range: 900,
    projectileSpeed: 1300,
    ammo: 8,
    reloadTime: 2500
  },

  bm_smg_apex: {
    name: 'SMG Apex',
    type: 'projectile',
    baseDamage: 28,
    baseFireRate: 80,
    baseRange: 300,
    baseProjectileSpeed: 800,
    baseAmmo: 38,
    baseReloadTime: 1600,
    spread: 0.07,
    color: '#888888',
    hasRandomStats: true,
    rarity: null,
    bonuses: [],
    damage: 28,
    fireRate: 80,
    range: 300,
    projectileSpeed: 800,
    ammo: 38,
    reloadTime: 1600
  },

  bm_pistol_ultime: {
    name: 'Pistolet Ultime',
    type: 'projectile',
    baseDamage: 45,
    baseFireRate: 300,
    baseRange: 350,
    baseProjectileSpeed: 900,
    baseAmmo: 18,
    baseReloadTime: 1300,
    spread: 0.01,
    color: '#777766',
    hasRandomStats: true,
    rarity: null,
    bonuses: [],
    damage: 45,
    fireRate: 300,
    range: 350,
    projectileSpeed: 900,
    ammo: 18,
    reloadTime: 1300
  }
};

// ========================================
// 📊 SYSTÈME DE GÉNÉRATION DES STATS ALÉATOIRES
// Utilisé dans crafting.js pour les armes Elite T3
// ========================================

export const RANDOM_STATS_CONFIG = {
  // Probabilités de rareté
  rarityChances: {
    common: 0.75,   // 75%
    rare: 0.20,     // 20%
    epic: 0.05      // 5%
  },
  
  // Nombre de bonus selon la rareté
  bonusCount: {
    common: 2,
    rare: 3,
    epic: 4
  },
  
  // Budget de points de bonus selon la rareté
  budgetRange: {
    common: [65, 75],
    rare: [75, 90],
    epic: [90, 100]
  },
  
  // Bonus possibles
  possibleBonuses: [
    { stat: 'damage', min: 5, max: 25, format: '%', label: 'Dégâts' },
    { stat: 'fireRate', min: -30, max: -10, format: '%', label: 'Cadence' },
    { stat: 'ammo', min: 2, max: 12, format: 'flat', label: 'Munitions' },
    { stat: 'range', min: 10, max: 35, format: '%', label: 'Portée' },
    { stat: 'reloadTime', min: -40, max: -15, format: '%', label: 'Rechargement' },
    { stat: 'spread', min: -30, max: -10, format: '%', label: 'Précision' }
  ]
};