// src/rendering/renderDungeonLayout.js - VERSION AVEC PROPS

export function renderDungeonRooms(ctx, dungeon, camera) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return;
  
  dungeon.rooms.forEach((room, index) => {
    const screenX = room.x - camera.x - room.width / 2;
    const screenY = room.y - camera.y - room.height / 2;
    
    let roomColor = '#1a1a2e';
    let borderColor = '#444';
    
    if (room.cleared) {
      borderColor = '#00ff00';
    } else if (room.triggered) {
      borderColor = '#ff0000';
      roomColor = '#2e1a1a';
    } else if (index === dungeon.currentRoom) {
      borderColor = '#ffaa00';
    }
    
    ctx.fillStyle = roomColor;
    ctx.fillRect(screenX, screenY, room.width, room.height);
    
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(screenX, screenY, room.width, room.height);
    
    if (room.props && room.props.length > 0) {
      renderRoomProps(ctx, room.props, camera);
    }
    
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Salle ${index + 1}`, screenX + room.width / 2, screenY + 30);
    
    if (room.cleared) {
      ctx.fillStyle = '#00ff00';
      ctx.fillText('✓ CLEARED', screenX + room.width / 2, screenY + 60);
    } else if (room.triggered) {
      const aliveCount = room.zombiesAlive || 0;
      ctx.fillStyle = '#ff0000';
      ctx.fillText(`${aliveCount} zombies`, screenX + room.width / 2, screenY + 60);
    }
  });
}

function renderRoomProps(ctx, props, camera) {
  props.forEach(prop => {
    const screenX = prop.x - camera.x - prop.width / 2;
    const screenY = prop.y - camera.y - prop.height / 2;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(screenX + 4, screenY + 4, prop.width, prop.height);
    
    ctx.fillStyle = prop.color;
    ctx.fillRect(screenX, screenY, prop.width, prop.height);
    
    ctx.strokeStyle = darkenColor(prop.color, 0.3);
    ctx.lineWidth = 2;
    ctx.strokeRect(screenX, screenY, prop.width, prop.height);
    
    renderPropDetails(ctx, prop, screenX, screenY);
  });
}

function renderPropDetails(ctx, prop, screenX, screenY) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  
  switch (prop.type) {
    case 'crate_ammo':
    case 'metal_crate':
      ctx.beginPath();
      ctx.moveTo(screenX + prop.width * 0.2, screenY + prop.height * 0.5);
      ctx.lineTo(screenX + prop.width * 0.8, screenY + prop.height * 0.5);
      ctx.moveTo(screenX + prop.width * 0.5, screenY + prop.height * 0.2);
      ctx.lineTo(screenX + prop.width * 0.5, screenY + prop.height * 0.8);
      ctx.stroke();
      break;
      
    case 'barrel_metal':
    case 'barrel':
    case 'oil_drum':
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(screenX + prop.width / 2, screenY + prop.height / 2, Math.min(prop.width, prop.height) * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 'hay_bale':
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(screenX, screenY + (prop.height / 4) * i);
        ctx.lineTo(screenX + prop.width, screenY + (prop.height / 4) * i);
        ctx.stroke();
      }
      break;
      
    case 'concrete_wall':
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      const brickH = 15;
      for (let y = 0; y < prop.height; y += brickH) {
        const offset = (y / brickH) % 2 === 0 ? 0 : prop.width / 4;
        for (let x = 0; x < prop.width; x += prop.width / 2) {
          ctx.strokeRect(screenX + x + offset, screenY + y, prop.width / 2, brickH);
        }
      }
      break;
  }
}

function darkenColor(color, amount) {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * (1 - amount));
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * (1 - amount));
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * (1 - amount));
  return `rgb(${r}, ${g}, ${b})`;
}

export function renderExitPortal(ctx, dungeon, camera) {
  if (!dungeon || !dungeon.exitPortal || !dungeon.exitPortal.active) return;
  
  const portal = dungeon.exitPortal;
  const screenX = portal.x - camera.x - portal.width / 2;
  const screenY = portal.y - camera.y - portal.height / 2;
  
  const pulse = Math.sin(Date.now() / 300) * 0.2 + 0.8;
  
  ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
  ctx.fillRect(screenX, screenY, portal.width, portal.height);
  
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 3;
  ctx.strokeRect(screenX, screenY, portal.width, portal.height);
  
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SORTIE', screenX + portal.width / 2, screenY + portal.height / 2);
}

export function checkExitPortalProximity(player, dungeon) {
  if (!dungeon || !dungeon.exitPortal || !dungeon.exitPortal.active) return false;
  
  const portal = dungeon.exitPortal;
  const dx = player.x - portal.x;
  const dy = player.y - portal.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance < 100;
}

export function renderNextRoomDoor(ctx, dungeon, camera) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return;
  
  const currentRoom = dungeon.rooms[dungeon.currentRoom];
  
  if (!currentRoom.cleared || dungeon.currentRoom >= dungeon.totalRooms - 1) return;
  
  const doorX = currentRoom.x;
  const doorY = currentRoom.y - currentRoom.height / 2;
  const doorWidth = 100;
  const doorHeight = 80;
  
  const screenX = doorX - camera.x - doorWidth / 2;
  const screenY = doorY - camera.y - doorHeight / 2;
  
  const pulse = Math.sin(Date.now() / 400) * 0.3 + 0.7;
  
  ctx.fillStyle = `rgba(0, 255, 255, ${pulse})`;
  ctx.fillRect(screenX, screenY, doorWidth, doorHeight);
  
  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(screenX, screenY, doorWidth, doorHeight);
  
  ctx.font = 'bold 32px monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('↑', screenX + doorWidth / 2, screenY + doorHeight / 2);
  
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`Salle ${dungeon.currentRoom + 2}`, screenX + doorWidth / 2, screenY - 10);
}

export function checkNextRoomDoorProximity(player, dungeon) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return false;
  
  const currentRoom = dungeon.rooms[dungeon.currentRoom];
  
  if (!currentRoom.cleared || dungeon.currentRoom >= dungeon.totalRooms - 1) return false;
  
  const doorX = currentRoom.x;
  const doorY = currentRoom.y - currentRoom.height / 2;
  
  const dx = player.x - doorX;
  const dy = player.y - doorY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance < 100;
}

export function enterNextRoom(dungeon, player, state) {
  if (!dungeon || dungeon.layoutType !== 'procedural') return;
  
  state.entities = state.entities.filter(e => e.roomId !== dungeon.currentRoom);
  state.loot = state.loot.filter(l => {
    const currentRoom = dungeon.rooms[dungeon.currentRoom];
    const dx = Math.abs(l.x - currentRoom.x);
    const dy = Math.abs(l.y - currentRoom.y);
    return dx > currentRoom.width / 2 || dy > currentRoom.height / 2;
  });
  
  dungeon.currentRoom++;
  
  const nextRoom = dungeon.rooms[dungeon.currentRoom];
  
  player.x = nextRoom.x;
  player.y = nextRoom.y + (nextRoom.height / 2) - 100;
  
  console.log(`🚪 Entrée salle ${dungeon.currentRoom + 1}/${dungeon.totalRooms}`);
}

export function checkPropCollision(x, y, props, margin = 0) {
  if (!props) return null;
  
  for (const prop of props) {
    const dx = Math.abs(prop.x - x);
    const dy = Math.abs(prop.y - y);
    
    if (dx < (prop.width / 2 + margin) && dy < (prop.height / 2 + margin)) {
      return prop;
    }
  }
  
  return null;
}