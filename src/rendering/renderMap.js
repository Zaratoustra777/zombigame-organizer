// src/rendering/renderMap.js - CORRIGÉ

import { CALCULATED } from '../config/gameConfig.js';

const MAP_SIZE = CALCULATED.MAP_WIDTH_PX;

export const MAP_DATA = {
  '0,0': { name: 'StartCity', color: '#2a4a2a' },
  '0,-1': { name: 'Nord City', color: '#2a3a4a' },
  '0,1': { name: 'Sud City', color: '#3a2a4a' },
  '-1,0': { name: 'Ouest City', color: '#4a2a3a' },
  '1,0': { name: 'Est City', color: '#2a4a3a' },
  '0,-3': { name: 'Fast-Food Zone', color: '#4a2a2a' },
  '0,3': { name: 'Chantier Zone', color: '#4a3a2a' },
  '-3,0': { name: 'Boutique Zone', color: '#3a2a4a' },
  '3,0': { name: 'Oasis Zone', color: '#2a4a4a' },
  '4,-4': { name: 'Base Militaire', color: '#3a3a3a' },
  '-4,4': { name: 'Laboratoire', color: '#2a3a3a' },
  '4,4': { name: 'Ferme Abandonnée', color: '#4a4a2a' },
  '-4,-4': { name: 'Usine Maudite', color: '#3a3a3a' }
};

export function renderMap(ctx, camera, player) {
  const mapKey = `${player.mapX},${player.mapY}`;
  const currentMap = MAP_DATA[mapKey] || { name: 'Zone Inconnue', color: '#1a1a1a' };
  
  ctx.fillStyle = currentMap.color;
  ctx.fillRect(-camera.x, -camera.y, MAP_SIZE, MAP_SIZE);
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  
  const gridSize = 256;
  for (let x = 0; x <= MAP_SIZE; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x - camera.x, -camera.y);
    ctx.lineTo(x - camera.x, MAP_SIZE - camera.y);
    ctx.stroke();
  }
  
  for (let y = 0; y <= MAP_SIZE; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(-camera.x, y - camera.y);
    ctx.lineTo(MAP_SIZE - camera.x, y - camera.y);
    ctx.stroke();
  }
  
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.strokeRect(-camera.x, -camera.y, MAP_SIZE, MAP_SIZE);
  
  ctx.font = 'bold 28px monospace';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const textX = 30 - camera.x;
  const textY = 30 - camera.y;
  
  ctx.strokeText(currentMap.name, textX, textY);
  ctx.fillText(currentMap.name, textX, textY);
  
  ctx.font = '16px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText(`(${player.mapX}, ${player.mapY})`, textX, textY + 35);
}

export function renderDungeonEntrance(ctx, camera, player) {
  const mapKey = `${player.mapX},${player.mapY}`;
  
  // À compléter avec votre logique d'entrées de donjon
  // if (!DUNGEON_MAP_ENTRANCES[mapKey]) return;
  // ...reste du code
}

export function renderDungeonIndicator(ctx, camera, player) {
  const mapKey = `${player.mapX},${player.mapY}`;
  
  // À compléter avec votre logique d'indicateurs
  // ...reste du code
}