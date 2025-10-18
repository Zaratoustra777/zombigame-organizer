// src/config/items/chantier.js

// ========================================
// 🧱 CHANTIER - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - MATÉRIAUX BRUTS (10 items)
// ========================================

export const ch_ferraille = {
  name: 'Ferraille',
  category: 'ch_t1',
  tier: 1,
  color: '#888888',
  icon: 'ch_ferraille',
  description: 'Métal brut'
};

export const ch_ciment = {
  name: 'Ciment en Poudre',
  category: 'ch_t1',
  tier: 1,
  color: '#999999',
  icon: 'ch_ciment',
  description: 'Liant'
};

export const ch_sable = {
  name: 'Sable',
  category: 'ch_t1',
  tier: 1,
  color: '#ccaa66',
  icon: 'ch_sable',
  description: 'Agrégat'
};

export const ch_brique = {
  name: 'Brique',
  category: 'ch_t1',
  tier: 1,
  color: '#aa4422',
  icon: 'ch_brique',
  description: 'Maçonnerie'
};

export const ch_plaque_metal = {
  name: 'Plaque Métal',
  category: 'ch_t1',
  tier: 1,
  color: '#666666',
  icon: 'ch_plaque_metal',
  description: 'Métal plat'
};

export const ch_fil_cuivre = {
  name: 'Fil de Cuivre',
  category: 'ch_t1',
  tier: 1,
  color: '#ff8844',
  icon: 'ch_fil_cuivre',
  description: 'Conducteur'
};

export const ch_poutre = {
  name: 'Poutre',
  category: 'ch_t1',
  tier: 1,
  color: '#885511',
  icon: 'ch_poutre',
  description: 'Structure'
};

export const ch_vis = {
  name: 'Vis',
  category: 'ch_t1',
  tier: 1,
  color: '#aaaaaa',
  icon: 'ch_vis',
  description: 'Fixation'
};

export const ch_tige_metal = {
  name: 'Tige Métal',
  category: 'ch_t1',
  tier: 1,
  color: '#777777',
  icon: 'ch_tige_metal',
  description: 'Renfort'
};

export const ch_equerre = {
  name: 'Équerre',
  category: 'ch_t1',
  tier: 1,
  color: '#999999',
  icon: 'ch_equerre',
  description: 'Support'
};

// ========================================
// TIER 2 - COMPOSANTS FABRIQUÉS (10 items)
// ========================================

export const ch_plancher_renforce = {
  name: 'Plancher Renforcé',
  category: 'ch_t2',
  tier: 2,
  color: '#aa8855',
  icon: 'ch_plancher_renforce',
  effect: {
    type: 'structure',
    solidStructure: true
  },
  description: 'Structure solide'
};

export const ch_beton_brut = {
  name: 'Béton Brut',
  category: 'ch_t2',
  tier: 2,
  color: '#888888',
  icon: 'ch_beton_brut',
  effect: {
    type: 'structure',
    hpBonus: 1.20 // +20% PV structure
  },
  description: 'Matériau lourd +PV'
};

export const ch_panneau_metal = {
  name: 'Panneau Métal',
  category: 'ch_t2',
  tier: 2,
  color: '#555555',
  icon: 'ch_panneau_metal',
  effect: {
    type: 'structure',
    defensiveWall: true
  },
  description: 'Mur défensif'
};

export const ch_cable_electrique = {
  name: 'Câble Électrique',
  category: 'ch_t2',
  tier: 2,
  color: '#ff6600',
  icon: 'ch_cable_electrique',
  effect: {
    type: 'utility',
    circuits: true
  },
  description: 'Circuits électriques'
};

export const ch_charniere = {
  name: 'Charnière Renforcée',
  category: 'ch_t2',
  tier: 2,
  color: '#666666',
  icon: 'ch_charniere',
  effect: {
    type: 'utility',
    doorsTraps: true,
    durability: 1.15 // +15% durabilité
  },
  description: 'Portes/trappes +durabilité'
};

export const ch_mur_brique = {
  name: 'Mur de Brique',
  category: 'ch_t2',
  tier: 2,
  color: '#aa3322',
  icon: 'ch_mur_brique',
  effect: {
    type: 'structure',
    basicWall: true,
    explosionResist: 0.90 // -10% résist explosion
  },
  description: 'Mur basique'
};

export const ch_support_structural = {
  name: 'Support Structural',
  category: 'ch_t2',
  tier: 2,
  color: '#777766',
  icon: 'ch_support_structural',
  effect: {
    type: 'structure',
    resistance: 1.20 // +20% résistance
  },
  description: 'Renfort +20% résistance'
};

export const ch_equerre_renforcee = {
  name: 'Équerre Renforcée',
  category: 'ch_t2',
  tier: 2,
  color: '#888888',
  icon: 'ch_equerre_renforcee',
  effect: {
    type: 'structure',
    stability: 1.15 // +15% solidité
  },
  description: 'Stabilisation +15% solidité'
};

export const ch_module_electrique = {
  name: 'Module Électrique',
  category: 'ch_t2',
  tier: 2,
  color: '#ffaa00',
  icon: 'ch_module_electrique',
  effect: {
    type: 'utility',
    power: true,
    lowConsumption: true
  },
  description: 'Alimentation électrique'
};

export const ch_kit_reparation = {
  name: 'Kit Réparation',
  category: 'ch_t2',
  tier: 2,
  color: '#44aa44',
  icon: 'ch_kit_reparation',
  effect: {
    type: 'consumable',
    repair: 0.20 // Répare 20% PV
  },
  description: 'Répare 20% PV structure'
};

// ========================================
// TIER 3 - STRUCTURES AVANCÉES (9 items)
// ========================================

export const ch_mur_renforce = {
  name: 'Mur Renforcé',
  category: 'ch_t3',
  tier: 3,
  color: '#666655',
  icon: 'ch_mur_renforce',
  effect: {
    type: 'structure',
    hpBonus: 1.40, // +40% PV structure
    defense: true
  },
  description: '+40% PV structure'
};

export const ch_porte_blindee = {
  name: 'Porte Blindée',
  category: 'ch_t3',
  tier: 3,
  color: '#444444',
  icon: 'ch_porte_blindee',
  effect: {
    type: 'structure',
    resistance: 1.30, // +30% résistance
    autoLock: true
  },
  description: '+30% résistance + verrou auto'
};

export const ch_reseau_electrique = {
  name: 'Réseau Électrique',
  category: 'ch_t3',
  tier: 3,
  color: '#ffcc00',
  icon: 'ch_reseau_electrique',
  effect: {
    type: 'utility',
    powerModules: 2 // Alimente 2 modules
  },
  description: 'Alimente 2 modules'
};

export const ch_toiture_isolee = {
  name: 'Toiture Isolée',
  category: 'ch_t3',
  tier: 3,
  color: '#aa6633',
  icon: 'ch_toiture_isolee',
  effect: {
    type: 'structure',
    heatLoss: 0.75 // -25% perte chaleur
  },
  description: '-25% perte chaleur'
};

export const ch_charpente = {
  name: 'Charpente Maîtresse',
  category: 'ch_t3',
  tier: 3,
  color: '#886644',
  icon: 'ch_charpente',
  effect: {
    type: 'structure',
    stability: 1.20 // +20% stabilité
  },
  description: '+20% stabilité ossature'
};

export const ch_ventilation = {
  name: 'Ventilation Mécanique',
  category: 'ch_t3',
  tier: 3,
  color: '#aaccff',
  icon: 'ch_ventilation',
  effect: {
    type: 'utility',
    heatReduction: 0.85, // -15% chaleur
    noiseReduction: 0.85 // -15% bruit
  },
  description: '-15% chaleur/bruit'
};

export const ch_plancher_technique = {
  name: 'Plancher Technique',
  category: 'ch_t3',
  tier: 3,
  color: '#aa9966',
  icon: 'ch_plancher_technique',
  effect: {
    type: 'utility',
    buildSpeed: 1.10 // +10% vitesse construction
  },
  description: '+10% vitesse construction'
};

export const ch_systeme_hydraulique = {
  name: 'Système Hydraulique',
  category: 'ch_t3',
  tier: 3,
  color: '#4488ff',
  icon: 'ch_systeme_hydraulique',
  effect: {
    type: 'utility',
    autoTraps: true // Automatise trappes
  },
  description: 'Automatise trappes'
};

export const ch_escalier = {
  name: 'Escalier Renforcé',
  category: 'ch_t3',
  tier: 3,
  color: '#998877',
  icon: 'ch_escalier',
  effect: {
    type: 'utility',
    movementSpeed: 1.15 // +15% vitesse déplacement
  },
  description: '+15% vitesse déplacement'
};