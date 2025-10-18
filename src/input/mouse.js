// src/input/mouse.js
import { ITEMS } from '../config/items/index.js';
import { addToInventory, useItem, transferItem, swapItems } from '../systems/inventory.js';

export function initMouse(canvas, input, ui, state) {
  // Détection appareil tactile - skip mouse events sur mobile
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    return () => {};
  }
  
  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    input.mouseX = e.clientX - rect.left;
    input.mouseY = e.clientY - rect.top;
    updateHoveredSlot(input, ui, state);
  };
  
  const handleMouseDown = (e) => {
    if (state.lootInventory) {
      const lootSlot = checkLootInventoryClick(input, state.lootInventory);
      if (lootSlot !== null) {
        handleSlotClick(lootSlot, ui, state, true);
        return;
      }
    }
    
    const invSlot = checkPlayerInventoryClick(input);
    if (invSlot !== null) {
      handleSlotClick(invSlot, ui, state, false);
      return;
    }
    
    input.shoot = true;
  };
  
  const handleMouseUp = () => {
    input.shoot = false;
    
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
  };
  
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  
  return () => {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mouseup', handleMouseUp);
  };
}

function updateHoveredSlot(input, ui, state) {
  const invBarWidth = 520;
  const invBarX = (768 - invBarWidth) / 2;
  const invBarY = 768 - 70;
  const slotSize = 48;
  const slotGap = 4;
  
  ui.hoveredSlot = null;
  
  for (let i = 0; i < 10; i++) {
    const slotX = invBarX + i * (slotSize + slotGap);
    const slotY = invBarY;
    
    if (input.mouseX >= slotX && input.mouseX <= slotX + slotSize &&
        input.mouseY >= slotY && input.mouseY <= slotY + slotSize) {
      ui.hoveredSlot = i;
      break;
    }
  }
  
  if (state.lootInventory) {
    const lootInvWidth = 300;
    const lootInvX = (768 - lootInvWidth) / 2;
    const lootInvY = (768 - 200) / 2 - 100;
    const lootSlotSize = 50;
    const lootSlotGap = 8;
    const lootStartX = lootInvX + 20;
    const lootStartY = lootInvY + 45;
    
    for (let i = 0; i < state.lootInventory.items.length; i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const slotX = lootStartX + col * (lootSlotSize + lootSlotGap);
      const slotY = lootStartY + row * (lootSlotSize + lootSlotGap);
      
      if (input.mouseX >= slotX && input.mouseX <= slotX + lootSlotSize &&
          input.mouseY >= slotY && input.mouseY <= slotY + lootSlotSize) {
        ui.hoveredSlot = `loot-${i}`;
        break;
      }
    }
  }
}

function checkLootInventoryClick(input, lootInventory) {
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
    
    if (input.mouseX >= slotX && input.mouseX <= slotX + lootSlotSize &&
        input.mouseY >= slotY && input.mouseY <= slotY + lootSlotSize) {
      return `loot-${i}`;
    }
  }
  return null;
}

function checkPlayerInventoryClick(input) {
  const invBarWidth = 520;
  const invBarX = (768 - invBarWidth) / 2;
  const invBarY = 768 - 70;
  const slotSize = 48;
  const slotGap = 4;
  
  for (let i = 0; i < 10; i++) {
    const slotX = invBarX + i * (slotSize + slotGap);
    const slotY = invBarY;
    
    if (input.mouseX >= slotX && input.mouseX <= slotX + slotSize &&
        input.mouseY >= slotY && input.mouseY <= slotY + slotSize) {
      return i;
    }
  }
  return null;
}

function handleSlotClick(slot, ui, state, isLoot) {
  const now = Date.now();
  const slotKey = isLoot ? slot : slot;
  
  if (ui.lastClickSlot === slotKey && now - ui.lastClickTime < 300) {
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
          console.log(`✅ Arme équipée: ${itemDef.name}`);
        } else {
          useItem(state, slot);
        }
      }
    }
    ui.lastClickSlot = null;
    ui.lastClickTime = 0;
  } else {
    ui.clickStartX = state.input.mouseX;
    ui.clickStartY = state.input.mouseY;
    ui.clickedSlot = slotKey;
    ui.lastClickSlot = slotKey;
    ui.lastClickTime = now;
  }
}

function handleDragDrop(input, ui, state) {
  const isFromLoot = typeof ui.clickedSlot === 'string' && ui.clickedSlot.startsWith('loot-');
  
  if (isFromLoot) {
    const lootIndex = parseInt(ui.clickedSlot.split('-')[1]);
    const targetSlot = checkPlayerInventoryClick(input);
    if (targetSlot !== null) {
      transferItem(state.lootInventory.items, lootIndex, state.inventory, targetSlot);
    }
  } else {
    if (state.lootInventory) {
      const lootSlot = checkLootInventoryClick(input, state.lootInventory);
      if (lootSlot !== null) {
        const lootIndex = parseInt(lootSlot.split('-')[1]);
        transferItem(state.inventory, ui.clickedSlot, state.lootInventory.items, lootIndex);
        return;
      }
    }
    
    const targetSlot = checkPlayerInventoryClick(input);
    if (targetSlot !== null && targetSlot !== ui.clickedSlot) {
      swapItems(state.inventory, ui.clickedSlot, targetSlot);
    }
  }
}