// src/config/items/oasis.js

// ========================================
// 🏝️ OASIS - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - FRUITS BRUTS (10 items)
// ========================================

export const oa_orange = {
  name: 'Orange',
  category: 'oa_t1',
  tier: 1,
  color: '#ff8800',
  icon: 'oa_orange',
  description: 'Fruit frais'
};

export const oa_citron = {
  name: 'Citron',
  category: 'oa_t1',
  tier: 1,
  color: '#ffff44',
  icon: 'oa_citron',
  description: 'Agrume acide'
};

export const oa_mangue = {
  name: 'Mangue',
  category: 'oa_t1',
  tier: 1,
  color: '#ffaa00',
  icon: 'oa_mangue',
  description: 'Fruit exotique'
};

export const oa_pasteque = {
  name: 'Pastèque',
  category: 'oa_t1',
  tier: 1,
  color: '#ff4488',
  icon: 'oa_pasteque',
  description: 'Hydratant'
};

export const oa_ananas = {
  name: 'Ananas',
  category: 'oa_t1',
  tier: 1,
  color: '#ffcc00',
  icon: 'oa_ananas',
  description: 'Fruit tropical'
};

export const oa_datte = {
  name: 'Datte',
  category: 'oa_t1',
  tier: 1,
  color: '#aa6633',
  icon: 'oa_datte',
  description: 'Fruit énergétique'
};

export const oa_figue = {
  name: 'Figue',
  category: 'oa_t1',
  tier: 1,
  color: '#884466',
  icon: 'oa_figue',
  description: 'Fruit sucré'
};

export const oa_grenade = {
  name: 'Grenade',
  category: 'oa_t1',
  tier: 1,
  color: '#cc0044',
  icon: 'oa_grenade',
  description: 'Fruit antioxydant'
};

export const oa_noix_coco = {
  name: 'Noix de Coco',
  category: 'oa_t1',
  tier: 1,
  color: '#aa8866',
  icon: 'oa_noix_coco',
  description: 'Hydratant exotique'
};

export const oa_canne_sucre = {
  name: 'Canne à Sucre',
  category: 'oa_t1',
  tier: 1,
  color: '#ccaa88',
  icon: 'oa_canne_sucre',
  description: 'Sucre naturel'
};

// ========================================
// TIER 2 - JUS & NECTARS (10 items)
// Durée: 240-480 secondes (4-8 minutes)
// ========================================

export const oa_jus_tropical = {
  name: 'Jus Tropical',
  category: 'oa_t2',
  tier: 2,
  color: '#ff8844',
  icon: 'oa_jus_tropical',
  duration: 360,
  effect: {
    type: 'multi',
    attackSpeed: 1.15, // +15% vitesse atk
    regenHP: 0.10 // +10% regen PV
  },
  description: '+vitesse atk +régén PV (6min)'
};

export const oa_citronnade = {
  name: 'Citronnade',
  category: 'oa_t2',
  tier: 2,
  color: '#ffff66',
  icon: 'oa_citronnade',
  duration: 360,
  effect: {
    type: 'multi',
    poisonResist: 1.20, // +20% résist poison
    thirst: 30 // +30 hydratation
  },
  description: '+résist poison +hydratation (6min)'
};

export const oa_nectar_datte = {
  name: 'Nectar de Datte',
  category: 'oa_t2',
  tier: 2,
  color: '#aa7744',
  icon: 'oa_nectar_datte',
  duration: 480,
  effect: {
    type: 'energy',
    value: 1.20 // +20% énergie
  },
  description: '+20% énergie prolongée (8min)'
};

export const oa_smoothie_defensif = {
  name: 'Smoothie Défensif',
  category: 'oa_t2',
  tier: 2,
  color: '#ff6688',
  icon: 'oa_smoothie_defensif',
  duration: 360,
  effect: {
    type: 'multi',
    defense: 1.15, // +15% défense
    regenHP: 0.12 // +12% regen PV
  },
  description: '+défense +régén PV (6min)'
};

export const oa_punch_vitamine = {
  name: 'Punch Vitaminé',
  category: 'oa_t2',
  tier: 2,
  color: '#ff6600',
  icon: 'oa_punch_vitamine',
  duration: 360,
  effect: {
    type: 'multi',
    speed: 1.18, // +18% vitesse
    reflexes: 1.12 // +12% réactivité
  },
  description: '+vitesse +réactivité (6min)'
};

export const oa_jus_detox = {
  name: 'Jus Détox',
  category: 'oa_t2',
  tier: 2,
  color: '#88ff44',
  icon: 'oa_jus_detox',
  effect: {
    type: 'multi',
    cleanse: true, // Retire poison
    regenHP: 0.15 // +15% regen PV
  },
  description: 'Retire poison +régén PV'
};

export const oa_cocktail_oasis = {
  name: 'Cocktail Oasis',
  category: 'oa_t2',
  tier: 2,
  color: '#ffaa44',
  icon: 'oa_cocktail_oasis',
  duration: 480,
  effect: {
    type: 'multi',
    energy: 1.15, // +15% énergie
    defense: 1.10, // +10% def
    thirst: 40 // +40 hydratation
  },
  description: '+énergie +défense +hydratation (8min)'
};

export const oa_limonade = {
  name: 'Limonade Explosive',
  category: 'oa_t2',
  tier: 2,
  color: '#ffff88',
  icon: 'oa_limonade',
  duration: 240,
  effect: {
    type: 'multi',
    speed: 1.25, // +25% vitesse
    reflexes: 1.20 // +20% réactivité
  },
  description: '+vitesse +réactivité courte (4min)'
};

export const oa_nectar_guerrier = {
  name: 'Nectar Guerrier',
  category: 'oa_t2',
  tier: 2,
  color: '#ff8800',
  icon: 'oa_nectar_guerrier',
  duration: 360,
  effect: {
    type: 'multi',
    damage: 1.20, // +20% attaque
    energy: 1.15 // +15% énergie
  },
  description: '+attaque +énergie (6min)'
};

export const oa_eau_coco = {
  name: 'Eau de Coco Fraîche',
  category: 'oa_t2',
  tier: 2,
  color: '#ffffff',
  icon: 'oa_eau_coco',
  duration: 360,
  effect: {
    type: 'multi',
    thirst: 50, // +50 hydratation
    regenHP: 0.18 // +18% regen PV
  },
  description: '+hydratation +régén PV (6min)'
};

// ========================================
// TIER 3 - COCKTAILS ÉLIXIRS (5 items)
// Durée: 720 secondes (12 minutes)
// ========================================

export const oa_elixir_oasis = {
  name: 'Élixir Oasis',
  category: 'oa_t3',
  tier: 3,
  color: '#44ffaa',
  icon: 'oa_elixir_oasis',
  duration: 720,
  effect: {
    type: 'multi',
    defense: 1.25, // +25% défense
    regenHP: 0.25 // +25% regen PV
  },
  description: '+défense +régén PV (12min)'
};

export const oa_boost_tropical = {
  name: 'Boost Tropical',
  category: 'oa_t3',
  tier: 3,
  color: '#ff8800',
  icon: 'oa_boost_tropical',
  duration: 720,
  effect: {
    type: 'multi',
    damage: 1.25, // +25% attaque
    speed: 1.20 // +20% vitesse
  },
  description: '+attaque +vitesse (12min)'
};

export const oa_nectar_titan = {
  name: 'Nectar du Titan',
  category: 'oa_t3',
  tier: 3,
  color: '#ffaa00',
  icon: 'oa_nectar_titan',
  duration: 720,
  effect: {
    type: 'multi',
    damage: 1.30, // +30% attaque
    recovery: 1.25 // +25% récup rapide
  },
  description: '+attaque prolongée +récup rapide (12min)'
};

export const oa_potion_purifiante = {
  name: 'Potion Purifiante',
  category: 'oa_t3',
  tier: 3,
  color: '#88ffaa',
  icon: 'oa_potion_purifiante',
  effect: {
    type: 'multi',
    cleanse: true, // Retire poison
    regenHP: 0.30, // +30% regen PV
    thirst: 70 // +70 hydratation
  },
  description: 'Retire poison +régén PV +hydratation'
};

export const oa_cocktail_velocite = {
  name: 'Cocktail Vélocité',
  category: 'oa_t3',
  tier: 3,
  color: '#ffff44',
  icon: 'oa_cocktail_velocite',
  duration: 720,
  effect: {
    type: 'multi',
    speed: 1.30, // +30% vitesse
    poisonResist: 1.25 // +25% résist poison
  },
  description: '+vitesse +résist poison (12min)'
};