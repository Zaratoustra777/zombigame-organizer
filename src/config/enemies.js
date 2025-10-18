// src/config/enemies.js - 19 ZOMBIES COMPLETS

export const ENEMY_TYPES = {
  // TIER 1 - Cercle 1 (r ≈ 1)
  basic: {
    name: 'Zombie Basique',
    hp: 100,
    speed: 80,
    damage: 10,
    color: '#2d5016',
    size: 32,
    attackRange: 30,
    attackRate: 1000,
    special: null,
    xp: 5,
    tier: 1
  },
  
  crawler: {
    name: 'Zombie Crawler',
    hp: 70,
    speed: 50,
    damage: 8,
    color: '#4a5d23',
    size: 24,
    attackRange: 25,
    attackRate: 1200,
    special: 'low_hitbox',
    hitChanceReduction: 0.3,
    xp: 4,
    tier: 1
  },
  
  // TIER 2 - Cercle 2 (r ≈ 2)
  hungry: {
    name: 'Zombie Hungry',
    hp: 85,
    speed: 70,
    damage: 12,
    color: '#3a4a1a',
    size: 32,
    attackRange: 35,
    attackRate: 900,
    special: 'accelerate',
    baseSpeed: 70,
    boostedSpeed: 130,
    boostRange: 200,
    xp: 6,
    tier: 2
  },
  
  runner: {
    name: 'Zombie Runner',
    hp: 60,
    speed: 150,
    damage: 8,
    color: '#654321',
    size: 28,
    attackRange: 30,
    attackRate: 800,
    special: 'sprint',
    xp: 5,
    tier: 2
  },
  
  spitter: {
    name: 'Zombie Spitter',
    hp: 85,
    speed: 70,
    damage: 14,
    color: '#556b2f',
    size: 32,
    attackRange: 250,
    attackRate: 2000,
    special: 'spit',
    dotDamage: 2,
    dotDuration: 4,
    xp: 7,
    tier: 2
  },
  
  // TIER 3 - Cercle 3 (r ≈ 3)
  screamer: {
    name: 'Zombie Screamer',
    hp: 65,
    speed: 75,
    damage: 5,
    color: '#8b0000',
    size: 30,
    attackRange: 30,
    attackRate: 1000,
    special: 'scream',
    summonCount: 2,
    summonCooldown: 20000,
    xp: 8,
    tier: 3
  },
  
  scavenger: {
    name: 'Zombie Scavenger',
    hp: 95,
    speed: 85,
    damage: 10,
    color: '#6b5d23',
    size: 34,
    attackRange: 30,
    attackRate: 1000,
    special: 'weapon_chance',
    weaponChance: 0.25,
    weaponDamageBonus: 6,
    weaponRange: 200,
    xp: 7,
    tier: 3
  },
  
  // TIER 4 - Cercle 4 (r ≈ 4)
  mimic: {
    name: 'Zombie Mimic',
    hp: 90,
    speed: 0,
    damage: 18,
    color: '#2d3a1a',
    size: 32,
    attackRange: 30,
    attackRate: 800,
    special: 'fake_death',
    dashSpeed: 110,
    dashRange: 100,
    xp: 10,
    tier: 4
  },
  
  infected: {
    name: 'Zombie Infected',
    hp: 95,
    speed: 85,
    damage: 12,
    color: '#8b008b',
    size: 34,
    attackRange: 30,
    attackRate: 1000,
    special: 'poison',
    poisonDamage: 3,
    poisonDuration: 5,
    xp: 6,
    tier: 4
  },
  
  // TIER 5 - Cercle 5 (r ≈ 5)
  electric: {
    name: 'Zombie Electric',
    hp: 110,
    speed: 65,
    damage: 16,
    color: '#4169e1',
    size: 36,
    attackRange: 80,
    attackRate: 1000,
    special: 'electric_arc',
    arcDamage: 16,
    xp: 10,
    tier: 5
  },
  
  bloater: {
    name: 'Zombie Bloater',
    hp: 130,
    speed: 60,
    damage: 15,
    color: '#556b4f',
    size: 48,
    attackRange: 30,
    attackRate: 1500,
    special: 'explode',
    explosionRadius: 100,
    explosionDamage: 45,
    xp: 10,
    tier: 5
  },
  
  // TIER 6 - Cercle 6 (r ≈ 6)
  parasite: {
    name: 'Zombie Parasite',
    hp: 80,
    speed: 95,
    damage: 14,
    color: '#9370db',
    size: 30,
    attackRange: 30,
    attackRate: 1000,
    special: 'parasite_jump',
    jumpThreshold: 0.25,
    jumpDistance: 180,
    jumpDamage: 14,
    xp: 9,
    tier: 6
  },
  
  necromancer: {
    name: 'Zombie Necromancer',
    hp: 105,
    speed: 70,
    damage: 10,
    color: '#2f4f4f',
    size: 38,
    attackRange: 350,
    attackRate: 2000,
    special: 'resurrect',
    resurrectCooldown: 25000,
    resurrectRange: 300,
    xp: 15,
    tier: 6
  },
  
  // TIER 7 - Cercle 7 (r ≈ 7)
  mutant: {
    name: 'Zombie Mutant',
    hp: 170,
    speed: 60,
    damage: 20,
    color: '#556b3f',
    size: 44,
    attackRange: 40,
    attackRate: 1200,
    special: 'regeneration',
    regenRate: 2,
    xp: 14,
    tier: 7
  },
  
  burned: {
    name: 'Zombie Burned',
    hp: 155,
    speed: 55,
    damage: 18,
    color: '#ff4500',
    size: 42,
    attackRange: 110,
    attackRate: 1300,
    special: 'fire_aura',
    auraDamage: 10,
    auraRange: 110,
    regenRate: 2,
    xp: 17,
    tier: 7
  },
  
  // TIER 8 - Cercle 8 (r ≈ 8)
  mother: {
    name: 'Zombie Mother',
    hp: 200,
    speed: 45,
    damage: 14,
    color: '#8b7355',
    size: 50,
    attackRange: 35,
    attackRate: 1400,
    special: 'spawn',
    spawnInterval: 22000,
    maxSpawns: 4,
    xp: 18,
    tier: 8
  },
  
  tank: {
    name: 'Zombie Tank',
    hp: 280,
    speed: 50,
    damage: 28,
    color: '#4a4a4a',
    size: 60,
    attackRange: 40,
    attackRate: 1600,
    special: 'resistance',
    damageResistance: 0.3,
    xp: 22,
    tier: 8
  },
  
  // TIER 9 - Cercle 9 (r ≈ 9) - EXTRÊME
  giant: {
    name: 'Zombie Giant',
    hp: 320,
    speed: 45,
    damage: 32,
    color: '#2f2f2f',
    size: 80,
    attackRange: 50,
    attackRate: 1800,
    special: 'stomp',
    damageResistance: 0.25,
    stompCooldown: 10000,
    stompRadius: 130,
    stompDamage: 18,
    xp: 26,
    tier: 9
  }
};

// Mapping Tier → Types de zombies
export const ZOMBIE_TIERS = {
  1: ['basic', 'crawler'],
  2: ['hungry', 'runner', 'spitter'],
  3: ['screamer', 'scavenger'],
  4: ['mimic', 'infected'],
  5: ['electric', 'bloater'],
  6: ['parasite', 'necromancer'],
  7: ['mutant', 'burned'],
  8: ['mother', 'tank'],
  9: ['giant']
};