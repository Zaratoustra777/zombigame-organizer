// ========================================
// 🎯 CONFIGURATION GÉNÉRALE DU JEU
// ========================================
// Ici on met TOUTES les valeurs de base : tailles, vitesses, FPS, etc.

export const CONFIG = {
  // Taille d'une case (en pixels)
  TILE_SIZE: 64,
  
  // Taille de la carte (en nombre de cases)
  MAP_WIDTH: 40,
  MAP_HEIGHT: 40,
  
  // Nombre de cases visibles à l'écran (zoom)
  VIEWPORT_TILES: 12,
  
  // FPS cible (images par seconde)
  TARGET_FPS: 60
};

// Calculs automatiques (ne touche pas !)
export const CALCULATED = {
  // Taille de la map en pixels
  MAP_WIDTH_PX: CONFIG.MAP_WIDTH * CONFIG.TILE_SIZE,  // 2560px
  MAP_HEIGHT_PX: CONFIG.MAP_HEIGHT * CONFIG.TILE_SIZE, // 2560px
  
  // Taille du viewport en pixels
  VIEWPORT_SIZE_PX: CONFIG.VIEWPORT_TILES * CONFIG.TILE_SIZE // 768px
};

// Couleur de fond de la carte
export const MAP_BACKGROUND = '#2d4a2d'; // Vert forêt