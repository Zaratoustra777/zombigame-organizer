// ========================================
// 💀 DÉFINITION DES 8 BOSS DU JEU
// ========================================

export const BOSS_TYPES = {
  // ========================================
  // ⭐ BOSS FACILES (Early Game)
  // ========================================
  
  // 1. LE MAÇON (construction)
  macon: {
    name: 'Le Maçon du Chantier',
    hp: 600,
    maxHp: 600,
    speed: 80,
    damage: 25,
    color: '#cd853f',     // Marron sable
    size: 48,
    attackRange: 100,
    patterns: ['charge', 'shockwave'],
    phase: 1,
    difficulty: 'easy'
  },

  // 2. LE GÉRANT (fast-food)
  gerant: {
    name: 'Le Gérant du Fast-Food',
    hp: 700,
    maxHp: 700,
    speed: 60,
    damage: 20,
    color: '#ff4500',     // Orange feu
    size: 52,
    attackRange: 400,
    patterns: ['throw_burgers', 'summon_servants'],
    phase: 1,
    enrageAt: 0.5,        // Enrage à 50% HP
    difficulty: 'easy'
  },

  // 3. LA CONSOMMATRICE (shopping)
  consommatrice: {
    name: 'La Consommatrice',
    hp: 650,
    maxHp: 650,
    speed: 100,
    damage: 18,
    color: '#ff69b4',     // Rose
    size: 40,
    attackRange: 200,
    patterns: ['drain_life', 'phase_change'],
    phase: 1,
    phases: 3,            // 3 phases de transformation
    difficulty: 'easy'
  },

  // 4. LE PÊCHEUR (rivière)
  pecheur: {
    name: 'Le Pêcheur Putride',
    hp: 700,
    maxHp: 700,
    speed: 70,
    damage: 22,
    color: '#20b2aa',     // Turquoise
    size: 44,
    attackRange: 500,
    patterns: ['hook', 'water_hands'],
    weakToFire: true,     // Faiblesse au feu (non implémenté)
    difficulty: 'easy'
  },

  // ========================================
  // ⚠️ BOSS DIFFICILES (Late Game)
  // ========================================
  
  // 5. LE COLONEL (militaire)
  colonel: {
    name: 'Le Colonel',
    hp: 1800,
    maxHp: 1800,
    speed: 100,
    damage: 45,
    color: '#556b2f',     // Vert militaire
    size: 48,
    attackRange: 700,
    patterns: ['auto_fire', 'explosive_strike', 'grenade_rain'],
    immuneToStun: true,   // Immunité stun (non implémenté)
    armor: 0.3,           // 30% réduction dégâts (NON IMPLÉMENTÉ)
    difficulty: 'hard'
  },

  // 6. LE SCIENTIFIQUE (laboratoire)
  scientifique: {
    name: 'Le Scientifique Fou',
    hp: 1600,
    maxHp: 1600,
    speed: 120,
    damage: 40,
    color: '#9370db',     // Violet
    size: 44,
    attackRange: 500,
    patterns: ['chemical_bomb', 'transform', 'toxic_wave'],
    damageType: 'acid',   // Change par phase
    phases: 3,            // acid → fire → electric
    difficulty: 'hard'
  },

  // 7. LE FERMIER (ferme)
  fermier: {
    name: 'Le Fermier Dévoré',
    hp: 2000,
    maxHp: 2000,
    speed: 95,
    damage: 50,
    color: '#d2691e',     // Marron terre
    size: 50,
    attackRange: 180,
    patterns: ['pitchfork_charge', 'summon_animals', 'rampage'],
    difficulty: 'hard'
  },

  // 8. LA MACHINE (usine)
  machine: {
    name: 'La Machine-Usine',
    hp: 2500,
    maxHp: 2500,
    speed: 50,
    damage: 55,
    color: '#708090',     // Gris métal
    size: 60,             // Le plus gros
    attackRange: 800,
    patterns: ['laser_beam', 'molten_metal', 'overdrive'],
    armored: true,
    armor: 0.5,           // 50% réduction dégâts (NON IMPLÉMENTÉ)
    weakPoints: [],       // Liste vide (non implémenté)
    difficulty: 'hard'
  }
};

// ========================================
// 🎯 CONSTANTES BOSS
// ========================================

export const BOSS_CONFIG = {
  // Position de spawn (fixe)
  SPAWN_X: 1280,
  SPAWN_Y: 800,
  
  // Loot garanti (10 items)
  GUARANTEED_LOOT: {
    health_potions: 10,    // 2 stacks de 5
    food: 5,
    water: 5,
    rare_weapons: 2,       // 2 armes rares
    scrap: 40,             // 2 stacks de 20
    speed_boosts: 3,
    ammo: 10
  },
  
  // Timings
  LOOT_LIFETIME: 300,      // 5 minutes
  
  // Invocations
  SERVANT_HP_PERCENT: 0.7, // 70% HP d'un zombie basic
  ANIMAL_HP: 20,
  MINI_ZOMBIE_PERCENT: 0.5 // 50% stats
};