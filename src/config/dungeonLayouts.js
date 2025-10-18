// src/config/dungeonLayouts.js - VERSION AVEC PROPS

// ========================================
// 🏗️ CONFIGURATION DONJONS LAYOUT
// ========================================

export const LAYOUT_DUNGEON_CONFIGS = {
  militaire: {
    id: 'militaire',
    name: '🔫 Base Militaire',
    type: 'layout',
    tier: 3,
    lootCategory: 'bm',
    bossType: 'colonel',
    mapCoords: { x: 4, y: -4 },
    arenaCoords: { x: 1280, y: 1280, mapX: -104, mapY: 0 },
    minRooms: 7,
    maxRooms: 9,
    baseZombies: 10,
    zombieScaling: 1.15,
    baseSizeX: 1000,
    baseSizeY: 1000,
    sizeIncrement: 100,
    bossSizeMultiplier: 1.2,
    corridorLength: { min: 300, max: 500 },
    corridorWidth: 200,
    propDensity: 0.15,
    propTypes: [
      { type: 'crate_ammo', color: '#4a4a2a', minSize: 50, maxSize: 70, weight: 3 },
      { type: 'barrel_metal', color: '#555', minSize: 40, maxSize: 50, weight: 2 },
      { type: 'concrete_wall', color: '#666', minSize: 80, maxSize: 120, weight: 1 },
      { type: 'sandbag', color: '#8b7355', minSize: 60, maxSize: 80, weight: 2 }
    ]
  },

  labo: {
    id: 'labo',
    name: '💉 Laboratoire',
    type: 'layout',
    tier: 2,
    lootCategory: 'lab',
    bossType: 'scientifique',
    mapCoords: { x: -4, y: 4 },
    arenaCoords: { x: 1280, y: 1280, mapX: -105, mapY: 0 },
    minRooms: 7,
    maxRooms: 9,
    baseZombies: 10,
    zombieScaling: 1.15,
    baseSizeX: 1000,
    baseSizeY: 1000,
    sizeIncrement: 100,
    bossSizeMultiplier: 1.2,
    corridorLength: { min: 300, max: 500 },
    corridorWidth: 200,
    propDensity: 0.15,
    propTypes: [
      { type: 'lab_table', color: '#3a3a3a', minSize: 80, maxSize: 100, weight: 3 },
      { type: 'cuve', color: '#2a4a2a', minSize: 60, maxSize: 80, weight: 2 },
      { type: 'armoire', color: '#4a4a4a', minSize: 50, maxSize: 70, weight: 2 },
      { type: 'machine', color: '#555', minSize: 70, maxSize: 90, weight: 1 }
    ]
  },

  ferme: {
    id: 'ferme',
    name: '🌾 Ferme Abandonnée',
    type: 'layout',
    tier: 2,
    lootCategory: 'fm',
    bossType: 'fermier',
    mapCoords: { x: 4, y: 4 },
    arenaCoords: { x: 1280, y: 1280, mapX: -106, mapY: 0 },
    minRooms: 7,
    maxRooms: 9,
    baseZombies: 10,
    zombieScaling: 1.15,
    baseSizeX: 1000,
    baseSizeY: 1000,
    sizeIncrement: 100,
    bossSizeMultiplier: 1.2,
    corridorLength: { min: 300, max: 500 },
    corridorWidth: 200,
    propDensity: 0.15,
    propTypes: [
      { type: 'hay_bale', color: '#d4a76a', minSize: 60, maxSize: 80, weight: 4 },
      { type: 'tractor', color: '#8b0000', minSize: 100, maxSize: 140, weight: 1 },
      { type: 'fence', color: '#8b7355', minSize: 80, maxSize: 120, weight: 2 },
      { type: 'barrel', color: '#654321', minSize: 40, maxSize: 50, weight: 2 }
    ]
  },

  usine: {
    id: 'usine',
    name: '⚙️ Usine Maudite',
    type: 'layout',
    tier: 3,
    lootCategory: 'us',
    bossType: 'machine',
    mapCoords: { x: -4, y: -4 },
    arenaCoords: { x: 1280, y: 1280, mapX: -107, mapY: 0 },
    minRooms: 7,
    maxRooms: 9,
    baseZombies: 10,
    zombieScaling: 1.15,
    baseSizeX: 1000,
    baseSizeY: 1000,
    sizeIncrement: 100,
    bossSizeMultiplier: 1.2,
    corridorLength: { min: 300, max: 500 },
    corridorWidth: 200,
    propDensity: 0.15,
    propTypes: [
      { type: 'machine', color: '#444', minSize: 80, maxSize: 120, weight: 2 },
      { type: 'conveyor', color: '#555', minSize: 100, maxSize: 150, weight: 1 },
      { type: 'metal_crate', color: '#666', minSize: 60, maxSize: 80, weight: 3 },
      { type: 'oil_drum', color: '#2a2a2a', minSize: 40, maxSize: 50, weight: 2 }
    ]
  }
};

// ========================================
// 🗺️ MAPPING COORDONNÉES → TYPE
// ========================================

export const LAYOUT_DUNGEON_MAP_ENTRANCES = {
  "4,-4": "militaire",
  "-4,4": "labo",
  "4,4": "ferme",
  "-4,-4": "usine"
};

// ========================================
// 🎲 GÉNÉRATION LAYOUT
// ========================================

export function generateDungeonLayout(config) {
  const roomCount = config.minRooms + Math.floor(Math.random() * (config.maxRooms - config.minRooms + 1));
  
  const rooms = [];
  let currentX = 1280;
  let currentY = 1280;
  
  for (let i = 0; i < roomCount; i++) {
    const isBossRoom = (i === roomCount - 1);
    
    let width = config.baseSizeX + (i * config.sizeIncrement);
    let height = config.baseSizeY + (i * config.sizeIncrement);
    
    if (isBossRoom) {
      width = Math.floor(width * config.bossSizeMultiplier);
      height = Math.floor(height * config.bossSizeMultiplier);
    }
    
    let zombieCount = Math.floor(config.baseZombies * Math.pow(config.zombieScaling, i));
    zombieCount += Math.floor(Math.random() * 3);
    
    const props = generateRoomProps(width, height, currentX, currentY, config);
    
    rooms.push({
      id: i,
      x: currentX,
      y: currentY,
      width,
      height,
      zombieCount,
      zombiesAlive: 0,
      cleared: false,
      triggered: false,
      locked: false,
      chest: null,
      boss: isBossRoom ? config.bossType : null,
      props
    });
    
    if (i < roomCount - 1) {
      const corridorLength = config.corridorLength.min + 
                           Math.random() * (config.corridorLength.max - config.corridorLength.min);
      
      if (Math.random() > 0.5) {
        currentX += width + corridorLength;
      } else {
        currentY += height + corridorLength;
      }
    }
  }
  
  return {
    rooms,
    totalRooms: roomCount
  };
}

// ========================================
// 🎲 GÉNÉRATION PROPS PAR SALLE
// ========================================

function generateRoomProps(width, height, centerX, centerY, config) {
  const props = [];
  const surface = width * height;
  const targetPropsSurface = surface * config.propDensity;
  
  let currentSurface = 0;
  let attempts = 0;
  const maxAttempts = 200;
  
  const MIN_SPACING = 60;
  
  while (currentSurface < targetPropsSurface && attempts < maxAttempts) {
    attempts++;
    
    const propType = selectWeightedPropType(config.propTypes);
    
    const propWidth = propType.minSize + Math.random() * (propType.maxSize - propType.minSize);
    const propHeight = propType.minSize + Math.random() * (propType.maxSize - propType.minSize);
    
    const isSquare = Math.random() > 0.3;
    const finalWidth = isSquare ? propWidth : propWidth * (0.5 + Math.random());
    const finalHeight = isSquare ? propWidth : propHeight * (0.5 + Math.random());
    
    const x = centerX + (Math.random() - 0.5) * width * 0.85;
    const y = centerY + (Math.random() - 0.5) * height * 0.85;
    
    const overlaps = props.some(p => {
      const dx = Math.abs(p.x - x);
      const dy = Math.abs(p.y - y);
      
      const minDistX = (p.width + finalWidth) / 2 + MIN_SPACING;
      const minDistY = (p.height + finalHeight) / 2 + MIN_SPACING;
      
      return dx < minDistX && dy < minDistY;
    });
    
    if (!overlaps) {
      props.push({
        type: propType.type,
        x,
        y,
        width: finalWidth,
        height: finalHeight,
        color: propType.color,
        blocking: true,
        hp: 100
      });
      
      currentSurface += finalWidth * finalHeight;
    }
  }
  
  console.log(`🏗️ Salle: ${props.length} props générés (${Math.floor(currentSurface / surface * 100)}% surface, ${attempts} tentatives)`);
  
  return props;
}

function selectWeightedPropType(propTypes) {
  const totalWeight = propTypes.reduce((sum, p) => sum + p.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const propType of propTypes) {
    random -= propType.weight;
    if (random <= 0) {
      return propType;
    }
  }
  
  return propTypes[0];
}