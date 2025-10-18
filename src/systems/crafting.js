// src/systems/crafting.js

import { ITEMS } from '../config/items/index.js';

// ========================================
// 🎲 SYSTÈME DE STATS ALÉATOIRES ÉQUILIBRÉ
// ========================================

// Budget total de points par type d'arme
const WEAPON_BUDGETS = {
  shotgun: 100,
  assault: 120,
  sniper: 110,
  smg: 130,
  pistol: 100
};

// Coût en points de chaque bonus (1 point = 1%)
const STAT_COSTS = {
  damage: 3,
  ammo: 4,
  fireRate: 2.5,
  accuracy: 2,
  range: 2.5,
  reloadSpeed: 1.5,
  recoil: -1.5,
  mobility: 2
};

// Stats AUTORISÉES par type d'arme
const WEAPON_STAT_POOLS = {
  shotgun: {
    allowed: ['damage', 'ammo', 'reloadSpeed', 'range', 'recoil']
  },
  assault: {
    allowed: ['damage', 'ammo', 'reloadSpeed', 'accuracy', 'fireRate', 'recoil']
  },
  sniper: {
    allowed: ['damage', 'ammo', 'reloadSpeed', 'range', 'accuracy']
  },
  smg: {
    allowed: ['ammo', 'fireRate', 'reloadSpeed', 'mobility', 'recoil', 'accuracy']
  },
  pistol: {
    allowed: ['damage', 'ammo', 'reloadSpeed', 'accuracy', 'fireRate']
  }
};

// Trade-offs obligatoires
const TRADE_OFFS = {
  damage: { stat: 'recoil', ratio: 0.6 },
  fireRate: { stat: 'accuracy', ratio: 0.5 },
  range: { stat: 'mobility', ratio: 0.4 }
};

// Paliers de qualité
const QUALITY_TIERS = {
  common: { min: 0.65, max: 0.75, numStats: 2, color: '#aaaaaa', label: 'Commun' },
  rare: { min: 0.75, max: 0.90, numStats: 3, color: '#4488ff', label: 'Rare' },
  epic: { min: 0.90, max: 1.00, numStats: 4, color: '#aa44ff', label: 'Épique' }
};

function rollQuality() {
  const roll = Math.random();
  if (roll < 0.05) return 'epic';
  if (roll < 0.25) return 'rare';
  return 'common';
}

function getStatLabel(stat) {
  const labels = {
    damage: 'Dégâts',
    ammo: 'Munitions',
    fireRate: 'Cadence',
    accuracy: 'Précision',
    range: 'Portée',
    reloadSpeed: 'Rechargement',
    recoil: 'Recul',
    mobility: 'Mobilité'
  };
  return labels[stat] || stat;
}

export function generateRandomStats(weaponType) {
  const pool = WEAPON_STAT_POOLS[weaponType];
  const budget = WEAPON_BUDGETS[weaponType];
  const quality = rollQuality();
  const qualityConfig = QUALITY_TIERS[quality];
  
  if (!pool) {
    console.error(`Type d'arme inconnu: ${weaponType}`);
    return { bonuses: {}, quality: 'common' };
  }
  
  const minBudget = Math.floor(budget * qualityConfig.min);
  const maxBudget = Math.floor(budget * qualityConfig.max);
  const availableBudget = minBudget + Math.floor(Math.random() * (maxBudget - minBudget + 1));
  
  let remainingBudget = availableBudget;
  const bonuses = {};
  const selectedStats = [];
  
  const numStats = qualityConfig.numStats;
  while (selectedStats.length < numStats && selectedStats.length < pool.allowed.length) {
    const randomStat = pool.allowed[Math.floor(Math.random() * pool.allowed.length)];
    if (!selectedStats.includes(randomStat) && randomStat !== 'recoil') {
      selectedStats.push(randomStat);
    }
  }
  
  selectedStats.forEach((stat, index) => {
    const cost = STAT_COSTS[stat];
    const isLast = index === selectedStats.length - 1;
    
    if (isLast) {
      const value = Math.floor(remainingBudget / cost);
      if (value > 0) {
        bonuses[stat] = {
          value: stat === 'ammo' ? value : value,
          isPercent: stat !== 'ammo',
          label: getStatLabel(stat)
        };
        remainingBudget -= value * cost;
      }
    } else {
      const allocation = remainingBudget * (0.3 + Math.random() * 0.2);
      const value = Math.floor(allocation / cost);
      
      if (value > 0) {
        bonuses[stat] = {
          value: stat === 'ammo' ? value : value,
          isPercent: stat !== 'ammo',
          label: getStatLabel(stat)
        };
        remainingBudget -= value * cost;
      }
    }
    
    if (TRADE_OFFS[stat]) {
      const tradeOff = TRADE_OFFS[stat];
      const malusValue = Math.floor(bonuses[stat].value * tradeOff.ratio);
      
      bonuses[tradeOff.stat] = {
        value: -malusValue,
        isPercent: true,
        label: getStatLabel(tradeOff.stat),
        isNegative: true
      };
    }
  });
  
  if (remainingBudget > 20 && !bonuses.recoil) {
    const recoilReduction = Math.floor(remainingBudget / Math.abs(STAT_COSTS.recoil));
    bonuses.recoil = {
      value: -recoilReduction,
      isPercent: true,
      label: 'Recul',
      isNegative: true
    };
  }
  
  return {
    bonuses,
    quality,
    qualityLabel: qualityConfig.label,
    qualityColor: qualityConfig.color
  };
}

export function formatWeaponStats(statsData) {
  if (!statsData || !statsData.bonuses) return '';
  
  const { bonuses, qualityLabel, qualityColor } = statsData;
  
  const statsText = Object.entries(bonuses)
    .map(([key, data]) => {
      const sign = data.value > 0 ? '+' : '';
      const suffix = data.isPercent ? '%' : '';
      const color = data.isNegative ? '🔴' : '🟢';
      return `${color} ${sign}${data.value}${suffix} ${data.label}`;
    })
    .join(' | ');
  
  return `⭐ ${qualityLabel} | ${statsText}`;
}

export function compareWeaponStats(weapon1Stats, weapon2Stats) {
  if (!weapon1Stats || !weapon2Stats) return 0;
  
  const qualityOrder = { common: 1, rare: 2, epic: 3 };
  const quality1 = qualityOrder[weapon1Stats.quality] || 1;
  const quality2 = qualityOrder[weapon2Stats.quality] || 1;
  
  return quality1 - quality2;
}

// ========================================
// 📜 RECETTES DE CRAFT - TOUTES LES ZONES
// ========================================

export const RECIPES = {
  
  // ========================================
  // 💉 LABORATOIRE - T1 → T2 (10 recettes)
  // ========================================
  lab_serum_vitesse: {
    name: 'Sérum de Vitesse',
    result: 'lab_serum_vitesse',
    ingredients: {
      lab_poudre_catalytique: 1,
      lab_solvant_purifie: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_tonique_force: {
    name: 'Tonique de Force',
    result: 'lab_tonique_force',
    ingredients: {
      lab_cristal_energise: 1,
      lab_gel_stabilisateur: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_tonic_endurance: {
    name: 'Tonic d\'Endurance',
    result: 'lab_tonic_endurance',
    ingredients: {
      lab_cristal_energise: 1,
      lab_poudre_catalytique: 1,
      lab_solvant_purifie: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_elixir_soin: {
    name: 'Élixir de Soin',
    result: 'lab_elixir_soin',
    ingredients: {
      lab_ampoule_enzyme: 1,
      lab_gel_stabilisateur: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_serum_defensif: {
    name: 'Sérum Défensif',
    result: 'lab_serum_defensif',
    ingredients: {
      lab_gel_stabilisateur: 1,
      lab_resine_liant: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_potion_toxique: {
    name: 'Potion Toxique',
    result: 'lab_potion_toxique',
    ingredients: {
      lab_ampoule_enzyme: 1,
      lab_sel_reactif: 1,
      lab_esther_volatile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_injection_energie: {
    name: 'Injection d\'Énergie',
    result: 'lab_injection_energie',
    ingredients: {
      lab_cristal_energise: 1,
      lab_solvant_purifie: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_solution_antitoxique: {
    name: 'Solution Antitoxique',
    result: 'lab_solution_antitoxique',
    ingredients: {
      lab_membrane_filtrante: 1,
      lab_solvant_purifie: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_flasque_explosive: {
    name: 'Flasque Explosive',
    result: 'lab_flasque_explosive',
    ingredients: {
      lab_esther_volatile: 1,
      lab_resine_liant: 1,
      lab_sel_reactif: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  lab_tonic_mental: {
    name: 'Tonic Mental',
    result: 'lab_tonic_mental',
    ingredients: {
      lab_poudre_catalytique: 1,
      lab_membrane_filtrante: 1,
      lab_vial_sterile: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // 💉 LABORATOIRE - T2 → T3 (6 recettes)
  // ========================================
  lab_serum_titan: {
    name: 'Sérum du Titan',
    result: 'lab_serum_titan',
    ingredients: {
      lab_tonique_force: 1,
      lab_serum_defensif: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  lab_elixir_vitesse_avance: {
    name: 'Élixir Vitesse Avancé',
    result: 'lab_elixir_vitesse_avance',
    ingredients: {
      lab_serum_vitesse: 1,
      lab_tonic_endurance: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  lab_serum_regen_totale: {
    name: 'Sérum Régén Totale',
    result: 'lab_serum_regen_totale',
    ingredients: {
      lab_elixir_soin: 1,
      lab_tonic_endurance: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  lab_solution_explosive_controlee: {
    name: 'Solution Explosive Contrôlée',
    result: 'lab_solution_explosive_controlee',
    ingredients: {
      lab_flasque_explosive: 1,
      lab_potion_toxique: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  lab_injection_neuro_boost: {
    name: 'Injection Neuro-Boost',
    result: 'lab_injection_neuro_boost',
    ingredients: {
      lab_tonic_mental: 1,
      lab_injection_energie: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  lab_tonic_survie: {
    name: 'Tonic de Survie',
    result: 'lab_tonic_survie',
    ingredients: {
      lab_solution_antitoxique: 1,
      lab_serum_defensif: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🍔 FAST-FOOD - T1 → T2 (10 recettes)
  // ========================================
  ff_soupe_rustique: {
    name: 'Soupe Rustique',
    result: 'ff_soupe_rustique',
    ingredients: {
      ff_tomate: 1,
      ff_carotte: 1,
      ff_oignon: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_ragout_boeuf: {
    name: 'Ragoût de Bœuf',
    result: 'ff_ragout_boeuf',
    ingredients: {
      ff_boeuf: 1,
      ff_oignon: 1,
      ff_pomme_terre: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_curry_poulet: {
    name: 'Curry de Poulet',
    result: 'ff_curry_poulet',
    ingredients: {
      ff_poulet: 1,
      ff_riz: 1,
      ff_tomate: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_pates_creme: {
    name: 'Pâtes à la Crème',
    result: 'ff_pates_creme',
    ingredients: {
      ff_pates: 1,
      ff_lait: 1,
      ff_oignon: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_omelette: {
    name: 'Omelette Campagnarde',
    result: 'ff_omelette',
    ingredients: {
      ff_oeuf: 1,
      ff_pomme_terre: 1,
      ff_oignon: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_carottes_sautees: {
    name: 'Carottes Sautées',
    result: 'ff_carottes_sautees',
    ingredients: {
      ff_carotte: 1,
      ff_riz: 1,
      ff_lait: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_burger_fermier: {
    name: 'Burger Fermier',
    result: 'ff_burger_fermier',
    ingredients: {
      ff_boeuf: 1,
      ff_oeuf: 1,
      ff_tomate: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_carbonara: {
    name: 'Pâtes Carbonara',
    result: 'ff_carbonara',
    ingredients: {
      ff_pates: 1,
      ff_oeuf: 1,
      ff_lait: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_poulet_roti: {
    name: 'Poulet Rôti',
    result: 'ff_poulet_roti',
    ingredients: {
      ff_poulet: 1,
      ff_pomme_terre: 1,
      ff_oignon: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ff_riz_saute: {
    name: 'Riz Sauté',
    result: 'ff_riz_saute',
    ingredients: {
      ff_riz: 1,
      ff_carotte: 1,
      ff_poulet: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // 🍔 FAST-FOOD - T2 → T3 (5 recettes)
  // ========================================
  ff_menu_energie: {
    name: 'Menu Énergie',
    result: 'ff_menu_energie',
    ingredients: {
      ff_curry_poulet: 1,
      ff_riz_saute: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ff_menu_force: {
    name: 'Menu Force',
    result: 'ff_menu_force',
    ingredients: {
      ff_burger_fermier: 1,
      ff_ragout_boeuf: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ff_menu_paysan: {
    name: 'Menu Paysan',
    result: 'ff_menu_paysan',
    ingredients: {
      ff_soupe_rustique: 1,
      ff_omelette: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ff_menu_pates: {
    name: 'Menu Pâtes Party',
    result: 'ff_menu_pates',
    ingredients: {
      ff_pates_creme: 1,
      ff_carbonara: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ff_menu_royal: {
    name: 'Menu Royal',
    result: 'ff_menu_royal',
    ingredients: {
      ff_poulet_roti: 1,
      ff_burger_fermier: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🧱 CHANTIER - T1 → T2 (10 recettes)
  // ========================================
  ch_plancher_renforce: {
    name: 'Plancher Renforcé',
    result: 'ch_plancher_renforce',
    ingredients: {
      ch_poutre: 1,
      ch_vis: 1,
      ch_ferraille: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_beton_brut: {
    name: 'Béton Brut',
    result: 'ch_beton_brut',
    ingredients: {
      ch_ciment: 1,
      ch_sable: 1,
      ch_tige_metal: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_panneau_metal: {
    name: 'Panneau Métal',
    result: 'ch_panneau_metal',
    ingredients: {
      ch_plaque_metal: 1,
      ch_ferraille: 1,
      ch_vis: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_cable_electrique: {
    name: 'Câble Électrique',
    result: 'ch_cable_electrique',
    ingredients: {
      ch_fil_cuivre: 1,
      ch_vis: 1,
      ch_ferraille: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_charniere: {
    name: 'Charnière Renforcée',
    result: 'ch_charniere',
    ingredients: {
      ch_plaque_metal: 1,
      ch_tige_metal: 1,
      ch_vis: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_mur_brique: {
    name: 'Mur de Brique',
    result: 'ch_mur_brique',
    ingredients: {
      ch_brique: 1,
      ch_ciment: 1,
      ch_sable: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_support_structural: {
    name: 'Support Structural',
    result: 'ch_support_structural',
    ingredients: {
      ch_poutre: 1,
      ch_tige_metal: 1,
      ch_ferraille: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_equerre_renforcee: {
    name: 'Équerre Renforcée',
    result: 'ch_equerre_renforcee',
    ingredients: {
      ch_equerre: 1,
      ch_tige_metal: 1,
      ch_vis: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_module_electrique: {
    name: 'Module Électrique',
    result: 'ch_module_electrique',
    ingredients: {
      ch_fil_cuivre: 1,
      ch_plaque_metal: 1,
      ch_tige_metal: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  ch_kit_reparation: {
    name: 'Kit Réparation',
    result: 'ch_kit_reparation',
    ingredients: {
      ch_brique: 1,
      ch_ferraille: 1,
      ch_vis: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // 🧱 CHANTIER - T2 → T3 (9 recettes)
  // ========================================
  ch_mur_renforce: {
    name: 'Mur Renforcé',
    result: 'ch_mur_renforce',
    ingredients: {
      ch_beton_brut: 1,
      ch_mur_brique: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_porte_blindee: {
    name: 'Porte Blindée',
    result: 'ch_porte_blindee',
    ingredients: {
      ch_charniere: 1,
      ch_panneau_metal: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_reseau_electrique: {
    name: 'Réseau Électrique',
    result: 'ch_reseau_electrique',
    ingredients: {
      ch_module_electrique: 1,
      ch_cable_electrique: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_toiture_isolee: {
    name: 'Toiture Isolée',
    result: 'ch_toiture_isolee',
    ingredients: {
      ch_mur_brique: 1,
      ch_beton_brut: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_charpente: {
    name: 'Charpente Maîtresse',
    result: 'ch_charpente',
    ingredients: {
      ch_support_structural: 1,
      ch_equerre_renforcee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_ventilation: {
    name: 'Ventilation Mécanique',
    result: 'ch_ventilation',
    ingredients: {
      ch_cable_electrique: 1,
      ch_equerre_renforcee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_plancher_technique: {
    name: 'Plancher Technique',
    result: 'ch_plancher_technique',
    ingredients: {
      ch_plancher_renforce: 1,
      ch_support_structural: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_systeme_hydraulique: {
    name: 'Système Hydraulique',
    result: 'ch_systeme_hydraulique',
    ingredients: {
      ch_tige_metal: 1,
      ch_charniere: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  ch_escalier: {
    name: 'Escalier Renforcé',
    result: 'ch_escalier',
    ingredients: {
      ch_plancher_renforce: 1,
      ch_poutre: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🧵 BOUTIQUE COUTURE - T1 → T2 (10 recettes)
  // ========================================
  bc_baskets: {
    name: 'Baskets Légères',
    result: 'bc_baskets',
    ingredients: {
      bc_semelle: 1,
      bc_tissu_coton: 1,
      bc_elastique: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_bottes: {
    name: 'Bottes Renforcées',
    result: 'bc_bottes',
    ingredients: {
      bc_semelle: 1,
      bc_tissu_cuir: 1,
      bc_plaque_renfort: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_pantalon_cargo: {
    name: 'Pantalon Cargo',
    result: 'bc_pantalon_cargo',
    ingredients: {
      bc_tissu_coton: 1,
      bc_bouton_metal: 1,
      bc_fermeture: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_pantalon_tactique: {
    name: 'Pantalon Tactique',
    result: 'bc_pantalon_tactique',
    ingredients: {
      bc_tissu_cuir: 1,
      bc_fil_renforce: 1,
      bc_plaque_renfort: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_veste_legere: {
    name: 'Veste Légère',
    result: 'bc_veste_legere',
    ingredients: {
      bc_tissu_coton: 1,
      bc_fermeture: 1,
      bc_bouton_metal: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_veste_blindee: {
    name: 'Veste Blindée',
    result: 'bc_veste_blindee',
    ingredients: {
      bc_tissu_cuir: 1,
      bc_plaque_renfort: 1,
      bc_fil_renforce: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_sac_leger: {
    name: 'Sac Léger',
    result: 'bc_sac_leger',
    ingredients: {
      bc_tissu_coton: 1,
      bc_fermeture: 1,
      bc_elastique: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_sac_renforce: {
    name: 'Sac Renforcé',
    result: 'bc_sac_renforce',
    ingredients: {
      bc_tissu_cuir: 1,
      bc_fil_renforce: 1,
      bc_rembourrage: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_casquette: {
    name: 'Casquette',
    result: 'bc_casquette',
    ingredients: {
      bc_tissu_coton: 1,
      bc_teinture: 1,
      bc_bouton_metal: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  bc_casque: {
    name: 'Casque Renforcé',
    result: 'bc_casque',
    ingredients: {
      bc_tissu_cuir: 1,
      bc_plaque_renfort: 1,
      bc_rembourrage: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // 🧵 BOUTIQUE COUTURE - T2 → T3 (5 recettes)
  // ========================================
  bc_bottes_voyageur: {
    name: 'Bottes de Voyageur',
    result: 'bc_bottes_voyageur',
    ingredients: {
      bc_baskets: 1,
      bc_bottes: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bc_pantalon_isolant: {
    name: 'Pantalon Isolant',
    result: 'bc_pantalon_isolant',
    ingredients: {
      bc_pantalon_cargo: 1,
      bc_pantalon_tactique: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bc_veste_anti_acide: {
    name: 'Veste Anti-Acide',
    result: 'bc_veste_anti_acide',
    ingredients: {
      bc_veste_legere: 1,
      bc_veste_blindee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bc_casque_filtrant: {
    name: 'Casque Filtrant',
    result: 'bc_casque_filtrant',
    ingredients: {
      bc_casquette: 1,
      bc_casque: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bc_sac_expedition: {
    name: 'Sac d\'Expédition',
    result: 'bc_sac_expedition',
    ingredients: {
      bc_sac_leger: 1,
      bc_sac_renforce: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🏝️ OASIS - T1 → T2 (10 recettes)
  // ========================================
  oa_jus_tropical: {
    name: 'Jus Tropical',
    result: 'oa_jus_tropical',
    ingredients: {
      oa_mangue: 1,
      oa_ananas: 1,
      oa_orange: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_citronnade: {
    name: 'Citronnade',
    result: 'oa_citronnade',
    ingredients: {
      oa_citron: 1,
      oa_canne_sucre: 1,
      oa_pasteque: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_nectar_datte: {
    name: 'Nectar de Datte',
    result: 'oa_nectar_datte',
    ingredients: {
      oa_datte: 1,
      oa_figue: 1,
      oa_canne_sucre: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_smoothie_defensif: {
    name: 'Smoothie Défensif',
    result: 'oa_smoothie_defensif',
    ingredients: {
      oa_figue: 1,
      oa_noix_coco: 1,
      oa_grenade: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_punch_vitamine: {
    name: 'Punch Vitaminé',
    result: 'oa_punch_vitamine',
    ingredients: {
      oa_orange: 1,
      oa_grenade: 1,
      oa_pasteque: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_jus_detox: {
    name: 'Jus Détox',
    result: 'oa_jus_detox',
    ingredients: {
      oa_citron: 1,
      oa_ananas: 1,
      oa_grenade: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_cocktail_oasis: {
    name: 'Cocktail Oasis',
    result: 'oa_cocktail_oasis',
    ingredients: {
      oa_mangue: 1,
      oa_noix_coco: 1,
      oa_datte: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_limonade: {
    name: 'Limonade Explosive',
    result: 'oa_limonade',
    ingredients: {
      oa_citron: 1,
      oa_orange: 1,
      oa_canne_sucre: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_nectar_guerrier: {
    name: 'Nectar Guerrier',
    result: 'oa_nectar_guerrier',
    ingredients: {
      oa_ananas: 1,
      oa_datte: 1,
      oa_figue: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  oa_eau_coco: {
    name: 'Eau de Coco Fraîche',
    result: 'oa_eau_coco',
    ingredients: {
      oa_noix_coco: 1,
      oa_pasteque: 1,
      oa_mangue: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // 🏝️ OASIS - T2 → T3 (5 recettes)
  // ========================================
  oa_elixir_oasis: {
    name: 'Élixir Oasis',
    result: 'oa_elixir_oasis',
    ingredients: {
      oa_cocktail_oasis: 1,
      oa_smoothie_defensif: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  oa_boost_tropical: {
    name: 'Boost Tropical',
    result: 'oa_boost_tropical',
    ingredients: {
      oa_jus_tropical: 1,
      oa_punch_vitamine: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  oa_nectar_titan: {
    name: 'Nectar du Titan',
    result: 'oa_nectar_titan',
    ingredients: {
      oa_nectar_guerrier: 1,
      oa_nectar_datte: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  oa_potion_purifiante: {
    name: 'Potion Purifiante',
    result: 'oa_potion_purifiante',
    ingredients: {
      oa_jus_detox: 1,
      oa_eau_coco: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  oa_cocktail_velocite: {
    name: 'Cocktail Vélocité',
    result: 'oa_cocktail_velocite',
    ingredients: {
      oa_limonade: 1,
      oa_citronnade: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🔫 BASE MILITAIRE - T0 → T1 (10 recettes)
  // ========================================
  bm_pompe_lourd: {
    name: 'Pompe Lourd',
    result: 'bm_pompe_lourd',
    ingredients: {
      bm_canon: 1,
      bm_percuteur: 1,
      bm_crosse: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_pompe_tactique: {
    name: 'Pompe Tactique',
    result: 'bm_pompe_tactique',
    ingredients: {
      bm_canon: 1,
      bm_gachette: 1,
      bm_poignee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_assault_standard: {
    name: 'Assault Standard',
    result: 'bm_assault_standard',
    ingredients: {
      bm_canon: 1,
      bm_chargeur: 1,
      bm_crosse: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_assault_rapide: {
    name: 'Assault Rapide',
    result: 'bm_assault_rapide',
    ingredients: {
      bm_percuteur: 1,
      bm_gachette: 1,
      bm_poignee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_sniper_lourd: {
    name: 'Sniper Lourd',
    result: 'bm_sniper_lourd',
    ingredients: {
      bm_canon: 1,
      bm_poudre: 1,
      bm_crosse: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_sniper_tacticien: {
    name: 'Sniper Tacticien',
    result: 'bm_sniper_tacticien',
    ingredients: {
      bm_canon: 1,
      bm_viseur: 1,
      bm_silencieux: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_smg_compact: {
    name: 'SMG Compact',
    result: 'bm_smg_compact',
    ingredients: {
      bm_percuteur: 1,
      bm_chargeur: 1,
      bm_poignee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_smg_controle: {
    name: 'SMG Contrôle',
    result: 'bm_smg_controle',
    ingredients: {
      bm_gachette: 1,
      bm_crosse: 1,
      bm_viseur: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_pistol_lourd: {
    name: 'Pistolet Lourd',
    result: 'bm_pistol_lourd',
    ingredients: {
      bm_poudre: 1,
      bm_percuteur: 1,
      bm_poignee: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  bm_pistol_rapide: {
    name: 'Pistolet Rapide',
    result: 'bm_pistol_rapide',
    ingredients: {
      bm_gachette: 1,
      bm_chargeur: 1,
      bm_ressort: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  // ========================================
  // 🔫 BASE MILITAIRE - T1 → T2 (5 recettes)
  // ========================================
  bm_pompe_improved: {
    name: 'Pompe Amélioré',
    result: 'bm_pompe_improved',
    ingredients: {
      bm_pompe_lourd: 1,
      bm_pompe_tactique: 1
    },
    craftTime: 15,
    station: 'home'
  },
  
  bm_assault_improved: {
    name: 'Assault Amélioré',
    result: 'bm_assault_improved',
    ingredients: {
      bm_assault_standard: 1,
      bm_assault_rapide: 1
    },
    craftTime: 15,
    station: 'home'
  },
  
  bm_sniper_improved: {
    name: 'Sniper Amélioré',
    result: 'bm_sniper_improved',
    ingredients: {
      bm_sniper_lourd: 1,
      bm_sniper_tacticien: 1
    },
    craftTime: 15,
    station: 'home'
  },
  
  bm_smg_improved: {
    name: 'SMG Amélioré',
    result: 'bm_smg_improved',
    ingredients: {
      bm_smg_compact: 1,
      bm_smg_controle: 1
    },
    craftTime: 15,
    station: 'home'
  },
  
  bm_pistol_improved: {
    name: 'Pistolet Amélioré',
    result: 'bm_pistol_improved',
    ingredients: {
      bm_pistol_lourd: 1,
      bm_pistol_rapide: 1
    },
    craftTime: 15,
    station: 'home'
  },
  
  // ========================================
  // 🔫 BASE MILITAIRE - T2 → T3 (5 recettes - STATS RNG)
  // ========================================
  bm_pompe_elite: {
    name: 'Pompe Elite',
    result: 'bm_pompe_elite',
    ingredients: {
      bm_pompe_improved: 2
    },
    craftTime: 20,
    station: 'home',
    randomStats: true
  },
  
  bm_assault_pro: {
    name: 'Assault Pro',
    result: 'bm_assault_pro',
    ingredients: {
      bm_assault_improved: 2
    },
    craftTime: 20,
    station: 'home',
    randomStats: true
  },
  
  bm_sniper_maitre: {
    name: 'Sniper Maître',
    result: 'bm_sniper_maitre',
    ingredients: {
      bm_sniper_improved: 2
    },
    craftTime: 20,
    station: 'home',
    randomStats: true
  },
  
  bm_smg_apex: {
    name: 'SMG Apex',
    result: 'bm_smg_apex',
    ingredients: {
      bm_smg_improved: 2
    },
    craftTime: 20,
    station: 'home',
    randomStats: true
  },
  
  bm_pistol_ultime: {
    name: 'Pistolet Ultime',
    result: 'bm_pistol_ultime',
    ingredients: {
      bm_pistol_improved: 2
    },
    craftTime: 20,
    station: 'home',
    randomStats: true
  },
  
  // ========================================
  // ⚙️ USINE - T0 → T1 (6 recettes)
  // ========================================
  us_gps: {
    name: 'GPS',
    result: 'us_gps',
    ingredients: {
      us_puce: 1,
      us_antenne: 1,
      us_ecran: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  us_lampe: {
    name: 'Lampe Torche',
    result: 'us_lampe',
    ingredients: {
      us_batterie: 1,
      us_circuit: 1,
      us_lentille: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  us_radio: {
    name: 'Radio',
    result: 'us_radio',
    ingredients: {
      us_puce: 1,
      us_antenne: 1,
      us_batterie: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  us_radar: {
    name: 'Radar',
    result: 'us_radar',
    ingredients: {
      us_puce: 1,
      us_ecran: 1,
      us_circuit: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  us_tablette: {
    name: 'Tablette',
    result: 'us_tablette',
    ingredients: {
      us_antenne: 1,
      us_ecran: 1,
      us_batterie: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  us_jumelles: {
    name: 'Jumelles',
    result: 'us_jumelles',
    ingredients: {
      us_lentille: 2,
      us_circuit: 1
    },
    craftTime: 5,
    station: 'home'
  },
  
  // ========================================
  // ⚙️ USINE - T1 → T2 (3 recettes)
  // ========================================
  us_systeme_navigation: {
    name: 'Système Navigation',
    result: 'us_systeme_navigation',
    ingredients: {
      us_gps: 1,
      us_radar: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  us_kit_vision: {
    name: 'Kit Vision Nocturne',
    result: 'us_kit_vision',
    ingredients: {
      us_jumelles: 1,
      us_lampe: 1
    },
    craftTime: 10,
    station: 'home'
  },
  
  us_terminal_com: {
    name: 'Terminal Communication',
    result: 'us_terminal_com',
    ingredients: {
      us_radio: 1,
      us_tablette: 1
    },
    craftTime: 10,
    station: 'home'
  }
};

// ========================================
// 🔧 FONCTIONS DE CRAFT
// ========================================

/**
 * Vérifie si le joueur est près d'une station de craft
 */
export function isNearCraftingStation(player, props) {
  return props.some(prop => {
    if (prop.type !== 'crafting_station') return false;
    
    const dx = player.x - prop.x;
    const dy = player.y - prop.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < 100;
  });
}

/**
 * Vérifie si le joueur peut craft une recette
 */
export function canCraft(inventory, recipeId) {
  const recipe = RECIPES[recipeId];
  if (!recipe) return false;
  
  for (const [itemType, needed] of Object.entries(recipe.ingredients)) {
    let found = 0;
    
    for (const slot of inventory) {
      if (slot && slot.type === itemType) {
        found++;
      }
    }
    
    if (found < needed) return false;
  }
  
  return true;
}

/**
 * Craft un item (avec RNG si T3 arme)
 */
export function craftItem(inventory, recipeId) {
  const recipe = RECIPES[recipeId];
  if (!canCraft(inventory, recipeId)) return false;
  
  // Consommer ingrédients
  for (const [itemType, needed] of Object.entries(recipe.ingredients)) {
    let toRemove = needed;
    
    for (let i = 0; i < inventory.length && toRemove > 0; i++) {
      const slot = inventory[i];
      if (slot && slot.type === itemType) {
        inventory[i] = null;
        toRemove--;
      }
    }
  }
  
  // Créer l'item crafté
  const craftedItem = {
    type: recipe.result,
    count: 1
  };
  
  // Si T3 avec stats aléatoires
  if (recipe.randomStats) {
    const itemDef = ITEMS[recipe.result];
    const itemType = itemDef.weaponType || itemDef.equipmentType;
    
    craftedItem.randomStats = generateRandomStats(itemType);
    
    console.log(`🎲 ${itemDef.name} craftée :`);
    console.log(formatWeaponStats(craftedItem.randomStats));
  }
  
  // Ajouter à l'inventaire
  const emptySlot = inventory.findIndex(slot => slot === null);
  if (emptySlot === -1) return false;
  
  inventory[emptySlot] = craftedItem;
  return true;
}

/**
 * Récupère les recettes craftables
 */
export function getCraftableRecipes(inventory, station = 'home') {
  const craftable = [];
  
  for (const [id, recipe] of Object.entries(RECIPES)) {
    if (recipe.station === station && canCraft(inventory, id)) {
      craftable.push({ id, ...recipe });
    }
  }
  
  return craftable;
}

/**
 * Récupère TOUTES les recettes d'une station
 */
export function getStationRecipes(station = 'home') {
  const recipes = [];
  
  for (const [id, recipe] of Object.entries(RECIPES)) {
    if (recipe.station === station) {
      recipes.push({ id, ...recipe });
    }
  }
  
  return recipes;
}

/**
 * Compte le nombre d'items d'un type dans l'inventaire
 */
export function countItem(inventory, itemType) {
  let count = 0;
  for (const slot of inventory) {
    if (slot && slot.type === itemType) {
      count++;
    }
  }
  return count;
}