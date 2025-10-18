// src/rendering/renderPlayer.js - CORRIGÉ

export function renderPlayer(ctx, player, camera, input) {
  const screen = camera.worldToScreen(player.x, player.y);
  
  // Ombre
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.arc(screen.x + 3, screen.y + 3, 24, 0, Math.PI * 2);
  ctx.fill();
  
  // Corps
  if (player.isKO) {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#666666';
  } else if (player.isDashing) {
    ctx.fillStyle = '#00ffff';
  } else {
    ctx.fillStyle = '#00ff00';
  }
  
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, 24, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.globalAlpha = 1;
  ctx.strokeStyle = player.isKO ? '#ff0000' : '#000000';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Direction (utiliser input.mouseX/mouseY au lieu de player.mouseX/mouseY)
  if (!player.isKO && input) {
    const angle = Math.atan2(
      input.mouseY - screen.y,
      input.mouseX - screen.x
    );
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(screen.x, screen.y);
    ctx.lineTo(
      screen.x + Math.cos(angle) * 30,
      screen.y + Math.sin(angle) * 30
    );
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(
      screen.x + Math.cos(angle) * 30,
      screen.y + Math.sin(angle) * 30,
      4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  
  // K.O.
  if (player.isKO) {
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💀', screen.x, screen.y);
  }
}

export function renderAimLine(ctx, player, weapon, input, camera) {
  if (!weapon || !input) return;
  
  const playerScreen = camera.worldToScreen(player.x, player.y);
  const angle = Math.atan2(
    input.mouseY - playerScreen.y,
    input.mouseX - playerScreen.x
  );
  
  if (input.shoot) {
    const weaponColor = weapon.color || '#ff0000';
    
    if (weapon.type === 'melee') {
      ctx.strokeStyle = weaponColor;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(
        playerScreen.x,
        playerScreen.y,
        weapon.range || 50,
        angle - Math.PI / 6,
        angle + Math.PI / 6
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      ctx.strokeStyle = weaponColor;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(playerScreen.x, playerScreen.y);
      ctx.lineTo(
        playerScreen.x + Math.cos(angle) * 50,
        playerScreen.y + Math.sin(angle) * 50
      );
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('↑ RELÂCHE POUR TIRER', ctx.canvas.width / 2, 30);
  } else {
    ctx.strokeStyle = weapon.color || '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playerScreen.x, playerScreen.y);
    ctx.lineTo(
      playerScreen.x + Math.cos(angle) * 30,
      playerScreen.y + Math.sin(angle) * 30
    );
    ctx.stroke();
  }
}