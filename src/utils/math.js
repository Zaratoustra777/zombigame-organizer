// ========================================
// 🧮 FONCTIONS MATHÉMATIQUES RÉUTILISABLES
// ========================================

/**
 * Calcule la distance entre deux points
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calcule l'angle entre deux points (en radians)
 */
export function angle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.atan2(dy, dx);
}

/**
 * Normalise un angle entre -PI et PI
 */
export function normalizeAngle(angle) {
  return Math.abs(((angle + Math.PI) % (2 * Math.PI)) - Math.PI);
}

/**
 * Clamp une valeur entre min et max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

/**
 * Linear interpolation
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Convertit degrés en radians
 */
export function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Convertit radians en degrés
 */
export function radToDeg(radians) {
  return radians * (180 / Math.PI);
}