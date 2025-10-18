// src/config/items/military.js

// ========================================
// 🔫 BASE MILITAIRE - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - COMPOSANTS D'ARMES (10 items)
// ========================================
export const bm_canon = {
  name: 'Canon',
  category: 'bm_t0',
  tier: 0,
  color: '#555555',
  icon: '🔩',
  stackable: true,
  maxStack: 99,
  description: 'Tube de précision/portée'
};

export const bm_percuteur = {
  name: 'Percuteur',
  category: 'bm_t0',
  tier: 0,
  color: '#666666',
  icon: '⚙️',
  stackable: true,
  maxStack: 99,
  description: 'Mécanisme de tir'
};

export const bm_poudre = {
  name: 'Poudre',
  category: 'bm_t0',
  tier: 0,
  color: '#333333',
  icon: '💨',
  stackable: true,
  maxStack: 99,
  description: 'Propulsion'
};

export const bm_chargeur = {
  name: 'Chargeur',
  category: 'bm_t0',
  tier: 0,
  color: '#777777',
  icon: '📦',
  stackable: true,
  maxStack: 99,
  description: 'Stockage munitions'
};

export const bm_poignee = {
  name: 'Poignée',
  category: 'bm_t0',
  tier: 0,
  color: '#886644',
  icon: '🔧',
  stackable: true,
  maxStack: 99,
  description: 'Ergonomie'
};

export const bm_crosse = {
  name: 'Crosse',
  category: 'bm_t0',
  tier: 0,
  color: '#aa7744',
  icon: '🪵',
  stackable: true,
  maxStack: 99,
  description: 'Support épaule'
};

export const bm_viseur = {
  name: 'Viseur',
  category: 'bm_t0',
  tier: 0,
  color: '#4488ff',
  icon: '🔭',
  stackable: true,
  maxStack: 99,
  description: 'Optique de précision'
};

export const bm_silencieux = {
  name: 'Silencieux',
  category: 'bm_t0',
  tier: 0,
  color: '#444444',
  icon: '🔇',
  stackable: true,
  maxStack: 99,
  description: 'Discrétion'
};

export const bm_ressort = {
  name: 'Ressort',
  category: 'bm_t0',
  tier: 0,
  color: '#888888',
  icon: '🌀',
  stackable: true,
  maxStack: 99,
  description: 'Rechargement'
};

export const bm_gachette = {
  name: 'Gâchette',
  category: 'bm_t0',
  tier: 0,
  color: '#666666',
  icon: '🎯',
  stackable: true,
  maxStack: 99,
  description: 'Vitesse de tir'
};

// ========================================
// TIER 2 - ARMES DE BASE (10 armes)
// ========================================

// FUSILS À POMPE
export const bm_pompe_lourd = {
  name: 'Pompe Lourd',
  category: 'bm_t1',
  tier: 1,
  color: '#885544',
  icon: '💥',
  weaponType: 'shotgun',
  stackable: false,
  description: 'Fusil à pompe puissant'
};

export const bm_pompe_tactique = {
  name: 'Pompe Tactique',
  category: 'bm_t1',
  tier: 1,
  color: '#776655',
  icon: '💥',
  weaponType: 'shotgun',
  stackable: false,
  description: 'Fusil à pompe rapide'
};

// FUSILS D'ASSAUT
export const bm_assault_standard = {
  name: 'Assault Standard',
  category: 'bm_t1',
  tier: 1,
  color: '#555555',
  icon: '🎯',
  weaponType: 'assault',
  stackable: false,
  description: 'Fusil d\'assaut polyvalent'
};

export const bm_assault_rapide = {
  name: 'Assault Rapide',
  category: 'bm_t1',
  tier: 1,
  color: '#444444',
  icon: '🎯',
  weaponType: 'assault',
  stackable: false,
  description: 'Fusil d\'assaut cadence élevée'
};

// SNIPERS
export const bm_sniper_lourd = {
  name: 'Sniper Lourd',
  category: 'bm_t1',
  tier: 1,
  color: '#333333',
  icon: '🔭',
  weaponType: 'sniper',
  stackable: false,
  description: 'Fusil de précision puissant'
};

export const bm_sniper_tacticien = {
  name: 'Sniper Tacticien',
  category: 'bm_t1',
  tier: 1,
  color: '#444433',
  icon: '🔭',
  weaponType: 'sniper',
  stackable: false,
  description: 'Fusil de précision silencieux'
};

// SMG
export const bm_smg_compact = {
  name: 'SMG Compact',
  category: 'bm_t1',
  tier: 1,
  color: '#666666',
  icon: '🔥',
  weaponType: 'smg',
  stackable: false,
  description: 'Mitraillette compacte'
};

export const bm_smg_controle = {
  name: 'SMG Contrôle',
  category: 'bm_t1',
  tier: 1,
  color: '#777777',
  icon: '🔥',
  weaponType: 'smg',
  stackable: false,
  description: 'Mitraillette précise'
};

// PISTOLETS
export const bm_pistol_lourd = {
  name: 'Pistolet Lourd',
  category: 'bm_t1',
  tier: 1,
  color: '#555544',
  icon: '🔫',
  weaponType: 'pistol',
  stackable: false,
  description: 'Arme de poing puissante'
};

export const bm_pistol_rapide = {
  name: 'Pistolet Rapide',
  category: 'bm_t1',
  tier: 1,
  color: '#666655',
  icon: '🔫',
  weaponType: 'pistol',
  stackable: false,
  description: 'Arme de poing rapide'
};

// ========================================
// TIER 3 - ARMES ELITE (5 armes - STATS RNG)
// ========================================

export const bm_pompe_elite = {
  name: 'Pompe Elite',
  category: 'bm_t2',
  tier: 2,
  color: '#aa6644',
  icon: '⭐',
  weaponType: 'shotgun',
  stackable: false,
  hasRandomStats: true,
  description: '⭐ Fusil à pompe Elite (stats aléatoires)'
};

export const bm_assault_pro = {
  name: 'Assault Pro',
  category: 'bm_t2',
  tier: 2,
  color: '#666666',
  icon: '⭐',
  weaponType: 'assault',
  stackable: false,
  hasRandomStats: true,
  description: '⭐ Fusil d\'assaut Elite (stats aléatoires)'
};

export const bm_sniper_maitre = {
  name: 'Sniper Maître',
  category: 'bm_t2',
  tier: 2,
  color: '#222222',
  icon: '⭐',
  weaponType: 'sniper',
  stackable: false,
  hasRandomStats: true,
  description: '⭐ Fusil de précision Elite (stats aléatoires)'
};

export const bm_smg_apex = {
  name: 'SMG Apex',
  category: 'bm_t2',
  tier: 2,
  color: '#888888',
  icon: '⭐',
  weaponType: 'smg',
  stackable: false,
  hasRandomStats: true,
  description: '⭐ Mitraillette Elite (stats aléatoires)'
};

export const bm_pistol_ultime = {
  name: 'Pistolet Ultime',
  category: 'bm_t2',
  tier: 2,
  color: '#777766',
  icon: '⭐',
  weaponType: 'pistol',
  stackable: false,
  hasRandomStats: true,
  description: '⭐ Arme de poing Elite (stats aléatoires)'
};