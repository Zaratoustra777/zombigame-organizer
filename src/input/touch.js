// src/input/touch.js
import { ITEMS } from '../config/items/index.js';
import { addToInventory, useItem, transferItem, swapItems } from '../systems/inventory.js';

export function initTouch(canvas, input, ui, state) {
  const handleTouchStart = (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    
    Array.from(e.touches).forEach(touch => {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      if (state.lootInventory) {
        const lootSlot = checkLootInventoryTouch(x, y, state.lootInventory);
        if (lootSlot !== null) {
          handleTouchSlotClick(lootSlot, x, y, ui, state, true);
          return;
        }
      }
      
      const invSlot = checkPlayerInventoryTouch(x, y);
      if (invSlot !== null) {
        handleTouchSlotClick(invSlot, x, y, ui, state, false);
        return;
      }
      
      const dashButtonSize = 70;
      const dashButtonX = 768 - dashButtonSize - 20;
      const dashButtonY = 768 - dashButtonSize - 20;
      const dashDist = Math.sqrt(
        Math.pow(x - (dashButtonX + dashButtonSize/2), 2) + 
        Math.pow(y - (dashButtonY + dashButtonSize/2), 2)
      );
      
      if (dashDist < dashButtonSize/2) {
        input.dash = true;
        return;
      }
      
      if (x < 768 / 2) {
        input.touchMove = { x, y, id: touch.identifier };
      } else {
        input.shoot = true;
        input.mouseX = x;
        input.mouseY = y;
        input.touchShoot = { x, y, id: touch.identifier };
      }
    });
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    
    Array.from(e.touches).forEach(touch => {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      input.mouseX = x;
      input.mouseY = y;
      
      if (input.touchMove && touch.identifier === input.touchMove.id) {
        input.touchMove = { x, y, id: touch.identifier };
      }
      
      if (input.touchShoot && touch.identifier === input.touchShoot.id) {
        input.mouseX = x;
        input.mouseY = y;
        input.touchShoot = { x, y, id: touch.identifier };
      }
    });
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    
    if (ui.clickedSlot !== null && ui.clickStartX !== null) {
      const dragDistance = Math.sqrt(
        Math.pow(input.mouseX - ui.clickStartX, 2) +
        Math.pow(input.mouseY - ui.clickStartY, 2)
      );
      
      if (dragDistance >= 5) {
        handleDragDrop(input, ui, state);
      }
      
      ui.clickedSlot = null;
      ui.clickStartX = null;
      ui.clickStartY = null;
    }
    
    const remainingTouches = Array.from(e.touches).map(t => t.identifier);
    
    if (input.touchMove && !remainingTouches.includes(input.touchMove.id)) {
      input.touchMove = null;
      input.up = input.down = input.left = input.right = false;
    }
    
    if (input.touchShoot && !remainingTouches.includes(input.touchShoot.id)) {
      input.touchShoot = null;
      input.shoot = false;
    }
    
    input.dash = false;
  };
  
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
  
  return () => {
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('touchend', handleTouchEnd);
  };
}

function checkLootInventoryTouch(x, y, lootInventory) {
  const lootInvWidth = 300;
  const lootInvX = (768 - lootInvWidth) / 2;
  const lootInvY = (768 - 200) / 2 - 100;
  const lootSlotSize = 50;
  const lootSlotGap = 8;
  const lootStartX = lootInvX + 20;
  const lootStartY = lootInvY + 45;
  
  for (let i = 0; i < lootInventory.items.length; i++) {
    if (!lootInventory.items[i]) continue;
    
    const col = i % 5;
    const row = Math.floor(i / 5);
    const slotX = lootStartX + col * (lootSlotSize + lootSlotGap);
    const slotY = lootStartY + row * (lootSlotSize + lootSlotGap);
    
    if (x >= slotX && x <= slotX + lootSlotSize &&
        y >= slotY && y <= slotY + lootSlotSize) {
      return `loot-${i}`;
    }
  }
  return null;
}

function checkPlayerInventoryTouch(x, y) {
  const invBarWidth = 520;
  const invBarX = (768 - invBarWidth) / 2;
  const invBarY = 768 - 70;
  const slotSize = 48;
  const slotGap = 4;
  
  for (let i = 0; i < 10; i++) {
    const slotX = invBarX + i * (slotSize + slotGap);
    const slotY = invBarY;
    
    if (x >= slotX && x <= slotX + slotSize &&
        y >= slotY && y <= slotY + slotSize) {
      return i;
    }
  }
  return null;
}

function handleTouchSlotClick(slot, x, y, ui, state, isLoot) {
  const now = Date.now();
  
  if (ui.lastClickSlot === slot && now - ui.lastClickTime < 300) {
    if (isLoot) {
      const lootIndex = parseInt(slot.split('-')[1]);
      const item = state.lootInventory.items[lootIndex];
      if (item && addToInventory(state.inventory, item.type, item.count)) {
        state.lootInventory.items[lootIndex] = null;
      }
    } else {
      const item = state.inventory[slot];
      if (item) {
        const itemDef = ITEMS[item.type];
        if (itemDef.weaponType) {
          state.player.weapon = itemDef.weaponType;
          state.player.equippedWeaponSlot = slot;
        } else {
          useItem(state, slot);
        }
      }
    }
    ui.lastClickSlot = null;
    ui.lastClickTime = 0;
  } else {
    state.input.mouseX = x;
    state.input.mouseY = y;
    ui.clickStartX = x;
    ui.clickStartY = y;
    ui.clickedSlot = slot;
    ui.lastClickSlot = slot;
    ui.lastClickTime = now;
  }
}

function handleDragDrop(input, ui, state) {
  const isFromLoot = typeof ui.clickedSlot === 'string' && ui.clickedSlot.startsWith('loot-');
  
  if (isFromLoot) {
    const lootIndex = parseInt(ui.clickedSlot.split('-')[1]);
    const targetSlot = checkPlayerInventoryTouch(input.mouseX, input.mouseY);
    if (targetSlot !== null) {
      transferItem(state.lootInventory.items, lootIndex, state.inventory, targetSlot);
    }
  } else {
    if (state.lootInventory) {
      const lootSlot = checkLootInventoryTouch(input.mouseX, input.mouseY, state.lootInventory);
      if (lootSlot !== null) {
        const lootIndex = parseInt(lootSlot.split('-')[1]);
        transferItem(state.inventory, ui.clickedSlot, state.lootInventory.items, lootIndex);
        return;
      }
    }
    
    const targetSlot = checkPlayerInventoryTouch(input.mouseX, input.mouseY);
    if (targetSlot !== null && targetSlot !== ui.clickedSlot) {
      swapItems(state.inventory, ui.clickedSlot, targetSlot);
    }
  }
}