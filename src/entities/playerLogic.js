// src/entities/playerLogic.js - VERSION COMPLÈTE

export function updatePlayerMovement(player, input, props, dt, worldSize, dungeon = null) {
  if (player.isDashing) {
    return;
  }
  
  const moveX = input.left ? -1 : input.right ? 1 : 0;
  const moveY = input.up ? -1 : input.down ? 1 : 0;
  
  if (moveX === 0 && moveY === 0) return;
  
  const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
  if (magnitude === 0) return;
  
  const normalizedX = moveX / magnitude;
  const normalizedY = moveY / magnitude;
  
  const moveSpeed = player.speed;
  let newX = player.x + normalizedX * moveSpeed * dt;
  let newY = player.y + normalizedY * moveSpeed * dt;
  
  if (dungeon && dungeon.layoutType === 'procedural') {
    const currentRoom = dungeon.rooms[dungeon.currentRoom];
    if (currentRoom && currentRoom.props) {
      const playerSize = 24;
      
      let blockedX = false;
      for (const prop of currentRoom.props) {
        if (!prop.blocking) continue;
        
        const dx = Math.abs(prop.x - newX);
        const dy = Math.abs(prop.y - player.y);
        
        if (dx < (prop.width / 2 + playerSize / 2) && dy < (prop.height / 2 + playerSize / 2)) {
          blockedX = true;
          break;
        }
      }
      
      let blockedY = false;
      for (const prop of currentRoom.props) {
        if (!prop.blocking) continue;
        
        const dx = Math.abs(prop.x - player.x);
        const dy = Math.abs(prop.y - newY);
        
        if (dx < (prop.width / 2 + playerSize / 2) && dy < (prop.height / 2 + playerSize / 2)) {
          blockedY = true;
          break;
        }
      }
      
      if (!blockedX) player.x = newX;
      if (!blockedY) player.y = newY;
      
      const roomMargin = 30;
      const roomLeft = currentRoom.x - currentRoom.width / 2 + roomMargin;
      const roomRight = currentRoom.x + currentRoom.width / 2 - roomMargin;
      const roomTop = currentRoom.y - currentRoom.height / 2 + roomMargin;
      const roomBottom = currentRoom.y + currentRoom.height / 2 - roomMargin;
      
      player.x = Math.max(roomLeft, Math.min(roomRight, player.x));
      player.y = Math.max(roomTop, Math.min(roomBottom, player.y));
      
      return;
    }
  }
  
  for (const prop of props) {
    const dx = newX - prop.x;
    const dy = newY - prop.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < prop.radius + 24) {
      const angle = Math.atan2(dy, dx);
      newX = prop.x + Math.cos(angle) * (prop.radius + 24);
      newY = prop.y + Math.sin(angle) * (prop.radius + 24);
    }
  }
  
  const margin = 50;
  newX = Math.max(margin, Math.min(worldSize - margin, newX));
  newY = Math.max(margin, Math.min(worldSize - margin, newY));
  
  player.x = newX;
  player.y = newY;
}

export function updatePlayerDash(player, input, lastDashState, magnitude) {
  const DASH_DISTANCE = 150;
  const DASH_COOLDOWN = 3000;
  const DASH_DURATION = 0.2;
  
  if (input.dash && !lastDashState && !player.isDashing && player.dashCooldown <= 0 && magnitude > 0) {
    player.isDashing = true;
    player.dashTimer = DASH_DURATION;
    player.dashCooldown = DASH_COOLDOWN;
    
    const moveX = input.left ? -1 : input.right ? 1 : 0;
    const moveY = input.up ? -1 : input.down ? 1 : 0;
    const mag = Math.sqrt(moveX * moveX + moveY * moveY);
    
    player.dashDirX = moveX / mag;
    player.dashDirY = moveY / mag;
    player.dashSpeed = DASH_DISTANCE / DASH_DURATION;
  }
  
  if (player.isDashing) {
    player.dashTimer -= 1/60;
    
    if (player.dashTimer <= 0) {
      player.isDashing = false;
      player.dashTimer = 0;
    } else {
      player.x += player.dashDirX * player.dashSpeed * (1/60);
      player.y += player.dashDirY * player.dashSpeed * (1/60);
    }
  }
  
  return input.dash;
}

export function updatePlayerCooldowns(player, dt, time) {
  if (player.dashCooldown > 0) {
    player.dashCooldown -= dt * 1000;
  }
  
  if (player.weaponCooldown > 0) {
    player.weaponCooldown -= dt * 1000;
  }
}