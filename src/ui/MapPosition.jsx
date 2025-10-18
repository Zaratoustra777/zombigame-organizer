// src/ui/MapPosition.jsx

import React from 'react';

export default function MapPosition({ player }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      border: '2px solid #0f0',
      borderRadius: '8px',
      padding: '10px 15px',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 100
    }}>
      <div>🏙️ {player.city}</div>
      <div>📍 Map: ({player.mapX}, {player.mapY})</div>
    </div>
  );
}