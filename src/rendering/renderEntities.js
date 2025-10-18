// src/rendering/renderEntities.js

export function renderProp(ctx, prop, camera) {
  const screen = camera.worldToScreen(prop.x, prop.y);
  
  ctx.fillStyle = prop.color || '#8B4513';
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, prop.radius || 40, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function renderEntity(ctx, entity, camera, time) {
  const screen = camera.worldToScreen(entity.x, entity.y);
  const halfSize = entity.size / 2;
  
  ctx.fillStyle = entity.color;
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize, entity.size, entity.size);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(screen.x - halfSize, screen.y - halfSize, entity.size, entity.size);
  
  // Icônes spéciales
  if (entity.special === 'howl') {
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('📢', screen.x, screen.y + 6);
    
    if (entity.aboutToHowl) {
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(Math.ceil(entity.howlTimer), screen.x, screen.y - halfSize - 20);
      
      const pulseSize = 1 + Math.sin(time * 0.01) * 0.2;
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, halfSize * pulseSize * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (entity.special === 'explode') {
    ctx.fillStyle = '#9acd32';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('💣', screen.x, screen.y + 6);
  } else if (entity.special === 'jump') {
    ctx.fillStyle = '#4169e1';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🦗', screen.x, screen.y + 6);
  } else if (entity.special === 'parasite') {
    ctx.fillStyle = '#8b008b';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('🪱', screen.x, screen.y + 6);
  } else if (entity.special === 'phase') {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#708090';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('👻', screen.x, screen.y + 6);
    ctx.globalAlpha = 1;
  }
  
  // Barre HP
  const hpPercent = entity.hp / entity.maxHp;
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize - 8, entity.size, 3);
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize - 8, entity.size * hpPercent, 3);
  
  // Poison
  if (entity.poisoned) {
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('☠️', screen.x, screen.y - halfSize - 15);
  }
}

export function renderBoss(ctx, boss, camera) {
  const screen = camera.worldToScreen(boss.x, boss.y);
  const halfSize = boss.size / 2;
  
  ctx.fillStyle = boss.color;
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize, boss.size, boss.size);
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 4;
  ctx.strokeRect(screen.x - halfSize, screen.y - halfSize, boss.size, boss.size);
  
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(boss.name, screen.x, screen.y - halfSize - 30);
  
  const hpPercent = boss.hp / boss.maxHp;
  ctx.fillStyle = '#000000';
  ctx.fillRect(screen.x - halfSize - 2, screen.y - halfSize - 18, boss.size + 4, 10);
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize - 16, boss.size, 6);
  ctx.fillStyle = hpPercent > 0.5 ? '#00ff00' : (hpPercent > 0.25 ? '#ffaa00' : '#ff0000');
  ctx.fillRect(screen.x - halfSize, screen.y - halfSize - 16, boss.size * hpPercent, 6);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px monospace';
  ctx.fillText(`${Math.ceil(boss.hp)}/${boss.maxHp}`, screen.x, screen.y - halfSize - 11);
}