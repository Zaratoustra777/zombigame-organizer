// src/config/items/fastfood.js

// ========================================
// 🍔 FAST-FOOD - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - INGRÉDIENTS BRUTS (10 items)
// ========================================

export const ff_tomate = {
  name: 'Tomate',
  category: 'ff_t1',
  tier: 1,
  color: '#ff4444',
  icon: 'ff_tomate',
  description: 'Légume frais'
};

export const ff_carotte = {
  name: 'Carotte',
  category: 'ff_t1',
  tier: 1,
  color: '#ff8800',
  icon: 'ff_carotte',
  description: 'Légume racine'
};

export const ff_pomme_terre = {
  name: 'Pomme de Terre',
  category: 'ff_t1',
  tier: 1,
  color: '#ccaa66',
  icon: 'ff_pomme_terre',
  description: 'Féculent'
};

export const ff_riz = {
  name: 'Riz',
  category: 'ff_t1',
  tier: 1,
  color: '#ffffff',
  icon: 'ff_riz',
  description: 'Céréale'
};

export const ff_oignon = {
  name: 'Oignon',
  category: 'ff_t1',
  tier: 1,
  color: '#ccccaa',
  icon: 'ff_oignon',
  description: 'Aromatique'
};

export const ff_poulet = {
  name: 'Poulet',
  category: 'ff_t1',
  tier: 1,
  color: '#ffddaa',
  icon: 'ff_poulet',
  description: 'Protéine blanche'
};

export const ff_boeuf = {
  name: 'Bœuf',
  category: 'ff_t1',
  tier: 1,
  color: '#aa4444',
  icon: 'ff_boeuf',
  description: 'Protéine rouge'
};

export const ff_pates = {
  name: 'Pâtes',
  category: 'ff_t1',
  tier: 1,
  color: '#ffeeaa',
  icon: 'ff_pates',
  description: 'Féculent raffiné'
};

export const ff_oeuf = {
  name: 'Œuf',
  category: 'ff_t1',
  tier: 1,
  color: '#ffffcc',
  icon: 'ff_oeuf',
  description: 'Protéine'
};

export const ff_lait = {
  name: 'Lait',
  category: 'ff_t1',
  tier: 1,
  color: '#ffffff',
  icon: 'ff_lait',
  description: 'Produit laitier'
};

// ========================================
// TIER 2 - PLATS PRÉPARÉS (10 items)
// Durée: 360-600 secondes (6-10 minutes)
// ========================================

export const ff_soupe_rustique = {
  name: 'Soupe Rustique',
  category: 'ff_t2',
  tier: 2,
  color: '#ff6633',
  icon: 'ff_soupe_rustique',
  duration: 360,
  effect: {
    type: 'regenHP',
    value: 0.20 // +20% regen PV
  },
  description: '+20% régén PV (6min)'
};

export const ff_ragout_boeuf = {
  name: 'Ragoût de Bœuf',
  category: 'ff_t2',
  tier: 2,
  color: '#884422',
  icon: 'ff_ragout_boeuf',
  duration: 360,
  effect: {
    type: 'multi',
    strength: 1.25, // +25% force
    defense: 1.10 // +10% def
  },
  description: '+25% force +10% def (6min)'
};

export const ff_curry_poulet = {
  name: 'Curry de Poulet',
  category: 'ff_t2',
  tier: 2,
  color: '#ffaa44',
  icon: 'ff_curry_poulet',
  duration: 600,
  effect: {
    type: 'multi',
    stamina: 1.25, // +25% stamina regen
    speed: 1.15 // +15% vitesse
  },
  description: '+25% stamina +15% vitesse (10min)'
};

export const ff_pates_creme = {
  name: 'Pâtes à la Crème',
  category: 'ff_t2',
  tier: 2,
  color: '#ffffdd',
  icon: 'ff_pates_creme',
  duration: 360,
  effect: {
    type: 'stamina',
    value: 1.20 // +20% regen stamina
  },
  description: '+20% régén stamina (6min)'
};

export const ff_omelette = {
  name: 'Omelette Campagnarde',
  category: 'ff_t2',
  tier: 2,
  color: '#ffff88',
  icon: 'ff_omelette',
  duration: 360,
  effect: {
    type: 'stamina',
    value: 1.20 // +20% regen stamina
  },
  description: '+20% régén stamina (6min)'
};

export const ff_carottes_sautees = {
  name: 'Carottes Sautées',
  category: 'ff_t2',
  tier: 2,
  color: '#ff8844',
  icon: 'ff_carottes_sautees',
  duration: 360,
  effect: {
    type: 'staminaCost',
    value: 0.80 // -20% conso stamina
  },
  description: '-20% conso stamina (6min)'
};

export const ff_burger_fermier = {
  name: 'Burger Fermier',
  category: 'ff_t2',
  tier: 2,
  color: '#aa6633',
  icon: 'ff_burger_fermier',
  duration: 360,
  effect: {
    type: 'damage',
    value: 1.25 // +25% attaque
  },
  description: '+25% attaque (6min)'
};

export const ff_carbonara = {
  name: 'Pâtes Carbonara',
  category: 'ff_t2',
  tier: 2,
  color: '#ffffaa',
  icon: 'ff_carbonara',
  duration: 360,
  effect: {
    type: 'multi',
    stamina: 1.15, // +15% stamina
    heal: 10 // +10 HP
  },
  description: '+15% stamina + 10 HP (6min)'
};

export const ff_poulet_roti = {
  name: 'Poulet Rôti',
  category: 'ff_t2',
  tier: 2,
  color: '#cc8844',
  icon: 'ff_poulet_roti',
  duration: 360,
  effect: {
    type: 'multi',
    stamina: 1.20, // +20% stamina
    strength: 1.10 // +10% force
  },
  description: '+20% stamina +10% force (6min)'
};

export const ff_riz_saute = {
  name: 'Riz Sauté',
  category: 'ff_t2',
  tier: 2,
  color: '#ffddaa',
  icon: 'ff_riz_saute',
  duration: 540,
  effect: {
    type: 'multi',
    stamina: 1.25, // +25% stamina regen
    attackSpeed: 1.10 // +10% vitesse atk
  },
  description: '+25% stamina +vitesse atk (9min)'
};

// ========================================
// TIER 3 - MENUS COMBINÉS (5 items)
// Durée: 720-900 secondes (12-15 minutes)
// ========================================

export const ff_menu_energie = {
  name: 'Menu Énergie',
  category: 'ff_t3',
  tier: 3,
  color: '#ffdd00',
  icon: 'ff_menu_energie',
  duration: 720,
  effect: {
    type: 'multi',
    stamina: 1.30, // +30% stamina regen
    speed: 1.15 // +15% vitesse
  },
  description: '+30% stamina +15% vitesse (12min)'
};

export const ff_menu_force = {
  name: 'Menu Force',
  category: 'ff_t3',
  tier: 3,
  color: '#ff4400',
  icon: 'ff_menu_force',
  duration: 720,
  effect: {
    type: 'multi',
    damage: 1.35, // +35% dégâts
    defense: 1.15 // +15% def
  },
  description: '+35% dégâts +15% def (12min)'
};

export const ff_menu_paysan = {
  name: 'Menu Paysan',
  category: 'ff_t3',
  tier: 3,
  color: '#88cc44',
  icon: 'ff_menu_paysan',
  duration: 720,
  effect: {
    type: 'multi',
    heal: 20, // +20 HP
    stamina: 1.20 // +20% stamina
  },
  description: '+20 HP +20% stamina (12min)'
};

export const ff_menu_pates = {
  name: 'Menu Pâtes Party',
  category: 'ff_t3',
  tier: 3,
  color: '#ffffcc',
  icon: 'ff_menu_pates',
  duration: 900,
  effect: {
    type: 'multi',
    stamina: 1.25, // +25% stamina regen
    regenHP: 0.15 // +15% regen PV constant
  },
  description: '+25% stamina + régén (15min)'
};

export const ff_menu_royal = {
  name: 'Menu Royal',
  category: 'ff_t3',
  tier: 3,
  color: '#ff8800',
  icon: 'ff_menu_royal',
  duration: 720,
  effect: {
    type: 'multi',
    damage: 1.30, // +30% attaque
    stamina: 1.20 // +20% stamina
  },
  description: '+30% attaque +20% stamina (12min)'
};