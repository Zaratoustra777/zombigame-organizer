// src/rendering/render.js - CORRIGÉ

import { createRenderables } from './depthSort.js';
import { renderProp, renderEntity, renderBoss } from './renderEntities.js';
import { renderPlayer, renderAimLine } from './renderPlayer.js';
import { renderProjectiles, renderEffects, renderBossLaser, renderLoot } from './renderEffects.js';
import { renderMap, renderDungeonEntrance, renderDungeonIndicator } from './renderMap.js';
import { renderDungeonRooms, renderExitPortal, renderNextRoomDoor } from './renderDungeonLayout.js';
import { ITEMS } from '../config/items/index.js';

export function render(ctx, state) {
  const { player, camera, projectiles, entities, props, boss, effects, loot, dungeon, input, time } = state;
  
  // 1️⃣ Effacer le canvas
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // 2️⃣ ⚠️ METTRE À JOUR LA CAMÉRA (CRITICAL!)
  camera.update(player);
  
  // 3️⃣ Rendu du fond
  if (dungeon && dungeon.layoutType === 'procedural') {
    renderDungeonRooms(ctx, dungeon, camera);
    renderExitPortal(ctx, dungeon, camera);
    renderNextRoomDoor(ctx, dungeon, camera);
  } else {
    renderMap(ctx, camera, player);
    renderDungeonEntrance(ctx, camera, player);
    renderDungeonIndicator(ctx, camera, player);
  }
  
  // 4️⃣ Effets de fond
  renderProjectiles(ctx, projectiles, camera);
  renderEffects(ctx, effects, camera, time);
  renderBossLaser(ctx, boss, camera);
  
  // 5️⃣ Objets triés par profondeur
  const renderables = createRenderables(state, camera);
  renderables.forEach(item => {
    if (item.type === 'prop') {
      renderProp(ctx, item.data, camera);
    } else if (item.type === 'entity') {
      renderEntity(ctx, item.data, camera, time);
    } else if (item.type === 'boss') {
      renderBoss(ctx, item.data, camera);
    } else if (item.type === 'player') {
      renderPlayer(ctx, item.data, camera, input);
    }
  });
  
  // 6️⃣ Ligne de visée
  const equippedSlot = player.equippedWeaponSlot;
  const equippedItem = equippedSlot !== null ? state.inventory[equippedSlot] : null;
  const weapon = equippedItem ? ITEMS[equippedItem.type] : null;
  
  if (weapon) {
    renderAimLine(ctx, player, weapon, input, camera);
  }
  
  // 7️⃣ Loot (au dessus)
  renderLoot(ctx, loot, camera, time);
}