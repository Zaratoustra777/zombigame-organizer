// src/ui/HUD.jsx - VERSION RESPONSIVE

import React from 'react';

export default function HUD({ stats, isMobile }) {
  const StatBar = ({ icon, label, value, maxValue, color }) => {
    const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
    
    return (
      <div style={{ marginBottom: isMobile ? '4px' : '6px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '4px' : '6px',
          marginBottom: '2px'
        }}>
          <span style={{ fontSize: isMobile ? '10px' : '12px' }}>{icon}</span>
          <span style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: isMobile ? '9px' : '10px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            minWidth: isMobile ? '35px' : '45px'
          }}>
            {label}
          </span>
          <span style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: isMobile ? '8px' : '9px',
            fontFamily: 'monospace'
          }}>
            {Math.ceil(value)}/{maxValue}
          </span>
        </div>
        
        <div style={{
          width: isMobile ? '120px' : '180px',
          height: isMobile ? '8px' : '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            transition: 'width 0.3s ease',
            opacity: 0.8
          }} />
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? '8px' : '15px',
      left: isMobile ? '8px' : '15px',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: isMobile ? '8px 10px' : '10px 12px',
      borderRadius: isMobile ? '6px' : '8px',
      border: '1px solid rgba(0, 255, 0, 0.3)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      zIndex: 100,
      backdropFilter: 'blur(5px)'
    }}>
      <StatBar
        icon="❤️"
        label="VIE"
        value={stats.hp}
        maxValue={100}
        color="linear-gradient(90deg, #ff0000, #ff4444)"
      />
      
      <StatBar
        icon="⚡"
        label="DASH"
        value={stats.dashReady ? 100 : 0}
        maxValue={100}
        color="linear-gradient(90deg, #00ffff, #44ffff)"
      />
      
      <StatBar
        icon="🍖"
        label="FAIM"
        value={stats.hunger}
        maxValue={100}
        color="linear-gradient(90deg, #ff8800, #ffaa00)"
      />
      
      <StatBar
        icon="💧"
        label="SOIF"
        value={stats.thirst}
        maxValue={100}
        color="linear-gradient(90deg, #0088ff, #4499ff)"
      />
      
      <div style={{
        marginTop: isMobile ? '4px' : '6px',
        paddingTop: isMobile ? '4px' : '6px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: isMobile ? '8px' : '9px',
        fontFamily: 'monospace',
        color: 'rgba(255, 255, 255, 0.5)'
      }}>
        🧟 Ennemis: <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 'bold' }}>{stats.enemies}</span>
      </div>
      
      {stats.isKO && (
        <div style={{
          marginTop: isMobile ? '6px' : '8px',
          padding: isMobile ? '4px' : '6px',
          background: 'rgba(255, 0, 0, 0.3)',
          border: '1px solid rgba(255, 0, 0, 0.5)',
          borderRadius: '5px',
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: isMobile ? '10px' : '11px',
          fontFamily: 'monospace',
          animation: 'pulse 1s infinite'
        }}>
          💀 K.O. 💀
        </div>
      )}
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
}