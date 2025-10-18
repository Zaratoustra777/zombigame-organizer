// src/config/worldMap.js

export const CITY_CONFIG = {
  size: 18,
  origin: { x: -8, y: -8 },
  bounds: { minX: -8, minY: -8, maxX: 9, maxY: 9 },
  mapSize: 2560
};

// Maps spéciales avec noms précis
export const SPECIAL_MAPS = {
  hub: { x: 0, y: 0, name: 'Hub', color: '#ff00ff' },
  
  // Donjons simples
  boutique: { x: 0, y: -5, name: 'Boutique', color: '#00ffff' },
  oasis: { x: 0, y: 5, name: 'Oasis', color: '#00ffff' },
  fastfood: { x: -5, y: 0, name: 'Fast-Food', color: '#00ffff' },
  chantier: { x: 5, y: 0, name: 'Chantier', color: '#00ffff' },
  
  // Donjons rares
  militaire: { x: -4, y: -4, name: 'Base Militaire', color: '#0000ff' },
  ferme: { x: 4, y: 4, name: 'Ferme', color: '#0000ff' },
  labo: { x: -4, y: 4, name: 'Laboratoire', color: '#0000ff' },
  usine: { x: 4, y: -4, name: 'Usine', color: '#0000ff' },
  
  // Autres
  gasStation: [
    { x: 6, y: 6, name: 'Station Essence', color: '#ff0000' },
    { x: -6, y: -6, name: 'Station Essence', color: '#ff0000' },
    { x: -6, y: 6, name: 'Station Essence', color: '#ff0000' },
    { x: 6, y: -6, name: 'Station Essence', color: '#ff0000' }
  ],
  
  hotel: [
    { x: 0, y: -9, name: 'Hôtel', color: '#00ff00' },
    { x: 9, y: 0, name: 'Hôtel', color: '#00ff00' }
  ],
  
  event: { x: 9, y: -9, name: 'Zone Event', color: '#00ff00' }
};

// Monde avec villes de test
export const WORLD = {
  cities: {
    'StartCity': {
      worldX: 0,
      worldY: 0,
      population: 1, // Pour test
      maxPopulation: 10,
      level: 1,
      neighbors: {
        north: 'NorthTown',
        east: 'EastVille',
        south: null,
        west: null
      }
    },
    'NorthTown': {
      worldX: 0,
      worldY: -1,
      population: 5,
      maxPopulation: 20,
      level: 2,
      neighbors: {
        north: null,
        east: null,
        south: 'StartCity',
        west: null
      }
    },
    'EastVille': {
      worldX: 1,
      worldY: 0,
      population: 0, // Vide = bloqué
      maxPopulation: 10,
      level: 1,
      neighbors: {
        north: null,
        east: null,
        south: null,
        west: 'StartCity'
      }
    }
  }
};

// Retourne type + nom de map
export function getMapType(x, y) {
  // Hub
  if (x === 0 && y === 0) return { type: 'hub', name: 'Hub' };
  
  // Donjons simples
  if (x === 0 && y === -5) return { type: 'dungeon', name: 'Boutique' };
  if (x === 0 && y === 5) return { type: 'dungeon', name: 'Oasis' };
  if (x === -5 && y === 0) return { type: 'dungeon', name: 'Fast-Food' };
  if (x === 5 && y === 0) return { type: 'dungeon', name: 'Chantier' };
  
  // Donjons rares
  if (x === -4 && y === -4) return { type: 'dungeonRare', name: 'Base Militaire' };
  if (x === 4 && y === 4) return { type: 'dungeonRare', name: 'Ferme' };
  if (x === -4 && y === 4) return { type: 'dungeonRare', name: 'Laboratoire' };
  if (x === 4 && y === -4) return { type: 'dungeonRare', name: 'Usine' };
  
  // Stations essence
  if ((x === 6 && y === 6) || (x === -6 && y === -6) || 
      (x === -6 && y === 6) || (x === 6 && y === -6)) {
    return { type: 'gasStation', name: 'Station Essence' };
  }
  
  // Hôtels
  if ((x === 0 && y === -9) || (x === 9 && y === 0)) {
    return { type: 'hotel', name: 'Hôtel' };
  }
  
  // Event
  if (x === 9 && y === -9) return { type: 'event', name: 'Zone Event' };
  
  return { type: 'normal', name: 'Rue' };
}

export function isValidMapCoords(x, y) {
  return x >= CITY_CONFIG.bounds.minX && 
         x <= CITY_CONFIG.bounds.maxX &&
         y >= CITY_CONFIG.bounds.minY && 
         y <= CITY_CONFIG.bounds.maxY;
}

export function cityExists(cityName) {
  return WORLD.cities[cityName] !== undefined;
}

export function getNeighborCity(cityName, direction) {
  const city = WORLD.cities[cityName];
  if (!city) return null;
  
  const neighbor = city.neighbors[direction];
  if (!neighbor) return null;
  
  // Check si ville voisine a des habitants
  const neighborCity = WORLD.cities[neighbor];
  if (neighborCity && neighborCity.population > 0) {
    return neighbor;
  }
  
  return null; // Bloqué si vide
}