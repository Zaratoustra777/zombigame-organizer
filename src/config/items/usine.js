// src/config/items/usine.js

// ========================================
// ⚙️ USINE - TOUS LES ITEMS
// ========================================

// ========================================
// TIER 1 - COMPOSANTS ÉLECTRONIQUES (6 items)
// ========================================

export const us_puce = {
  name: 'Puce Électronique',
  category: 'us_t0',
  tier: 0,
  color: '#44aa44',
  icon: 'us_puce',
  description: 'Processeur'
};

export const us_antenne = {
  name: 'Antenne',
  category: 'us_t0',
  tier: 0,
  color: '#888888',
  icon: 'us_antenne',
  description: 'Transmission'
};

export const us_ecran = {
  name: 'Écran',
  category: 'us_t0',
  tier: 0,
  color: '#4488ff',
  icon: 'us_ecran',
  description: 'Affichage'
};

export const us_batterie = {
  name: 'Batterie',
  category: 'us_t0',
  tier: 0,
  color: '#ffaa00',
  icon: 'us_batterie',
  description: 'Énergie'
};

export const us_circuit = {
  name: 'Circuit',
  category: 'us_t0',
  tier: 0,
  color: '#44ff44',
  icon: 'us_circuit',
  description: 'Carte électronique'
};

export const us_lentille = {
  name: 'Lentille',
  category: 'us_t0',
  tier: 0,
  color: '#aaccff',
  icon: 'us_lentille',
  description: 'Optique'
};

// ========================================
// TIER 2 - GADGETS DE BASE (6 items)
// ========================================

export const us_gps = {
  name: 'GPS',
  category: 'us_t1',
  tier: 1,
  color: '#4488ff',
  icon: 'us_gps',
  effect: {
    type: 'mapReveal',
    range: 'full' // Voir carte ville entière
  },
  description: 'Voir carte ville entière'
};

export const us_lampe = {
  name: 'Lampe Torche',
  category: 'us_t1',
  tier: 1,
  color: '#ffff88',
  icon: 'us_lampe',
  effect: {
    type: 'nightVision',
    range: 15 // Vision nuit 15m
  },
  description: 'Vision nuit 15m'
};

export const us_radio = {
  name: 'Radio',
  category: 'us_t1',
  tier: 1,
  color: '#88aa88',
  icon: 'us_radio',
  effect: {
    type: 'globalChat' // Tchat global
  },
  description: 'Tchat global'
};

export const us_radar = {
  name: 'Radar',
  category: 'us_t1',
  tier: 1,
  color: '#44ff44',
  icon: 'us_radar',
  effect: {
    type: 'playerDetection',
    range: 200 // Joueurs minimap 200m
  },
  description: 'Joueurs minimap 200m'
};

export const us_tablette = {
  name: 'Tablette',
  category: 'us_t1',
  tier: 1,
  color: '#666666',
  icon: 'us_tablette',
  effect: {
    type: 'mobileTrade' // Trade mobile
  },
  description: 'Trade mobile'
};

export const us_jumelles = {
  name: 'Jumelles',
  category: 'us_t1',
  tier: 1,
  color: '#555555',
  icon: 'us_jumelles',
  effect: {
    type: 'zoom',
    value: 3 // Dezoom ×3
  },
  description: 'Dezoom ×3'
};

// ========================================
// TIER 3 - GADGETS AVANCÉS (3 items)
// ========================================

export const us_systeme_navigation = {
  name: 'Système Navigation',
  category: 'us_t2',
  tier: 2,
  color: '#4488ff',
  icon: 'us_systeme_navigation',
  effect: {
    type: 'multi',
    mapFull: true, // Map complète
    playersVisible: true, // Joueurs visibles
    ping: true // Ping alliés
  },
  description: 'Map complète + joueurs + ping'
};

export const us_kit_vision = {
  name: 'Kit Vision Nocturne',
  category: 'us_t2',
  tier: 2,
  color: '#44ff44',
  icon: 'us_kit_vision',
  effect: {
    type: 'multi',
    zoom: 5, // Dezoom ×5
    nightVision: 'infrared' // Vision infrarouge
  },
  description: 'Dezoom ×5 + vision infrarouge'
};

export const us_terminal_com = {
  name: 'Terminal Communication',
  category: 'us_t2',
  tier: 2,
  color: '#88aaaa',
  icon: 'us_terminal_com',
  effect: {
    type: 'multi',
    globalChat: true, // Tchat global
    mobileTrade: true, // Trade mobile
    privateMsg: true // Messages privés
  },
  description: 'Tchat + trade + messages privés'
};