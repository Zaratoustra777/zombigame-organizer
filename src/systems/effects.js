// src/systems/effects.js

export function updateEffects(effects, player, deadBodies, entities, dt, time) {
  for (let i = effects.length - 1; i >= 0; i--) {
    const effect = effects[i];
    
    effect.life -= dt;
    
    if (effect.life <= 0) {
      effects.splice(i, 1);
      continue;
    }
    
    if (effect.type === 'explosion') {
      const dx = player.x - effect.x;
      const dy = player.y - effect.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < effect.radius && !effect.hasHitPlayer) {
        player.hp -= effect.damage || 0;
        effect.hasHitPlayer = true;
      }
      
      entities.forEach(entity => {
        const edx = entity.x - effect.x;
        const edy = entity.y - effect.y;
        const edist = Math.sqrt(edx * edx + edy * edy);
        
        if (edist < effect.radius && !entity.hitByExplosion) {
          entity.hp -= effect.damage || 0;
          entity.hitByExplosion = true;
        }
      });
    }
  }
}

export function updateDeadBodies(deadBodies, dt) {
  for (let i = deadBodies.length - 1; i >= 0; i--) {
    const body = deadBodies[i];
    
    body.alpha -= body.decayRate * dt;
    
    if (body.alpha <= 0) {
      deadBodies.splice(i, 1);
    }
  }
}