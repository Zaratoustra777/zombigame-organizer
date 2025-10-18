// src/ui/MiniMap.jsx - VERSION CORRIGÉE

import React from 'react';
import { CITY_CONFIG, getMapType } from '../config/worldMap.js';

export default function MiniMap({ player, dungeon }) {
  // ⬇️ MASQUER EN DONJON
  if (dungeon) return null;
  
  const tileSize = 20;
  const viewRange = 2;
  const gridSize = (viewRange * 2) + 1;
  const mapWidth = gridSize * tileSize;
  
  const mapInfo = getMapType(player.mapX, player.mapY);
  const mapName = mapInfo.name === 'Rue' ? 'Désert' : mapInfo.name;
  
  const getTileColor = (x, y) => {
    const info = getMapType(x, y);
    
    if (x === player.mapX && y === player.mapY) return '#ffff00';
    
    switch(info.type) {
      case 'hub': return '#ff00ff';
      case 'dungeon': return '#00ffff';
      case 'dungeonRare': return '#0000ff';
      case 'gasStation': return '#ff0000';
      case 'hotel': return '#00ff00';
      case 'event': return '#00ff00';
      default: return '#333';
    }
  };
  
  const startX = player.mapX - viewRange;
  const startY = player.mapY - viewRange;
  
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      border: '2px solid #0f0',
      borderRadius: '8px',
      padding: '15px',
      zIndex: 1000,
      fontFamily: 'monospace',
      color: '#0f0'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        🏙️ {player.city}
      </div>
      
      <svg width={mapWidth} height={mapWidth} style={{ marginBottom: '10px' }}>
        {Array.from({ length: gridSize }).map((_, i) => 
          Array.from({ length: gridSize }).map((_, j) => {
            const x = startX + i;
            const y = startY + j;
            
            const inBounds = x >= CITY_CONFIG.bounds.minX && 
                           x <= CITY_CONFIG.bounds.maxX &&
                           y >= CITY_CONFIG.bounds.minY && 
                           y <= CITY_CONFIG.bounds.maxY;
            
            const color = inBounds ? getTileColor(x, y) : '#000';
            
            return (
              <rect
                key={`${i}-${j}`}
                x={i * tileSize}
                y={j * tileSize}
                width={tileSize - 2}
                height={tileSize - 2}
                fill={color}
                stroke={x === player.mapX && y === player.mapY ? '#fff' : 'none'}
                strokeWidth={2}
                opacity={inBounds ? (x === player.mapX && y === player.mapY ? 1 : 0.6) : 0.2}
              />
            );
          })
        )}
      </svg>
      
      <div style={{
        fontSize: '12px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '3px' }}>{mapName}</div>
        <div>{player.mapX} ; {player.mapY}</div>
      </div>
    </div>
  );
}