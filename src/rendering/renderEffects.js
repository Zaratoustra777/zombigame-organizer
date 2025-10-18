// src/rendering/renderEffects.js

export function renderProjectiles(ctx, projectiles, camera) {
  projectiles.forEach(proj => {
    const screen = camera.worldToScreen(proj.x, proj.y);
    
    ctx.fillStyle = proj.color || '#ffff00';
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, proj.size || 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

export function renderEffects(ctx, effects, camera, time) {
  if (!effects) return;
  
  effects.forEach(effect => {
    const screen = camera.worldToScreen(effect.x, effect.y);
    
    if (effect.type === 'explosion') {
      const alpha = 1 - effect.age / effect.lifetime;
      const radius = effect.radius * (1 + effect.age / effect.lifetime * 0.5);
      
      ctx.globalAlpha = alpha;
      ctx.fillStyle = effect.color || '#ff6600';
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (effect.type === 'blood') {
      const alpha = 1 - effect.age / effect.lifetime;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#8b0000';
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  });
}

export function renderBossLaser(ctx, boss, camera) {
  if (!boss || !boss.laserActive) return;
  
  const screen = camera.worldToScreen(boss.x, boss.y);
  const endX = screen.x + Math.cos(boss.laserAngle) * 1000;
  const endY = screen.y + Math.sin(boss.laserAngle) * 1000;
  
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(screen.x, screen.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

export function renderLoot(ctx, loot, camera, time) {
  loot.forEach(item => {
    const screen = camera.worldToScreen(item.x, item.y);
    const pulse = Math.sin(time * 0.005) * 0.2 + 0.8;
    
    ctx.globalAlpha = pulse;
    ctx.fillStyle = item.color || '#ffd700';
    ctx.fillRect(screen.x - 15, screen.y - 15, 30, 30);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(screen.x - 15, screen.y - 15, 30, 30);
    ctx.globalAlpha = 1;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('📦', screen.x, screen.y);
  });
}