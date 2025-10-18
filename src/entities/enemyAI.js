// src/entities/enemyAI.js

const DETECTION_RANGE = 400;
const AGGRO_RANGE = 450;

export function detectPlayer(entity, player, time) {
  const dx = player.x - entity.x;
  const dy = player.y - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (!entity.alerted && distance < DETECTION_RANGE) {
    entity.alerted = true;
    entity.aggroed = true;
    entity.alertTime = time;
  }
  
  if (entity.alerted && distance > AGGRO_RANGE) {
    entity.alerted = false;
    entity.aggroed = false;
  }
  
  return distance;
}

export function moveTowardsPlayer(entity, player, props, dt) {
  const dx = player.x - entity.x;
  const dy = player.y - entity.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance === 0) return 0;
  
  const normalizedX = dx / distance;
  const normalizedY = dy / distance;
  
  let speed = entity.speed;
  
  // Zombie Hungry: accélère près du joueur
  if (entity.special === 'accelerate' && distance < entity.boostRange) {
    speed = entity.boostedSpeed || entity.speed;
  }
  
  const newX = entity.x + normalizedX * speed * dt;
  const newY = entity.y + normalizedY * speed * dt;
  
  let blocked = false;
  for (const prop of props) {
    const pdx = newX - prop.x;
    const pdy = newY - prop.y;
    const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
    
    if (pdist < prop.radius + entity.size / 2) {
      blocked = true;
      break;
    }
  }
  
  if (!blocked) {
    entity.x = newX;
    entity.y = newY;
  }
  
  return distance;
}

export function attackPlayer(entity, player, distance, time) {
  if (distance < entity.attackRange) {
    if (time - entity.lastAttack >= entity.attackRate / 1000) {
      player.hp -= entity.damage;
      entity.lastAttack = time;
    }
  }
}

export function handleEnemyDeath(entity, entities, effects, deadBodies, loot, index) {
  if (entity.hp <= 0) {
    // Explosion pour Bloater
    if (entity.special === 'explode') {
      effects.push({
        type: 'explosion',
        x: entity.x,
        y: entity.y,
        radius: entity.explosionRadius,
        damage: entity.explosionDamage,
        life: 0.5,
        maxLife: 0.5
      });
    }
    
    deadBodies.push({
      x: entity.x,
      y: entity.y,
      color: entity.color,
      size: entity.size,
      alpha: 1.0,
      decayRate: 0.3
    });
    
    entities.splice(index, 1);
    return true;
  }
  return false;
}

export function updateHowler(entity, entities, effects, time, dt) {
  if (!entity.lastHowl) entity.lastHowl = 0;
  
  if (time - entity.lastHowl >= entity.howlCooldown / 1000) {
    entity.lastHowl = time;
    
    effects.push({
      type: 'howl',
      x: entity.x,
      y: entity.y,
      radius: entity.howlRange,
      life: 0.5,
      maxLife: 0.5
    });
    
    entities.forEach(other => {
      if (other !== entity) {
        const dx = other.x - entity.x;
        const dy = other.y - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < entity.howlRange) {
          other.alerted = true;
          other.aggroed = true;
        }
      }
    });
  }
}

export function updateJumper(entity, player, time, dt) {
  if (!entity.lastJump) entity.lastJump = 0;
  if (entity.jumping) return;
  
  const dx = player.x - entity.x;
  const dy = player.y - entity.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist < 200 && time - entity.lastJump >= entity.jumpCooldown / 1000) {
    entity.jumping = true;
    entity.lastJump = time;
    entity.jumpStartTime = time;
    entity.jumpTargetX = player.x;
    entity.jumpTargetY = player.y;
  }
  
  if (entity.jumping) {
    const elapsed = time - entity.jumpStartTime;
    const jumpDuration = 0.5;
    
    if (elapsed >= jumpDuration) {
      entity.jumping = false;
      entity.x = entity.jumpTargetX;
      entity.y = entity.jumpTargetY;
    } else {
      const progress = elapsed / jumpDuration;
      const startX = entity.jumpStartX || entity.x;
      const startY = entity.jumpStartY || entity.y;
      
      if (!entity.jumpStartX) {
        entity.jumpStartX = entity.x;
        entity.jumpStartY = entity.y;
      }
      
      entity.x = startX + (entity.jumpTargetX - startX) * progress;
      entity.y = startY + (entity.jumpTargetY - startY) * progress;
    }
  }
}