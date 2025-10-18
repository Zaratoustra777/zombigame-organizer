export const MAP_SIZE = 2560;

export const DUNGEON_ENTRANCE_ZONE = {
  x: 1180,
  y: 1180,
  width: 200,
  height: 200
};

export const MAP_ZONES = {
  startCity: {
    mapX: 0,
    mapY: 0,
    biome: 'city',
    enemies: ['basic', 'hurleur']
  },
  
  fastfood: {
    mapX: 0,
    mapY: -3,
    biome: 'fastfood',
    hasDungeon: true,
    dungeonType: 'fastfood'
  },
  
  chantier: {
    mapX: 0,
    mapY: 3,
    biome: 'chantier',
    hasDungeon: true,
    dungeonType: 'chantier'
  },
  
  boutique: {
    mapX: -3,
    mapY: 0,
    biome: 'boutique',
    hasDungeon: true,
    dungeonType: 'boutique'
  },
  
  oasis: {
    mapX: 3,
    mapY: 0,
    biome: 'oasis',
    hasDungeon: true,
    dungeonType: 'oasis'
  },
  
  militaire: {
    mapX: 4,
    mapY: -4,
    biome: 'military',
    hasDungeon: true,
    dungeonType: 'militaire',
    layoutType: 'procedural'
  },
  
  labo: {
    mapX: -4,
    mapY: 4,
    biome: 'lab',
    hasDungeon: true,
    dungeonType: 'labo',
    layoutType: 'procedural'
  },
  
  ferme: {
    mapX: 4,
    mapY: 4,
    biome: 'farm',
    hasDungeon: true,
    dungeonType: 'ferme',
    layoutType: 'procedural'
  },
  
  usine: {
    mapX: -4,
    mapY: -4,
    biome: 'factory',
    hasDungeon: true,
    dungeonType: 'usine',
    layoutType: 'procedural'
  }
};

export function getMapZone(mapX, mapY) {
  for (const [name, zone] of Object.entries(MAP_ZONES)) {
    if (zone.mapX === mapX && zone.mapY === mapY) {
      return { name, ...zone };
    }
  }
  return null;
}

export function getBiomeColor(mapX, mapY) {
  const zone = getMapZone(mapX, mapY);
  
  if (!zone) return '#2a2a2a';
  
  const biomeColors = {
    city: '#3a3a3a',
    fastfood: '#ff6b35',
    chantier: '#8b4513',
    boutique: '#ff1493',
    oasis: '#20b2aa',
    military: '#4a4a2a',
    lab: '#2a4a2a',
    farm: '#6b8e23',
    factory: '#555555'
  };
  
  return biomeColors[zone.biome] || '#2a2a2a';
}