// src/rendering/renderUI.js

// ========================================
// 🎨 RENDU DE L'INTERFACE UTILISATEUR
// ========================================

import { ITEMS } from '../config/items/index.js';
import { WEAPONS } from '../config/weapons.js';

/**
 * Rend la grille de fond
 */
export function renderGrid(ctx, camera, mapWidth, mapHeight, tileSize) {
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let i = 0; i <= mapWidth; i++) {
    const screenX = i * tileSize - camera.x;
    if (screenX >= 0 && screenX <= 768) {
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, 768);
      ctx.stroke();
    }
  }
  
  // Horizontal lines
  for (let i = 0; i <= mapHeight; i++) {
    const screenY = i * tileSize - camera.y;
    if (screenY >= 0 && screenY <= 768) {
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(768, screenY);
      ctx.stroke();
    }
  }
}

/**
 * Rend la barre de vie
 */
export function renderHealthBar(ctx, player) {
  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 10, 204, 24);
  
  // Red base
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(12, 12, 200, 20);
  
  // Green fill
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(12, 12, 200 * (player.hp / player.maxHp), 20);
  
  // Border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 200, 20);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.ceil(player.hp)}/${player.maxHp} HP`, 112, 26);
}

/**
 * Rend la barre de faim
 */
export function renderHungerBar(ctx, player) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 40, 204, 18);
  
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(12, 42, 200, 14);
  
  const hungerColor = player.hunger > 30 ? '#ff8c00' : '#ff0000';
  ctx.fillStyle = hungerColor;
  ctx.fillRect(12, 42, 200 * (player.hunger / 100), 14);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 42, 200, 14);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`🍖 ${Math.ceil(player.hunger)}%`, 112, 52);
}

/**
 * Rend la barre de soif
 */
export function renderThirstBar(ctx, player) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 64, 204, 18);
  
  ctx.fillStyle = '#1e90ff';
  ctx.fillRect(12, 66, 200, 14);
  
  const thirstColor = player.thirst > 30 ? '#00bfff' : '#ff0000';
  ctx.fillStyle = thirstColor;
  ctx.fillRect(12, 66, 200 * (player.thirst / 100), 14);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 66, 200, 14);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`💧 ${Math.ceil(player.thirst)}%`, 112, 76);
}

/**
 * Rend la barre de cooldown dash
 */
export function renderDashCooldown(ctx, player) {
  if (player.dashCooldown <= 0) return;
  
  const cooldownPercent = 1 - (player.dashCooldown / 3000);
  
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 88, 104, 18);
  
  ctx.fillStyle = cooldownPercent === 1 ? '#00ffff' : '#444444';
  ctx.fillRect(12, 90, 100 * cooldownPercent, 14);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 90, 100, 14);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('DASH', 62, 100);
}

/**
 * Rend l'inventaire du joueur
 */
export function renderInventory(ctx, inventory, player, ui, input) {
  const invBarWidth = 520;
  const invBarHeight = 60;
  const invBarX = (768 - invBarWidth) / 2;
  const invBarY = 768 - invBarHeight - 10;
  const slotSize = 48;
  const slotGap = 4;
  
  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(invBarX - 10, invBarY - 10, invBarWidth + 20, invBarHeight + 20);
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.strokeRect(invBarX - 10, invBarY - 10, invBarWidth + 20, invBarHeight + 20);
  
  // Slots
  inventory.forEach((item, index) => {
    const slotX = invBarX + index * (slotSize + slotGap);
    const slotY = invBarY;
    
    const isEquipped = player.equippedWeaponSlot === index;
    ctx.fillStyle = isEquipped ? 'rgba(0,255,0,0.3)' : 
                    ui.hoveredSlot === index ? 'rgba(255,255,255,0.2)' : 'rgba(50,50,50,0.8)';
    ctx.fillRect(slotX, slotY, slotSize, slotSize);
    ctx.strokeStyle = isEquipped ? '#00ff00' : '#666666';
    ctx.lineWidth = isEquipped ? 3 : 1;
    ctx.strokeRect(slotX, slotY, slotSize, slotSize);
    
    // Slot number
    ctx.fillStyle = '#888888';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(index + 1, slotX + 4, slotY + 12);
    
    // Item
    if (item && ui.clickedSlot !== index) {
      const itemDef = ITEMS[item.type];
      
      // ✅ VÉRIFICATION SI L'ITEM EXISTE
      if (!itemDef) {
        console.warn(`Item inconnu dans l'inventaire: ${item.type}`);
        
        // Placeholder pour item inconnu
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(slotX + 8, slotY + 16, 32, 32);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(slotX + 8, slotY + 16, 32, 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('?', slotX + 24, slotY + 38);
        return;
      }
      
      ctx.fillStyle = itemDef.color;
      ctx.fillRect(slotX + 8, slotY + 16, 32, 32);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(slotX + 8, slotY + 16, 32, 32);
      
      if (itemDef.icon) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(itemDef.icon, slotX + 24, slotY + 38);
      }
      
      if (item.count > 1) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(item.count, slotX + slotSize - 4, slotY + slotSize - 4);
      }
      
      if (isEquipped) {
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✓', slotX + 8, slotY + 12);
      }
    }
  });
}

/**
 * Rend l'inventaire de loot
 */
export function renderLootInventory(ctx, lootInventory, ui, input) {
  if (!lootInventory) return;
  
  const lootInvWidth = 300;
  const lootInvHeight = 200;
  const lootInvX = (768 - lootInvWidth) / 2;
  const lootInvY = (768 - lootInvHeight) / 2 - 100;
  
  // Background
  ctx.fillStyle = 'rgba(0,0,0,0.9)';
  ctx.fillRect(lootInvX, lootInvY, lootInvWidth, lootInvHeight);
  ctx.strokeStyle = '#ffaa00';
  ctx.lineWidth = 3;
  ctx.strokeRect(lootInvX, lootInvY, lootInvWidth, lootInvHeight);
  
  // Title
  ctx.fillStyle = '#ffaa00';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('📦 LOOT', lootInvX + lootInvWidth/2, lootInvY + 25);
  
  // Slots (5x2)
  const lootSlotSize = 50;
  const lootSlotGap = 8;
  const lootStartX = lootInvX + 20;
  const lootStartY = lootInvY + 45;
  
  lootInventory.items.forEach((item, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const slotX = lootStartX + col * (lootSlotSize + lootSlotGap);
    const slotY = lootStartY + row * (lootSlotSize + lootSlotGap);
    
    ctx.fillStyle = ui.hoveredSlot === `loot-${index}` ? 'rgba(255,255,255,0.2)' : 'rgba(60,60,60,0.8)';
    ctx.fillRect(slotX, slotY, lootSlotSize, lootSlotSize);
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 1;
    ctx.strokeRect(slotX, slotY, lootSlotSize, lootSlotSize);
    
    // ✅ VÉRIFICATION SI L'ITEM EXISTE
    if (item && ui.clickedSlot !== `loot-${index}`) {
      const itemDef = ITEMS[item.type];
      
      if (!itemDef) {
        console.warn(`Item inconnu dans le loot: ${item.type}`);
        
        // Placeholder pour item inconnu
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(slotX + 7, slotY + 7, 36, 36);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(slotX + 7, slotY + 7, 36, 36);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('?', slotX + 25, slotY + 32);
        return;
      }
      
      ctx.fillStyle = itemDef.color;
      ctx.fillRect(slotX + 7, slotY + 7, 36, 36);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(slotX + 7, slotY + 7, 36, 36);
      
      if (itemDef.icon) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(itemDef.icon, slotX + 25, slotY + 32);
      }
      
      if (item.count > 1) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(item.count, slotX + lootSlotSize - 5, slotY + lootSlotSize - 5);
      }
    }
  });
}

/**
 * Rend l'item en cours de drag
 */
export function renderDraggedItem(ctx, inventory, lootInventory, ui, input) {
  if (ui.clickedSlot === null || ui.clickStartX === null) return;
  
  const dragDistance = Math.sqrt(
    Math.pow(input.mouseX - ui.clickStartX, 2) +
    Math.pow(input.mouseY - ui.clickStartY, 2)
  );
  
  if (dragDistance < 5) return;
  
  const isFromLoot = typeof ui.clickedSlot === 'string' && ui.clickedSlot.startsWith('loot-');
  let item = null;
  
  if (isFromLoot) {
    const lootIndex = parseInt(ui.clickedSlot.split('-')[1]);
    item = lootInventory?.items[lootIndex];
  } else {
    item = inventory[ui.clickedSlot];
  }
  
  if (!item) return;
  
  const itemDef = ITEMS[item.type];
  
  // ✅ VÉRIFICATION SI L'ITEM EXISTE
  if (!itemDef) {
    console.warn(`Item inconnu en drag: ${item.type}`);
    return;
  }
  
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = itemDef.color;
  ctx.fillRect(input.mouseX - 24, input.mouseY - 24, 48, 48);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(input.mouseX - 24, input.mouseY - 24, 48, 48);
  
  if (itemDef.icon) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(itemDef.icon, input.mouseX, input.mouseY + 8);
  }
  
  if (item.count > 1) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(item.count, input.mouseX + 20, input.mouseY + 20);
  }
  ctx.globalAlpha = 1;
}

/**
 * Rend l'affichage de l'arme actuelle
 */
export function renderWeaponDisplay(ctx, player) {
  const weapon = WEAPONS[player.weapon];
  
  // ✅ VÉRIFICATION SI L'ARME EXISTE
  if (!weapon) return;
  
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(768 - 180, 10, 170, 50);
  ctx.strokeStyle = weapon.color;
  ctx.lineWidth = 3;
  ctx.strokeRect(768 - 180, 10, 170, 50);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '28px monospace';
  ctx.textAlign = 'left';
  if (weapon.icon) {
    ctx.fillText(weapon.icon, 768 - 170, 45);
  }
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(weapon.name, 768 - 135, 35);
  
  ctx.fillStyle = weapon.color;
  ctx.font = '10px monospace';
  ctx.fillText(`DMG: ${weapon.damage}`, 768 - 135, 50);
}

/**
 * Rend le bouton dash mobile
 */
export function renderDashButton(ctx, player) {
  const dashButtonSize = 70;
  const dashButtonX = 768 - dashButtonSize - 20;
  const dashButtonY = 768 - dashButtonSize - 20;
  
  const canDash = player.dashCooldown <= 0;
  ctx.fillStyle = canDash ? 'rgba(0, 255, 255, 0.6)' : 'rgba(100, 100, 100, 0.6)';
  ctx.beginPath();
  ctx.arc(dashButtonX + dashButtonSize/2, dashButtonY + dashButtonSize/2, dashButtonSize/2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('DASH', dashButtonX + dashButtonSize/2, dashButtonY + dashButtonSize/2 + 6);
  
  // Cooldown overlay
  if (player.dashCooldown > 0) {
    const cooldownPercent = player.dashCooldown / 3000;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.moveTo(dashButtonX + dashButtonSize/2, dashButtonY + dashButtonSize/2);
    ctx.arc(
      dashButtonX + dashButtonSize/2, 
      dashButtonY + dashButtonSize/2, 
      dashButtonSize/2, 
      -Math.PI/2, 
      -Math.PI/2 + (Math.PI * 2 * cooldownPercent)
    );
    ctx.closePath();
    ctx.fill();
  }
}

/**
 * Rend le panneau K.O.
 */
export function renderKOPanel(ctx, player) {
  if (!player.isKO) return;
  
  const koHoursLeft = player.koTimer / 3600;
  const koMinutesLeft = (player.koTimer % 3600) / 60;
  
  ctx.fillStyle = 'rgba(0,0,0,0.9)';
  ctx.fillRect(768/2 - 150, 768/2 - 60, 300, 120);
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 4;
  ctx.strokeRect(768/2 - 150, 768/2 - 60, 300, 120);
  
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('💀 K.O. 💀', 768/2, 768/2 - 20);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(`Réanimation requise`, 768/2, 768/2 + 10);
  
  ctx.fillStyle = '#ffaa00';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`Temps restant: ${Math.floor(koHoursLeft)}h ${Math.floor(koMinutesLeft)}m`, 768/2, 768/2 + 35);
}

/**
 * Rend les warnings critiques
 */
export function renderCriticalWarnings(ctx, player, time) {
  if (player.isKO) return;
  if (player.hunger > 20 && player.thirst > 20) return;
  
  const warningAlpha = 0.5 + Math.sin(time * 0.005) * 0.3;
  ctx.globalAlpha = warningAlpha;
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  
  if (player.hunger <= 20 && player.thirst <= 20) {
    ctx.fillText('⚠️ FAIM ET SOIF CRITIQUES !', 768/2, 150);
  } else if (player.hunger <= 20) {
    ctx.fillText('⚠️ FAIM CRITIQUE !', 768/2, 150);
  } else if (player.thirst <= 20) {
    ctx.fillText('⚠️ SOIF CRITIQUE !', 768/2, 150);
  }
  ctx.globalAlpha = 1;
}

/**
 * Rend les contrôles tactiles (joystick visuel)
 */
export function renderTouchControls(ctx, input) {
  if (input.touchMove) {
    const centerX = 768 / 4;
    const centerY = 768 - 100;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(input.touchMove.x, input.touchMove.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  if (input.touchShoot) {
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(input.touchShoot.x, input.touchShoot.y, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
}