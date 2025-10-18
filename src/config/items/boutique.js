// src/config/items/boutique.js

// ========================================
// 🧵 BOUTIQUE COUTURE - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - MATÉRIAUX (10 items)
// ========================================

export const bc_tissu_coton = {
  name: 'Tissu Coton',
  category: 'bc_t1',
  tier: 1,
  color: '#eeeeee',
  icon: 'bc_tissu_coton',
  description: 'Textile souple'
};

export const bc_tissu_cuir = {
  name: 'Tissu Cuir',
  category: 'bc_t1',
  tier: 1,
  color: '#885533',
  icon: 'bc_tissu_cuir',
  description: 'Textile résistant'
};

export const bc_fil_renforce = {
  name: 'Fil Renforcé',
  category: 'bc_t1',
  tier: 1,
  color: '#666666',
  icon: 'bc_fil_renforce',
  description: 'Fixation'
};

export const bc_bouton_metal = {
  name: 'Bouton Métal',
  category: 'bc_t1',
  tier: 1,
  color: '#aaaaaa',
  icon: 'bc_bouton_metal',
  description: 'Attache'
};

export const bc_semelle = {
  name: 'Semelle Caoutchouc',
  category: 'bc_t1',
  tier: 1,
  color: '#333333',
  icon: 'bc_semelle',
  description: 'Base chaussure'
};

export const bc_rembourrage = {
  name: 'Rembourrage',
  category: 'bc_t1',
  tier: 1,
  color: '#ffeecc',
  icon: 'bc_rembourrage',
  description: 'Isolation'
};

export const bc_fermeture = {
  name: 'Fermeture Éclair',
  category: 'bc_t1',
  tier: 1,
  color: '#888888',
  icon: 'bc_fermeture',
  description: 'Système rapide'
};

export const bc_teinture = {
  name: 'Teinture',
  category: 'bc_t1',
  tier: 1,
  color: '#4488ff',
  icon: 'bc_teinture',
  description: 'Colorant'
};

export const bc_elastique = {
  name: 'Élastique',
  category: 'bc_t1',
  tier: 1,
  color: '#ffaa88',
  icon: 'bc_elastique',
  description: 'Ajustement'
};

export const bc_plaque_renfort = {
  name: 'Plaque Renfort',
  category: 'bc_t1',
  tier: 1,
  color: '#555555',
  icon: 'bc_plaque_renfort',
  description: 'Protection'
};

// ========================================
// TIER 2 - VÊTEMENTS (10 items)
// Durée: 480 secondes (8 minutes)
// ========================================

export const bc_baskets = {
  name: 'Baskets Légères',
  category: 'bc_t2',
  tier: 2,
  color: '#ffffff',
  icon: 'bc_baskets',
  duration: 480,
  effect: {
    type: 'speed',
    value: 1.15 // +15% vitesse
  },
  description: '+15% vitesse (8min)'
};

export const bc_bottes = {
  name: 'Bottes Renforcées',
  category: 'bc_t2',
  tier: 2,
  color: '#664422',
  icon: 'bc_bottes',
  duration: 480,
  effect: {
    type: 'defense',
    value: 1.10 // +10% def
  },
  description: '+10% def (8min)'
};

export const bc_pantalon_cargo = {
  name: 'Pantalon Cargo',
  category: 'bc_t2',
  tier: 2,
  color: '#888866',
  icon: 'bc_pantalon_cargo',
  effect: {
    type: 'slots',
    value: 4 // +4 slots inventaire
  },
  description: '+4 slots inventaire'
};

export const bc_pantalon_tactique = {
  name: 'Pantalon Tactique',
  category: 'bc_t2',
  tier: 2,
  color: '#444433',
  icon: 'bc_pantalon_tactique',
  duration: 480,
  effect: {
    type: 'defenseLeg',
    value: 1.15 // +15% def jambes
  },
  description: '+15% def jambes (8min)'
};

export const bc_veste_legere = {
  name: 'Veste Légère',
  category: 'bc_t2',
  tier: 2,
  color: '#aaaaaa',
  icon: 'bc_veste_legere',
  duration: 480,
  effect: {
    type: 'stamina',
    value: 1.10 // +10% regen stamina
  },
  description: '+10% régén stamina (8min)'
};

export const bc_veste_blindee = {
  name: 'Veste Blindée',
  category: 'bc_t2',
  tier: 2,
  color: '#555555',
  icon: 'bc_veste_blindee',
  duration: 480,
  effect: {
    type: 'defenseChest',
    value: 1.20 // +20% def torse
  },
  description: '+20% def torse (8min)'
};

export const bc_sac_leger = {
  name: 'Sac Léger',
  category: 'bc_t2',
  tier: 2,
  color: '#cccccc',
  icon: 'bc_sac_leger',
  effect: {
    type: 'slots',
    value: 6 // +6 slots inventaire
  },
  description: '+6 slots inventaire'
};

export const bc_sac_renforce = {
  name: 'Sac Renforcé',
  category: 'bc_t2',
  tier: 2,
  color: '#664422',
  icon: 'bc_sac_renforce',
  effect: {
    type: 'slots',
    value: 8, // +8 slots
    defenseBonus: 1.05 // +5% def
  },
  description: '+8 slots inventaire'
};

export const bc_casquette = {
  name: 'Casquette',
  category: 'bc_t2',
  tier: 2,
  color: '#4488ff',
  icon: 'bc_casquette',
  duration: 480,
  effect: {
    type: 'detection',
    value: 0.90 // -10% détection
  },
  description: '-10% détection (8min)'
};

export const bc_casque = {
  name: 'Casque Renforcé',
  category: 'bc_t2',
  tier: 2,
  color: '#333333',
  icon: 'bc_casque',
  duration: 480,
  effect: {
    type: 'defenseHead',
    value: 1.15 // +15% def tête
  },
  description: '+15% def tête (8min)'
};

// ========================================
// TIER 3 - ÉQUIPEMENT EXPERT (5 items)
// Durée: 720 secondes (12 minutes)
// ========================================

export const bc_bottes_voyageur = {
  name: 'Bottes de Voyageur',
  category: 'bc_t3',
  tier: 3,
  color: '#885544',
  icon: 'bc_bottes_voyageur',
  equipmentType: 'boots',  // ⬅️ AJOUT pour RNG
  stackable: false,        // ⬅️ AJOUT
  hasRandomStats: true,    // ⬅️ AJOUT
  duration: 720,
  effect: {
    type: 'staminaCost',
    value: 0.70 // -30% conso stamina déplacement
  },
  description: '⭐ Bottes Elite (stats aléatoires) - Effet: -30% conso stamina (12min)'
};

export const bc_pantalon_isolant = {
  name: 'Pantalon Isolant',
  category: 'bc_t3',
  tier: 3,
  color: '#666655',
  icon: 'bc_pantalon_isolant',
  equipmentType: 'pants',  // ⬅️ AJOUT pour RNG
  stackable: false,        // ⬅️ AJOUT
  hasRandomStats: true,    // ⬅️ AJOUT
  duration: 720,
  effect: {
    type: 'multi',
    coldResist: 1.30, // +30% résist froid
    slots: 4 // +4 slots
  },
  description: '⭐ Pantalon Elite (stats aléatoires) - Effet: +30% résist froid +4 slots (12min)'
};

export const bc_veste_anti_acide = {
  name: 'Veste Anti-Acide',
  category: 'bc_t3',
  tier: 3,
  color: '#88ff44',
  icon: 'bc_veste_anti_acide',
  equipmentType: 'vest',   // ⬅️ AJOUT pour RNG
  stackable: false,        // ⬅️ AJOUT
  hasRandomStats: true,    // ⬅️ AJOUT
  duration: 720,
  effect: {
    type: 'multi',
    defense: 1.25, // +25% def
    acidImmune: true // Immunité acide
  },
  description: '⭐ Veste Elite (stats aléatoires) - Effet: +25% def + immunité acide (12min)'
};

export const bc_casque_filtrant = {
  name: 'Casque Filtrant',
  category: 'bc_t3',
  tier: 3,
  color: '#444444',
  icon: 'bc_casque_filtrant',
  equipmentType: 'helmet', // ⬅️ AJOUT pour RNG
  stackable: false,        // ⬅️ AJOUT
  hasRandomStats: true,    // ⬅️ AJOUT
  duration: 720,
  effect: {
    type: 'multi',
    defenseHead: 1.20, // +20% def tête
    gasImmune: true // Immunité gaz
  },
  description: '⭐ Casque Elite (stats aléatoires) - Effet: +20% def + immunité gaz (12min)'
};

export const bc_sac_expedition = {
  name: 'Sac d\'Expédition',
  category: 'bc_t3',
  tier: 3,
  color: '#aa8855',
  icon: 'bc_sac_expedition',
  equipmentType: 'backpack', // ⬅️ AJOUT pour RNG
  stackable: false,          // ⬅️ AJOUT
  hasRandomStats: true,      // ⬅️ AJOUT
  effect: {
    type: 'slots',
    value: 14 // +14 slots inventaire
  },
  description: '⭐ Sac Elite (stats aléatoires) - Effet: +14 slots inventaire'
};