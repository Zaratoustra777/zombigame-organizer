// ========================================
// 💀 BOUTONS SPAWN BOSS
// ========================================

import React from 'react';

const buttonStyle = {
  padding: '6px 12px',
  background: '#ff0000',
  border: '2px solid #ffffff',
  borderRadius: '4px',
  color: '#ffffff',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '11px'
};

export default function BossButtons({ onSpawnBoss }) {
  return (
    <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      <button onClick={() => onSpawnBoss('macon')} style={buttonStyle}>
        💀 Maçon
      </button>
      <button onClick={() => onSpawnBoss('gerant')} style={buttonStyle}>
        🍔 Gérant
      </button>
      <button onClick={() => onSpawnBoss('consommatrice')} style={buttonStyle}>
        👗 Consommatrice
      </button>
      <button onClick={() => onSpawnBoss('pecheur')} style={buttonStyle}>
        🎣 Pêcheur
      </button>
      <button onClick={() => onSpawnBoss('colonel')} style={buttonStyle}>
        🪖 Colonel
      </button>
      <button onClick={() => onSpawnBoss('scientifique')} style={buttonStyle}>
        🧪 Scientifique
      </button>
      <button onClick={() => onSpawnBoss('fermier')} style={buttonStyle}>
        🌾 Fermier
      </button>
      <button onClick={() => onSpawnBoss('machine')} style={buttonStyle}>
        🤖 Machine
      </button>
    </div>
  );
}