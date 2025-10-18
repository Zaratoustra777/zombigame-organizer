// ========================================
// 💥 SYSTÈME DE COLLISION AABB
// ========================================

/**
 * Vérifie collision entre deux boîtes rectangulaires
 */
export function checkCollision(box1, box2) {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

/**
 * Crée une boîte de collision pour le joueur
 */
export function createPlayerBox(player) {
  return {
    x: player.x - 12,
    y: player.y - 12,
    width: 24,
    height: 24
  };
}

/**
 * Crée une boîte de collision pour un ennemi
 */
export function createEntityBox(entity) {
  const halfSize = entity.size / 2;
  return {
    x: entity.x - halfSize,
    y: entity.y - halfSize,
    width: entity.size,
    height: entity.size
  };
}

/**
 * Crée une boîte de collision pour un prop (3px du bas)
 */
export function createPropCollisionBox(prop) {
  return {
    x: prop.x,
    y: prop.y + prop.height - 3,
    width: prop.width,
    height: 3
  };
}

/**
 * Vérifie collision joueur vs props
 * Retourne {canMoveX, canMoveY}
 */
export function checkPlayerPropsCollision(newX, newY, player, props) {
  let canMoveX = true;
  let canMoveY = true;
  
  const testBoxX = {
    x: newX - 12,
    y: player.y - 12,
    width: 24,
    height: 24
  };
  
  const testBoxY = {
    x: player.x - 12,
    y: newY - 12,
    width: 24,
    height: 24
  };
  
  for (const prop of props) {
    const propBox = createPropCollisionBox(prop);
    
    if (checkCollision(testBoxX, propBox)) {
      canMoveX = false;
    }
    
    if (checkCollision(testBoxY, propBox)) {
      canMoveY = false;
    }
  }
  
  return { canMoveX, canMoveY };
}

/**
 * Vérifie collision entity vs props
 */
export function checkEntityPropsCollision(newX, newY, entity, props) {
  // Si phasing, ignore collision
  if (entity.phasing) return true;
  
  const testBox = {
    x: newX - entity.size / 2,
    y: newY - entity.size / 2,
    width: entity.size,
    height: entity.size
  };
  
  for (const prop of props) {
    const propBox = createPropCollisionBox(prop);
    if (checkCollision(testBox, propBox)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Calcule distance point-to-line (pour laser)
 */
export function pointToLineDistance(px, py, x1, y1, x2, y2) {
  const numerator = Math.abs(
    (y2 - y1) * px - 
    (x2 - x1) * py + 
    x2 * y1 - 
    y2 * x1
  );
  
  const denominator = Math.sqrt(
    Math.pow(y2 - y1, 2) + 
    Math.pow(x2 - x1, 2)
  );
  
  return numerator / denominator;
}