// src/config/dungeons.js - VERSION ARÈNES COMPLÈTE

// ========================================
// 🏟️ CONFIGURATION DES DONJONS ARÈNES
// ========================================

// Liste des zombies disponibles (tous sauf giant)
const ARENA_ZOMBIE_TYPES = [
  'basic', 'crawler', 'hungry', 'runner', 'spitter',
  'scavenger', 'bloater', 'infected', 'mimic', 'parasite',
  'hurleur', 'necromancer', 'electric', 'vaporeux', 
  'burned', 'gonfle', 'mutant', 'tank'
];

// Fonction pour générer zombies aléatoires
function generateRandomEnemies(count, playerCount = 1) {
  // Variation aléatoire : +0, +1 ou +2 zombies
  const variation = Math.floor(Math.random() * 3); // 0, 1 ou 2
  const totalCount = count + variation;
  
  const enemies = {};
  
  for (let i = 0; i < totalCount; i++) {
    const randomType = ARENA_ZOMBIE_TYPES[Math.floor(Math.random() * ARENA_ZOMBIE_TYPES.length)];
    enemies[randomType] = (enemies[randomType] || 0) + 1;
  }
  
  // Convertir en array pour config
  return Object.entries(enemies).map(([type, count]) => ({
    type,
    count,
    hpMultiplier: playerCount // x2 HP si 2 joueurs, x3 si 3, etc.
  }));
}

// Génération dynamique des vagues pour une arène
function generateArenaWaves(bossType, playerCount = 1) {
  const waves = [
    {
      wave: 1,
      enemies: generateRandomEnemies(5, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 2,
      enemies: generateRandomEnemies(6, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 3,
      enemies: generateRandomEnemies(8, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 4,
      enemies: generateRandomEnemies(10, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 5,
      enemies: generateRandomEnemies(12, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 6,
      enemies: generateRandomEnemies(15, playerCount),
      lootChance: 0.4,
      lootTier: 1
    },
    {
      wave: 7,
      enemies: generateRandomEnemies(8, playerCount), // Boss + zombies
      boss: bossType,
      bossHpMultiplier: playerCount,
      lootChance: 1.0, // Boss drop garanti
      bossLootChance: 0.1, // 10% chance T2
      lootTier: 2
    }
  ];
  
  return waves;
}

export const DUNGEON_CONFIGS = {
  // ===== FAST-FOOD ARENA =====
  fastfood: {
    name: '🍔 Fast-Food Arena',
    type: 'arena',
    tier: 1,
    lootCategory: 'ff', // Fast-Food items
    maxPlayers: 4,
    generateWaves: (playerCount = 1) => generateArenaWaves('gerant', playerCount),
    get waves() {
      return this.generateWaves(1); // Default 1 joueur
    }
  },

  // ===== CHANTIER ARENA =====
  chantier: {
    name: '🧱 Chantier Arena',
    type: 'arena',
    tier: 1,
    lootCategory: 'ch', // Chantier items
    maxPlayers: 4,
    generateWaves: (playerCount = 1) => generateArenaWaves('macon', playerCount),
    get waves() {
      return this.generateWaves(1);
    }
  },

  // ===== BOUTIQUE ARENA =====
  boutique: {
    name: '🧵 Boutique Arena',
    type: 'arena',
    tier: 1,
    lootCategory: 'bc', // Boutique items
    maxPlayers: 4,
    generateWaves: (playerCount = 1) => generateArenaWaves('consommatrice', playerCount),
    get waves() {
      return this.generateWaves(1);
    }
  },

  // ===== OASIS ARENA =====
  oasis: {
    name: '🏝️ Oasis Arena',
    type: 'arena',
    tier: 1,
    lootCategory: 'oa', // Oasis items
    maxPlayers: 4,
    generateWaves: (playerCount = 1) => generateArenaWaves('pecheur', playerCount),
    get waves() {
      return this.generateWaves(1);
    }
  },

  // ===== DONJONS LAYOUT (Désactivés) =====
  labo: {
    name: '💉 Laboratoire',
    type: 'dungeon_layout',
    tier: 2,
    lootCategory: 'lab',
    maxPlayers: 4,
    waves: []
  },

  ferme: {
    name: '🌾 Ferme Abandonnée',
    type: 'dungeon_layout',
    tier: 2,
    lootCategory: 'fm',
    maxPlayers: 4,
    waves: []
  },

  militaire: {
    name: '🔫 Base Militaire',
    type: 'dungeon_layout',
    tier: 3,
    lootCategory: 'bm',
    maxPlayers: 4,
    waves: []
  },

  usine: {
    name: '⚙️ Usine Maudite',
    type: 'dungeon_layout',
    tier: 3,
    lootCategory: 'us',
    maxPlayers: 4,
    waves: []
  }
};

// ========================================
// 🎲 SYSTÈME DE LOOT PAR CATÉGORIE
// ========================================

// Fonction pour générer loot d'une vague
export function generateWaveLoot(dungeonType, tier, playerCount = 1) {
  const config = DUNGEON_CONFIGS[dungeonType];
  if (!config) return null;
  
  const category = config.lootCategory;
  const itemCount = Math.min(5, 2 + playerCount); // 2-5 items selon nb joueurs
  
  return {
    category,
    tier,
    count: itemCount
  };
}

// Fonction pour générer loot boss
export function generateBossLoot(dungeonType, playerCount = 1) {
  const config = DUNGEON_CONFIGS[dungeonType];
  if (!config) return null;
  
  const category = config.lootCategory;
  const hasTier2 = Math.random() < 0.1; // 10% chance T2
  
  const loot = {
    tier1: {
      category,
      tier: 1,
      count: 3 + playerCount // 4-7 items T1
    }
  };
  
  if (hasTier2) {
    loot.tier2 = {
      category,
      tier: 2,
      count: 1 + Math.floor(playerCount / 2) // 1-3 items T2
    };
  }
  
  return loot;
}

// ========================================
// 🎮 UTILITAIRES
// ========================================

// Obtenir nombre de joueurs actifs (pour l'instant hardcodé à 1)
export function getActivePlayerCount() {
  // TODO: Implémenter système multijoueur
  return 1;
}

// Créer instance d'arène avec scaling joueurs
export function createArenaInstance(dungeonType, playerCount = 1) {
  const config = DUNGEON_CONFIGS[dungeonType];
  if (!config || config.type !== 'arena') return null;
  
  // Limiter à 4 joueurs max
  const finalPlayerCount = Math.min(playerCount, config.maxPlayers);
  
  return {
    ...config,
    playerCount: finalPlayerCount,
    waves: config.generateWaves(finalPlayerCount)
  };
}