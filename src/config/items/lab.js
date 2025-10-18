// src/config/items/lab.js

// ========================================
// 💉 LABORATOIRE - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - COMPOSANTS BRUTS (10 items)
// ========================================

export const lab_ampoule_enzyme = {
  name: 'Ampoule d\'Enzyme',
  category: 'lab_t1',
  tier: 1,
  color: '#00ff88',
  icon: 'lab_ampoule_enzyme',
  description: 'Base énergétique'
};

export const lab_poudre_catalytique = {
  name: 'Poudre Catalytique',
  category: 'lab_t1',
  tier: 1,
  color: '#ffaa00',
  icon: 'lab_poudre_catalytique',
  description: 'Accélère réactions'
};

export const lab_gel_stabilisateur = {
  name: 'Gel Stabilisateur',
  category: 'lab_t1',
  tier: 1,
  color: '#00aaff',
  icon: 'lab_gel_stabilisateur',
  description: 'Mélanges durables'
};

export const lab_cristal_energise = {
  name: 'Cristal Énergisé',
  category: 'lab_t1',
  tier: 1,
  color: '#ff00ff',
  icon: 'lab_cristal_energise',
  description: 'Source d\'énergie'
};

export const lab_solvant_purifie = {
  name: 'Solvant Purifié',
  category: 'lab_t1',
  tier: 1,
  color: '#88ffff',
  icon: 'lab_solvant_purifie',
  description: 'Base liquide neutre'
};

export const lab_sel_reactif = {
  name: 'Sel Réactif',
  category: 'lab_t1',
  tier: 1,
  color: '#ffffff',
  icon: 'lab_sel_reactif',
  description: 'Module puissance'
};

export const lab_esther_volatile = {
  name: 'Esther Volatile',
  category: 'lab_t1',
  tier: 1,
  color: '#ff4444',
  icon: 'lab_esther_volatile',
  description: 'Explosif instable'
};

export const lab_resine_liant = {
  name: 'Résine Liante',
  category: 'lab_t1',
  tier: 1,
  color: '#aa6633',
  icon: 'lab_resine_liant',
  description: 'Colle chimique'
};

export const lab_membrane_filtrante = {
  name: 'Membrane Filtrante',
  category: 'lab_t1',
  tier: 1,
  color: '#cccccc',
  icon: 'lab_membrane_filtrante',
  description: 'Purifie effets'
};

export const lab_vial_sterile = {
  name: 'Fiole Stérile',
  category: 'lab_t1',
  tier: 1,
  color: '#88ccff',
  icon: 'lab_vial_sterile',
  description: 'Contenant obligatoire'
};

// ========================================
// TIER 2 - SÉRUMS ET POTIONS (10 items)
// Durée: 300 secondes (5 minutes)
// ========================================

export const lab_serum_vitesse = {
  name: 'Sérum de Vitesse',
  category: 'lab_t2',
  tier: 2,
  color: '#00ffff',
  icon: 'lab_serum_vitesse',
  duration: 300,
  effect: {
    type: 'speed',
    value: 1.25 // +25%
  },
  description: '+25% vitesse (5min)'
};

export const lab_tonique_force = {
  name: 'Tonique de Force',
  category: 'lab_t2',
  tier: 2,
  color: '#ff6600',
  icon: 'lab_tonique_force',
  duration: 300,
  effect: {
    type: 'damage',
    value: 1.30 // +30%
  },
  description: '+30% dégâts (5min)'
};

export const lab_tonic_endurance = {
  name: 'Tonic d\'Endurance',
  category: 'lab_t2',
  tier: 2,
  color: '#ffaa00',
  icon: 'lab_tonic_endurance',
  duration: 300,
  effect: {
    type: 'stamina',
    value: 1.50 // +50% regen
  },
  description: '+50% régén stamina (5min)'
};

export const lab_elixir_soin = {
  name: 'Élixir de Soin',
  category: 'lab_t2',
  tier: 2,
  color: '#00ff00',
  icon: 'lab_elixir_soin',
  duration: 300,
  effect: {
    type: 'heal',
    value: 25,
    regen: 0.5
  },
  description: '+25 HP + régén (5min)'
};

export const lab_serum_defensif = {
  name: 'Sérum Défensif',
  category: 'lab_t2',
  tier: 2,
  color: '#4444ff',
  icon: 'lab_serum_defensif',
  duration: 300,
  effect: {
    type: 'defense',
    value: 0.20 // +20% resistance
  },
  description: '+20% résistance (5min)'
};

export const lab_potion_toxique = {
  name: 'Potion Toxique',
  category: 'lab_t2',
  tier: 2,
  color: '#88ff00',
  icon: 'lab_potion_toxique',
  duration: 10,
  effect: {
    type: 'poison',
    damage: 5,
    interval: 1 // 5 dégâts par seconde pendant 10s
  },
  description: 'DoT poison 10s'
};

export const lab_injection_energie = {
  name: 'Injection d\'Énergie',
  category: 'lab_t2',
  tier: 2,
  color: '#ffff00',
  icon: 'lab_injection_energie',
  duration: 300,
  effect: {
    type: 'attackSpeed',
    value: 1.25 // +25%
  },
  description: '+25% vitesse attaque (5min)'
};

export const lab_solution_antitoxique = {
  name: 'Solution Antitoxique',
  category: 'lab_t2',
  tier: 2,
  color: '#00ffaa',
  icon: 'lab_solution_antitoxique',
  effect: {
    type: 'cleanse',
    removes: ['poison', 'thirst']
  },
  description: 'Supprime poison et soif'
};

export const lab_flasque_explosive = {
  name: 'Flasque Explosive',
  category: 'lab_t2',
  tier: 2,
  color: '#ff4400',
  icon: 'lab_flasque_explosive',
  effect: {
    type: 'explosion',
    damage: 50,
    radius: 150
  },
  description: 'Explosion AoE'
};

export const lab_tonic_mental = {
  name: 'Tonic Mental',
  category: 'lab_t2',
  tier: 2,
  color: '#aa88ff',
  icon: 'lab_tonic_mental',
  duration: 300,
  effect: {
    type: 'staminaCost',
    value: 0.80, // -20% conso
    speedBonus: 1.10 // +10% vitesse
  },
  description: '-20% conso stamina +10% vitesse (5min)'
};

// ========================================
// TIER 3 - ÉLIXIRS AVANCÉS (6 items)
// Durée: 600-720 secondes (10-12 minutes)
// ========================================

export const lab_serum_titan = {
  name: 'Sérum du Titan',
  category: 'lab_t3',
  tier: 3,
  color: '#ff0088',
  icon: 'lab_serum_titan',
  duration: 600,
  effect: {
    type: 'multi',
    damage: 1.25, // +25% dégâts
    defense: 1.25 // +25% résistance
  },
  description: '+25% dégâts +25% résistance (10min)'
};

export const lab_elixir_vitesse_avance = {
  name: 'Élixir Vitesse Avancé',
  category: 'lab_t3',
  tier: 3,
  color: '#00ffff',
  icon: 'lab_elixir_vitesse_avance',
  duration: 720,
  effect: {
    type: 'multi',
    speed: 1.30, // +30% vitesse
    stamina: 1.50 // +50% regen stamina
  },
  description: '+30% vitesse +50% régén stamina (12min)'
};

export const lab_serum_regen_totale = {
  name: 'Sérum Régén Totale',
  category: 'lab_t3',
  tier: 3,
  color: '#00ff88',
  icon: 'lab_serum_regen_totale',
  duration: 600,
  effect: {
    type: 'heal',
    value: 30,
    regen: 1.0 // regen x2
  },
  description: '+30 HP + régén x2 (10min)'
};

export const lab_solution_explosive_controlee = {
  name: 'Solution Explosive Contrôlée',
  category: 'lab_t3',
  tier: 3,
  color: '#ff6600',
  icon: 'lab_solution_explosive_controlee',
  effect: {
    type: 'explosionPoison',
    damage: 60,
    radius: 180,
    poisonDuration: 10,
    poisonDamage: 8
  },
  description: 'Explosion + DoT poison'
};

export const lab_injection_neuro_boost = {
  name: 'Injection Neuro-Boost',
  category: 'lab_t3',
  tier: 3,
  color: '#ff00ff',
  icon: 'lab_injection_neuro_boost',
  duration: 600,
  effect: {
    type: 'multi',
    speed: 1.15, // +15% vitesse
    attackSpeed: 1.20 // +20% vitesse attaque
  },
  description: '+15% vitesse +20% attaque (10min)'
};

export const lab_tonic_survie = {
  name: 'Tonic de Survie',
  category: 'lab_t3',
  tier: 3,
  color: '#44aaff',
  icon: 'lab_tonic_survie',
  duration: 720,
  effect: {
    type: 'multi',
    defense: 1.15, // +15% résistance
    staminaCost: 0.80 // -20% conso stamina
  },
  description: '+15% résistance -20% conso stamina (12min)'
};