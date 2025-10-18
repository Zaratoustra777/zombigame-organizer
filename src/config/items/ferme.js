// src/config/items/ferme.js

// ========================================
// 🌾 FERME - SYSTÈME SPÉCIAL
// Pas de craft, juste loot avec raretés
// ========================================

// ========================================
// LOOT COMMUN (4 items - Drop fréquent)
// ========================================

export const fm_engrais_fruit = {
  name: 'Engrais Fruits',
  category: 'farm_common',
  rarity: 'common',
  color: '#88cc44',
  icon: 'fm_engrais_fruit',
  effect: {
    type: 'growthSpeed',
    target: 'fruit',
    value: 0.70 // -30% temps pousse
  },
  description: '-30% temps pousse fruits'
};

export const fm_engrais_legume = {
  name: 'Engrais Légumes',
  category: 'farm_common',
  rarity: 'common',
  color: '#aa8844',
  icon: 'fm_engrais_legume',
  effect: {
    type: 'growthSpeed',
    target: 'vegetable',
    value: 0.70 // -30% temps pousse
  },
  description: '-30% temps pousse légumes'
};

export const fm_nourriture_boeuf = {
  name: 'Nourriture Bœuf',
  category: 'farm_common',
  rarity: 'common',
  color: '#996644',
  icon: 'fm_nourriture_boeuf',
  effect: {
    type: 'feed',
    target: 'cow' // Nourrir vaches quotidien
  },
  description: 'Nourrir vaches (quotidien)'
};

export const fm_nourriture_poulet = {
  name: 'Nourriture Poulet',
  category: 'farm_common',
  rarity: 'common',
  color: '#ffdd88',
  icon: 'fm_nourriture_poulet',
  effect: {
    type: 'feed',
    target: 'chicken' // Nourrir poules quotidien
  },
  description: 'Nourrir poules (quotidien)'
};

// ========================================
// LOOT RARE (2 items - Drop moyen)
// ========================================

export const fm_graine_fruit = {
  name: 'Graine Fruits',
  category: 'farm_rare',
  rarity: 'rare',
  color: '#ff6644',
  icon: 'fm_graine_fruit',
  effect: {
    type: 'plant',
    target: 'fruit',
    growTime: 144000 // 36-48h en secondes (moyenne 40h)
  },
  description: 'Planter → fruits en 36-48h'
};

export const fm_graine_legume = {
  name: 'Graine Légumes',
  category: 'farm_rare',
  rarity: 'rare',
  color: '#88cc66',
  icon: 'fm_graine_legume',
  effect: {
    type: 'plant',
    target: 'vegetable',
    growTime: 108000 // 24-36h en secondes (moyenne 30h)
  },
  description: 'Planter → légumes en 24-36h'
};

// ========================================
// LOOT TRÈS RARE (2 items - Drop faible)
// ========================================

export const fm_poussin = {
  name: 'Poussin',
  category: 'farm_very_rare',
  rarity: 'very_rare',
  color: '#ffffaa',
  icon: 'fm_poussin',
  effect: {
    type: 'raise',
    target: 'chicken',
    growTime: 259200, // 72h en secondes
    produces: ['meat', 'eggs'] // Produit viande + œufs
  },
  description: 'Élever → poulet adulte en 72h'
};

export const fm_veau = {
  name: 'Veau',
  category: 'farm_very_rare',
  rarity: 'very_rare',
  color: '#aa8866',
  icon: 'fm_veau',
  effect: {
    type: 'raise',
    target: 'cow',
    growTime: 345600, // 96h en secondes
    produces: ['meat', 'milk'] // Produit viande + lait
  },
  description: 'Élever → boeuf adulte en 96h'
};